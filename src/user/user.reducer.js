"use strict";

import * as types from '../shared/constants';

const initialState = {
  folders: []
};

function user(state = initialState, action) {
  switch ( action.type ) {
    case types.SET_FOLDERS:
      return Object.assign({}, state, {
        folders: action.folders
      });
    default:
      return state;
  }
}

export default user;
