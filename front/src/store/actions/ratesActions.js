export const receivedRates = (data) => ({
  type: 'RECEIVED_RATES',
  rates: JSON.parse(data)
});

export const ratesServiceError = () => ({
  type: 'RATES_SERVICE_ERROR'
});
