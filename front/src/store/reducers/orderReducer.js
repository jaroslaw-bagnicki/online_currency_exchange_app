const initState = {
  isProcessing: false,
  error: null,
  message: null,
  isConfirmed: null
};

export const orderReducer = (state = initState, action) => {
  switch(action.type) {

    case 'START_ORDER_PROCEEDING':
      return {
        ...state,
        isProcessing: true,
        error: null
      };

    case 'PLACE_ORDER':
      return {
        ...state,
        isConfirmed: true
      };

    case 'CANCEL_ORDER':
      return {
        ...state,
        isProcessing: false
      };

    case 'PLACE_ORDER_SUCCESS':
      return {
        ...state,
        isProcessing: false,
        isConfirmed: null,
        error: null
      };

    case 'PLACE_ORDER_ERROR':
      return {
        ...state,
        isProcessing: false,
        isConfirmed: null,
        error: action.err.message
      };
      
    case 'CLEAR_ORDER_ERROR':
      return {
        ...state,
        error: null
      };

    default:
      return state;
  }
};
