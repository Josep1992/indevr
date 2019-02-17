import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Map } from 'immutable';

class Header extends Component {
  static propTypes = {
    user: PropTypes.instanceOf(Map),
    isLoggedIn: PropTypes.bool,
  };

  render() {
    const { user, isLoggedIn } = this.props;

    if (!isLoggedIn) {
      return null;
    }

    return (
      <header className="header">
        <div className="header__brand">
          <img src="https://s3-us-west-1.amazonaws.com/indevr/assets/indevr-logo.png" alt="logo" />
        </div>
        <div className="header__links">
          <NavLink to="/companies">Companies</NavLink>
          <NavLink to="/jobs">Jobs</NavLink>
          <NavLink to="/account">{user && user.get('first_name')}</NavLink>
        </div>
      </header>
    );
  }
}

export default Header;
