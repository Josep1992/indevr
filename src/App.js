import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import localstorage from 'store2';
import { Switch, Route, withRouter } from 'react-router-dom';

import { verifyToken, logout } from './redux/actions';

import PrimaryLayout from './Layouts/PrimaryLayout';
import Register from './views/Register';
import Login from './views/Login';
import AddCompany from './views/Companies/views/AddCompany';

class App extends Component {
  static propTypes = {
    user: PropTypes.instanceOf(Map),
    verifyToken: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { user, verifyToken } = this.props;
    if (!user) {
      const token = localstorage.get('token');
      if (token) {
        verifyToken(token);
      }
    }
  }

  logout = () => {
    this.props.logout();
  };

  render() {
    return (
      <PrimaryLayout>
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/company/add" component={AddCompany} />
        </Switch>
      </PrimaryLayout>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    verifyToken: token => dispatch(verifyToken(token)),
    logout: () => dispatch(logout()),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
