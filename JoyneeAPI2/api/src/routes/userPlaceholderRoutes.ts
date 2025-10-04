import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';
import { sendSuccess, sendError, sendPaginated } from '../utils/response';
import { validate, createUserPlaceholderSchema, updateUserPlaceholderSchema, paginationSchema, idParamSchema } from '../utils/validation';

const router = Router();

interface UserPlaceholderQuery {
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: string;
  search?: string;
}

interface UserPlaceholderWhereClause {
  OR?: Array<{
    name?: { contains: string; mode: 'insensitive' };
    emailPattern?: { contains: string; mode: 'insensitive' };
  }>;
}

// GET /api/user-placeholders - Get all user placeholders with pagination
router.get('/', validate(paginationSchema), async (req: Request<{}, {}, {}, UserPlaceholderQuery>, res: Response, next: NextFunction) => {
  try {
    const { page = '1', limit = '10', sortBy = 'id', sortOrder = 'asc', search } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const where: UserPlaceholderWhereClause = {};
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { emailPattern: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [placeholders, total] = await Promise.all([
      prisma.userPlaceholder.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { [sortBy]: sortOrder },
      }),
      prisma.userPlaceholder.count({ where }),
    ]);

    sendPaginated(res, placeholders, pageNum, limitNum, total);
  } catch (error) {
    next(error);
  }
});

// GET /api/user-placeholders/:id - Get user placeholder by ID
router.get('/:id', validate(idParamSchema), async (req, res, next) => {
  try {
    const { id } = req.params;
    const placeholder = await prisma.userPlaceholder.findUnique({
      where: { id: parseInt(id ?? '0') },
    });

    if (!placeholder) {
      return sendError(res, 'User placeholder not found', 404);
    }

    sendSuccess(res, placeholder);
  } catch (error) {
    next(error);
  }
});

// POST /api/user-placeholders - Create new user placeholder
router.post('/', validate(createUserPlaceholderSchema), async (req, res, next) => {
  try {
    const placeholderData = req.body;
    const placeholder = await prisma.userPlaceholder.create({
      data: placeholderData,
    });

    sendSuccess(res, placeholder, 201);
  } catch (error) {
    next(error);
  }
});

// PATCH /api/user-placeholders/:id - Update user placeholder (partial update)
router.patch('/:id', validate(updateUserPlaceholderSchema), async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, emailPattern, hashtagSuggestions, ..._otherFields } = req.body;
    const updateData = { name, emailPattern, hashtagSuggestions };

    const placeholder = await prisma.userPlaceholder.update({
      where: { id: parseInt(id ?? '0') },
      data: updateData,
    });

    sendSuccess(res, placeholder);
  } catch (error) {
    if (error instanceof Error && error.message.includes('Record to update not found')) {
      return sendError(res, 'User placeholder not found', 404);
    }
    next(error);
  }
});

// DELETE /api/user-placeholders/:id - Delete user placeholder
router.delete('/:id', validate(idParamSchema), async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const placeholder = await prisma.userPlaceholder.findUnique({
      where: { id: parseInt(id ?? '0') },
    });

    if (!placeholder) {
      return sendError(res, 'User placeholder not found', 404);
    }

    await prisma.userPlaceholder.delete({ where: { id: parseInt(id ?? '0') } });

    sendSuccess(res, { message: 'User placeholder deleted successfully' });
  } catch (error) {
    next(error);
  }
});

export { router as userPlaceholderRoutes }; 