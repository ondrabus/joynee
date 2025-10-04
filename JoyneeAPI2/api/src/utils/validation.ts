import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

// Common validation schemas
export const paginationSchema = z.object({
  page: z.string().optional().transform(val => parseInt(val || '1')),
  limit: z.string().optional().transform(val => parseInt(val || '10')),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('asc'),
});

export const idParamSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'ID is required'),
  }),
  body: z.object({}).optional(),
  query: z.object({}).optional(),
});

// Validation middleware
export const validate = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      // Always validate the full request structure
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          error: {
            message: 'Validation failed',
            details: error.errors,
          },
        });
        return;
      }
      next(error);
    }
  };
};

// User validation schemas
export const createUserSchema = z.object({
  body: z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Email must be valid'),
  }),
});

export const createUserProfileSchema = z.object({
  body: z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
  }),
});

export const updateUserSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'ID is required'),
  }).optional(),
  body: z.object({
    authId: z.string().optional(),
    active: z.boolean().optional(),
    firstName: z.string().min(2).optional(),
    lastName: z.string().min(2).optional(),
    birthDate: z.string().datetime().nullable().optional(),
    avatar: z.string().nullable().optional(),
    email: z.string().email().optional(),
    personality: z.string().min(2).optional(),
    bio: z.string().nullable().optional(),
  }).strict().refine((data) => {
    // Ensure at least one field is provided or image exists
    return Object.keys(data).length > 0;
  }, {
    message: 'At least one field must be provided for update',
  }),
});

export const getUserSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'ID is required'),
  }),
});

export const deleteUserSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'ID is required'),
  }),
});

export const listUsersSchema = z.object({
  query: z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
    search: z.string().optional(),
  }),
});

// Hashtag validation schemas
export const createHashtagSchema = z.object({
  body: z.object({
    text: z.string().min(1, 'Hashtag text is required'),
  }),
});

export const updateHashtagSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'ID is required'),
  }),
  body: z.object({
    text: z.string().min(1).optional(),
  }).strict().refine((data) => {
    // Ensure at least one field is provided
    return Object.keys(data).length > 0;
  }, {
    message: 'At least one field must be provided for update',
  }),
});

// Bubble validation schemas
export const createBubbleSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Bubble name is required'),
    lang: z.enum(['en', 'cs'], { required_error: 'Language is required' }),
    type: z.string().min(1, 'Bubble type is required'),
    active: z.boolean().default(true),
  }),
});

export const updateBubbleSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'ID is required'),
  }),
  body: z.object({
    name: z.string().min(1).optional(),
    lang: z.enum(['en', 'cs']).optional(),
    type: z.string().min(1).optional(),
    active: z.boolean().optional(),
  }).strict().refine((data) => {
    // Ensure at least one field is provided
    return Object.keys(data).length > 0;
  }, {
    message: 'At least one field must be provided for update',
  }),
});

// Account validation schemas
export const createAccountSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Account name is required'),
    active: z.boolean().default(true),
  }),
});

export const updateAccountSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'ID is required'),
  }),
  body: z.object({
    name: z.string().min(1).optional(),
    active: z.boolean().optional(),
  }).strict().refine((data) => {
    // Ensure at least one field is provided
    return Object.keys(data).length > 0;
  }, {
    message: 'At least one field must be provided for update',
  }),
});

// UserPlaceholder validation schemas
export const createUserPlaceholderSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    emailPattern: z.string().min(1, 'Email pattern is required'),
    hashtagSuggestions: z.string().optional(),
  }),
});

export const updateUserPlaceholderSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'ID is required'),
  }),
  body: z.object({
    name: z.string().min(1).optional(),
    emailPattern: z.string().min(1).optional(),
    hashtagSuggestions: z.string().optional(),
  }).strict().refine((data) => {
    // Ensure at least one field is provided
    return Object.keys(data).length > 0;
  }, {
    message: 'At least one field must be provided for update',
  }),
});

// UserSettings validation schemas
export const createUserSettingsSchema = z.object({
  body: z.object({
    key: z.string().min(1, 'Key is required'),
    value: z.string().min(1, 'Value is required'),
    userId: z.number().int().positive('User ID must be a positive integer'),
  }),
});

export const updateUserSettingsSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'ID is required'),
  }),
  body: z.object({
    key: z.string().min(1).optional(),
    value: z.string().min(1).optional(),
  }).strict().refine((data) => {
    // Ensure at least one field is provided
    return Object.keys(data).length > 0;
  }, {
    message: 'At least one field must be provided for update',
  }),
});

// UserPhoto validation schemas
export const createUserPhotoSchema = z.object({
  body: z.object({
    url: z.string().url('URL must be valid'),
    caption: z.string().min(1, 'Caption is required'),
    userId: z.number().int().positive('User ID must be a positive integer'),
  }),
});

export const updateUserPhotoSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'ID is required'),
  }),
  body: z.object({
    url: z.string().url().optional(),
    caption: z.string().min(1).optional(),
  }).strict().refine((data) => {
    // Ensure at least one field is provided
    return Object.keys(data).length > 0;
  }, {
    message: 'At least one field must be provided for update',
  }),
});

// UserBubbleSubscription validation schemas
export const createUserBubbleSubscriptionSchema = z.object({
  body: z.object({
    bubbleId: z.number().int().positive('Bubble ID must be a positive integer'),
    userId: z.number().int().positive('User ID must be a positive integer'),
    active: z.boolean().default(true),
    acceptMatches: z.boolean().default(true),
    weight: z.number().min(0).max(1).default(1),
  }),
});

export const updateUserBubbleSubscriptionSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'ID is required'),
  }),
  body: z.object({
    active: z.boolean().optional(),
    acceptMatches: z.boolean().optional(),
    weight: z.number().min(0).max(1).optional(),
  }).strict().refine((data) => {
    // Ensure at least one field is provided
    return Object.keys(data).length > 0;
  }, {
    message: 'At least one field must be provided for update',
  }),
}); 