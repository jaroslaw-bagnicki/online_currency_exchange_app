export const signIn = (credentials) => (dispatch, getState, { getFirebase }) => {
  dispatch({type: 'SIGNIN_PROCEEDING'});
  const fb = getFirebase();
  fb.auth().signInWithEmailAndPassword(
    credentials.email,
    credentials.password
  ).then(() => dispatch({ type: 'SIGNIN_SUCCESS' }))
    .catch(err => dispatch({ type: 'SIGNIN_ERROR', err }));
};

export const signOut = () => (dispatch, getState, { getFirebase }) => {
  const fb = getFirebase();
  fb.auth().signOut()
    .then(() => dispatch({ type: 'SIGNOUT_SUCCESS' }))
    .catch(err => dispatch({ type: 'SIGNOUT_ERROR', err }));
};

export const register = (newUserData) => (dispatch, getState, { axios }) => {
  dispatch({type: 'REGISTER_PROCEEDING'});
  axios.post('user/register', newUserData)
    .then(() => {
      dispatch({ type: 'REGISTER_SUCCESS' });
      const { email, password } = newUserData;
      dispatch(signIn({email, password}));
    })
    .catch(err => dispatch({ type: 'REGISTER_ERROR', err: err.response.data }));
};

export const clearError = () => ({
  type: 'CLEAR_AUTH_ERROR'
});
