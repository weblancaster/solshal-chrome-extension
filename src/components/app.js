require('normalize.css/normalize.css');
require('styles/App.css');

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loggedIn } from '../sources/helpers';
import Authorized from './../containers/authorized';
import Unauthorized from './../containers/unauthorized';

class App extends Component {
  render() {
    if ( loggedIn() ) {
      return <Authorized />
    } else {
      return <Unauthorized />
    }
  }
}

function mapStateToProps(state) {
  let { auth } = state;
  return {
    auth: auth
  };
}

export default connect(mapStateToProps)(App);
