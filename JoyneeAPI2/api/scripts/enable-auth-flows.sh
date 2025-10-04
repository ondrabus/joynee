#!/bin/bash

# Script to enable authentication flows for Cognito app client
USER_POOL_ID="eu-central-1_ctYny8QH0"
CLIENT_ID="7o72893uogsnoua31r1pvru66r"
REGION="eu-central-1"

echo "🔧 Enabling Authentication Flows for Cognito App Client"
echo "======================================================"

# Check if AWS CLI is configured
if ! aws sts get-caller-identity > /dev/null 2>&1; then
    echo "❌ AWS CLI not configured. Please run 'aws configure' first."
    exit 1
fi

echo "✅ AWS CLI configured"

# Enable authentication flows
echo "🔧 Enabling ADMIN_NO_SRP_AUTH and USER_PASSWORD_AUTH flows..."

aws cognito-idp update-user-pool-client \
    --user-pool-id "$USER_POOL_ID" \
    --client-id "$CLIENT_ID" \
    --explicit-auth-flows ADMIN_NO_SRP_AUTH USER_PASSWORD_AUTH ALLOW_USER_PASSWORD_AUTH \
    --region "$REGION"

if [ $? -eq 0 ]; then
    echo "✅ Authentication flows enabled successfully!"
    echo ""
    echo "🔐 Now you can use these authentication methods:"
    echo "  - ADMIN_NO_SRP_AUTH (for admin authentication)"
    echo "  - USER_PASSWORD_AUTH (for user authentication)"
    echo ""
    echo "📝 Try running the token generator again:"
    echo "  node test-token.js"
else
    echo "❌ Failed to enable authentication flows"
    exit 1
fi 