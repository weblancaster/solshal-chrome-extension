import * as types from './constants';

export function getCurrentTabUrl() {
  return (dispatch) => {
    chrome.tabs.getSelected(null, function (tab) {
      dispatch(setCurrentTabUrl(tab.url));
    });
  };
}

export function setCurrentTabUrl(currentTabUrl) {
  return {
    type: types.SET_TAB_URL,
    currentTabUrl: currentTabUrl
  }
}

export function setNotification(response, message) {
  return (dispatch) => {
    dispatch(openNotification(response, message));
  }
}

export function openNotification(response, message) {
  return {
    type: types.SET_NOTIFICATION,
    response: response,
    message: message || '',
    isOpen: true
  }
}

export function resetNotification() {
  return {
    type: types.SET_NOTIFICATION,
    response: null,
    message: '',
    isOpen: false
  }
}

export function setLoading(value) {
  return {
    type: types.SET_LOADING,
    isLoading: value
  }
}
