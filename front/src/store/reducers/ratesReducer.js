const initState = {
  PublicationDate: '',
  Items: [],
  error: false
};

export const ratesReducer = (state = initState, action) => {

  switch (action.type) {
    case 'RECEIVED_RATES':
      return {...state, ...(action.rates), error: false};

    case 'RATES_SERVICE_ERROR':
      return {...state, error: true};

    default:
      return state;
  }
  
};
