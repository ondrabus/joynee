import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth, DecodedIdToken } from 'firebase-admin/auth';
import { Request } from 'express';

// User roles enum
export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  SUPER_ADMIN = 'superadmin',
}

// Extended user interface with Firebase data
export interface FirebaseUser {
  uid: string; // Firebase user ID
  email: string;
  email_verified: boolean;
  name?: string;
  picture?: string;
  roles: UserRole[];
  exp: number;
  iat: number;
}

// Initialize Firebase Admin SDK
let firebaseApp: any = null;

function initializeFirebase() {
  if (firebaseApp) {
    return firebaseApp;
  }

  // Check if Firebase is already initialized
  if (getApps().length > 0) {
    firebaseApp = getApps()[0];
    return firebaseApp;
  }

  try {
    // Try to load service account from environment variable or file
    let serviceAccount;
    
    // First, try to get from environment variable
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
      serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    } else {
      // Try to load from file
      try {
        const fs = require('fs');
        const path = require('path');
        const serviceAccountPath = path.join(__dirname, '../../serviceAccountKey.json');
        serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
      } catch (error) {
        console.error('❌ Firebase service account not found');
        console.log('📋 Please provide Firebase service account in one of these ways:');
        console.log('   1. Set FIREBASE_SERVICE_ACCOUNT environment variable');
        console.log('   2. Place serviceAccountKey.json in the api folder');
        throw new Error('Firebase service account not configured');
      }
    }

    firebaseApp = initializeApp({
      credential: cert(serviceAccount)
    });

    console.log('✅ Firebase Admin SDK initialized successfully');
    return firebaseApp;
  } catch (error) {
    console.error('❌ Failed to initialize Firebase Admin SDK:', error);
    throw error;
  }
}

// Verify and decode Firebase ID token
export async function verifyToken(token: string): Promise<FirebaseUser> {
  try {
    const app = initializeFirebase();
    const auth = getAuth(app);

    console.log('🔍 Verifying Firebase ID token...');
    
    const decodedToken: DecodedIdToken = await auth.verifyIdToken(token);
    
    console.log('✅ Token verified successfully');
    console.log('🔍 Token claims:', decodedToken);

    // Extract roles from custom claims
    const roles: UserRole[] = [];
    
    if (decodedToken.roles) {
      // If roles is an array
      if (Array.isArray(decodedToken.roles)) {
        decodedToken.roles.forEach((role: string) => {
          switch (role.toLowerCase()) {
            case 'admin':
              roles.push(UserRole.ADMIN);
              break;
            case 'superadmin':
              roles.push(UserRole.SUPER_ADMIN);
              break;
            default:
              roles.push(UserRole.USER);
          }
        });
      }
      // If roles is a string, split by comma
      else if (typeof decodedToken.roles === 'string') {
        decodedToken.roles.split(',').forEach((role: string) => {
          switch (role.trim().toLowerCase()) {
            case 'admin':
              roles.push(UserRole.ADMIN);
              break;
            case 'superadmin':
              roles.push(UserRole.SUPER_ADMIN);
              break;
            default:
              roles.push(UserRole.USER);
          }
        });
      }
    }
    
    // Also check for individual role claims
    if (decodedToken.admin) {
      roles.push(UserRole.ADMIN);
    }
    if (decodedToken.superadmin) {
      roles.push(UserRole.SUPER_ADMIN);
    }
    
    // Default to USER role if no roles found
    if (roles.length === 0) {
      roles.push(UserRole.USER);
    }

    const firebaseUser: FirebaseUser = {
      uid: decodedToken.uid,
      email: decodedToken.email || '',
      email_verified: decodedToken.email_verified || false,
      name: decodedToken.name,
      picture: decodedToken.picture,
      roles,
      exp: decodedToken.exp,
      iat: decodedToken.iat,
    };

    console.log('🔍 Extracted user roles:', roles);
    return firebaseUser;
  } catch (error) {
    console.error('❌ Token verification error:', error);
    throw error;
  }
}

// Extract token from request headers
export function extractToken(req: Request): string | null {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.substring(7);
}

// Check if user has required role
export function hasRole(user: FirebaseUser, requiredRole: UserRole): boolean {
  return user.roles.includes(requiredRole);
}

// Check if user has any of the required roles
export function hasAnyRole(user: FirebaseUser, requiredRoles: UserRole[]): boolean {
  return requiredRoles.some(role => user.roles.includes(role));
}

// Check if user has all required roles
export function hasAllRoles(user: FirebaseUser, requiredRoles: UserRole[]): boolean {
  return requiredRoles.every(role => user.roles.includes(role));
} 