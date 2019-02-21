export const signIn = (credentials) => (dispatch, getState, { getFirebase }) => {
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
