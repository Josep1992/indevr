import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RegistrationForm from './RegistrationForm';

class Register extends Component {
  static propTypes = {
    registerUser: PropTypes.func.isRequired,
  };

  onRegisterSuccess = () => {};

  render() {
    const { registerUser } = this.props;

    return (
      <div className="register">
        <div className="container register__left">
          <img
            src="https://s3-us-west-1.amazonaws.com/indevr/assets/indevr-logo.png"
            alt="logo"
            className="img-responsive"
          />
          <p>
            The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't
            settle.
            <span>- Steve Jobs</span>
          </p>
        </div>
        <div className="container register__right">
          <RegistrationForm onSubmit={registerUser} onSuccess={this.onRegisterSuccess} />
        </div>
      </div>
    );
  }
}

export default Register;
