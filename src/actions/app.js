import * as types from './constants';

export function getCurrentTabUrl() {
  return (dispatch) => {
    chrome.tabs.getSelected(null, function(tab) {
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
