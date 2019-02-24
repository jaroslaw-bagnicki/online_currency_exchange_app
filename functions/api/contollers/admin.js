/* eslint-disable promise/always-return */
const firebase = require('../firebase');
const usersRef = firebase.db.collection('users');
const resourcesRef = firebase.db.collection('resources');

const postResources = (req, res) => {
  console.log('postResources()');
  resourcesRef.doc().set({
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

const getResources = (req, res) => {
  console.log('getResources()');
  walletsRef.collection(req.uid).orderBy('timestamp', 'desc').limit(1).get()
  .then((snapshot) => res.json(snapshot.docs[0].data()))
  .catch(err => res.json(err));
};

module.exports = {
  postResources,
  getResources
}