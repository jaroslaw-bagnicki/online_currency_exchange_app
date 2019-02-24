export const getWallet = () => (dispatch, getState, { axios, getFirebase }) => {
  dispatch({ type: 'GET_WALLET_PROCEEDING' });
  getFirebase().auth().currentUser.getIdToken()
    .then( token => {
      return axios.get('/user/wallet', {headers: {Authorization: token }});
    })
    .then(res => dispatch({ type: 'GET_WALLET_SUCCESS', wallet: res.data }))
    .catch( err => dispatch({ type: 'FETCH_WALLET_ERROR' , err }));
};

export const createWallet = (initDeposite) => (dispatch, getState, { axios, getFirebase }) => {
  dispatch({ type: 'CREATE_WALLET_PROCEEDING' });
  getFirebase().auth().currentUser.getIdToken()
    .then( token => {
      return axios.post('/user/wallet', initDeposite, {headers: {Authorization: token }});
    })
    .then(() => dispatch({ type: 'CREATE_WALLET_SUCCESS' }))
    .catch( err => dispatch({ type: 'CREATE_WALLET_ERROR' , err }));
};

export const clearError = () => ({
  type: 'CLEAR_WALLET_ERROR'
});
