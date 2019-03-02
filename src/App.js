import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import localstorage from 'store2';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';

import { verifyToken, logout, continueWithoutUser } from './redux/actions';

import LoggedOutLayout from './Layouts/LoggedOutLayout';
import PrimaryLayout from './Layouts/PrimaryLayout';

import Register from './views/Register';
import Login from './views/Login';
import CompanyList from './views/Companies/views/CompanyList';
import Company from './views/Companies/views/Company';
import AddCompany from './views/Companies/views/AddCompany';

class App extends Component {
  static propTypes = {
    user: PropTypes.instanceOf(Map),
    verifyToken: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { user, verifyToken, continueWithoutUser } = this.props;
    if (!user) {
      const token = localstorage.get('token');
      if (token) {
        verifyToken(token);
      } else {
        continueWithoutUser();
      }
    }
  }

  logout = () => {
    this.props.logout();
  };

  render() {
    const { user, loading } = this.props;

    if (loading) {
      return 'loading...';
    }

    if (!user) {
      return (
        <LoggedOutLayout>
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Redirect to="/login" />
          </Switch>
        </LoggedOutLayout>
      );
    }

    return (
      <PrimaryLayout>
        <Switch>
          <Route exact path="/companies" component={CompanyList} />
          <Route exact path="/company/add" component={AddCompany} />
          <Route path="/company/:companyId" component={Company} />
        </Switch>
      </PrimaryLayout>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.get('data'),
    loading: state.user.get('loading'),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    verifyToken: token => dispatch(verifyToken(token)),
    logout: () => dispatch(logout()),
    continueWithoutUser: () => dispatch(continueWithoutUser()),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
