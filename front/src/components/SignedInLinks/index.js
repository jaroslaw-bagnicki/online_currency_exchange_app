import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './styles.module.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';

const SignedInLinks = ({ signOut }) => (
  <ul className="right">
    <li className={styles.userName}>Logged in as John Doe</li>
    <li><a onClick={signOut}>Sign Out</a></li>
  </ul>
);

SignedInLinks.propTypes = {
  signOut: PropTypes.func
};

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOut())
});

export default connect(null, mapDispatchToProps)(SignedInLinks);
