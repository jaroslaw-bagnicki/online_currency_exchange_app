import React from 'react';
import { NavLink } from 'react-router-dom';

export const SignedOutLinks = () => (
  <ul className="right">
    <li><NavLink to='/register'>Register</NavLink></li>
    <li><NavLink to='/sign-in'>Sign In</NavLink></li>
  </ul>
);
