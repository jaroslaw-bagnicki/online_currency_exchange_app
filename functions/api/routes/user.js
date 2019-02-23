// USER
const router = require('express').Router();
const userController = require('../contollers/user');

router.post('/register', userController.registerNewUser);

router.get('/account', (req, res, next) => {
  res.status(200).send('Get user data...')
});

router.patch('/account', (req, res, next) => {
  res.status(200).send('Edit user data.')
});

router.get('/wallet', (req, res, next) => {
  res.status(200).send('Get user wallet...')
});

router.post('/wallet', (req, res, next) => {
  res.status(201).send('Create user wallet...')
});

router.patch('/wallet', (req, res, next) => {
  res.status(200).send('Edit user wallet...')
});

module.exports = router;