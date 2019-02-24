import camelcaseKeys from 'camelcase-keys';

export const receivedRates = (data) => ({
  type: 'RECEIVED_RATES',
  rates: camelcaseKeys(JSON.parse(data), {deep: true})
});

export const ratesServiceError = () => ({
  type: 'RATES_SERVICE_ERROR'
});
