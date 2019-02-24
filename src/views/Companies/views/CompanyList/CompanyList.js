import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import ReactTable from 'react-table';
import moment from 'moment';
import Pagination from 'rc-pagination';
import locale from 'rc-pagination/lib/locale/en_US';

const PAGE_SIZE = 20;

class CompanyList extends Component {
  static propTypes = {
    getCompanies: PropTypes.func.isRequired,
    companies: PropTypes.instanceOf(Map),
  };

  state = {
    page: 0,
  };

  componentDidMount() {
    const { getCompanies } = this.props;
    const { page } = this.state;
    getCompanies(page, PAGE_SIZE);
  }

  onPageChange = page => {
    this.setState({ page: page - 1 });
    this.props.getCompanies(page - 1);
  };

  renderPagination = () => {
    const { companies } = this.props;

    return (
      <Pagination
        total={parseInt(companies.get('total'), 10)}
        onChange={this.onPageChange}
        current={this.state.page + 1}
        pageSize={PAGE_SIZE}
        locale={locale}
      />
    );
  };

  renderTable = () => {
    const { companies, history } = this.props;
    const data = companies.get('results').map(company => ({
      id: company.get('id'),
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
      lastActivity: moment().format('MM/DD/YYYY'),
    }));

    return (
      <ReactTable
        resizable={false}
        ref="chatTable"
        data={data}
        noDataText=""
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
        getTdProps={(e, row, column) => ({
          onClick: ev => {
            history.push(`/company/${row.original.id}`);
          },
        })}
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
        {this.renderTable()}
        {companies.get('total') > PAGE_SIZE && this.renderPagination()}
      </div>
    );
  }
}

export default CompanyList;
