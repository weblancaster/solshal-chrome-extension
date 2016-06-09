require('normalize.css/normalize.css');
require('styles/App.css');

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Notification from './notification';
import Authorized from './authorized';
import Unauthorized from '../components/unauthorized';
import Header from '../components/header';

import { verifyToken } from '../actions/api';

class App extends Component {
  componentDidMount() {
    let { dispatch, isAuthenticated } = this.props;
    if ( isAuthenticated ) {
      dispatch(verifyToken());
    }
  }

  resolveComponent() {
    let { isAuthenticated, dispatch } = this.props;

    if ( isAuthenticated) {
        return <Authorized />
      } else {
        return <Unauthorized dispatch={dispatch} />
      }
  }

  render() {
    let { isAuthenticated, dispatch, username } = this.props;

    return (
      <div>
        {(isAuthenticated) ? <Header dispatch={dispatch} username={username} /> : null}
        {this.resolveComponent()}
        <Notification />
      </div>
    )
  }
}

function mapStateToProps(state) {
  let { isAuthenticated, username } = state.auth;
  return {
    username: username,
    isAuthenticated: isAuthenticated
  }
}

export default connect(mapStateToProps)(App);
