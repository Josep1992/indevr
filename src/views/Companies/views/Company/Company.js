import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Company extends Component {
  static propTypes = {};

  componentDidMount() {
    const { getCompany } = this.props;
    getCompany();
  }

  editCompany = () => {};

  render() {
    const { company } = this.props;

    return (
      <div className="container company">
        <div className="company__header">
          <div className="company__header-main">
            {company.get('logo') && <img src={company.get('logo')} alt="company logo" />} {company.get('company_name')}
          </div>
          <div onClick={this.editCompany}>Edit Company</div>
        </div>
      </div>
    );
  }
}

export default Company;
