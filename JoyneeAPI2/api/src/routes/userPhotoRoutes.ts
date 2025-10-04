import { Router, Request, Response, NextFunction } from 'express';
import multer from 'multer';
import sharp from 'sharp';
import { prisma } from '../lib/prisma';
import { sendSuccess, sendError } from '../utils/response';
import { validate, idParamSchema } from '../utils/validation';
import { UserRole } from '../utils/firebase';
import { generateGuid, uploadBufferToS3, getPublicS3Url, markObjectAsDeletedByUrl } from '../utils/s3';

const router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

// Resolve target userId: admins may pass ?user=1234; others use authenticated user
async function resolveTargetUserId(req: Request): Promise<number> {
  // @ts-ignore - added by auth middleware
  const currentUser = req.user as { uid: string; roles: UserRole[] } | undefined;
  if (!currentUser?.uid) throw new Error('AUTH_REQUIRED');
  const userParam = (req.query?.user as string | undefined)?.trim();

  if (userParam) {
    const isAdmin = currentUser?.roles?.includes(UserRole.ADMIN) || currentUser?.roles?.includes(UserRole.SUPER_ADMIN);
    if (!isAdmin) throw new Error('AUTH_REQUIRED');
    const target = await prisma.user.findUnique({ where: { id: parseInt(userParam) }, select: { id: true } });
    if (!target) throw new Error('TARGET_USER_NOT_FOUND');
    return target.id;
  }

  const me = await prisma.user.findUnique({ where: { authId: currentUser.uid }, select: { id: true } });
  if (!me) throw new Error('AUTH_PROFILE_NOT_FOUND');
  return me.id;
}

// GET /api/user-photos - Return all photos of the target user
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = await resolveTargetUserId(req);
    const photos = await prisma.userPhoto.findMany({ where: { userId }, orderBy: { id: 'asc' } });
    sendSuccess(res, photos);
  } catch (error: any) {
    if (error?.message === 'AUTH_REQUIRED') return sendError(res, 'User not authenticated', 401);
    if (error?.message === 'AUTH_PROFILE_NOT_FOUND') return sendError(res, 'User profile not found', 404);
    if (error?.message === 'TARGET_USER_NOT_FOUND') return sendError(res, 'Target user not found', 404);
    next(error);
  }
});

// GET /api/user-photos/:id - Return specific photo of the target user
router.get('/:id', validate(idParamSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = await resolveTargetUserId(req);
    const { id } = req.params;
    const photo = await prisma.userPhoto.findFirst({ where: { id: parseInt(id ?? '0'), userId } });
    if (!photo) return sendError(res, 'User photo not found', 404);
    sendSuccess(res, photo);
  } catch (error: any) {
    if (error?.message === 'AUTH_REQUIRED') return sendError(res, 'User not authenticated', 401);
    if (error?.message === 'AUTH_PROFILE_NOT_FOUND') return sendError(res, 'User profile not found', 404);
    if (error?.message === 'TARGET_USER_NOT_FOUND') return sendError(res, 'Target user not found', 404);
    next(error);
  }
});

// POST /api/user-photos - Create a new photo for the target user (requires file)
router.post('/', upload.single('photo'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = await resolveTargetUserId(req);
    const file = (req as any).file as any | undefined;
    if (!file) return sendError(res, 'Photo file is required (field name: photo)', 400);

    // Resize with max width 1242 and max height 2208 (no upscale), maintain aspect ratio
    const processed = await sharp(file.buffer)
      .resize({ width: 1242, height: 2208, fit: 'inside', withoutEnlargement: true })
      .toFormat('jpeg')
      .toBuffer();

    const guid = generateGuid();
    const key = `users/${userId}/${guid}.jpg`;
    await uploadBufferToS3(key, processed, 'image/jpeg');
    const url = getPublicS3Url(key);

    const { caption = '' } = req.body as any;

    const created = await prisma.userPhoto.create({
      data: { userId, url, caption: String(caption || '') },
    });

    sendSuccess(res, created, 201);
  } catch (error: any) {
    if (error?.message === 'AUTH_REQUIRED') return sendError(res, 'User not authenticated', 401);
    if (error?.message === 'AUTH_PROFILE_NOT_FOUND') return sendError(res, 'User profile not found', 404);
    if (error?.message === 'TARGET_USER_NOT_FOUND') return sendError(res, 'Target user not found', 404);
    next(error);
  }
});

// PATCH /api/user-photos/:id - Patch fields of a photo of the target user (JSON only)
router.patch('/:id', validate(idParamSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = await resolveTargetUserId(req);
    const { id } = req.params;
    const exists = await prisma.userPhoto.findFirst({ where: { id: parseInt(id ?? '0'), userId }, select: { id: true } });
    if (!exists) return sendError(res, 'User photo not found', 404);

    const { url, caption, ...rest } = req.body as any;
    const updateData: any = {};
    if (caption !== undefined) updateData.caption = String(caption);
    // We do not allow changing URL via JSON patch

    const updated = await prisma.userPhoto.update({ where: { id: parseInt(id ?? '0') }, data: updateData });
    sendSuccess(res, updated);
  } catch (error: any) {
    if (error?.message === 'AUTH_REQUIRED') return sendError(res, 'User not authenticated', 401);
    if (error?.message === 'AUTH_PROFILE_NOT_FOUND') return sendError(res, 'User profile not found', 404);
    if (error?.message === 'TARGET_USER_NOT_FOUND') return sendError(res, 'Target user not found', 404);
    next(error);
  }
});

// DELETE /api/user-photos/:id - Remove photo of the target user (mark S3 as deleted_*)
router.delete('/:id', validate(idParamSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = await resolveTargetUserId(req);
    const { id } = req.params;
    const photo = await prisma.userPhoto.findFirst({ where: { id: parseInt(id ?? '0'), userId } });
    if (!photo) return sendError(res, 'User photo not found', 404);

    // Mark S3 object as deleted
    if (photo.url) {
      try { await markObjectAsDeletedByUrl(photo.url); } catch (e) { console.warn('Failed to mark photo as deleted:', e); }
    }

    await prisma.userPhoto.delete({ where: { id: parseInt(id ?? '0') } });
    sendSuccess(res, { message: 'User photo deleted successfully' });
  } catch (error: any) {
    if (error?.message === 'AUTH_REQUIRED') return sendError(res, 'User not authenticated', 401);
    if (error?.message === 'AUTH_PROFILE_NOT_FOUND') return sendError(res, 'User profile not found', 404);
    if (error?.message === 'TARGET_USER_NOT_FOUND') return sendError(res, 'Target user not found', 404);
    next(error);
  }
});

export { router as userPhotoRoutes }; 