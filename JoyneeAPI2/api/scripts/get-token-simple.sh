#!/bin/bash

# Simple script to get Cognito tokens using AWS CLI
USER_POOL_ID="eu-central-1_ctYny8QH0"
CLIENT_ID="7o72893uogsnoua31r1pvru66r"
REGION="eu-central-1"

echo "🔐 Cognito Token Generator (Simple)"
echo "=================================="

# Check if AWS CLI is configured
if ! aws sts get-caller-identity > /dev/null 2>&1; then
    echo "❌ AWS CLI not configured. Please run 'aws configure' first."
    exit 1
fi

echo "✅ AWS CLI configured"

# Function to create a test user
create_test_user() {
    local username="testuser$(date +%s)"
    local email="test-$(date +%s)@example.com"
    local password="TestPassword123!"
    
    echo "🔧 Creating test user..."
    echo "  Username: $username"
    echo "  Email: $email"
    
    # Create user
    aws cognito-idp admin-create-user \
        --user-pool-id "$USER_POOL_ID" \
        --username "$username" \
        --user-attributes Name=email,Value="$email" Name=email_verified,Value=true \
        --message-action SUPPRESS \
        --region "$REGION"
    
    if [ $? -eq 0 ]; then
        echo "✅ User created successfully"
        
        # Set password
        aws cognito-idp admin-set-user-password \
            --user-pool-id "$USER_POOL_ID" \
            --username "$username" \
            --password "$password" \
            --permanent \
            --region "$REGION"
        
        if [ $? -eq 0 ]; then
            echo "✅ Password set successfully"
            
            # Try to get token (this might fail due to client secret)
            echo "🔧 Attempting to get token..."
            aws cognito-idp admin-initiate-auth \
                --user-pool-id "$USER_POOL_ID" \
                --client-id "$CLIENT_ID" \
                --auth-flow ADMIN_NO_SRP_AUTH \
                --auth-parameters USERNAME="$username",PASSWORD="$password" \
                --region "$REGION"
        else
            echo "❌ Failed to set password"
        fi
    else
        echo "❌ Failed to create user"
    fi
}

# Function to list existing users
list_users() {
    echo "📋 Listing existing users..."
    aws cognito-idp list-users \
        --user-pool-id "$USER_POOL_ID" \
        --region "$REGION" \
        --query 'Users[].{Username: Username, Email: Attributes[?Name==`email`].Value|[0], Status: UserStatus}' \
        --output table
}

# Function to authenticate existing user
auth_user() {
    local username="$1"
    local password="$2"
    
    if [ -z "$username" ] || [ -z "$password" ]; then
        echo "Usage: $0 auth <username> <password>"
        exit 1
    fi
    
    echo "🔐 Authenticating user: $username"
    aws cognito-idp admin-initiate-auth \
        --user-pool-id "$USER_POOL_ID" \
        --client-id "$CLIENT_ID" \
        --auth-flow ADMIN_NO_SRP_AUTH \
        --auth-parameters USERNAME="$username",PASSWORD="$password" \
        --region "$REGION"
}

# Main script logic
case "$1" in
    "create")
        create_test_user
        ;;
    "list")
        list_users
        ;;
    "auth")
        auth_user "$2" "$3"
        ;;
    *)
        echo "Available commands:"
        echo "  create                    - Create a new test user"
        echo "  list                      - List existing users"
        echo "  auth <username> <password> - Authenticate existing user"
        echo ""
        echo "Examples:"
        echo "  $0 create"
        echo "  $0 list"
        echo "  $0 auth testuser123 TestPassword123!"
        ;;
esac 