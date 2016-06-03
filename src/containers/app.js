require('normalize.css/normalize.css');
require('styles/App.css');

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Notification from './notification';
import Authorized from './authorized';
import Unauthorized from './../components/unauthorized';


class App extends Component {
  resolveComponent() {
    let { isAuthenticated, dispatch } = this.props;

    if ( isAuthenticated ) {
        return <Authorized />
      } else {
        return <Unauthorized dispatch={dispatch} />
      }
  }

  render() {
    return (
      <div>
        {this.resolveComponent()}
        <Notification />
      </div>
    )
  }
}

function mapStateToProps(state) {
  let { isAuthenticated } = state.auth;
  return {
    isAuthenticated: isAuthenticated
  }

}

export default connect(mapStateToProps)(App);
