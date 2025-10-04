import { AuthProvider } from 'react-admin';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  getIdTokenResult
} from 'firebase/auth';
import { auth } from './config/firebase';

// Custom Firebase auth provider for ReactAdmin
const customAuthProvider: AuthProvider = {
  // Login function
  async login(params: any) {
    try {
      // ReactAdmin uses 'username' field, but we need email for Firebase
      const email = params.username || params.email;
      const password = params.password;
      
      console.log('🔐 Attempting login with Firebase...');
      console.log('📧 Email:', email);
      console.log('🔑 Password provided:', !!password);
      
      if (!email) {
        throw new Error('Email is required');
      }
      
      if (!password) {
        throw new Error('Password is required');
      }
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Get ID token to check custom claims
      const idTokenResult = await user.getIdTokenResult();
      
      console.log('🔍 Token claims:', idTokenResult.claims);
      
      // Check if user has admin/superadmin role
      const roles = this.extractRolesFromClaims(idTokenResult.claims);
      
      if (!roles || (!roles.includes('admin') && !roles.includes('superadmin'))) {
        // Logout the user if they don't have admin privileges
        await signOut(auth);
        throw new Error('Access denied. Only users with Admin or Superadmin roles can access this portal.');
      }
      
      console.log('✅ Login successful with roles:', roles);
      return Promise.resolve();
    } catch (error: any) {
      console.error('❌ Login failed:', error);
      
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        throw new Error('Invalid email or password');
      } else if (error.message.includes('Access denied')) {
        throw error;
      } else if (error.message.includes('Email is required') || error.message.includes('Password is required')) {
        throw error;
      } else {
        throw new Error('Login failed. Please try again.');
      }
    }
  },

  // Logout function
  async logout() {
    try {
      await signOut(auth);
      console.log('✅ Logout successful');
      return Promise.resolve();
    } catch (error) {
      console.error('❌ Logout failed:', error);
      return Promise.reject(error);
    }
  },

  // Check authentication status
  async checkAuth() {
    return new Promise<void>((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        unsubscribe();
        
        if (!user) {
          console.log('❌ No authenticated user found');
          reject(new Error('Authentication required'));
          return;
        }

        try {
          // Get ID token to check custom claims
          const idTokenResult = await user.getIdTokenResult();
          const roles = this.extractRolesFromClaims(idTokenResult.claims);
          
          if (!roles || (!roles.includes('admin') && !roles.includes('superadmin'))) {
            console.log('❌ User does not have admin privileges');
            reject(new Error('Access denied. Admin or Superadmin role required.'));
            return;
          }
          
          console.log('✅ Authentication check passed with roles:', roles);
          resolve();
        } catch (error) {
          console.error('❌ Authentication check failed:', error);
          reject(error);
        }
      });
    });
  },

  // Get user permissions
  async getPermissions() {
    return new Promise<string[]>((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        unsubscribe();
        
        if (!user) {
          resolve([]);
          return;
        }

        try {
          const idTokenResult = await user.getIdTokenResult();
          const roles = this.extractRolesFromClaims(idTokenResult.claims);
          console.log('🔍 User permissions:', roles);
          resolve(roles || []);
        } catch (error) {
          console.error('❌ Error getting permissions:', error);
          resolve([]);
        }
      });
    });
  },

  // Get current user identity
  async getIdentity() {
    return new Promise<any>((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        unsubscribe();
        
        if (!user) {
          reject(new Error('No authenticated user'));
          return;
        }

        try {
          const idTokenResult = await user.getIdTokenResult();
          const roles = this.extractRolesFromClaims(idTokenResult.claims);
          
          resolve({
            id: user.uid,
            fullName: user.displayName || user.email || 'Unknown User',
            avatar: user.photoURL,
            roles: roles || []
          });
        } catch (error) {
          console.error('❌ Error getting identity:', error);
          reject(error);
        }
      });
    });
  },

  // Helper function to extract roles from Firebase custom claims
  extractRolesFromClaims(claims: any): string[] {
    const roles: string[] = [];
    
    if (claims.roles) {
      // If roles is an array
      if (Array.isArray(claims.roles)) {
        roles.push(...claims.roles);
      }
      // If roles is a string, split by comma
      else if (typeof claims.roles === 'string') {
        roles.push(...claims.roles.split(',').map((role: string) => role.trim()));
      }
      // If roles is a single value
      else {
        roles.push(claims.roles as string);
      }
    }
    
    // Also check for individual role claims
    if (claims.admin) {
      roles.push('admin');
    }
    if (claims.superadmin) {
      roles.push('superadmin');
    }
    
    return roles;
  }
};

export { customAuthProvider }; 