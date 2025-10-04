import { Response } from 'express';

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    details?: unknown;
  };
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  timestamp: string;
}

export const sendSuccess = <T>(
  res: Response,
  data: T,
  statusCode: number = 200
) => {
  const response: ApiResponse<T> = {
    success: true,
    data,
    timestamp: new Date().toISOString(),
  };
  res.status(statusCode).json(response);
};

export const sendError = (
  res: Response,
  message: string,
  statusCode: number = 500,
  details?: unknown
) => {
  const response: ApiResponse = {
    success: false,
    error: {
      message,
      ...(details ? { details } : {}),
    },
    timestamp: new Date().toISOString(),
  };
  res.status(statusCode).json(response);
};

export const sendPaginated = <T>(
  res: Response,
  data: T[],
  page: number,
  limit: number,
  total: number
) => {
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const end = Math.min(start + limit - 1, total - 1);
  
  // Set Content-Range header for ReactAdmin compatibility
  // Format: "start-end/total" (e.g., "0-9/100")
  res.set('Content-Range', `${start}-${end}/${total}`);
  
  // Also set X-Total-Count header as fallback
  res.set('X-Total-Count', total.toString());
  
  const response: ApiResponse<T[]> = {
    success: true,
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
    timestamp: new Date().toISOString(),
  };
  res.status(200).json(response);
}; 