import * as types from "./constants";

const initialState = {
  currentTabUrl: "",
  notification: {
    response: null,
    message: "",
    isOpen: false
  },
  isLoading: false,
  displayOptions: false
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
    case types.SET_LOADING:
      return Object.assign({}, state, {
        isLoading: action.isLoading
      });
    case types.SET_OPTIONS:
      return Object.assign({}, state, {
        displayOptions: action.displayOptions
      });
    default:
      return state;
  }
}

export default app;
