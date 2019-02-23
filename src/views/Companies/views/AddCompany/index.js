import { connect } from 'react-redux';
import AddCompany from './AddCompany';

import { postCompany } from '../../redux/actions';

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    postCompany: values => dispatch(postCompany(values)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCompany);
