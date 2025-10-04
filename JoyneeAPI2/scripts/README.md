# Admin Scripts

This directory contains utility scripts for managing the Joynee Admin Portal.

## 🔐 Add Superadmin Role

### `add-superadmin-role.js`

This script adds the `superadmin` role to an existing Firebase user using Firebase Custom Claims.

#### Prerequisites

1. **Firebase Service Account Key**:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Select your project (`joynee-5ceb6`)
   - Go to Project Settings → Service Accounts
   - Click "Generate new private key"
   - Save the JSON file as `serviceAccountKey.json` in the admin folder

2. **Existing Firebase User**:
   - The user must already exist in Firebase Authentication
   - The user must have email/password authentication enabled

#### Usage

```bash
# Add superadmin role to a specific user
node scripts/add-superadmin-role.js user@example.com

# Add superadmin role to the default user (ondra@example.com)
node scripts/add-superadmin-role.js
```

#### Example Output

```
🚀 Adding superadmin role to Firebase user...
📧 Email: ondra@example.com

✅ Found user: ondra@example.com (UID: abc123...)
📋 Current claims: {}
✅ Successfully added superadmin role to ondra@example.com
📋 New claims: { roles: ['superadmin'], superadmin: true }

🎉 You can now log in to the admin portal with your existing credentials!
   Email: ondra@example.com
   Use your existing password
```

#### What the Script Does

1. **Loads Firebase Admin SDK** with your service account credentials
2. **Finds the user** by email address
3. **Preserves existing claims** (if any)
4. **Adds superadmin role** to the user's custom claims
5. **Updates the user** with new claims

#### Custom Claims Structure

After running the script, the user will have these custom claims:

```javascript
{
  "roles": ["superadmin"],
  "superadmin": true
}
```

#### Troubleshooting

- **"serviceAccountKey.json not found"**: Download the service account key from Firebase Console
- **"User not found"**: Make sure the user exists in Firebase Authentication
- **Permission errors**: Ensure your service account has the necessary permissions

#### Security Notes

- Keep your `serviceAccountKey.json` secure and never commit it to version control
- The service account key has admin privileges, so handle it carefully
- Consider using environment variables for production deployments

## 🔍 Check User Role

### `check-user-role.js`

This script checks the current roles and custom claims of a Firebase user.

#### Usage

```bash
# Check role for a specific user
node scripts/check-user-role.js user@example.com

# Check role for the default user (ondra@example.com)
node scripts/check-user-role.js
```

#### Example Output

```
🔍 Checking user role in Firebase...
📧 Email: ondra@example.com

✅ Found user: ondra@example.com (UID: abc123...)
📋 Custom claims: { roles: ['superadmin'], superadmin: true }

🔍 Role Analysis:
   Roles array: [superadmin]
   Admin flag: false
   Superadmin flag: true

✅ User has admin access!
   They can log in to the admin portal.
```

## 📋 Available Scripts

- `add-superadmin-role.js` - Add superadmin role to existing user
- `check-user-role.js` - Check current user roles and claims 