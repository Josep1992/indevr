import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import ReactTable from 'react-table';
import moment from 'moment';
import Pagination from 'rc-pagination';
import locale from 'rc-pagination/lib/locale/en_US';

import NoContentPlaceholder from '../../../../common/components/NoContentPlaceholder';
import Icon from '../../../../common/components/Icon/Icon';

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
        <div className="company-table__logo-cell">
          {company.get('logo') && <img src={company.get('logo')} alt="company logo" className="img-responsive" />}{' '}
          {company.get('company_name')}
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
        data={data}
        className="-striped -highlight"
        columns={[
          {
            Header: 'Company',
            accessor: 'company',
            width: 300,
          },
          {
            Header: 'Location',
            accessor: 'location',
          },
          {
            Header: 'Contacts',
            accessor: 'contacts',
            width: 80,
            className: 'text-center',
          },
          {
            Header: 'Apps',
            accessor: 'apps',
            width: 80,
            className: 'text-center',
          },
          {
            Header: 'Saved',
            accessor: 'saved',
            width: 80,
            className: 'text-center',
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
    const { loading, companies, history } = this.props;
    if (loading) {
      return 'Loading...';
    }

    if (!companies.get('total')) {
      return (
        <div className="container">
          <div className="company-list__header">
            <div className="company-list__header-text">
              <h1>Companies</h1>
            </div>
            <div className="company-list__add-button-wrapper">
              <button className="btn btn-primary" onClick={() => history.push('/company/add')}>
                <Icon icon="Plus" /> New Company
              </button>
            </div>
          </div>
          <p className="company-list__helper-text">
            Add companies you're interested in here. Companies can have multiple jobs associated with them, but don't
            have to have any. Use this list to narrow down the places you'd like to work by researching the company,
            making connections, and tracking available jobs.
          </p>
          <NoContentPlaceholder
            icon="Building"
            title="No Companies Found"
            body={
              <div>
                Click{' '}
                <button
                  className="btn btn-primary company-list__no-content-button"
                  onClick={() => history.push('/company/add')}
                >
                  <Icon icon="Plus" /> New Company
                </button>{' '}
                to get started.
              </div>
            }
          />
        </div>
      );
    }

    return (
      <div className="container">
        <div className="company-list__header">
          <div className="company-list__header-text">
            <h1>Companies</h1>
          </div>
          <div className="company-list__add-button-wrapper">
            <button className="btn btn-primary" onClick={() => history.push('/company/add')}>
              <Icon icon="Plus" /> New Company
            </button>
          </div>
        </div>
        <p className="company-list__helper-text">
          Add companies you're interested in here. Companies can have multiple jobs associated with them, but don't have
          to have any. Use this list to narrow down the places you'd like to work by researching the company, making
          connections, and tracking available jobs.
        </p>
        {this.renderTable()}
        {companies.get('total') > PAGE_SIZE && this.renderPagination()}
      </div>
    );
  }
}

export default CompanyList;
