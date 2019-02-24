import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';

const SignedInLinks = ({ profile, signOut }) => (
  <ul className="right">
    <li><NavLink to='/'>Dashboard</NavLink></li>
    <li><NavLink to='/profile'>{ profile && <>Logged as {profile.firstName} {profile.lastName}</> }</NavLink></li>
    <li><a href="#!" onClick={signOut}>Sign Out</a></li>
  </ul>
);

SignedInLinks.propTypes = {
  profile: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    phone: PropTypes.string
  }),
  signOut: PropTypes.func
};

const mapStateToProps = (state) => ({
  profile: state.fb.profile
});

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOut())
});

export default connect(mapStateToProps, mapDispatchToProps)(SignedInLinks);
