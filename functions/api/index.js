const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const optReqHandler = require('./middlewares/optReqHandler');
const userRoutes = require('./routes/user');
const ordersRoutes = require('./routes/orders');

const app = express();

app.use(helmet());
app.use(optReqHandler);
app.use(bodyParser.json());

app.get('/', (req, res) => res.status(200).send('Hello World fromfire backend.'));
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