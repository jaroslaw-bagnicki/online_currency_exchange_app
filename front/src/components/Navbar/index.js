import React from 'react';
import { Link } from 'react-router-dom';
import { SignedInLinks, SignedOutLinks } from '../.';

export const Navbar = () => (
  <div>
    <nav className="nav-wrapper grey">
      <div className="container">
        <Link to="/" className="brand-logo">eExchange</Link>
        <SignedInLinks />
        <SignedOutLinks />
      </div>
    </nav>
  </div>
);
