import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CompanyForm from '../../common/CompanyForm';

class AddCompany extends Component {
  static propTypes = {
    postCompany: PropTypes.func.isRequired,
  };

  render() {
    const { postCompany, loading, history } = this.props;

    if (loading) {
      return 'Loading...';
    }

    return (
      <div className="container add-company">
        <CompanyForm onSubmit={postCompany} onSuccess={company => history.push(`/company/${company.id}`)} />
      </div>
    );
  }
}

export default AddCompany;
