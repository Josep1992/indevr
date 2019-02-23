import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../../common/components/Header';

class PrimaryLayout extends Component {
  static propTypes = {
    children: PropTypes.node,
    isLoggedIn: PropTypes.bool.isRequired,
    user: PropTypes.object,
  };

  render() {
    const { children, isLoggedIn, user } = this.props;
    return (
      <div>
        <Header user={user} isLoggedIn={isLoggedIn} />
        <div>{children}</div>
      </div>
    );
  }
}

export default PrimaryLayout;
