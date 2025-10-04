# 🔐 AWS Cognito Security Setup Guide

This guide explains how to set up AWS Cognito authentication with Google OAuth and role-based access control for the Joynee API.

## 📋 Prerequisites

1. **AWS Account** with appropriate permissions
2. **Google OAuth** credentials (for Google Sign-In)
3. **Node.js** and **npm** installed

## 🚀 Step 1: AWS Cognito User Pool Setup

### 1.1 Create User Pool

1. Go to AWS Console → Cognito → User Pools
2. Click "Create user pool"
3. Configure the following settings:

#### General Settings
- **Pool name**: `joynee-user-pool`
- **How do you want to end users to be able to sign in?**: 
  - ✅ Email
  - ✅ Google (we'll configure this later)

#### Password Policy
- **Password policy**: Choose your preferred policy
- **Multi-factor authentication**: Optional (recommended for production)

#### App Integration
- **App client name**: `joynee-app-client`
- **App client secret**: Generate client secret
- **Callback URLs**: 
  - `http://localhost:3001/callback` (for development)
  - `https://yourdomain.com/callback` (for production)
- **Sign out URLs**: 
  - `http://localhost:3001` (for development)
  - `https://yourdomain.com` (for production)

### 1.2 Configure Google OAuth

1. In your User Pool, go to **Sign-in experience** → **Federated identity provider sign-in**
2. Click **Add identity provider** → **Google**
3. Configure with your Google OAuth credentials:
   - **Client ID**: Your Google OAuth Client ID
   - **Client secret**: Your Google OAuth Client Secret
4. **Attribute mapping**:
   - Map `email` to `email`
   - Map `name` to `name`
   - Map `picture` to `picture`

### 1.3 Create User Groups

Create the following groups in your User Pool:

1. **USER** - Standard user role
2. **ADMIN** - Administrator role  
3. **SUPER_ADMIN** - Super administrator role

Go to **Groups** → **Create group** for each role.

## 🔧 Step 2: Environment Configuration

Update your `.env` file with the following values:

```env
# AWS Cognito Configuration
AWS_COGNITO_REGION=us-east-1
AWS_COGNITO_USER_POOL_ID=us-east-1_xxxxxxxxx
AWS_COGNITO_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxx
AWS_ACCESS_KEY_ID=AKIAXXXXXXXXXXXXXXXX
AWS_SECRET_ACCESS_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### How to find these values:

1. **User Pool ID**: Found in User Pool → General settings
2. **Client ID**: Found in User Pool → App integration → App client
3. **Access Keys**: Create in IAM → Users → Your user → Security credentials

## 🛡️ Step 3: Role-Based Access Control

The API implements the following role hierarchy:

### User Roles
- **USER**: Basic access to user-specific resources
- **ADMIN**: Administrative access to most resources
- **SUPER_ADMIN**: Full access to all resources including user management

### Protected Routes

#### User Routes (USER, ADMIN, SUPER_ADMIN)
- `GET /api/users` - List users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create user
- `PATCH /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

#### Hashtag Routes (USER, ADMIN, SUPER_ADMIN)
- `GET /api/hashtags` - List hashtags
- `GET /api/hashtags/:id` - Get hashtag by ID
- `POST /api/hashtags` - Create hashtag
- `PATCH /api/hashtags/:id` - Update hashtag
- `DELETE /api/hashtags/:id` - Delete hashtag

#### Bubble Routes (USER, ADMIN, SUPER_ADMIN)
- `GET /api/bubbles` - List bubbles
- `GET /api/bubbles/:id` - Get bubble by ID
- `POST /api/bubbles` - Create bubble
- `PATCH /api/bubbles/:id` - Update bubble
- `DELETE /api/bubbles/:id` - Delete bubble

#### Admin Routes (ADMIN, SUPER_ADMIN)
- `GET /api/accounts` - List accounts
- `GET /api/accounts/:id` - Get account by ID
- `POST /api/accounts` - Create account
- `PATCH /api/accounts/:id` - Update account
- `DELETE /api/accounts/:id` - Delete account

- `GET /api/user-placeholders` - List user placeholders
- `GET /api/user-placeholders/:id` - Get user placeholder by ID
- `POST /api/user-placeholders` - Create user placeholder
- `PATCH /api/user-placeholders/:id` - Update user placeholder
- `DELETE /api/user-placeholders/:id` - Delete user placeholder

#### Authentication Routes
- `GET /api/auth/me` - Get current user info (authenticated)
- `POST /api/auth/users` - Create new user (ADMIN+)
- `GET /api/auth/users` - List users (ADMIN+)
- `GET /api/auth/users/:email` - Get user by email (ADMIN+)
- `PATCH /api/auth/users/:email/roles` - Update user roles (ADMIN+)
- `DELETE /api/auth/users/:email` - Delete user (SUPER_ADMIN)
- `POST /api/auth/setup` - Setup Cognito groups (SUPER_ADMIN)

## 🔑 Step 4: Authentication Flow

### 1. User Authentication
Users authenticate through Google OAuth, which redirects to Cognito and returns a JWT token.

### 2. API Requests
All API requests must include the JWT token in the Authorization header:
```
Authorization: Bearer <jwt-token>
```

### 3. Token Verification
The API verifies the JWT token using AWS Cognito's public keys and extracts user roles.

### 4. Role-Based Authorization
The API checks if the user has the required role(s) for the requested endpoint.

## 🧪 Step 5: Testing the Setup

### 1. Setup Cognito Groups
```bash
curl -X POST http://localhost:3000/api/auth/setup \
  -H "Authorization: Bearer <super-admin-token>"
```

### 2. Create a Test User
```bash
curl -X POST http://localhost:3000/api/auth/users \
  -H "Authorization: Bearer <admin-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "name": "Test User",
    "roles": ["user"]
  }'
```

### 3. Test Protected Endpoint
```bash
curl -X GET http://localhost:3000/api/users \
  -H "Authorization: Bearer <user-token>"
```

## 🔒 Security Best Practices

1. **Environment Variables**: Never commit AWS credentials to version control
2. **Token Expiration**: JWT tokens have expiration times - handle refresh tokens
3. **HTTPS**: Always use HTTPS in production
4. **Rate Limiting**: The API includes rate limiting to prevent abuse
5. **Input Validation**: All inputs are validated using Zod schemas
6. **Error Handling**: Sensitive information is not exposed in error messages

## 🚨 Troubleshooting

### Common Issues

1. **Invalid Token**: Check if the token is expired or malformed
2. **Insufficient Permissions**: Verify the user has the required role
3. **CORS Issues**: Ensure CORS is properly configured for your frontend domain
4. **AWS Credentials**: Verify AWS credentials are correct and have proper permissions

### Debug Mode
Enable debug logging by setting:
```env
DEBUG=true
```

## 📚 Additional Resources

- [AWS Cognito Documentation](https://docs.aws.amazon.com/cognito/)
- [Google OAuth Setup](https://developers.google.com/identity/protocols/oauth2)
- [JWT Token Verification](https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-verifying-a-jwt.html) 