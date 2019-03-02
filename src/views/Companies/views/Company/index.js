import { connect } from 'react-redux';
import Company from './Company';

import { getCompany } from '../../redux/actions';

const mapStateToProps = state => {
  return {
    company: state.company.currentCompany,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { companyId } = ownProps.match.params;

  return {
    getCompany: () => dispatch(getCompany(companyId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Company);
