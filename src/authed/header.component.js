import React, { Component } from 'react';
import { BASE } from '../shared/constants';
import { logout } from '../shared/api.actions';
import { displayOptions } from '../shared/app.actions';

class Header extends Component {
  logout(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(logout());
  }

  displayOptions(value, e) {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(displayOptions(value));
  }

  render() {
    let { username } = this.props;

    return (
      <ul className="header">
        <li>
          <a title="Home page" onClick={this.displayOptions.bind(this, false)}>Home</a>
        </li>
        <li>
          <a title="Options page" onClick={this.displayOptions.bind(this, true)}>Options</a>
        </li>
        <li>
          <a href={`${BASE}/${username}`} title="Go to dashboard" target="_blank">Dashboard</a>
        </li>
        <li>
          <a title="Logout" onClick={this.logout.bind(this)}>Logout</a>
        </li>
      </ul>
    )
  }
}

Header.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  username: React.PropTypes.string.isRequired
};

export default Header;
