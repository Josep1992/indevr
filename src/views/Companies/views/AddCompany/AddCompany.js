import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CompanyForm from '../../common/CompanyForm';

class AddCompany extends Component {
  static propTypes = {
    postCompany: PropTypes.func.isRequired,
  };

  render() {
    const { postCompany } = this.props;
    return (
      <div className="container add-company">
        <CompanyForm onSubmit={postCompany} onSuccess={() => {}} />
      </div>
    );
  }
}

export default AddCompany;
