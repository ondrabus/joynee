import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

// Initialize Firebase Admin SDK
// You'll need to download your service account key from Firebase Console
// Project Settings > Service Accounts > Generate new private key
const serviceAccount = require('../serviceAccountKey.json'); // You'll need to add this file

const adminApp = initializeApp({
  credential: cert(serviceAccount)
});

const auth = getAuth(adminApp);

async function setUserRole(email, role) {
  try {
    // Get user by email
    const userRecord = await auth.getUserByEmail(email);
    
    // Set custom claims
    await auth.setCustomUserClaims(userRecord.uid, {
      roles: [role],
      [role]: true
    });
    
    console.log(`✅ Successfully set role '${role}' for user: ${email}`);
    return true;
  } catch (error) {
    console.error(`❌ Error setting role for ${email}:`, error.message);
    return false;
  }
}

async function createAdminUser(email, password, role = 'admin') {
  try {
    // Create user
    const userRecord = await auth.createUser({
      email,
      password,
      emailVerified: true
    });
    
    // Set custom claims
    await auth.setCustomUserClaims(userRecord.uid, {
      roles: [role],
      [role]: true
    });
    
    console.log(`✅ Successfully created ${role} user: ${email}`);
    console.log(`   UID: ${userRecord.uid}`);
    return userRecord.uid;
  } catch (error) {
    console.error(`❌ Error creating user ${email}:`, error.message);
    return null;
  }
}

async function listUsersWithRoles() {
  try {
    const listUsersResult = await auth.listUsers();
    
    console.log('📋 Users with roles:');
    for (const userRecord of listUsersResult.users) {
      const customClaims = userRecord.customClaims || {};
      const roles = customClaims.roles || [];
      
      console.log(`   ${userRecord.email}: ${roles.join(', ') || 'No roles'}`);
    }
  } catch (error) {
    console.error('❌ Error listing users:', error.message);
  }
}

// Example usage functions
async function setupInitialAdmins() {
  console.log('🚀 Setting up initial admin users...\n');
  
  // Create a superadmin user
  await createAdminUser('superadmin@joynee.com', 'SuperAdmin123!', 'superadmin');
  
  // Create an admin user
  await createAdminUser('admin@joynee.com', 'Admin123!', 'admin');
  
  console.log('\n✅ Initial admin setup complete!');
  console.log('📧 You can now log in with:');
  console.log('   - superadmin@joynee.com / SuperAdmin123!');
  console.log('   - admin@joynee.com / Admin123!');
}

// Export functions for use
export { setUserRole, createAdminUser, listUsersWithRoles, setupInitialAdmins };

// If running directly, set up initial admins
if (import.meta.url === `file://${process.argv[1]}`) {
  setupInitialAdmins();
} 