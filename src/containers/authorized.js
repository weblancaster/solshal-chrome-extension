"use strict";

import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDom from 'react-dom';
import {
  getCurrentTabUrl
} from '../actions/app';
import {
  getFolders,
  saveCollection,
  addNewFolderAndSaveCollection
} from '../actions/api';
import {
  isUrl
} from '../sources/helpers';

class Authorized extends Component {
  constructor(props) {
    super(props);
    this.selectedFolderId = null;
  }

  componentDidMount() {
    this.props.dispatch(getFolders());
    this.props.dispatch(getCurrentTabUrl());
  }

  add(e) {
    e.preventDefault();

    let url = ReactDom.findDOMNode(this.refs.url).value;
    let tags = ReactDom.findDOMNode(this.refs.tags).value;
    let notes = ReactDom.findDOMNode(this.refs.notes).value;
    let newFolder = ReactDom.findDOMNode(this.refs.newFolder).value;

    if ( !isUrl(url) ) {
      // dispatch validation error message
      return false;
    }

    let newCollection = {
      url: url,
      tags: tags,
      notes: notes
    };

    if ( newFolder !== '' ) {
      this.props.dispatch(addNewFolderAndSaveCollection({name: newFolder}, newCollection));
    } else if ( !!this.selectedFolderId ) {
      newCollection['folderId'] = this.selectedFolderId;
      this.props.dispatch(saveCollection(newCollection));
    }
  }

  chooseFolder(e) {
    e.preventDefault();
    this.selectedFolderId = e.target.value;
  }

  renderFoldersDropdown(folder) {
    if ( folder.name === 'random' ) {
      // select default folder in case user
      // doesn't choose any nor add new folder
      this.selectedFolderId = folder._id
    }
    return (
      <option key={`${folder._id}`} value={`${folder._id}`}>{`${folder.name.toLowerCase()}`}</option>
    )
  }

  render() {
    return (
      <div className="app-form">
        <div className="app-form_container">
          <h1 className="title">New collection</h1>
          <form onSubmit={this.add.bind(this)}>
            <label htmlFor="url">
              <input type="text" ref="url" name="url" placeholder="New url" value={this.props.currentTabUrl}/>
            </label>
            <label htmlFor="tags">
              <input type="text" ref="tags" name="tags" placeholder="Tags by space (e.g cat cute)"/>
            </label>
            <label htmlFor="notes">
              <input type="text" ref="notes" name="notes" placeholder="Notes"/>
            </label>
            <label htmlFor="folders" className="column">
              <select name="folders" onChange={this.chooseFolder.bind(this)}>
                <option value="">Select your folder</option>
                {this.props.folders.map((folder) => {
                  return this.renderFoldersDropdown(folder);
                })}
              </select>
              <input type="text" ref="newFolder" name="newFolder" placeholder="Add new folder"/>
            </label>
            <button type="submit" className="app-form_button">save</button>
          </form>
        </div>
      </div>
    )
  }
}

Authorized.propTypes = {
  folders: React.PropTypes.array.isRequired,
  currentTabUrl: React.PropTypes.string
};

function mapStateToProps(state) {
  let { folders } = state.user;
  let { currentTabUrl } = state.app;

  return {
    folders: folders,
    currentTabUrl: currentTabUrl
  }
}

export default connect(mapStateToProps)(Authorized);
