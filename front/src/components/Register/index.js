import React, { Component } from 'react';
import styles from './styles.module.css';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {register, clearError } from '../../store/actions/authActions';

export class Register extends Component {
  state = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: ''
  }

  static propTypes = {
    isSignIn: PropTypes.bool.isRequired,
    isProceeding: PropTypes.bool.isRequired,
    register: PropTypes.func.isRequired,
    clearError: PropTypes.func.isRequired,
    error: PropTypes.string
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.register(this.state);
  }

  render() {
    const { isSignIn, isProceeding, error } = this.props;
    if (isSignIn) return (<Redirect to="/" />);
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m8 offset-m2 l6 offset-l3">
            <form onSubmit={this.handleSubmit} className="section">
              <h5 className="grey-text text-darken-3">Register</h5>
              <div className="input-field">
                <label htmlFor="firstName">First name</label>
                <input type="text" id="firstName" value={this.state.firstName} onChange={this.handleChange} />
              </div>
              <div className="input-field">
                <label htmlFor="lastName">Last name</label>
                <input type="text" id="lastName" value={this.state.lastName} onChange={this.handleChange} />
              </div>
              <div className="input-field">
                <label htmlFor="phone">Phone number</label>
                <input type="text" id="phone" value={this.state.phone} onChange={this.handleChange} />
              </div>
              <div className="input-field">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={this.state.email} onChange={this.handleChange} />
              </div>
              <div className="input-field">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={this.state.password} onChange={this.handleChange} />
              </div>
              <button type="submit" className="btn grey right" disabled={isProceeding}>
                <span className={styles.buttonContent}>Register { isProceeding && <i className="fas fa-spinner fa-spin"></i> }</span>
              </button>
              <div className={styles.alert}>{ error && <p className="red-text center">{error}</p>}</div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  componentWillUnmount() {
    this.props.clearError();
  }
}

const mapStateToProps = (state) => ({
  isSignIn: !(state.fb.auth.isEmpty),
  isProceeding: state.auth.isProceeding,
  error: state.auth.error
});

const mapDispatchToProps = (dispatch) => ({
  register: (newUserData) => dispatch(register(newUserData)),
  clearError: () => dispatch(clearError())
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
