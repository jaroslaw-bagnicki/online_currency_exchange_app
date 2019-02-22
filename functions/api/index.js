const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const ordersRoutes = require('./routes/orders');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.set(config.RES_HEADERS);
  if (req.method === 'OPTIONS') {
    res.set(config.OPT_RES_HEADERS);
    return res.sendStatus(200);
  }
  next();
})

app.get('/', (req, res) => res.status(200).send('Hello World from backend.'));
app.use('/user', userRoutes);
app.use('/orders', ordersRoutes);

app.use((req, res, next) => {
  const error = new Error('Not found.');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).send(error.message);
})

module.exports = app;