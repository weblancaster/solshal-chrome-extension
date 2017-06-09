import React, { Component } from 'react';
import {
  logout,
  importBookmarks
} from '../shared/api.actions';

class Header extends Component {
  logout(e) {
    e.preventDefault();
    let { dispatch } = this.props;
    dispatch(logout());
  }

  getBookmarks(e) {
    e.preventDefault();
    chrome.bookmarks.getTree((bookmarksTree) => {
      const { dispatch } = this.props;
      dispatch(importBookmarks(bookmarksTree));
    });
  }

  render() {
    let { username } = this.props;

    return (
      <ul className="header">
        <li>
          <a href={`http://www.solshal.com/${username}`} title="go to dashboard" target="_blank">dashboard</a>
        </li>
        <li>
          <a onClick={this.getBookmarks.bind(this)} title="Import to Solshal" target="_blank">Import bookmarks</a>
        </li>
        <li>
          <a title="logout" onClick={this.logout.bind(this)}>logout</a>
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
