import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles.css';
import { RATES_WS_URL } from './config';

import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './store/reducers';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { receivedRates, ratesServiceError } from './store/actions/ratesActions';

const store = createStore(rootReducer, applyMiddleware(thunk));

const ratesWs = new WebSocket(RATES_WS_URL);
ratesWs.onmessage = (e) => store.dispatch(receivedRates(e.data));
ratesWs.onerror = () => store.dispatch(ratesServiceError());

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
