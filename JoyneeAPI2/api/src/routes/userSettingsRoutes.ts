import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';
import { sendSuccess, sendError, sendPaginated } from '../utils/response';
import { validate, createUserSettingsSchema, updateUserSettingsSchema, paginationSchema, idParamSchema } from '../utils/validation';

const router = Router();

interface UserSettingsQuery {
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: string;
  userId?: string;
  key?: string;
}

interface UserSettingsWhereClause {
  userId?: number;
  key?: { contains: string; mode: 'insensitive' };
}

// GET /api/user-settings - Get all user settings with pagination
router.get('/', validate(paginationSchema), async (req: Request<{}, {}, {}, UserSettingsQuery>, res: Response, next: NextFunction) => {
  try {
    const { page = '1', limit = '10', sortBy = 'id', sortOrder = 'asc', userId, key } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const where: UserSettingsWhereClause = {};
    if (userId) {
      where.userId = parseInt(userId);
    }
    if (key) {
      where.key = { contains: key, mode: 'insensitive' };
    }

    const [settings, total] = await Promise.all([
      prisma.userSettings.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { [sortBy]: sortOrder },
      }),
      prisma.userSettings.count({ where }),
    ]);

    sendPaginated(res, settings, pageNum, limitNum, total);
  } catch (error) {
    next(error);
  }
});

// GET /api/user-settings/:id - Get user setting by ID
router.get('/:id', validate(idParamSchema), async (req, res, next) => {
  try {
    const { id } = req.params;
    const setting = await prisma.userSettings.findUnique({
      where: { id: parseInt(id ?? '0') },
    });

    if (!setting) {
      return sendError(res, 'User setting not found', 404);
    }

    sendSuccess(res, setting);
  } catch (error) {
    next(error);
  }
});

// POST /api/user-settings - Create new user setting
router.post('/', validate(createUserSettingsSchema), async (req, res, next) => {
  try {
    const settingData = req.body;
    const setting = await prisma.userSettings.create({
      data: settingData,
    });

    sendSuccess(res, setting, 201);
  } catch (error) {
    next(error);
  }
});

// PATCH /api/user-settings/:id - Update user setting (partial update)
router.patch('/:id', validate(updateUserSettingsSchema), async (req, res, next) => {
  try {
    const { id } = req.params;
    const { key, value, ..._otherFields } = req.body;
    const updateData = { key, value };

    const setting = await prisma.userSettings.update({
      where: { id: parseInt(id ?? '0') },
      data: updateData,
    });

    sendSuccess(res, setting);
  } catch (error) {
    if (error instanceof Error && error.message.includes('Record to update not found')) {
      return sendError(res, 'User setting not found', 404);
    }
    next(error);
  }
});

// DELETE /api/user-settings/:id - Delete user setting
router.delete('/:id', validate(idParamSchema), async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const setting = await prisma.userSettings.findUnique({
      where: { id: parseInt(id ?? '0') },
    });

    if (!setting) {
      return sendError(res, 'User setting not found', 404);
    }

    await prisma.userSettings.delete({ where: { id: parseInt(id ?? '0') } });

    sendSuccess(res, { message: 'User setting deleted successfully' });
  } catch (error) {
    next(error);
  }
});

export { router as userSettingsRoutes }; 