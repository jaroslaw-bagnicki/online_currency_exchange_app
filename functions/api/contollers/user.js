/* eslint-disable promise/always-return */
const firebase = require('../firebase');
const usersRef = firebase.db.collection('users');

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
      wallet: false
    }))
  .then(() => res.sendStatus(201))
  .catch(err => res.json(err));
};

const getProfile = (req, res) => {
  console.log('Start retrieving user profile.');
  usersRef.doc(req.uid).get()
    .then((doc) => {
      if (doc.exists) {
        res.json(doc.data());
      } else {
        res.status(404).json({error: 'Profile don\'t exist'});
      }
    })
    .catch(err => res.json(err));
};

module.exports = {
  registerNewUser,
  getProfile
}