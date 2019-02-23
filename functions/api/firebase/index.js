const admin = require('firebase-admin');
const app = admin.initializeApp();
const auth = admin.auth();
const db = admin.firestore();
db.settings({ timestampsInSnapshots: true });

module.exports = { 
  app, 
  auth, 
  db 
};