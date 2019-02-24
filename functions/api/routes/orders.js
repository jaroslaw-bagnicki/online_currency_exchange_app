// ORDERS
const checkAuth = require('../middlewares/checkAuth');
const router = require('express').Router();
const orderController = require('../contollers/order');

router.post('/', checkAuth, orderController.placeOrder);

module.exports = router;