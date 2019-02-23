import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles.css';
import { RATES_WS_URL, API_URL, FB_PROJECT_CONFIG } from './config';
import { createStore, applyMiddleware, compose } from 'redux';
import { rootReducer } from './store/reducers';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import bareAxios from 'axios';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { receivedRates, ratesServiceError } from './store/actions/ratesActions';

// Init Axios instance
const axios = bareAxios.create({
  baseURL: API_URL
});

// Init Firebase app with auth service and firestore database
firebase.initializeApp(FB_PROJECT_CONFIG);
firebase.firestore();

// Init Redux Store with thunk middleware
const store = createStore(rootReducer, 
  compose(
    applyMiddleware(thunk.withExtraArgument({ axios, getFirebase, getFirestore })), 
    reduxFirestore(firebase),
    reactReduxFirebase(firebase, { useFirestoreForProfile: true, userProfile: 'users', attachAuthIsReady: true, firebaseStateName: 'fb' }))
);

// Connect to currencies rates service
const ratesWs = new WebSocket(RATES_WS_URL);
ratesWs.onmessage = (e) => store.dispatch(receivedRates(e.data));
ratesWs.onerror = () => store.dispatch(ratesServiceError());

// Bootstrap React app
store.firebaseAuthIsReady.then(
  // eslint-disable-next-line react/no-render-return-value
  () => (ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root')))
);
