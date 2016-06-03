require('normalize.css/normalize.css');
require('styles/App.css');

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Authorized from './authorized';
import Unauthorized from './../components/unauthorized';

class App extends Component {
  render() {
    let { isAuthenticated, dispatch } = this.props;

    if ( isAuthenticated ) {
      return <Authorized />
    } else {
      return <Unauthorized dispatch={dispatch} />
    }
  }
}

function mapStateToProps(state) {
  let { isAuthenticated } = state.auth;
  return {
    isAuthenticated: isAuthenticated
  }

}

export default connect(mapStateToProps)(App);
