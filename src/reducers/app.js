import * as types from '../actions/constants';

const initialState = {
  currentTabUrl: '',
  notification: {
    response: null,
    message: '',
    isOpen: false
  }
};

function app(state = initialState, action) {
  switch ( action.type ) {
    case types.SET_TAB_URL:
      return Object.assign({}, state, {
        currentTabUrl: action.currentTabUrl
      });
    case types.SET_NOTIFICATION:
      return Object.assign({}, state, {
        notification: {
          response: action.response,
          message: action.message,
          isOpen: action.isOpen
        }
      });
    default:
      return state;
  }
}

export default app;
