import React, { Component } from "react";
import { connect } from "react-redux";
import { importBookmarks } from '../shared/api.actions';
import Button from '../shared/button.container';

class Options extends Component {
  getBookmarks() {
    chrome.bookmarks.getTree((bookmarksTree) => {
      const { dispatch } = this.props;
      dispatch(importBookmarks(bookmarksTree));
    });
  }

  render() {
    return (
      <div className="app-form">
        <div className="app-form_container">
          <h1 className="title">Options</h1>
          <ul className="options">
            <li className="options_container">
              <span className="options_container_title">Import your Chrome bookmarks to Solshal.com?</span>
              <Button label="Yes" onClick={this.getBookmarks.bind(this)} />
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps)(Options);
