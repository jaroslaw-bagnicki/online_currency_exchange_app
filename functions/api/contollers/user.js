/* eslint-disable promise/always-return */
const firebase = require('../firebase');
const usersRef = firebase.db.collection('users');
const walletsRef = firebase.db.collection('store').doc('wallets');

const registerNewUser = (req, res) => {
  console.log('Start handling creating new user.');
  firebase.auth.createUser({
    email: req.body.email,
    password: req.body.password
  })
  .then(user => usersRef.doc(user.uid).set({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      hasWallet: false
    }))
  .then((writeResult) => res.sendStatus(201))
  .catch(err => res.json(err));
};

const createWallet = (req, res) => {
  console.log('Start creating wallet.');
  walletsRef.collection(req.uid).doc().set({
      // createData: firebase.db.FieldValue.serverTimestamp(), // Don't work
      // createData: firebase.db.Timestap.now(), // Also don't work
      timestamp: Date.now(),
      balance: req.body.balance,
      items: req.body.items
    })
  .then((writeResult) => usersRef.doc(req.uid).update({
    hasWallet: true
  }))
  .then((writeResult) => res.sendStatus(201))
  .catch(err => res.json(err));
};

const getWallet = (req, res) => {
  console.log('Start getting wallet.');
  walletsRef.collection(req.uid).orderBy('timestamp', 'desc').limit(1).get()
  .then((snapshot) => res.json(snapshot.docs[0].data()))
  .catch(err => res.json(err));
};

module.exports = {
  registerNewUser,
  createWallet,
  getWallet
}