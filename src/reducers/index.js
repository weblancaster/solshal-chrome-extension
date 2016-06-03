import { combineReducers } from 'redux';
import auth from './auth';
import user from './user';
import app from './app';

export default combineReducers({
  auth,
  user,
  app
});
