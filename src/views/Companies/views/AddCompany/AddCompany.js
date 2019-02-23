import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CompanyForm from '../../common/CompanyForm';

class AddCompany extends Component {
  static propTypes = {
    postCompany: PropTypes.func.isRequired,
  };

  onSuccess = company => {
    this.props.history.push(`/company/${company.id}`);
  };

  render() {
    const { postCompany, loading } = this.props;

    if (loading) {
      return 'Loading...';
    }

    return (
      <div className="container add-company">
        <CompanyForm onSubmit={postCompany} onSuccess={this.onSuccess} />
      </div>
    );
  }
}

export default AddCompany;
