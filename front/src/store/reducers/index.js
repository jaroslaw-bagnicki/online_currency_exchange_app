import { authReducer } from './authReducer';
import { ratesReducer } from './ratesReducer';
import { walletReducer } from './walletReducer';
import { orderReducer } from './orderReducer';
import { firebaseReducer } from 'react-redux-firebase';

import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  auth: authReducer,
  rates: ratesReducer,
  wallet: walletReducer,
  order: orderReducer,
  fb: firebaseReducer
});
