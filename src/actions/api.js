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
} from '../sources/helpers';
import {
  setNotification
} from './app';

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
    if ( !loggedIn() ) {
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
export function verifyToken(token) {
  return (dispatch) => {
    return fetch(`${types.BASE_API}/auth/verify`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({token : token})
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(json => {
        return json.isValid;
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
      })
      .catch((err) => {
        dispatch(unauthed());
        dispatch(setNotification(types.RESPONSE_FAILED, err.message));
      })
  }
}

/**
 * Get latest folders
 * once successful set current folder if existent
 * @param currentFolderParam {string}
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
 * @param currentFolderParam
 * @returns {function()}
 */
export function addNewFolderAndSaveCollection(newFolder, newCollection) {
  return (dispatch) => {
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
      }).catch((err) => {
        dispatch(setNotification(types.RESPONSE_FAILED, err.message));
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
    let endpoint = `${types.BASE_API}/users/${getUserId()}/folders/${body.folderId}/collections`;
    return fetch(endpoint, {
      method: 'post',
      headers: getHeaders(),
      body: JSON.stringify(body)
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(json => {
        dispatch(setNotification(types.RESPONSE_SUCCESSFUL));
      }).catch((err) => {
        dispatch(setNotification(types.RESPONSE_FAILED, err.message));
      })
  }
}
