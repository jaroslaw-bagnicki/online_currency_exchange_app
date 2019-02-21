import React, { Component } from 'react';

export class SignIn extends Component {
  state = {
    email: '',
    password: ''
  }

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
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m8 offset-m2 l6 offset-l3">
            <form onSubmit={this.handleSubmit} className="section">
              <h5 className="grey-text text-darken-3">Sign In</h5>
              <div className="input-field">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={this.state.email} onChange={this.handleChange} />
              </div>
              <div className="input-field">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={this.state.password} onChange={this.handleChange} />
              </div>
              <div className="input-field">
                <button type="submit" className="btn grey right">Sign in</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
