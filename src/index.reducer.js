import { combineReducers } from 'redux';
import auth from './shared/auth.reducer';
import user from './user/user.reducer';
import app from './shared/app.reducer';

export default combineReducers({
  auth,
  user,
  app
});
