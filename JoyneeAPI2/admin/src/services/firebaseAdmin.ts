import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin if not already initialized
if (!getApps().length) {
  try {
    // Try to load service account from the admin folder
    const serviceAccount = require('../../serviceAccountKey.json');
    
    initializeApp({
      credential: cert(serviceAccount),
      databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
    });
  } catch (error) {
    console.error('Failed to initialize Firebase Admin:', error);
    throw new Error('Firebase Admin initialization failed');
  }
}

const auth = getAuth();
const db = getFirestore();

export interface FirebaseUser {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  emailVerified: boolean;
  disabled: boolean;
  customClaims?: {
    roles?: string[];
    admin?: boolean;
    superadmin?: boolean;
  };
  metadata: {
    creationTime: string;
    lastSignInTime?: string;
  };
}

export interface CreateUserData {
  email: string;
  password: string;
  displayName?: string;
  photoURL?: string;
  roles?: string[];
}

export interface UpdateUserData {
  displayName?: string;
  photoURL?: string;
  disabled?: boolean;
  roles?: string[];
}

export const firebaseAdminService = {
  // Get all users from Firebase
  async getUsers(): Promise<FirebaseUser[]> {
    try {
      const listUsersResult = await auth.listUsers();
      return listUsersResult.users.map(user => ({
        uid: user.uid,
        email: user.email || '',
        displayName: user.displayName || undefined,
        photoURL: user.photoURL || undefined,
        emailVerified: user.emailVerified || false,
        disabled: user.disabled || false,
        customClaims: user.customClaims as any,
        metadata: {
          creationTime: user.metadata.creationTime,
          lastSignInTime: user.metadata.lastSignInTime
        }
      }));
    } catch (error) {
      console.error('Error fetching Firebase users:', error);
      throw error;
    }
  },

  // Get a single user by UID
  async getUser(uid: string): Promise<FirebaseUser> {
    try {
      const userRecord = await auth.getUser(uid);
      return {
        uid: userRecord.uid,
        email: userRecord.email || '',
        displayName: userRecord.displayName || undefined,
        photoURL: userRecord.photoURL || undefined,
        emailVerified: userRecord.emailVerified || false,
        disabled: userRecord.disabled || false,
        customClaims: userRecord.customClaims as any,
        metadata: {
          creationTime: userRecord.metadata.creationTime,
          lastSignInTime: userRecord.metadata.lastSignInTime
        }
      };
    } catch (error) {
      console.error('Error fetching Firebase user:', error);
      throw error;
    }
  },

  // Create a new user in Firebase
  async createUser(userData: CreateUserData): Promise<FirebaseUser> {
    try {
      const userRecord = await auth.createUser({
        email: userData.email,
        password: userData.password,
        displayName: userData.displayName,
        photoURL: userData.photoURL,
        emailVerified: true // Auto-verify for admin-created users
      });

      // Set custom claims if roles are provided
      if (userData.roles && userData.roles.length > 0) {
        const customClaims: any = {};
        
        if (userData.roles.includes('admin')) {
          customClaims.admin = true;
        }
        if (userData.roles.includes('superadmin')) {
          customClaims.superadmin = true;
        }
        
        customClaims.roles = userData.roles;
        
        await auth.setCustomUserClaims(userRecord.uid, customClaims);
      }

      return this.getUser(userRecord.uid);
    } catch (error) {
      console.error('Error creating Firebase user:', error);
      throw error;
    }
  },

  // Update a user in Firebase
  async updateUser(uid: string, userData: UpdateUserData): Promise<FirebaseUser> {
    try {
      const updateData: any = {};
      
      if (userData.displayName !== undefined) {
        updateData.displayName = userData.displayName;
      }
      if (userData.photoURL !== undefined) {
        updateData.photoURL = userData.photoURL;
      }
      if (userData.disabled !== undefined) {
        updateData.disabled = userData.disabled;
      }

      await auth.updateUser(uid, updateData);

      // Update custom claims if roles are provided
      if (userData.roles !== undefined) {
        const customClaims: any = {};
        
        if (userData.roles.includes('admin')) {
          customClaims.admin = true;
        }
        if (userData.roles.includes('superadmin')) {
          customClaims.superadmin = true;
        }
        
        customClaims.roles = userData.roles;
        
        await auth.setCustomUserClaims(uid, customClaims);
      }

      return this.getUser(uid);
    } catch (error) {
      console.error('Error updating Firebase user:', error);
      throw error;
    }
  },

  // Delete a user from Firebase
  async deleteUser(uid: string): Promise<void> {
    try {
      await auth.deleteUser(uid);
    } catch (error) {
      console.error('Error deleting Firebase user:', error);
      throw error;
    }
  },

  // Set custom claims for a user
  async setCustomClaims(uid: string, claims: any): Promise<void> {
    try {
      await auth.setCustomUserClaims(uid, claims);
    } catch (error) {
      console.error('Error setting custom claims:', error);
      throw error;
    }
  }
}; 