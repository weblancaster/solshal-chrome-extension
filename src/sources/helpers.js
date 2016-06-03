import jwtDecode from 'jwt-decode';

/**
 * Log user out cleaning user session
 */
export function logOut() {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('username');
}

/**
 * Save key/value in session
 * @param key [to be saved in session]
 * @param value [value for the key]
 */
export function saveSessionKey(key, value) {
  localStorage.setItem(key, value);
}

/**
 * Check if userId is in session
 * otherwise save in case user is authenticated
 * and return userId
 * @returns {*} [user id or null]
 */
export function getUserId() {
  if ( loggedIn() && localStorage.getItem('userId') === null ) {
    let token = getToken();
    let userId = decodeToken(token).userId;
    saveSessionKey('userId', userId);
    return userId;
  } else if ( loggedIn() && localStorage.getItem('userId') !== null ) {
    return localStorage.getItem('userId');
  } else {
    return null;
  }
}

/**
 * Check if username is in session
 * otherwise save in case user is authenticated
 * and return username
 * @returns {*} [user id or null]
 */
export function getUserName() {
  if ( loggedIn() && localStorage.getItem('username') === null ) {
    let token = getToken();
    let username = decodeToken(token).username;
    saveSessionKey('username', username);
    return username;
  } else if ( loggedIn() && localStorage.getItem('username') !== null ) {
    return localStorage.getItem('username');
  } else {
    return null;
  }
}

/**
 * Return token or null if
 * token nonexistent
 */
export function getToken() {
  return localStorage.getItem('token');
}

/**
 * Check if there's any user logged in
 * and return true or false
 * @returns {boolean}
 */
export function loggedIn() {
  return !!localStorage.getItem('token');
}

/**
 * Format/decode token to json
 * @param token
 */
export function decodeToken(token) {
  return jwtDecode(token);
}

/**
 * Check the response status and return
 * response or throw error
 * @param response
 * @returns {*} response or throw error
 */
export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    let error = new Error(response);
    return response
      .json()
      .then(json => {
        error.response = response;
        error.message = json.message;
        throw error
      });
  }
}

/**
 * Parse response to json and return
 * @param response
 * @returns {*} json
 */
export function parseJSON(response) {
  return response.json()
}

/**
 * Return false if argument doesn't match url pattern
 * and true if it does
 * @param url
 * @returns {boolean}
 */
export function isUrl(url) {
  return /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i.test(url);
}

/**
 * Create HTTP headers to requests
 * @returns {{Accept: string, Content-Type: string, x-access-token}}
 */
export function getHeaders() {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'x-access-token': localStorage.getItem('token')
  }
}
