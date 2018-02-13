'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddNewCollection from './addNewCollection.container';
import Options from './options.container';

class Authorized extends Component {
  render() {
    const { displayOptions } = this.props;

    if (displayOptions) {
      return <Options />
    }

    return <AddNewCollection />
  }
}

Authorized.propTypes = {
  folders: React.PropTypes.array,
  currentTabUrl: React.PropTypes.string,
  displayOptions: React.PropTypes.bool
};

function mapStateToProps(state) {
  const { displayOptions } = state.app;

  return {
    displayOptions
  }
}

export default connect(mapStateToProps)(Authorized);
