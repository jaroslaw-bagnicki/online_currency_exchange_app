import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './styles.module.css';

export const SignedInLinks = () => (
  <ul className="right">
    <li className={styles.userName}>Logged in as John Doe</li>
    <li><NavLink to='/sign-out'>Sign Out</NavLink></li>
  </ul>
);
