import React, { Component } from 'react';
import { connect } from 'react-redux';
import Main from '../components/Main';

class App extends Component {
  render() {
    return <Main />;
  }
}

function mapStateToProps(state) {
  const props = {};
  return props;
}

export default connect(mapStateToProps)(App);
