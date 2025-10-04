// Simple test script to get JWT token
// Run this after setting AWS_COGNITO_CLIENT_SECRET in .env

require('dotenv').config();
const { CognitoIdentityProviderClient, AdminInitiateAuthCommand } = require('@aws-sdk/client-cognito-identity-provider');
const crypto = require('crypto');

const USER_POOL_ID = 'eu-central-1_ctYny8QH0';
const CLIENT_ID = '7o72893uogsnoua31r1pvru66r';
const CLIENT_SECRET = process.env.AWS_COGNITO_CLIENT_SECRET;
const REGION = 'eu-central-1';

if (!CLIENT_SECRET) {
  console.error('❌ Please set AWS_COGNITO_CLIENT_SECRET in your .env file');
  console.error('   Get it from AWS Console → Cognito → User Pools → App integration');
  process.exit(1);
}

const cognitoClient = new CognitoIdentityProviderClient({ region: REGION });

function calculateSecretHash(username) {
  const message = username + CLIENT_ID;
  const hmac = crypto.createHmac('SHA256', CLIENT_SECRET);
  hmac.update(message);
  return hmac.digest('base64');
}

async function getToken(username, password) {
  try {
    const command = new AdminInitiateAuthCommand({
      UserPoolId: USER_POOL_ID,
      ClientId: CLIENT_ID,
      AuthFlow: 'ADMIN_NO_SRP_AUTH',
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
        SECRET_HASH: calculateSecretHash(username),
      }
    });

    const result = await cognitoClient.send(command);
    
    console.log('✅ Authentication successful!');
    console.log('\n🔐 Access Token:');
    console.log(result.AuthenticationResult.AccessToken);
    console.log('\n🆔 ID Token:');
    console.log(result.AuthenticationResult.IdToken);
    console.log('\n📝 Use this header in your API requests:');
    console.log(`Authorization: Bearer ${result.AuthenticationResult.AccessToken}`);
    
    return result.AuthenticationResult;
  } catch (error) {
    console.error('❌ Authentication failed:', error.message);
    throw error;
  }
}

// Test with a user (create this user first via AWS Console or CLI)
const username = process.argv[2] || 'testuser123';
const password = process.argv[3] || 'TestPassword123!';

console.log('🔐 Testing Cognito Authentication');
console.log('================================');
console.log('Username:', username);
console.log('Password:', password);
console.log('');

getToken(username, password).catch(console.error); 