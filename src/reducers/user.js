import * as types from '../actions/constants';
import {
  getToken,
  loggedIn,
  getUserId,
  getUserName
} from '../sources/helpers';

const initialState = {
  token: getToken(),
  isAuthenticated: loggedIn(),
  userId: getUserId(),
  username: getUserName()
}

function auth(state = initialState, action) {
  switch ( action.type ) {
    case types.AUTHED:
      return Object.assign({}, state, {
        token: action.token,
        isAuthenticated: action.isAuthenticated,
        userId: action.userId,
        username: action.username
      });
    case types.UNAUTHED:
      return Object.assign({}, state, {
        isAuthenticated: action.isAuthenticated
      });
    case types.RESET_AUTH:
      return Object.assign({}, state, {
        token: action.token,
        isAuthenticated: action.isAuthenticated,
        userId: action.userId,
        username: action.username
      });
    default:
      return state;
  }
}

export default auth;
