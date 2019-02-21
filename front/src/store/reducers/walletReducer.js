const initState = {
  balance: 1500,
  items: [
    {
      'code': 'GBP',
      'amount': 100
    },
    {
      'code': 'EUR',
      'amount': 10
    },
    {
      'code': 'USD',
      'amount': 100
    },
    {
      'code': 'CZK',
      'amount': 20
    }
  ]};

export const walletReducer = (state = initState, action) => {
  return state;
};
