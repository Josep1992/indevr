import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import ReactTable from 'react-table';
import moment from 'moment';

class CompanyList extends Component {
  static propTypes = {
    getCompanies: PropTypes.func.isRequired,
    companies: PropTypes.instanceOf(Map),
  };

  componentDidMount() {
    const { getCompanies } = this.props;
    getCompanies();
  }

  renderTable = () => {
    const { companies } = this.props;
    const data = companies.map(company => ({
      company: (
        <div>
          <img src={company.get('logo')} alt="company logo" className="img-responsive" /> {company.get('company_name')}
        </div>
      ),
      location: (
        <div>{`${company.get('city')}${company.get('city') && company.get('state') ? ', ' : ''} ${company.get(
          'state'
        )}`}</div>
      ),
      contacts: 0,
      apps: 0,
      saved: 0,
      lastActivity: '',
    }));

    return (
      <ReactTable
        resizable={false}
        ref="chatTable"
        data={data}
        columns={[
          {
            Header: 'Company',
            accessor: 'company',
          },
          {
            Header: 'Location',
            accessor: 'location',
          },
          {
            Header: 'Contacts',
            accessor: 'contacts',
          },
          {
            Header: 'Apps',
            accessor: 'apps',
          },
          {
            Header: 'Saved',
            accessor: 'saved',
          },
          {
            Header: 'Last Activity',
            accessor: 'lastActivity',
          },
        ]}
        showPagination={false}
      />
    );
  };

  render() {
    const { loading, companies } = this.props;

    if (loading) {
      return 'Loading...';
    }

    return (
      <div className="container">
        Companies
        {/* {companies.map(company => this.renderCompany(company))} */}
        {this.renderTable()}
      </div>
    );
  }
}

export default CompanyList;
