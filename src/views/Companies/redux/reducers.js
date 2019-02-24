import { combineReducers } from 'redux';
import { fromJS, Map } from 'immutable';

import { POST_COMPANY } from './actions';

const loading = (state = false, action) => {
  switch (action.type) {
    case `${POST_COMPANY}_REQUEST`:
      return true;

    case `${POST_COMPANY}_SUCCESS`:
    case `${POST_COMPANY}_FAILURE`:
      return false;

    default:
      return state;
  }
};

const currentCompany = (state = Map(), action) => {
  switch (action.type) {
    case `${POST_COMPANY}_SUCCESS`:
      return fromJS(action.json);

    default:
      return state;
  }
};

export default combineReducers({
  loading,
  currentCompany,
});
