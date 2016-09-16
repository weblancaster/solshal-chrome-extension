import React, {Component} from 'React';
import { logout } from '../shared/api.actions';

class Header extends Component {
  logout(e) {
    e.preventDefault();
    let { dispatch } = this.props;
    dispatch(logout());
  }

  render() {
    let { username } = this.props;

    return (
      <ul className="header">
        <li>
          <a href={`http://www.solshal.com/${username}`} title="go to dashboard" target="_blank">dashboard</a>
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
