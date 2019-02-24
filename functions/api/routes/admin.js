// ADMIN
const checkAuth = require('../middlewares/checkAuth');
const router = require('express').Router();
const adminController = require('../contollers/admin');

router.get('/resources', adminController.getResources);
router.post('/resources', adminController.postResources);

module.exports = router;