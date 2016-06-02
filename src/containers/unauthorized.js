import React, { Component } from 'react';
import { connect } from 'react-redux';

class Unauthorized extends Component {
  render() {
    return (
      <div>
        unauthorized user view
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {

  }
}

export default connect(mapStateToProps)(Unauthorized);
