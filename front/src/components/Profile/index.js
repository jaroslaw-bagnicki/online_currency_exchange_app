import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Profile extends Component {

  state = {
    isEditable: false,
    firstName: this.props.profile.firstName,
    lastName: this.props.profile.lastName,
    phone: this.props.profile.phone,
    email: this.props.profile.email
  }

  static propTypes = {
    isSignIn: PropTypes.bool.isRequired,
    profile: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      phone: PropTypes.string,
      email: PropTypes.string
    })
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }
  
  render() {
    const { isSignIn } = this.props;
    const { isEditable } = this.state;
    if (!isSignIn) return (<Redirect to="/sign-in" />);
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m8 offset-m2 l6 offset-l3">
            <div className="section">
              <h5 className="grey-text text-darken-3">Profile</h5>
              <div className="input-field">
                <label className="active" htmlFor="firstName">First name</label>
                <input type="text" id="firstName" value={this.state.firstName} onChange={this.handleChange} disabled={!isEditable} />
              </div>
              <div className="input-field">
                <label className="active" htmlFor="lastName">Last name</label>
                <input type="text" id="lastName" value={this.state.lastName} onChange={this.handleChange} disabled={!isEditable}/>
              </div>
              <div className="input-field">
                <label className="active" htmlFor="phone">Phone number</label>
                <input type="text" id="phone" value={this.state.phone} onChange={this.handleChange} disabled={!isEditable} />
              </div>
              <div className="input-field">
                <label className="active" htmlFor="email">Email</label>
                <input type="email" id="email" value={this.state.email} onChange={this.handleChange} disabled={!isEditable} />
              </div>
            </div>
          </div>
        </div>
      </div>);
  }
}

const mapStateToProps = (state) => ({
  isSignIn: !(state.fb.auth.isEmpty),
  profile: { ...state.fb.profile, email: state.fb.auth.email }
});

export default connect(mapStateToProps)(Profile);
