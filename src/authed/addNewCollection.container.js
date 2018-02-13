import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDom from 'react-dom';
import Button from '../shared/button.container';
import {
  getCurrentTabUrl,
  setCurrentTabUrl
} from '../shared/app.actions';
import {
  getFolders,
  saveCollection,
  addNewFolderAndSaveCollection
} from '../shared/api.actions';
import {
  isUrl
} from '../shared/helpers';

class AddnewCollection extends Component {
  constructor(props) {
    super(props);
    this.selectedFolderId = null;
  }

  updateUrl(e) {
    let { dispatch } = this.props;
    let value = e.target.value;

    dispatch(setCurrentTabUrl(value));
  }

  componentDidMount() {
    this.props.dispatch(getFolders());
    this.props.dispatch(getCurrentTabUrl());
  }

  add(e) {
    e.preventDefault();

    const url = ReactDom.findDOMNode(this.refs.url).value;
    const tags = ReactDom.findDOMNode(this.refs.tags).value;
    const notes = ReactDom.findDOMNode(this.refs.notes).value;
    const newFolder = ReactDom.findDOMNode(this.refs.newFolder).value;

    if (!isUrl(url)) {
      // dispatch validation error message
      return false;
    }

    const newCollection = {
      url: url,
      tags: tags,
      notes: notes
    };

    if (newFolder !== '') {
      this.props.dispatch(addNewFolderAndSaveCollection({ name: newFolder }, newCollection));
    } else if (!!this.selectedFolderId) {
      newCollection['folderId'] = this.selectedFolderId;
      this.props.dispatch(saveCollection(newCollection));
    }
  }

  chooseFolder(e) {
    e.preventDefault();
    this.selectedFolderId = e.target.value;
  }

  renderFoldersDropdown() {
    if (this.props.folders && this.props.folders.length > 0) {
      return this.props.folders.map((folder) => {
        if (folder.name === 'random') {
          // select default folder in case user
          // doesn't choose any nor add new folder
          this.selectedFolderId = folder._id
        }
        return (
          <option key={`${folder._id}`} value={`${folder._id}`}>{`${folder.name.toLowerCase()}`}</option>
        )
      })
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className="app-form">
        <div className="app-form_container">
          <h1 className="title">New collection</h1>
          <form onSubmit={this.add.bind(this)}>
            <label htmlFor="url">
              <input type="text" ref="url" name="url" placeholder="Url" value={this.props.currentTabUrl} onChange={this.updateUrl.bind(this)} />
            </label>
            <label htmlFor="tags">
              <input type="text" ref="tags" name="tags" placeholder="Tags by space (e.g cat cute)" />
            </label>
            <label htmlFor="notes">
              <input type="text" ref="notes" name="notes" placeholder="Notes" />
            </label>
            <label htmlFor="folders" className="column">
              <select name="folders" onChange={this.chooseFolder.bind(this)}>
                <option value="">Select folder</option>
                {this.renderFoldersDropdown()}
              </select>
              <input type="text" ref="newFolder" name="newFolder" placeholder="New folder" />
            </label>
            <Button label="save" />
          </form>
        </div>
      </div>
    )
  }
}

AddnewCollection.propTypes = {
  folders: React.PropTypes.array,
  currentTabUrl: React.PropTypes.string,
  tools: React.PropTypes.bool
};

function mapStateToProps(state) {
  const { folders } = state.user;
  const { currentTabUrl } = state.app;

  return {
    folders: folders,
    currentTabUrl: currentTabUrl
  }
}

export default connect(mapStateToProps)(AddnewCollection);
