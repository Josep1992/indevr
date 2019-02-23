import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CompanyForm from '../../common/CompanyForm';

class AddCompany extends Component {
  static propTypes = {};

  render() {
    return <CompanyForm onSubmit={() => {}} onSuccess={() => {}} />;
  }
}

export default AddCompany;
