const initState = {
  isLoaded: false,
  isProceeding: false,
  balance: null,
  items: [],
  error: null
};

export const walletReducer = (state = initState, action) => {
  switch(action.type) {

    case 'CREATE_WALLET_PROCEEDING':
      return {
        ...state,
        isProceeding: true,
        error: null
      };
  
    case 'CREATE_WALLET_SUCCESS':
      return {
        ...state,
        isProceeding: false,
        error: null
      };
  
    case 'CREATE_WALLET_ERROR':
      return {
        ...state,
        isProceeding: false,
        error: action.err.message
      };
    
    case 'GET_WALLET_PROCEEDING':
      return {
        ...state,
        error: null
      };
    
    case 'GET_WALLET_SUCCESS':
      return {
        ...state,
        ...action.wallet,
        isLoaded: true,
        error: null
      };
    
    case 'GET_WALLET_ERROR':
      return {
        ...state,
        isLoaded: true,
        isProceeding: false,
        error: action.err.message
      };

    case 'CLEAR_WALLET_ERROR':
      return {
        ...state,
        error: null
      };
   
    default:
      return state;
  }
};
