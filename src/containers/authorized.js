import React, { Component } from 'react';
import { connect } from 'react-redux';

class Authorized extends Component {
  render() {
    return (
      <div>
        autorized user view
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    
  }
}

export default connect(mapStateToProps)(Authorized);
