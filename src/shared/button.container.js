import React, { Component } from 'react';
import { connect } from 'react-redux';

class Button extends Component {
  resolveContent() {
    let { isLoading, label } = this.props;

    if ( isLoading ) {
      return (
        <div className="spinner">
          <div className="bounce1"></div>
          <div className="bounce2"></div>
          <div className="bounce3"></div>
        </div>
      )
    } else {
      return label;
    }
  }

  render() {
    return (
      <button type="submit" className="app-form_button">
        {this.resolveContent()}
      </button>
    )
  }
}

function mapStateToProps(state) {
  let { isLoading } = state.app;

  return {
    isLoading: isLoading
  }
}

export default connect(mapStateToProps)(Button);
