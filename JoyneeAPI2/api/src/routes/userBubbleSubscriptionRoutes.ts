import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';
import { sendSuccess, sendError, sendPaginated } from '../utils/response';
import { validate, createUserBubbleSubscriptionSchema, updateUserBubbleSubscriptionSchema, paginationSchema, idParamSchema } from '../utils/validation';

const router = Router();

interface UserBubbleSubscriptionQuery {
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: string;
  userId?: string;
  bubbleId?: string;
  active?: string;
}

interface UserBubbleSubscriptionWhereClause {
  userId?: number;
  bubbleId?: number;
  active?: boolean;
}

// GET /api/user-bubble-subscriptions - Get all user bubble subscriptions with pagination
router.get('/', validate(paginationSchema), async (req: Request<{}, {}, {}, UserBubbleSubscriptionQuery>, res: Response, next: NextFunction) => {
  try {
    const { page = '1', limit = '10', sortBy = 'id', sortOrder = 'asc', userId, bubbleId, active } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const where: UserBubbleSubscriptionWhereClause = {};
    if (userId) {
      where.userId = parseInt(userId);
    }
    if (bubbleId) {
      where.bubbleId = parseInt(bubbleId);
    }
    if (active !== undefined) {
      where.active = active === 'true';
    }

    const [subs, total] = await Promise.all([
      prisma.userBubbleSubscription.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { [sortBy]: sortOrder },
        include: {
          user: true,
          bubble: true,
        },
      }),
      prisma.userBubbleSubscription.count({ where }),
    ]);

    sendPaginated(res, subs, pageNum, limitNum, total);
  } catch (error) {
    next(error);
  }
});

// GET /api/user-bubble-subscriptions/:id - Get user bubble subscription by ID
router.get('/:id', validate(idParamSchema), async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const sub = await prisma.userBubbleSubscription.findUnique({
      where: { id: parseInt(id ?? '0') },
      include: {
        user: true,
        bubble: true,
      },
    });

    if (!sub) {
      return sendError(res, 'User bubble subscription not found', 404);
    }

    sendSuccess(res, sub);
  } catch (error) {
    next(error);
  }
});

// POST /api/user-bubble-subscriptions - Create new user bubble subscription
router.post('/', validate(createUserBubbleSubscriptionSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const subData = req.body;
    const sub = await prisma.userBubbleSubscription.create({
      data: subData,
      include: {
        user: true,
        bubble: true,
      },
    });

    sendSuccess(res, sub, 201);
  } catch (error) {
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return sendError(res, 'User is already subscribed to this bubble', 409);
    }
    next(error);
  }
});

// PATCH /api/user-bubble-subscriptions/:id - Update user bubble subscription (partial update)
router.patch('/:id', validate(updateUserBubbleSubscriptionSchema), async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { active, acceptMatches, weight, ..._otherFields } = req.body;
    const updateData = { active, acceptMatches, weight };

    const sub = await prisma.userBubbleSubscription.update({
      where: { id: parseInt(id ?? '0') },
      data: updateData,
      include: {
        user: true,
        bubble: true,
      },
    });

    sendSuccess(res, sub);
  } catch (error) {
    if (error instanceof Error && error.message.includes('Record to update not found')) {
      return sendError(res, 'User bubble subscription not found', 404);
    }
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return sendError(res, 'User is already subscribed to this bubble', 409);
    }
    next(error);
  }
});

// DELETE /api/user-bubble-subscriptions/:id - Delete user bubble subscription
router.delete('/:id', validate(idParamSchema), async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    
    const sub = await prisma.userBubbleSubscription.findUnique({
      where: { id: parseInt(id ?? '0') },
    });

    if (!sub) {
      return sendError(res, 'User bubble subscription not found', 404);
    }

    await prisma.userBubbleSubscription.delete({ where: { id: parseInt(id ?? '0') } });

    sendSuccess(res, { message: 'User bubble subscription deleted successfully' });
  } catch (error) {
    next(error);
  }
});

export { router as userBubbleSubscriptionRoutes }; 