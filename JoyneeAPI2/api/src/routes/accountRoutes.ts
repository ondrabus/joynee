import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';
import { sendSuccess, sendError, sendPaginated } from '../utils/response';
import { validate, createAccountSchema, updateAccountSchema, paginationSchema, idParamSchema } from '../utils/validation';

const router = Router();

interface AccountQuery {
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: string;
  active?: string;
  search?: string;
}

interface AccountWhereClause {
  active?: boolean;
  name?: { contains: string; mode: 'insensitive' };
}

// GET /api/accounts - Get all accounts with pagination
router.get('/', validate(paginationSchema), async (req: Request<{}, {}, {}, AccountQuery>, res: Response, next: NextFunction) => {
  try {
    const { page = '1', limit = '10', sortBy = 'id', sortOrder = 'asc', active, search } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const where: AccountWhereClause = {};
    if (active !== undefined) {
      where.active = active === 'true';
    }
    if (search) {
      where.name = { contains: search, mode: 'insensitive' };
    }

    const [accounts, total] = await Promise.all([
      prisma.account.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { [sortBy]: sortOrder },
      }),
      prisma.account.count({ where }),
    ]);

    sendPaginated(res, accounts, pageNum, limitNum, total);
  } catch (error) {
    next(error);
  }
});

// GET /api/accounts/:id - Get account by ID
router.get('/:id', validate(idParamSchema), async (req, res, next) => {
  try {
    const { id } = req.params;
    const account = await prisma.account.findUnique({
      where: { id: parseInt(id ?? '0') },
    });

    if (!account) {
      return sendError(res, 'Account not found', 404);
    }

    sendSuccess(res, account);
  } catch (error) {
    next(error);
  }
});

// POST /api/accounts - Create new account
router.post('/', validate(createAccountSchema), async (req, res, next) => {
  try {
    const accountData = req.body;
    const account = await prisma.account.create({
      data: accountData,
    });

    sendSuccess(res, account, 201);
  } catch (error) {
    next(error);
  }
});

// PATCH /api/accounts/:id - Update account (partial update)
router.patch('/:id', validate(updateAccountSchema), async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, active, ..._otherFields } = req.body;
    const updateData = { name, active };

    const account = await prisma.account.update({
      where: { id: parseInt(id ?? '0') },
      data: updateData,
    });

    sendSuccess(res, account);
  } catch (error) {
    if (error instanceof Error && error.message.includes('Record to update not found')) {
      return sendError(res, 'Account not found', 404);
    }
    next(error);
  }
});

// DELETE /api/accounts/:id - Delete account
router.delete('/:id', validate(idParamSchema), async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const account = await prisma.account.findUnique({
      where: { id: parseInt(id ?? '0') },
    });

    if (!account) {
      return sendError(res, 'Account not found', 404);
    }

    await prisma.account.delete({ where: { id: parseInt(id ?? '0') } });

    sendSuccess(res, { message: 'Account deleted successfully' });
  } catch (error) {
    next(error);
  }
});

export { router as accountRoutes }; 