import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Button from '../containers/button';
import { signin } from '../actions/api';

class Unauthorized extends Component {
  constructor(props) {
    super(props);
  }

  submit(e) {
    e.preventDefault();
    let { dispatch } = this.props;

    const body = {
      email: ReactDOM.findDOMNode(this.refs.email).value,
      password: ReactDOM.findDOMNode(this.refs.password).value
    };

    dispatch(signin(body));
  }

  render() {
    return (
      <div className="app-form">
        <div className="app-form_container">
          <h1 className="title">Sign in</h1>

          <form onSubmit={this.submit.bind(this)}>
            <label htmlFor="email">
              <input type="email" ref="email" name="email" placeholder="email" required />
            </label>
            <label htmlFor="password">
              <input type="password" ref="password" name="password" placeholder="password" required />
            </label>
            <Button label="login" />
          </form>
        </div>
      </div>
    )
  }
}

Unauthorized.propTypes = {
  dispatch: React.PropTypes.func.isRequired
};

export default Unauthorized;
