import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { SignedInLinks, SignedOutLinks } from '../.';
import { connect } from 'react-redux';

const Navbar = ({signIn}) => (
  <div>
    <nav className="nav-wrapper grey">
      <div className="container">
        <Link to="/" className="brand-logo">eExchange</Link>
        { signIn ? <SignedInLinks /> : <SignedOutLinks /> }
      </div>
    </nav>
  </div>
);

Navbar.propTypes = {
  signIn: PropTypes.bool
};

const mapStateToProps = (state) => ({
  signIn: !(state.fb.auth.isEmpty)
});

export default connect(mapStateToProps)(Navbar);
