import { Request, Response, NextFunction } from 'express';
import { verifyToken, extractToken, FirebaseUser, UserRole, hasAnyRole } from '../utils/firebase';

// Extend Express Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: FirebaseUser;
    }
  }
}

// Authentication middleware - verifies Firebase ID token and adds user to request
export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = extractToken(req);
    
    if (!token) {
      res.status(401).json({
        success: false,
        error: {
          message: 'Access token required',
          code: 'MISSING_TOKEN',
        },
      });
      return;
    }

    try {
      const user = await verifyToken(token);
      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({
        success: false,
        error: {
          message: 'Invalid or expired token',
          code: 'INVALID_TOKEN',
        },
      });
      return;
    }
  } catch (error) {
    next(error);
  }
};

// Role-based authorization middleware
export const requireRole = (requiredRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: {
          message: 'Authentication required',
          code: 'AUTHENTICATION_REQUIRED',
        },
      });
      return;
    }

    if (!hasAnyRole(req.user, requiredRoles)) {
      res.status(403).json({
        success: false,
        error: {
          message: 'Insufficient permissions',
          code: 'INSUFFICIENT_PERMISSIONS',
          requiredRoles,
          userRoles: req.user.roles,
        },
      });
      return;
    }

    next();
  };
};

// Require specific role
export const requireUserRole = requireRole([UserRole.USER, UserRole.ADMIN, UserRole.SUPER_ADMIN]);
export const requireAdminRole = requireRole([UserRole.ADMIN, UserRole.SUPER_ADMIN]);
export const requireSuperAdminRole = requireRole([UserRole.SUPER_ADMIN]);

// Optional authentication - adds user if token is present, but doesn't require it
export const optionalAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = extractToken(req);
    
    if (token) {
      try {
        const user = await verifyToken(token);
        req.user = user;
      } catch (error) {
        // Token is invalid, but we don't fail the request
        console.warn('Invalid token in optional auth:', error);
      }
    }
    
    next();
  } catch (error) {
    next(error);
  }
}; 