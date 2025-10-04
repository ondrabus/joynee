import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { validate } from '../utils/validation';
import { createUserSchema, updateUserSchema, getUserSchema, deleteUserSchema, listUsersSchema, createUserProfileSchema, idParamSchema } from '../utils/validation';
import { sendSuccess, sendError, sendPaginated } from '../utils/response';
import { Request } from 'express';
import { UserRole, FirebaseUser } from '../utils/firebase';
import { requireRole, authenticate } from '../middleware/auth';
import multer from 'multer';
import sharp from 'sharp';
import { generateGuid, uploadBufferToS3, getPublicS3Url } from '../utils/s3';

// Extend Request to include user from authentication middleware
interface AuthenticatedRequest extends Request {
  user?: FirebaseUser;
}

const router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

// Shared select object for user
const userSelect = {
  id: true,
  authId: true,
  firstName: true,
  lastName: true,
  email: true,
  birthDate: true,
  avatar: true,
  active: true,
  personality: true,
  bio: true,
  createdAt: true,
  updatedAt: true,
} as const;

// Middleware: resolve current user's numeric ID and store into req.params.id
async function resolveMeId(req: AuthenticatedRequest, res: any, next: any) {
  try {
    if (!req.user?.uid) {
      return sendError(res, 'User not authenticated', 401);
    }
    const me = await prisma.user.findUnique({ where: { authId: req.user.uid }, select: { id: true } });
    if (!me) {
      return sendError(res, 'User profile not found', 404);
    }
    (req as any).params = { ...(req as any).params, id: String(me.id) };
    next();
  } catch (e) {
    next(e);
  }
}

// Handlers reused by both /:id and /me
const handleGetUserById = async (req: AuthenticatedRequest, res: any, next: any) => {
  try {
    const { id } = req.params as { id: string };
    if (!id) {
      return sendError(res, 'ID is required', 400);
    }
    const user = await prisma.user.findUnique({ where: { id: parseInt(id ?? '0') }, select: userSelect });
    if (!user) {
      return sendError(res, 'User not found', 404);
    }
    sendSuccess(res, user);
  } catch (error) { next(error); }
};

const handlePatchUserById = async (req: AuthenticatedRequest, res: any, next: any) => {
  try {
    const { id } = req.params as { id: string };
    const updateData = req.body as any;
    if (!id) {
      return sendError(res, 'ID is required', 400);
    }
    const user = await prisma.user.update({ where: { id: parseInt(id ?? '0') }, data: updateData, select: userSelect });
    sendSuccess(res, user);
  } catch (error) {
    if (error instanceof Error && error.message.includes('Record to update not found')) {
      return sendError(res, 'User not found', 404);
    }
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return sendError(res, 'User with this email already exists', 409);
    }
    next(error);
  }
};

const handlePatchAvatarById = async (req: AuthenticatedRequest, res: any, next: any) => {
  try {
    const { id } = req.params as { id: string };
    if (!id) {
      return sendError(res, 'ID is required', 400);
    }
    const file = (req as any).file as any | undefined;
    if (!file) {
      return sendError(res, 'Avatar file is required', 400);
    }
    const image = sharp(file.buffer);
    const metadata = await image.metadata();
    const width = metadata.width || 0;
    const height = metadata.height || 0;
    if (width < 400 || height < 400) {
      return sendError(res, 'Avatar image must be at least 400x400 pixels', 400);
    }

    // Fetch old avatar URL
    const existing = await prisma.user.findUnique({ where: { id: parseInt(id ?? '0') }, select: { avatar: true } });
    const oldAvatarUrl = existing?.avatar || '';

    const processed = await image.resize(400, 400, { fit: 'cover', position: 'centre' }).toFormat('jpeg').toBuffer();
    const key = `users/${parseInt(id ?? '0')}/${generateGuid()}.jpg`;
    await uploadBufferToS3(key, processed, 'image/jpeg');
    const avatarUrl = getPublicS3Url(key);

    const user = await prisma.user.update({
      where: { id: parseInt(id ?? '0') },
      data: { avatar: avatarUrl },
      select: userSelect,
    });

    // After successful update, mark old avatar as deleted
    if (oldAvatarUrl && oldAvatarUrl !== avatarUrl) {
      const { markObjectAsDeletedByUrl } = await import('../utils/s3');
      try {
        await markObjectAsDeletedByUrl(oldAvatarUrl);
      } catch (e) {
        console.warn('Failed to mark old avatar as deleted:', e);
      }
    }

    sendSuccess(res, user);
  } catch (error) { next(error); }
};

