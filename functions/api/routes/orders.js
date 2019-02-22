// ORDERS
const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.status(200).send('Get user orders...')
});

router.post('/place', (req, res, next) => {
  res.status(201).send('Place user order...')
});

router.post('/confirm', (req, res, next) => {
  res.status(200).send('Confirm user order...')
});

module.exports = router;