// USER
const checkAuth = require('../middlewares/checkAuth');
const router = require('express').Router();
const userController = require('../contollers/user');

router.post('/register', userController.registerNewUser);

router.patch('/profile', (req, res, next) => {
  // TODO Edit user profile
  res.sendStatus(501);
});

router.get('/wallet', checkAuth, userController.getWallet);
router.post('/wallet', checkAuth, userController.createWallet);
router.patch('/wallet', (req, res, next) => {
  // TODO Edit user profile
  res.sendStatus(501);
});

module.exports = router;