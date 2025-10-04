// Script to enable authentication flows for Cognito app client
const { CognitoIdentityProviderClient, UpdateUserPoolClientCommand } = require('@aws-sdk/client-cognito-identity-provider');

const USER_POOL_ID = 'eu-central-1_ctYny8QH0';
const CLIENT_ID = '7o72893uogsnoua31r1pvru66r';
const REGION = 'eu-central-1';

const cognitoClient = new CognitoIdentityProviderClient({ region: REGION });

async function enableAuthFlows() {
  console.log('🔧 Enabling Authentication Flows for Cognito App Client');
  console.log('======================================================');
  
  try {
    const command = new UpdateUserPoolClientCommand({
      UserPoolId: USER_POOL_ID,
      ClientId: CLIENT_ID,
      ExplicitAuthFlows: [
        'ADMIN_NO_SRP_AUTH',
        'USER_PASSWORD_AUTH',
        'ALLOW_USER_PASSWORD_AUTH',
        'ALLOW_REFRESH_TOKEN_AUTH'
      ],
    });

    const result = await cognitoClient.send(command);
    
    console.log('✅ Authentication flows enabled successfully!');
    console.log('');
    console.log('🔐 Now you can use these authentication methods:');
    console.log('  - ADMIN_NO_SRP_AUTH (for admin authentication)');
    console.log('  - USER_PASSWORD_AUTH (for user authentication)');
    console.log('');
    console.log('📝 Try running the token generator again:');
    console.log('  node test-token.js');
    
    return result;
  } catch (error) {
    console.error('❌ Failed to enable authentication flows:', error.message);
    throw error;
  }
}

// Run the script
enableAuthFlows().catch(console.error); 