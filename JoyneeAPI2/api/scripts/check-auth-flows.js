// Script to check authentication flows for Cognito app client
const { CognitoIdentityProviderClient, DescribeUserPoolClientCommand } = require('@aws-sdk/client-cognito-identity-provider');

const USER_POOL_ID = 'eu-central-1_ctYny8QH0';
const CLIENT_ID = '7o72893uogsnoua31r1pvru66r';
const REGION = 'eu-central-1';

const cognitoClient = new CognitoIdentityProviderClient({ region: REGION });

async function checkAuthFlows() {
  console.log('🔍 Checking Authentication Flows for Cognito App Client');
  console.log('=======================================================');
  
  try {
    const command = new DescribeUserPoolClientCommand({
      UserPoolId: USER_POOL_ID,
      ClientId: CLIENT_ID,
    });

    const result = await cognitoClient.send(command);
    const client = result.UserPoolClient;
    
    console.log('📋 App Client Details:');
    console.log('  Client ID:', client.ClientId);
    console.log('  Client Name:', client.ClientName);
    console.log('  Has Secret:', client.ClientSecret ? 'Yes' : 'No');
    console.log('');
    
    console.log('🔐 Enabled Authentication Flows:');
    if (client.ExplicitAuthFlows && client.ExplicitAuthFlows.length > 0) {
      client.ExplicitAuthFlows.forEach(flow => {
        console.log('  ✅', flow);
      });
    } else {
      console.log('  ❌ No explicit auth flows enabled');
    }
    console.log('');
    
    console.log('🔓 Allowed OAuth Flows:');
    if (client.AllowedOAuthFlows && client.AllowedOAuthFlows.length > 0) {
      client.AllowedOAuthFlows.forEach(flow => {
        console.log('  ✅', flow);
      });
    } else {
      console.log('  ❌ No OAuth flows enabled');
    }
    console.log('');
    
    console.log('🌐 Allowed OAuth Scopes:');
    if (client.AllowedOAuthScopes && client.AllowedOAuthScopes.length > 0) {
      client.AllowedOAuthScopes.forEach(scope => {
        console.log('  ✅', scope);
      });
    } else {
      console.log('  ❌ No OAuth scopes enabled');
    }
    
    return client;
  } catch (error) {
    console.error('❌ Failed to check authentication flows:', error.message);
    throw error;
  }
}

// Run the script
checkAuthFlows().catch(console.error); 