const firebase = require('../firebase');
const resourcesRef = firebase.db.collection('resources');
const walletsRef = firebase.db.collection('store').doc('wallets');
const transactionsRef = firebase.db.collection('store').doc('transactions');

const placeOrder = (req, res) => {
  console.log('Start transaction.');

  // Transctions object
  const transaction = {
    timestamp: Date.now(),
    user: req.uid,
    type: req.body.type,
    code: req.body.code,
    quantity: req.body.quantity,
    unit: req.body.unit,
    price: req.body.price,
    amount: req.body.quantity * req.body.unit * req.body.price
  }

  // res.json(transaction);

  // Get user wallet
  walletsRef.collection(req.uid).orderBy('timestamp', 'desc').limit(1).get()
  .then(snapshot => snapshot.docs[0].data())
  .then(wallet => {
    if (wallet.balance < transaction.amount) {
      return res.status(400).send('Transaction amount greater than user account balance.');
    } else {
      return resourcesRef.orderBy('timestamp', 'desc').limit(1).get()
    }})
  .then(snapshot => snapshot.docs[0].data())

  .then(resources => {
    const resource = resources.items.find(item => item.code === transaction.code);
    if (resource.amount < transaction.amount) {
      return res.status(409).json('Transaction amount greater than stock balance.');
    } else {
      return transactionsRef.doc().set(transaction)
    }
  })
  .then(writeResult => res.sendStatus(201))
  .catch(err => res.json(err));
};

module.exports = {
  placeOrder
};