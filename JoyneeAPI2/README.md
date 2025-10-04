# Joynee Admin Portal

A ReactAdmin-based admin portal for the Joynee platform with Firebase Authentication and role-based access control.

## 🚀 Features

- **ReactAdmin Interface**: Modern, responsive admin dashboard
- **Firebase Authentication**: Secure email/password authentication
- **Role-Based Access Control**: Admin and Superadmin roles only
- **Real-time Data Management**: Full CRUD operations for all resources
- **Custom Claims**: Firebase custom claims for role management
- **Secure API Integration**: Firebase ID tokens for API authentication

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Firebase project with Authentication enabled
- Joynee API running on `http://localhost:3000`

## 🔧 Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure Firebase**:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Email/Password authentication
   - Get your Firebase config (already configured in `src/config/firebase.ts`)

3. **Set up admin users**:
   ```bash
   # Install Firebase Admin SDK
   npm install firebase-admin
   
   # Download service account key from Firebase Console
   # Project Settings > Service Accounts > Generate new private key
   # Save as serviceAccountKey.json in the admin folder
   
   # Run the setup script
   node scripts/setup-firebase-admin.js
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

The admin portal will be available at `http://localhost:3001`

## 🔐 Authentication & Authorization

### Firebase Configuration
The app uses Firebase Authentication with the following configuration:
- **Project ID**: `joynee-5ceb6`
- **Authentication Method**: Email/Password
- **Domain**: `joynee-5ceb6.firebaseapp.com`

### Role-Based Access Control
- **Required Roles**: `admin` or `superadmin`
- **Role Source**: Firebase Custom Claims
- **Access Control**: Automatic logout for non-admin users

### Custom Claims Structure
```javascript
{
  "roles": ["admin"], // Array of roles
  "admin": true,      // Individual role flags
  "superadmin": false
}
```

## 🛠️ Development

### Project Structure
```
admin/
├── src/
│   ├── config/
│   │   └── firebase.ts          # Firebase configuration
│   ├── authProvider.ts          # Custom auth provider with role validation
│   ├── dataProvider.ts          # API integration with Firebase tokens
│   ├── App.tsx                  # Main ReactAdmin app
│   └── resources/               # ReactAdmin resources
├── scripts/
│   └── setup-firebase-admin.js  # Admin user setup script
└── package.json
```

### Key Components

#### Firebase Configuration (`src/config/firebase.ts`)
- Initializes Firebase app and authentication
- Exports auth instance for use throughout the app

#### Custom Auth Provider (`src/authProvider.ts`)
- Extends `ra-auth-firebase` with role validation
- Checks Firebase custom claims for admin/superadmin roles
- Automatically logs out users without proper permissions

#### Data Provider (`src/dataProvider.ts`)
- Integrates with Joynee API using Firebase ID tokens
- Handles authentication headers automatically
- Provides logging for debugging

### Environment Variables
Create a `.env` file in the admin folder:
```env
VITE_API_URL=http://localhost:3000/api
```

## 🔧 Scripts

### Development
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Firebase Admin Setup
- `node scripts/setup-firebase-admin.js` - Create initial admin users

## 🔒 Security

### Firebase Custom Claims
- **Server-side verification**: Claims are verified by Firebase, cannot be tampered with
- **Fast access**: No database queries needed for role checks
- **Scalable**: Works well with Firebase Auth

### Token Management
- **ID Tokens**: Used for API authentication
- **Automatic refresh**: Firebase handles token refresh
- **Secure transmission**: HTTPS only

### Access Control
- **Role validation**: Every request checks user roles
- **Automatic logout**: Non-admin users are logged out immediately
- **Error handling**: Graceful handling of authentication failures

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Environment Configuration
- Update `VITE_API_URL` to your production API URL
- Ensure Firebase project is configured for production domain

### Firebase Configuration
- Add your production domain to authorized domains in Firebase Console
- Update Firebase security rules if needed

## 🐛 Troubleshooting

### Common Issues

1. **"Access denied" error**:
   - User doesn't have admin/superadmin role
   - Check Firebase custom claims
   - Run `node scripts/setup-firebase-admin.js` to create admin users

2. **Firebase configuration errors**:
   - Verify Firebase config in `src/config/firebase.ts`
   - Check Firebase Console for project settings

3. **API authentication failures**:
   - Check browser console for token errors
   - Verify API is running on correct URL
   - Check Firebase ID token format

### Debug Mode
Enable debug logging by checking browser console for:
- 🔍 HTTP Request Headers
- 🔍 User roles from Firebase claims
- Authentication check logs

## 📝 API Integration

The admin portal integrates with the Joynee API using Firebase ID tokens:

### Authentication Flow
1. User logs in with Firebase
2. Firebase ID token is automatically included in API requests
3. API validates Firebase ID token
4. API checks custom claims for role verification

### Supported Resources
- Users
- Hashtags
- Bubbles
- Accounts
- User Settings
- User Photos
- User Placeholders
- User Bubble Subscriptions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test authentication and role validation
5. Submit a pull request

## 📄 License

This project is proprietary software. 