import React, { Component } from 'react';
import { connect } from 'react-redux';
import Main from '../components/main';

class App extends Component {
  render() {
    return <Main />;
  }
}

function mapStateToProps(state) {
  let { auth } = state;
  return {
    auth: auth
  };
}

export default connect(mapStateToProps)(App);
