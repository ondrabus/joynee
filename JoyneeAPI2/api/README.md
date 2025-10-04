# Joynee API

A REST API for the Joynee application built with Express.js, Prisma ORM, and TypeScript.

## Features

- Complete CRUD operations for all database models
- RESTful API design with industry standards
- PATCH support for partial updates
- Comprehensive validation with Zod
- TypeScript for type safety
- Prisma ORM for database management
- ReactAdmin compatible endpoints
- Security middleware (helmet, CORS, rate limiting)
- Comprehensive error handling
- Pagination and filtering support

## Database Models

- Users
- Hashtags
- Bubbles
- Accounts
- User Placeholders
- User Settings
- User Photos
- User Bubble Subscriptions

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up the database:
   ```bash
   npm run db:generate
   npm run db:push
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. The API will be available at `http://localhost:3000`

## Environment Variables

Create a `.env` file with:
```
DATABASE_URL="postgresql://postgres:uR2GRjXtMGdEIQniw5um@localhost:5432/joynee-dev"
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio
- `npm run test` - Run tests
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues

## API Endpoints

- `GET /health` - Health check
- `GET /api/users` - List users with pagination
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PATCH /api/users/:id` - Update user (partial)
- `DELETE /api/users/:id` - Delete user

Similar endpoints exist for all other models.

## Technology Stack

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- Zod validation
- ESLint
- Jest 