// GET /api/users - List users with pagination (Admin/SuperAdmin only)
router.get('/', requireRole([UserRole.ADMIN, UserRole.SUPER_ADMIN]), validate(listUsersSchema), async (req: AuthenticatedRequest, res, next) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const where = search ? {
      OR: [
        { firstName: { contains: String(search), mode: 'insensitive' as const } },
        { lastName: { contains: String(search), mode: 'insensitive' as const } },
        { email: { contains: String(search), mode: 'insensitive' as const } },
      ],
    } : {};

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: Number(limit),
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          authId: true,
          firstName: true,
          lastName: true,
          email: true,
          birthDate: true,
          avatar: true,
          active: true,
          personality: true,
          bio: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.user.count({ where }),
    ]);

    sendPaginated(res, users, Number(page), Number(limit), total);
  } catch (error) {
    next(error);
  }
});

// GET /api/users/me - Get current user profile (reuses /:id handler)
router.get('/me', authenticate, resolveMeId, handleGetUserById);

// PATCH /api/users/me - Update current user profile (JSON-only, reuses /:id handler)
router.patch('/me', authenticate, resolveMeId, handlePatchUserById);

// PUT /api/users/me - Create user profile (authenticated users only)
router.put('/me', authenticate, validate(createUserProfileSchema), async (req: AuthenticatedRequest, res, next) => {
  try {
    if (!req.user?.uid) {
      return sendError(res, 'User not authenticated', 401);
    }

    if (!req.user.email) {
      return sendError(res, 'User email not found in token', 400);
    }

    // Check if user profile already exists
    const existingUser = await prisma.user.findUnique({
      where: { authId: req.user.uid },
    });

    if (existingUser) {
      return sendError(res, 'User profile already exists', 409);
    }

    const { firstName, lastName } = req.body;

    const userData = {
      authId: req.user.uid,
      email: req.user.email,
      firstName,
      lastName,
      birthDate: null,
      avatar: null, // Default avatar
      active: true,
      personality: '{}', // Empty JSON as string
      bio: null, // Empty JSON as string
    };

    const user = await prisma.user.create({
      data: userData,
      select: {
        id: true,
        authId: true,
        firstName: true,
        lastName: true,
        email: true,
        birthDate: true,
        avatar: true,
        active: true,
        personality: true,
        bio: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    sendSuccess(res, user, 201);
  } catch (error) {
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return sendError(res, 'User with this email already exists', 409);
    }
    next(error);
  }
});

// GET /api/users/:id - Get user by ID (Admin/SuperAdmin only)
router.get('/:id', requireRole([UserRole.ADMIN, UserRole.SUPER_ADMIN]), validate(getUserSchema), handleGetUserById);

// POST /api/users - Create new user (Admin/SuperAdmin only)
router.post('/', requireRole([UserRole.ADMIN, UserRole.SUPER_ADMIN]), validate(createUserSchema), async (req: AuthenticatedRequest, res, next) => {
  try {
    const userData = req.body;
    console.log(userData);

    const {
      authId,
      email,
      firstName,
      lastName,
      avatar,
      birthDate,
      active,
      personality,
      bio,
    } = userData || {};

    const normalizeJsonString = (value: any, fallback: string) => {
      if (value === null || value === undefined || value === '') return fallback;
      if (typeof value === 'object') return JSON.stringify(value);
      return String(value);
    };

    const createData = {
      authId,
      email,
      firstName,
      lastName,
      // Defaults for optional fields
      avatar: avatar || '',
      birthDate: birthDate ? new Date(birthDate) : new Date(),
      active: typeof active === 'boolean' ? active : true,
      personality: normalizeJsonString(personality, '{}'),
      bio: normalizeJsonString(bio, ''),
    };

    const user = await prisma.user.create({
      data: createData,
      select: {
        id: true,
        authId: true,
        firstName: true,
        lastName: true,
        email: true,
        birthDate: true,
        avatar: true,
        active: true,
        personality: true,
        bio: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    sendSuccess(res, user, 201);
  } catch (error) {
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return sendError(res, 'User with this email already exists', 409);
    }
    next(error);
  }
});

// PATCH /api/users/:id - Update user (Admin/SuperAdmin only) - JSON only
router.patch('/:id', requireRole([UserRole.ADMIN, UserRole.SUPER_ADMIN]), validate(updateUserSchema), handlePatchUserById);

// PATCH /api/users/:id/avatar - Upload and process avatar (Admin/SuperAdmin only)
router.patch('/:id/avatar', requireRole([UserRole.ADMIN, UserRole.SUPER_ADMIN]), upload.single('avatar'), validate(idParamSchema), handlePatchAvatarById);

// DELETE /api/users/:id - Delete user (Admin/SuperAdmin only)
router.delete('/:id', requireRole([UserRole.ADMIN, UserRole.SUPER_ADMIN]), validate(deleteUserSchema), async (req: AuthenticatedRequest, res, next) => {
  try {
    const { id } = req.params as { id: string };
    
    if (!id) {
      return sendError(res, 'ID is required', 400);
    }

    const user = await prisma.user.findUnique({
      where: { id: parseInt(id ?? '0') },
    });

    if (!user) {
      return sendError(res, 'User not found', 404);
    }

    await prisma.user.delete({
      where: { id: parseInt(id ?? '0') },
    });

    sendSuccess(res, { message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
});

export { router as userRoutes }; 