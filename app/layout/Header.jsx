import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {authLogout} from '../actions/auth.js';
import { pushPath } from 'redux-simple-router';

class Header extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
    }

    handleLogoutClick = () => {
        const {dispatch} = this.props;
        dispatch(authLogout());
        dispatch(pushPath('/login'));
    }

  render() {
      return (
          <header className="app-header">
              <div>
                <h2>jcDemo后台管理系统</h2>
              </div>
              <div><p>管理员名字</p></div>
              <div>
                  <a>修改密码</a>
                      &nbsp; / &nbsp;
                  <a onClick={this.handleLogoutClick}>退出</a>
              </div>
          </header>
      );
  }
}

export default connect(null)(Header);
