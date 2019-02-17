import { combineReducers } from 'redux';
import { fromJS } from 'immutable';
import localstorage from 'store2';

import { REGISTER_USER, LOGIN_USER, VERIFY_TOKEN, LOGOUT_USER } from './actions';

const user = (state = null, action) => {
  switch (action.type) {
    case `${REGISTER_USER}_SUCCESS`:
      localstorage.set('token', action.json.token);
      return fromJS(action.json);

    case `${LOGIN_USER}_SUCCESS`:
      localstorage.set('token', action.json.token);
      return fromJS(action.json);

    case `${VERIFY_TOKEN}_SUCCESS`:
      localstorage.set('token', action.json.token);
      return fromJS(action.json);

    case `${VERIFY_TOKEN}_FAILURE`:
      localstorage.clear();
      return null;

    case LOGOUT_USER:
      localstorage.clear();
      return null;

    default:
      return state;
  }
};

export default combineReducers({
  user,
});
