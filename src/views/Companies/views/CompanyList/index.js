import { connect } from 'react-redux';
import CompanyList from './CompanyList';

import { getCompanies } from '../../redux/actions';

const mapStateToProps = state => ({
  companies: state.company.companyList,
  loading: state.company.loading,
});

const mapDispatchToProps = dispatch => {
  return {
    getCompanies: values => dispatch(getCompanies(values)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyList);
