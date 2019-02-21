import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

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
    error: PropTypes.string
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('handleSubmit()');
  }

  render() {
    const { isSignIn } = this.props;
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
              <div className="input-field">
                <button type="submit" className="btn grey right">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isSignIn: !(state.fb.auth.isEmpty)
});

export default connect(mapStateToProps)(Register);
