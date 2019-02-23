import { combineReducers } from 'redux';
import { fromJS, Map } from 'immutable';
import localstorage from 'store2';

import { REGISTER_USER, LOGIN_USER, VERIFY_TOKEN, LOGOUT_USER, CONTINUE_WITHOUT_USER } from './actions';

const user = (state = Map({ data: null, loading: true }), action) => {
  switch (action.type) {
    case `${REGISTER_USER}_REQUEST`:
    case `${LOGIN_USER}_REQUEST`:
    case `${VERIFY_TOKEN}_REQUEST`:
      return state.set('loading', true);

    case CONTINUE_WITHOUT_USER:
    case `${REGISTER_USER}_FAILURE`:
    case `${LOGIN_USER}_FAILURE`:
      return state.set('loading', false);

    case `${REGISTER_USER}_SUCCESS`:
      localstorage.set('token', action.json.token);
      state = state.set('loading', false);
      return state.set('data', fromJS(action.json));

    case `${LOGIN_USER}_SUCCESS`:
      localstorage.set('token', action.json.token);
      state = state.set('loading', false);
      return state.set('data', fromJS(action.json));

    case `${VERIFY_TOKEN}_SUCCESS`:
      localstorage.set('token', action.json.token);
      state = state.set('loading', false);
      return state.set('data', fromJS(action.json));

    case `${VERIFY_TOKEN}_FAILURE`:
      localstorage.clear();
      state.set('loading', false);
      return state.set('data', null);

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
