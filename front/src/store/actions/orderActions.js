export const placeOrder = (order) => (dispatch, getState, { axios, getFirebase }) => {
  dispatch({type: 'PLACE_ORDER'});
  getFirebase().auth().currentUser.getIdToken()
    .then( token => {
      return axios.post('/orders', order, {headers: {Authorization: token }});
    })
    .then(() => dispatch({ type: 'PLACE_ORDER_SUCCESS' }))
    .catch( err => dispatch({ type: 'PLACE_ORDER_ERROR' , err }));
};

export const startProcessingOrder = () => ({
  type: 'START_ORDER_PROCEEDING' 
});

export const cancelOrder = () => ({
  type: 'CANCEL_ORDER' 
});

export const orderError = (err) => ({
  type: 'PLACE_ORDER_ERROR', err
});

export const clearError = () => ({
  type: 'CLEAR_ORDER_ERROR'
});
