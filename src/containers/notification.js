import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as types from '../actions/constants';
import { resetNotification } from '../actions/app';

class Notification extends Component {
  constructor(props) {
    super(props);
    this.notificationTimer = null;
  }

  reset() {
    let { dispatch } = this.props;
    clearTimeout(this.notificationTimer);
    // close notification in 4s
    // for some reason this is causing re-render
    this.notificationTimer = setTimeout(() => {
      dispatch(resetNotification());
    }, 4000);
  }

  componentDidMount() {
    this.reset();
  }

  componentDidUpdate() {
    this.reset();
  }

  success() {
    return (
      <div className="notification_content success">
        <i className="fa fa-check" aria-hidden="true"></i>
        <strong className="notification_title">Success!</strong>
      </div>
    )
  }

  failed() {
    let { message } = this.props;
    return (
      <div className="notification_content failed">
        <i className="fa fa-times" aria-hidden="true"></i>
        <strong className="notification_title">Failed</strong>
        <p className="notification_message">{message}</p>
      </div>
    )
  }

  warning() {
    let { message } = this.props;
    return (
      <div className="notification_content warning">
        <i className="fa fa-exclamation" aria-hidden="true"></i>
        <strong className="notification_title">Warning!</strong>
        <p className="notification_message">{message}</p>
      </div>
    )
  }

  resolveMessage() {
    const { response } = this.props;

    if (response === types.RESPONSE_SUCCESSFUL) {
      return this.success();
    }

    if (response === types.RESPONSE_FAILED) {
      return this.failed();
    }

    if (response === types.RESPONSE_WARNING) {
      return this.warning();
    }

    return null; // that way doesn't render anything
  }
  render() {
    let { isOpen } = this.props;
    let classes = ( isOpen ) ? 'notification active' : 'notification';
    return (
      <div className={classes}>
        {this.resolveMessage()}
      </div>
    )
  }
}
function mapStateToProps(state) {
  const { notification } = state.app;
  return {
    response: notification.response,
    message: notification.message,
    isOpen: notification.isOpen
  }
}
export default connect(mapStateToProps)(Notification);