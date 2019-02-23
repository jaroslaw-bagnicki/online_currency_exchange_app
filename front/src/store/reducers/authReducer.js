const initState = {
  profile: {},
  isProceeding: false,
  error: null,
  fetchProfileIsProceeding: true,
  fetchProfileError: null
};

export const authReducer = (state = initState, action) => {
  switch(action.type) {

    case 'SIGNIN_PROCEEDING':
      return {
        ...state,
        isProceeding: true,
        error: null
      };

    case 'SIGNIN_SUCCESS':
      return {
        ...state,
        isProceeding: false,
        error: null
      };

    case 'SIGNIN_ERROR':
      return {
        ...state,
        isProceeding: false,
        error: action.err.message
      };
      
    case 'SIGNOUT_SUCCESS':
      return state;

    case 'REGISTER_PROCEEDING':
      return {
        ...state,
        isProceeding: true,
        error: null
      };

    case 'REGISTER_SUCCESS':
      return {
        ...state,
        isProceeding: false,
        error: null
      };

    case 'REGISTER_ERROR':
      return {
        ...state,
        isProceeding: false,
        error: action.err.message
      };

    case 'CLEAR_AUTH_ERROR':
      return {
        ...state,
        error: null
      };

    default:
      return state;
  }
};
