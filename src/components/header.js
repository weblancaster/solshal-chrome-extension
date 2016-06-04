import React, {Component} from 'React';
import { logout } from '../actions/api';

class Header extends Component {
  logout(e) {
    e.preventDefault();
    let { dispatch } = this.props;
    dispatch(logout());
  }

  resolveLogout() {
    let { isAuthenticated } = this.props;

    if ( isAuthenticated ) {
      return (
        <a className="logout" title="logout" onClick={this.logout.bind(this)}>logout</a>
      )
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className="header">
        {this.resolveLogout()}
      </div>
    )
  }
}

export default Header;
