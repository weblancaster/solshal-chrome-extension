import * as types from '../actions/constants';

const initialState = {
  currentTabUrl: ''
};

function app(state = initialState, action) {
  switch ( action.type ) {
    case types.SET_TAB_URL:
      console.log('set tab url', action.currentTabUrl);
      return Object.assign({}, state, {
        currentTabUrl: action.currentTabUrl
      });
    default:
      return state;
  }
}

export default app;
