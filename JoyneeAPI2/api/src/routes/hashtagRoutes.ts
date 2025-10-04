import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';
import { sendSuccess, sendError, sendPaginated } from '../utils/response';
import { validate, createHashtagSchema, updateHashtagSchema, paginationSchema, idParamSchema } from '../utils/validation';

const router = Router();

interface HashtagQuery {
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: string;
  search?: string;
}

interface HashtagWhereClause {
  text?: { contains: string; mode: 'insensitive' };
}

// GET /api/hashtags - Get all hashtags with pagination
router.get('/', validate(paginationSchema), async (req: Request<{}, {}, {}, HashtagQuery>, res: Response, next: NextFunction) => {
  try {
    const { page = '1', limit = '10', sortBy = 'id', sortOrder = 'asc', search } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const where: HashtagWhereClause = {};
    if (search) {
      where.text = { contains: search, mode: 'insensitive' };
    }

    const [hashtags, total] = await Promise.all([
      prisma.hashtag.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { [sortBy]: sortOrder },
        include: {
          eventHashtags: {
            include: {
              bubble: true,
            },
          },
          userHashtags: {
            include: {
              user: true,
            },
          },
        },
      }),
      prisma.hashtag.count({ where }),
    ]);

    sendPaginated(res, hashtags, pageNum, limitNum, total);
  } catch (error) {
    next(error);
  }
});

// GET /api/hashtags/:id - Get hashtag by ID
router.get('/:id', validate(idParamSchema), async (req, res, next) => {
  try {
    const { id } = req.params;
    const hashtag = await prisma.hashtag.findUnique({
      where: { id: parseInt(id ?? '0') },
      include: {
        eventHashtags: {
          include: {
            bubble: true,
          },
        },
        userHashtags: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!hashtag) {
      return sendError(res, 'Hashtag not found', 404);
    }

    sendSuccess(res, hashtag);
  } catch (error) {
    next(error);
  }
});

// POST /api/hashtags - Create new hashtag
router.post('/', validate(createHashtagSchema), async (req, res, next) => {
  try {
    const hashtagData = req.body;
    const hashtag = await prisma.hashtag.create({
      data: hashtagData,
    });

    sendSuccess(res, hashtag, 201);
  } catch (error) {
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return sendError(res, 'Hashtag with this text already exists', 409);
    }
    next(error);
  }
});

// PATCH /api/hashtags/:id - Update hashtag (partial update)
router.patch('/:id', validate(updateHashtagSchema), async (req, res, next) => {
  try {
    const { id } = req.params;
    const { text, ..._otherFields } = req.body;

    // Only allow updating the 'text' field, ignore other fields
    const updateData = { text };

    const hashtag = await prisma.hashtag.update({
      where: { id: parseInt(id ?? '0') },
      data: updateData,
    });

    sendSuccess(res, hashtag);
  } catch (error) {
    if (error instanceof Error && error.message.includes('Record to update not found')) {
      return sendError(res, 'Hashtag not found', 404);
    }
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return sendError(res, 'Hashtag with this text already exists', 409);
    }
    next(error);
  }
});

// DELETE /api/hashtags/:id - Delete hashtag
router.delete('/:id', validate(idParamSchema), async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const hashtag = await prisma.hashtag.findUnique({
      where: { id: parseInt(id ?? '0') },
    });

    if (!hashtag) {
      return sendError(res, 'Hashtag not found', 404);
    }

    await prisma.$transaction([
      prisma.bubbleHashtag.deleteMany({ where: { hashtagId: parseInt(id ?? '0') } }),
      prisma.userHashtag.deleteMany({ where: { hashtagId: parseInt(id ?? '0') } }),
      prisma.hashtag.delete({ where: { id: parseInt(id ?? '0') } }),
    ]);

    sendSuccess(res, { message: 'Hashtag deleted successfully' });
  } catch (error) {
    next(error);
  }
});

export { router as hashtagRoutes }; 