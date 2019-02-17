import { connect } from 'react-redux';
import localstorage from 'store2';

import PrimaryLayout from './PrimaryLayout';

const mapStateToProps = state => ({
  isLoggedIn: !!localstorage.get('token'),
  user: state.user,
});

export default connect(mapStateToProps)(PrimaryLayout);
