const { CognitoIdentityProviderClient, AdminInitiateAuthCommand, InitiateAuthCommand } = require('@aws-sdk/client-cognito-identity-provider');
const crypto = require('crypto');

// Configuration
const USER_POOL_ID = 'eu-central-1_ctYny8QH0';
const CLIENT_ID = '7o72893uogsnoua31r1pvru66r';
const CLIENT_SECRET = process.env.AWS_COGNITO_CLIENT_SECRET; // You'll need to set this
const REGION = 'eu-central-1';

// Create Cognito client
const cognitoClient = new CognitoIdentityProviderClient({
  region: REGION,
  // AWS SDK will automatically use AWS CLI credentials
});

// Calculate SECRET_HASH for client with secret
function calculateSecretHash(username) {
  if (!CLIENT_SECRET) {
    throw new Error('AWS_COGNITO_CLIENT_SECRET environment variable is required');
  }
  
  const message = username + CLIENT_ID;
  const hmac = crypto.createHmac('SHA256', CLIENT_SECRET);
  hmac.update(message);
  return hmac.digest('base64');
}

// Method 1: Admin authentication (for testing)
async function adminAuth(username, password) {
  try {
    const authParams = {
      UserPoolId: USER_POOL_ID,
      ClientId: CLIENT_ID,
      AuthFlow: 'ADMIN_NO_SRP_AUTH',
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
      }
    };

    // Add SECRET_HASH if client has secret
    if (CLIENT_SECRET) {
      authParams.AuthParameters.SECRET_HASH = calculateSecretHash(username);
    }

    const command = new AdminInitiateAuthCommand(authParams);
    const result = await cognitoClient.send(command);
    
    console.log('✅ Admin authentication successful!');
    console.log('Access Token:', result.AuthenticationResult.AccessToken);
    console.log('ID Token:', result.AuthenticationResult.IdToken);
    console.log('Refresh Token:', result.AuthenticationResult.RefreshToken);
    
    return result.AuthenticationResult;
  } catch (error) {
    console.error('❌ Admin authentication failed:', error.message);
    throw error;
  }
}

// Method 2: User authentication (requires user to exist)
async function userAuth(username, password) {
  try {
    const authParams = {
      ClientId: CLIENT_ID,
      AuthFlow: 'USER_PASSWORD_AUTH',
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
      }
    };

    // Add SECRET_HASH if client has secret
    if (CLIENT_SECRET) {
      authParams.AuthParameters.SECRET_HASH = calculateSecretHash(username);
    }

    const command = new InitiateAuthCommand(authParams);
    const result = await cognitoClient.send(command);
    
    console.log('✅ User authentication successful!');
    console.log('Access Token:', result.AuthenticationResult.AccessToken);
    console.log('ID Token:', result.AuthenticationResult.IdToken);
    console.log('Refresh Token:', result.AuthenticationResult.RefreshToken);
    
    return result.AuthenticationResult;
  } catch (error) {
    console.error('❌ User authentication failed:', error.message);
    throw error;
  }
}

// Method 3: Create a test user and get token
async function createTestUserAndGetToken() {
  try {
    const { AdminCreateUserCommand, AdminSetUserPasswordCommand } = require('@aws-sdk/client-cognito-identity-provider');
    
    const testEmail = `test-${Date.now()}@example.com`;
    const testPassword = 'TestPassword123!';
    const username = `testuser${Date.now()}`;
    
    console.log('🔧 Creating test user:', testEmail);
    console.log('🔧 Username:', username);
    
    // Create user
    const createCommand = new AdminCreateUserCommand({
      UserPoolId: USER_POOL_ID,
      Username: username,
      UserAttributes: [
        {
          Name: 'email',
          Value: testEmail,
        },
        {
          Name: 'email_verified',
          Value: 'true',
        },
      ],
      MessageAction: 'SUPPRESS',
    });
    
    await cognitoClient.send(createCommand);
    console.log('✅ Test user created');
    
    // Set password
    const passwordCommand = new AdminSetUserPasswordCommand({
      UserPoolId: USER_POOL_ID,
      Username: username,
      Password: testPassword,
      Permanent: true,
    });
    
    await cognitoClient.send(passwordCommand);
    console.log('✅ Password set');
    
    // Get token
    const authResult = await adminAuth(username, testPassword);
    
    console.log('\n🎉 Test user created and authenticated successfully!');
    console.log('Use this token for testing:');
    console.log('Authorization: Bearer', authResult.AccessToken);
    
    return authResult;
  } catch (error) {
    console.error('❌ Failed to create test user:', error.message);
    throw error;
  }
}

// Main execution
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  
  console.log('🔐 Cognito Token Generator');
  console.log('========================');
  
  // AWS SDK will automatically use AWS CLI credentials
  console.log('🔧 Using AWS CLI credentials');
  
  try {
    switch (command) {
      case 'admin':
        if (args.length < 3) {
          console.log('Usage: node get-token.js admin <username> <password>');
          process.exit(1);
        }
        await adminAuth(args[1], args[2]);
        break;
        
      case 'user':
        if (args.length < 3) {
          console.log('Usage: node get-token.js user <username> <password>');
          process.exit(1);
        }
        await userAuth(args[1], args[2]);
        break;
        
      case 'create-test':
        await createTestUserAndGetToken();
        break;
        
      default:
        console.log('Available commands:');
        console.log('  admin <username> <password>     - Admin authentication');
        console.log('  user <username> <password>      - User authentication');
        console.log('  create-test                     - Create test user and get token');
        console.log('');
        console.log('Examples:');
        console.log('  node get-token.js create-test');
        console.log('  node get-token.js admin test@example.com TestPassword123!');
        break;
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { adminAuth, userAuth, createTestUserAndGetToken }; 