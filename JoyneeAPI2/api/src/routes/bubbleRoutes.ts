import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';
import { sendSuccess, sendError, sendPaginated } from '../utils/response';
import { validate, createBubbleSchema, updateBubbleSchema, paginationSchema, idParamSchema } from '../utils/validation';

const router = Router();

interface BubbleQuery {
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: string;
  active?: string;
  lang?: string;
  type?: string;
  search?: string;
}

interface BubbleWhereClause {
  active?: boolean;
  lang?: 'en' | 'cs';
  type?: string;
  name?: { contains: string; mode: 'insensitive' };
}

// GET /api/bubbles - Get all bubbles with pagination
router.get('/', validate(paginationSchema), async (req: Request<{}, {}, {}, BubbleQuery>, res: Response, next: NextFunction) => {
  try {
    const { page = '1', limit = '10', sortBy = 'id', sortOrder = 'asc', active, lang, type, search } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const where: BubbleWhereClause = {};
    if (active !== undefined) {
      where.active = active === 'true';
    }
    if (lang && (lang === 'en' || lang === 'cs')) {
      where.lang = lang;
    }
    if (type) {
      where.type = type;
    }
    if (search) {
      where.name = { contains: search, mode: 'insensitive' };
    }

    const [bubbles, total] = await Promise.all([
      prisma.bubble.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { [sortBy]: sortOrder },
        include: {
          hashtags: {
            include: {
              hashtag: true,
            },
          },
          userSubscriptions: {
            include: {
              user: true,
            },
          },
        },
      }),
      prisma.bubble.count({ where }),
    ]);

    sendPaginated(res, bubbles, pageNum, limitNum, total);
  } catch (error) {
    next(error);
  }
});

// GET /api/bubbles/:id - Get bubble by ID
router.get('/:id', validate(idParamSchema), async (req, res, next) => {
  try {
    const { id } = req.params;
    const bubble = await prisma.bubble.findUnique({
      where: { id: parseInt(id ?? '0') },
      include: {
        hashtags: {
          include: {
            hashtag: true,
          },
        },
        userSubscriptions: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!bubble) {
      return sendError(res, 'Bubble not found', 404);
    }

    sendSuccess(res, bubble);
  } catch (error) {
    next(error);
  }
});

// POST /api/bubbles - Create new bubble
router.post('/', validate(createBubbleSchema), async (req, res, next) => {
  try {
    const bubbleData = req.body;
    const bubble = await prisma.bubble.create({
      data: bubbleData,
      include: {
        hashtags: {
          include: {
            hashtag: true,
          },
        },
        userSubscriptions: {
          include: {
            user: true,
          },
        },
      },
    });

    sendSuccess(res, bubble, 201);
  } catch (error) {
    next(error);
  }
});

// PATCH /api/bubbles/:id - Update bubble (partial update)
router.patch('/:id', validate(updateBubbleSchema), async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, lang, type, active, ..._otherFields } = req.body;
    const updateData = { name, lang, type, active };

    const bubble = await prisma.bubble.update({
      where: { id: parseInt(id ?? '0') },
      data: updateData,
      include: {
        hashtags: {
          include: {
            hashtag: true,
          },
        },
        userSubscriptions: {
          include: {
            user: true,
          },
        },
      },
    });

    sendSuccess(res, bubble);
  } catch (error) {
    if (error instanceof Error && error.message.includes('Record to update not found')) {
      return sendError(res, 'Bubble not found', 404);
    }
    next(error);
  }
});

// DELETE /api/bubbles/:id - Delete bubble
router.delete('/:id', validate(idParamSchema), async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const bubble = await prisma.bubble.findUnique({
      where: { id: parseInt(id ?? '0') },
    });

    if (!bubble) {
      return sendError(res, 'Bubble not found', 404);
    }

    await prisma.$transaction([
      prisma.bubbleHashtag.deleteMany({ where: { bubbleId: parseInt(id ?? '0') } }),
      prisma.userBubbleSubscription.deleteMany({ where: { bubbleId: parseInt(id ?? '0') } }),
      prisma.bubble.delete({ where: { id: parseInt(id ?? '0') } }),
    ]);

    sendSuccess(res, { message: 'Bubble deleted successfully' });
  } catch (error) {
    next(error);
  }
});

export { router as bubbleRoutes }; 