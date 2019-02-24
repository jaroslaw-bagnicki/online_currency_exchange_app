export const RATES_WS_URL = 'wss://webtask.future-processing.com:8068/ws/currencies';

export const FB_PROJECT_CONFIG = {
  apiKey: 'AIzaSyAavXuyFNA5tP4O3gWs4Bq29PNRPQUqYQ8',
  authDomain: 'online-exchange-app.firebaseapp.com',
  databaseURL: 'https://online-exchange-app.firebaseio.com',
  projectId: 'online-exchange-app',
  storageBucket: 'online-exchange-app.appspot.com',
  messagingSenderId: '373756675850'
};

const FB_FUNCTIONS_REGION = 'us-central1';
const FB_FUNCTIONS_FUNCTION_NAME = 'api';
const FB_PROJECT_NAME = 'online-exchange-app';

// Deploy url
export const API_URL = `https://${FB_FUNCTIONS_REGION}-${FB_PROJECT_NAME}.cloudfunctions.net/${FB_FUNCTIONS_FUNCTION_NAME}`;

// Local url
// export const API_URL = 'http://localhost:5000/online-exchange-app/us-central1/api';
