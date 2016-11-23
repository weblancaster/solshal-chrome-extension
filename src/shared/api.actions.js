import 'whatwg-fetch';
import * as types from './constants';
import {
  logOut,
  loggedIn,
  saveSessionKey,
  decodeToken,
  checkStatus,
  parseJSON,
  getUserId,
  getHeaders
} from './helpers';
import {
  setNotification,
  setLoading
} from './app.actions';

export function authed(token, tokenDecoded) {
  return {
    type: types.AUTHED,
    token: token,
    isAuthenticated: tokenDecoded.isAuthenticated,
    userId: tokenDecoded.userId,
    username: tokenDecoded.username
  }
}

export function unauthed() {
  return {
    type: types.UNAUTHED,
    isAuthenticated: false
  }
}

export function saveToken(token) {
  return () => {
    if (!loggedIn()) {
      saveSessionKey('token', token);
    }
  }
}

export function resetAuth() {
  return {
    type: types.RESET_AUTH,
    token: null,
    isAuthenticated: false,
    userId: null,
    username: null
  }
}

export function logout() {
  return (dispatch) => {
    logOut();
    dispatch(resetAuth());
  }
}

export function updateFolders(folders) {
  return {
    type: types.SET_FOLDERS,
    folders: folders
  }
}

/**
 * Verify if existent token is still valid
 * @param token
 * @returns {Promise.<T>}
 */
export function verifyToken() {
  return (dispatch, getState) => {
    return fetch(`${types.BASE}/auth/verify`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: getState().auth.token
      })
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(json => {
        if (json.isValid) {
          return json.isValid
        } else {
          dispatch(logout());
        }
      })
      .catch((err) => {
        dispatch(setNotification(types.RESPONSE_FAILED, err.message));
        return false;
      })
  }
}

/**
 * Sign user in and response with user authentication
 * save and set the authentication
 * @param body
 * @returns {function()}
 */
export function signin(body) {
  return (dispatch) => {
    dispatch(setLoading(true));
    return fetch(`${types.BASE}/login`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(json => {
        let tokenDecoded = decodeToken(json);
        dispatch(saveToken(json));
        dispatch(authed(json, tokenDecoded));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(unauthed());
        dispatch(setNotification(types.RESPONSE_FAILED, err.message));
        dispatch(setLoading(false));
      })
  }
}

/**
 * Get latest folders
 * once successful set current folder if existent
 * @returns {Function}
 */
export function getFolders() {
  return (dispatch) => {
    let endpoint = `${types.BASE_API}/users/${getUserId()}/folders/`;
    return fetch(endpoint, {
      method: 'get',
      headers: getHeaders()
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(json => {
        dispatch(updateFolders(json.folders));
      }).catch((err) => {
        dispatch(setNotification(types.RESPONSE_FAILED, err.message));
      })
  }
}

/**
 * Add new folder and on success
 * update folders state with newly added folder
 * then call save collection
 * @param newFolder
 * @param newCollection
 * @returns {function()}
 */
export function addNewFolderAndSaveCollection(newFolder, newCollection) {
  return (dispatch) => {
    dispatch(setLoading(true));
    let endpoint = `${types.BASE_API}/users/${getUserId()}/folders`;
    return fetch(endpoint, {
      method: 'post',
      headers: getHeaders(),
      body: JSON.stringify(newFolder)
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(json => {
        // add the folder id to the body before save the collection
        newCollection['folderId'] = json.folder._id;
        dispatch(updateFolders(json.folders));
        // save new collection
        dispatch(saveCollection(newCollection));
        dispatch(setLoading(false));
      }).catch((err) => {
        dispatch(setNotification(types.RESPONSE_FAILED, err.message));
        dispatch(setLoading(false));
      })
  }
}

/**
 * Save collection to specific folder
 * @param body
 * @returns {function()}
 */
export function saveCollection(body) {
  return (dispatch) => {
    dispatch(setLoading(true));
    let endpoint = `${types.BASE_API}/users/${getUserId()}/folders/${body.folderId}/collections`;
    return fetch(endpoint, {
      method: 'post',
      headers: getHeaders(),
      body: JSON.stringify(body)
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(() => {
        dispatch(setNotification(types.RESPONSE_SUCCESSFUL));
        dispatch(setLoading(false));
      }).catch((err) => {
        dispatch(setLoading(false));
        dispatch(setNotification(types.RESPONSE_FAILED, err.message));
      })
  }
}
