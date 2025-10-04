# Joynee Admin Portal

A ReactAdmin-based admin portal for the Joynee application with official AWS Cognito authentication integration.

## Features

- 🔐 Official ReactAdmin Cognito authentication (`ra-auth-cognito`)
- 👥 Role-based access control (Admin/SuperAdmin only)
- 📊 Full CRUD operations for all resources
- 🎨 Modern Material-UI interface
- 🔄 Real-time data synchronization
- 🛠️ Browser polyfills for Node.js compatibility

## Prerequisites

- Node.js 18+ 
- AWS Cognito User Pool configured
- Joynee API running on `http://localhost:3000`

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open the admin portal at `http://localhost:3001`

## Authentication

### AWS Cognito Configuration

The admin portal uses the official `ra-auth-cognito` package for authentication. The configuration is set directly in the App component:

```typescript
authProvider={customAuthProvider}
```

The custom auth provider extends the base CognitoAuthProvider with role-based access control:

```typescript
// Custom auth provider configuration
const customAuthProvider: AuthProvider = {
  ...baseCognitoAuthProvider,
  
  // Role-based access control
  async checkAuth(params) {
    // Validates user has admin/superadmin role
  },
  
  async getPermissions(params) {
    // Extracts roles from Cognito groups
  },
  
  async login(params) {
    // Validates roles after login
  }
};
```

### Creating Test Users

To create a test admin user for development:

```bash
node scripts/create-test-user.js
```

This will create a user with admin privileges that you can use to login to the portal.

### Role-Based Access Control

The admin portal implements strict role-based access control:

- **Required Roles**: Only users with `admin` or `superadmin` roles can access the portal
- **Role Sources**: Roles are extracted from Cognito groups (`cognito:groups`) and custom attributes (`custom:roles`)
- **Access Validation**: Roles are validated on login and during each session check
- **Automatic Logout**: Users without proper roles are automatically logged out

### Login Process

1. Navigate to `http://localhost:3001`
2. Enter your Cognito username/email and password
3. The system validates your role (admin/superadmin required)
4. If access is granted, you'll be redirected to the admin dashboard
5. If access is denied, you'll see an error message and be logged out

## API Integration

The admin portal communicates with the Joynee API using:

- **Base URL**: `http://localhost:3000/api`
- **Authentication**: Bearer token from Cognito
- **Data Format**: ReactAdmin-compatible with pagination support

### Token Management

- Access tokens are automatically managed by Cognito
- Tokens are automatically injected into all API requests via the data provider
- Automatic token refresh when needed
- Secure logout clears all tokens and sessions

## Available Resources

The admin portal provides management interfaces for:

- **Users** - User profiles and management
- **Hashtags** - Hashtag management
- **Bubbles** - Bubble/community management
- **Accounts** - Account management
- **User Placeholders** - Placeholder user management
- **User Settings** - User settings management
- **User Photos** - User photo management
- **User Bubble Subscriptions** - Subscription management

## Development

### Project Structure

```
src/
├── resources/           # ReactAdmin resources
├── dataProvider.ts      # API data provider
└── App.tsx             # Main app with Cognito auth provider
```

### Browser Polyfills

The application includes polyfills for Node.js globals required by the Cognito library:

- **Global polyfill**: Maps `global` to `globalThis` for browser compatibility
- **Process polyfill**: Provides `process.env` for Node.js compatibility

These are automatically configured in `vite.config.ts` using Vite's built-in polyfill system.



## Security

- Only authenticated users with admin/superadmin roles can access the portal
- All API requests include authentication tokens
- Automatic session management and token refresh
- Secure logout functionality

## Troubleshooting

### Common Issues

1. **Authentication Failed**
   - Ensure the user exists in Cognito
   - Verify the user has admin/superadmin role
   - Check Cognito configuration

2. **API Connection Issues**
   - Ensure the Joynee API is running on port 3000
   - Check the API URL configuration
   - Verify CORS settings

3. **Token Issues**
   - Clear browser localStorage
   - Logout and login again
   - Check token expiration

## Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory. 