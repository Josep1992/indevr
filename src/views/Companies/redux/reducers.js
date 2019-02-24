import { combineReducers } from 'redux';
import { fromJS, Map } from 'immutable';

import { POST_COMPANY, GET_COMPANIES } from './actions';

const loading = (state = false, action) => {
  switch (action.type) {
    case `${POST_COMPANY}_REQUEST`:
    case `${GET_COMPANIES}_REQUEST`:
      return true;

    case `${POST_COMPANY}_SUCCESS`:
    case `${POST_COMPANY}_FAILURE`:
    case `${GET_COMPANIES}_SUCCESS`:
    case `${GET_COMPANIES}_FAILURE`:
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

const companyList = (state = Map(), action) => {
  switch (action.type) {
    case `${GET_COMPANIES}_SUCCESS`:
      return fromJS(action.json);

    default:
      return state;
  }
};

export default combineReducers({
  loading,
  currentCompany,
  companyList,
});
