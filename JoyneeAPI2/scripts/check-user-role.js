import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { readFileSync, existsSync } from 'fs';

async function checkUserRole(email) {
  try {
    // Check if service account key exists
    let serviceAccount;
    const serviceAccountPath = './serviceAccountKey.json';
    
    console.log('DEBUG: Current working directory:', process.cwd());
    console.log('DEBUG: Looking for file:', serviceAccountPath);
    console.log('DEBUG: File exists:', existsSync(serviceAccountPath));
    
    if (!existsSync(serviceAccountPath)) {
      console.error('❌ serviceAccountKey.json not found!');
      console.log('📋 Please download your service account key from Firebase Console');
      console.log('');
      console.log('💡 Current working directory:', process.cwd());
      console.log('💡 Expected serviceAccountKey.json location:', serviceAccountPath);
      return;
    }
    
    try {
      serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));
      console.log('DEBUG: Successfully read service account key');
    } catch (error) {
      console.error('❌ Error reading serviceAccountKey.json:', error.message);
      console.log('💡 Make sure the file contains valid JSON');
      return;
    }

    const adminApp = initializeApp({
      credential: cert(serviceAccount)
    });

    const auth = getAuth(adminApp);

    // Get user by email
    const userRecord = await auth.getUserByEmail(email);
    console.log(`✅ Found user: ${userRecord.email} (UID: ${userRecord.uid})`);

    // Get current custom claims
    const claims = userRecord.customClaims || {};
    console.log(`📋 Custom claims:`, claims);

    // Check for roles
    const roles = claims.roles || [];
    const hasAdmin = claims.admin || false;
    const hasSuperAdmin = claims.superadmin || false;

    console.log('\n🔍 Role Analysis:');
    console.log(`   Roles array: [${roles.join(', ')}]`);
    console.log(`   Admin flag: ${hasAdmin}`);
    console.log(`   Superadmin flag: ${hasSuperAdmin}`);

    if (roles.includes('admin') || roles.includes('superadmin') || hasAdmin || hasSuperAdmin) {
      console.log('\n✅ User has admin access!');
      console.log('   They can log in to the admin portal.');
    } else {
      console.log('\n❌ User does not have admin access.');
      console.log('   They cannot log in to the admin portal.');
      console.log('   Run add-superadmin-role.js to grant access.');
    }

  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      console.error(`❌ User with email "${email}" not found in Firebase`);
    } else {
      console.error('❌ Error:', error.message);
    }
  }
}

// Get email from command line argument or use default
const email = process.argv[2] || 'ondra@example.com';

console.log('🔍 Checking user role in Firebase...');
console.log(`📧 Email: ${email}`);
console.log('');

checkUserRole(email); 