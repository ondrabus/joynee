import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

import { errorHandler } from './middleware/errorHandler';
import { notFoundHandler } from './middleware/notFoundHandler';
import { authenticate, requireUserRole, requireAdminRole } from './middleware/auth';
import { userRoutes } from './routes/userRoutes';
import { hashtagRoutes } from './routes/hashtagRoutes';
import { bubbleRoutes } from './routes/bubbleRoutes';
import { accountRoutes } from './routes/accountRoutes';
import { userPlaceholderRoutes } from './routes/userPlaceholderRoutes';
import { userSettingsRoutes } from './routes/userSettingsRoutes';
import { userPhotoRoutes } from './routes/userPhotoRoutes';
import { userBubbleSubscriptionRoutes } from './routes/userBubbleSubscriptionRoutes';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3001',
  credentials: true,
  exposedHeaders: ['Content-Range', 'X-Total-Count', 'X-Pagination-Count'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Content-Range', 'X-Total-Count'],
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'), // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Logging
app.use(morgan('combined'));

// Compression
app.use(compression());

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Protect ALL API routes with authentication by default
app.use('/api', authenticate);

// API routes with role-based access control (roles preserved)
app.use('/api/users', requireUserRole, userRoutes);
app.use('/api/hashtags', requireUserRole, hashtagRoutes);
app.use('/api/bubbles', requireUserRole, bubbleRoutes);
app.use('/api/accounts', requireAdminRole, accountRoutes);
app.use('/api/user-placeholders', requireAdminRole, userPlaceholderRoutes);
app.use('/api/user-settings', requireUserRole, userSettingsRoutes);
app.use('/api/user_photos', requireUserRole, userPhotoRoutes);
app.use('/api/user-bubble-subscriptions', requireUserRole, userBubbleSubscriptionRoutes);

// Error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔗 API Base URL: http://localhost:${PORT}/api`);
});

export default app; 