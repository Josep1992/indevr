import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import LoginForm from './LoginForm';

class Login extends Component {
  static propTypes = {
    loginUser: PropTypes.func.isRequired,
  };

  onLoginSuccess = () => {
    this.props.history.push('/');
  };

  render() {
    const { loginUser } = this.props;

    return (
      <div className="login">
        <div className="container login__left">
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
        <div className="container login__right">
          <LoginForm onSubmit={loginUser} onSuccess={this.onLoginSuccess} />
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
