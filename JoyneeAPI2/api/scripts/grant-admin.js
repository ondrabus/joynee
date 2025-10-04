#!/usr/bin/env node

/*
Usage:
  node api/scripts/grant-admin.js <email-or-uid>

This script sets Firebase custom claims so the user becomes an admin/superadmin:
  { admin: true, superadmin: true, roles: ['admin','superadmin'] }

Service account resolution order:
  1) FIREBASE_SERVICE_ACCOUNT env var (JSON string)
  2) ./serviceAccountKey.json (from api/ directory)
*/

const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');

function loadServiceAccount() {
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    try {
      return JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    } catch (e) {
      console.error('FIREBASE_SERVICE_ACCOUNT is not valid JSON');
      process.exit(1);
    }
  }

  const candidatePaths = [
    path.resolve(__dirname, '../serviceAccountKey.json'),
    path.resolve(__dirname, '../../serviceAccountKey.json'),
  ];

  for (const p of candidatePaths) {
    if (fs.existsSync(p)) {
      return JSON.parse(fs.readFileSync(p, 'utf8'));
    }
  }

  console.error('Service account not found. Set FIREBASE_SERVICE_ACCOUNT or place serviceAccountKey.json in api/');
  process.exit(1);
}

async function main() {
  const arg = process.argv[2];
  if (!arg) {
    console.error('Usage: node api/scripts/grant-admin.js <email-or-uid>');
    process.exit(1);
  }

  const serviceAccount = loadServiceAccount();

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  const auth = admin.auth();

  let userRecord;
  if (arg.includes('@')) {
    console.log(`🔎 Looking up user by email: ${arg}`);
    userRecord = await auth.getUserByEmail(arg);
  } else {
    console.log(`🔎 Looking up user by UID: ${arg}`);
    userRecord = await auth.getUser(arg);
  }

  const uid = userRecord.uid;
  console.log(`👤 User found: UID=${uid}, email=${userRecord.email}`);

  const claims = { admin: true, superadmin: true, roles: ['admin', 'superadmin'] };
  await auth.setCustomUserClaims(uid, claims);
  console.log('✅ Custom claims set:', claims);

  console.log('ℹ️  Ask the user to sign out and sign in again to refresh their ID token.');
}

main().catch((err) => {
  console.error('❌ Failed to grant admin claims:', err);
  process.exit(1);
}); 