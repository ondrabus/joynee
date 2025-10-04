const { initializeApp, cert } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
const fs = require('fs');

async function testFirebaseAuth() {
  try {
    console.log('🚀 Testing Firebase Authentication...');
    
    // Load service account
    const serviceAccount = JSON.parse(fs.readFileSync('./serviceAccountKey.json', 'utf8'));
    console.log('✅ Service account loaded');
    
    // Initialize Firebase
    const app = initializeApp({
      credential: cert(serviceAccount)
    });
    
    const auth = getAuth(app);
    console.log('✅ Firebase Admin SDK initialized');
    
    // Test getting user by email (replace with your actual email)
    const email = 'ondra@example.com'; // Replace with your actual email
    console.log(`🔍 Looking for user: ${email}`);
    
    try {
      const userRecord = await auth.getUserByEmail(email);
      console.log('✅ User found:', userRecord.email);
      console.log('📋 User UID:', userRecord.uid);
      console.log('📋 Custom claims:', userRecord.customClaims);
      
      // Test token verification (you'll need a real token for this)
      console.log('\n📝 To test token verification, you need a real Firebase ID token');
      console.log('   You can get one by logging into the admin portal');
      
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        console.log('❌ User not found. Please provide a valid email address.');
        console.log('💡 Make sure the user exists in Firebase Authentication');
      } else {
        console.error('❌ Error:', error.message);
      }
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testFirebaseAuth(); 