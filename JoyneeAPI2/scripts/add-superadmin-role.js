import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { readFileSync, existsSync } from 'fs';

async function addSuperAdminRole(email) {
  try {
    // Check if service account key exists
    let serviceAccount;
    const serviceAccountPath = './serviceAccountKey.json';
    
    if (!existsSync(serviceAccountPath)) {
      console.error('❌ serviceAccountKey.json not found!');
      console.log('📋 Please download your service account key:');
      console.log('   1. Go to Firebase Console → Project Settings → Service Accounts');
      console.log('   2. Click "Generate new private key"');
      console.log('   3. Save the JSON file as "serviceAccountKey.json" in the admin folder');
      console.log('   4. Run this script again');
      console.log('');
      console.log('💡 Current working directory:', process.cwd());
      console.log('💡 Expected serviceAccountKey.json location:', serviceAccountPath);
      return;
    }
    
    try {
      serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));
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
    const currentClaims = userRecord.customClaims || {};
    console.log(`📋 Current claims:`, currentClaims);

    // Add superadmin role
    const newClaims = {
      ...currentClaims,
      roles: [...(currentClaims.roles || []), 'superadmin'],
      superadmin: true
    };

    // Set custom claims
    await auth.setCustomUserClaims(userRecord.uid, newClaims);
    
    console.log(`✅ Successfully added superadmin role to ${email}`);
    console.log(`📋 New claims:`, newClaims);
    
    console.log('\n🎉 You can now log in to the admin portal with your existing credentials!');
    console.log(`   Email: ${email}`);
    console.log('   Use your existing password');
    
  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      console.error(`❌ User with email "${email}" not found in Firebase`);
      console.log('💡 Make sure the user exists in Firebase Authentication');
    } else {
      console.error('❌ Error:', error.message);
    }
  }
}

// Get email from command line argument or use default
const email = process.argv[2] || 'ondra@example.com';

console.log('🚀 Adding superadmin role to Firebase user...');
console.log(`📧 Email: ${email}`);
console.log('');

addSuperAdminRole(email); 