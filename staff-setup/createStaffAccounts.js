// createStaffAccounts.js

const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Define your staff credentials
const staffMembers = [
  {
    email: 'kartik.kitchen@shraddha.com',
    password: 'StrongisShraddha123',
    role: 'kitchen'
  },
  {
    email: 'kartik.cashier@shraddha.com',
    password: 'StrongisShraddha456',
    role: 'cashier'
  }
];

async function createStaffAccount(staff) {
  try {
    const userRecord = await admin.auth().createUser({
      email: staff.email,
      password: staff.password
    });
    console.log(`Successfully created user: ${userRecord.uid} (${staff.email})`);
    
    await admin.auth().setCustomUserClaims(userRecord.uid, { role: staff.role });
    console.log(`Custom claim set for ${staff.email} as ${staff.role}`);
  } catch (error) {
    console.error(`Error creating user ${staff.email}:`, error);
  }
}

staffMembers.forEach(createStaffAccount);
