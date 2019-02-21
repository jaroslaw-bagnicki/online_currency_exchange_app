const initState = {
  error: null
};

export const authReducer = (state = initState, action) => {
  switch(action.type) {
    case 'SIGNIN_ERROR':
      return {
        ...state,
        error: action.err.message
      };

    case 'SIGNIN_SUCCESS':
      return {
        ...state,
        error: null
      };
      
    case 'SIGNOUT_SUCCESS':
      return state;

    default:
      return state;
  }
};
