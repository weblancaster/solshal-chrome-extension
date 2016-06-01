require('normalize.css/normalize.css');
require('styles/App.css');

import React, { Component } from 'react';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false
    }
  }

  componentDidMount() {
    this.setState({
      status: false
    });
  }

  render() {
    let status = this.state;

    return (
      <div className="index">
        component did mount? {status}
      </div>
    );
  }
}

export default Main;
