const functions = require('firebase-functions');
const express = require('express');

const  app = express();
app.get('/', (req, res) => res.status(200).send('Hello World from backend.'));

exports.api = functions.https.onRequest(app);
