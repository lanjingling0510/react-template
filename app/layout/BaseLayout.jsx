import {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {authLoginByStore} from '../actions/auth.js';
import { pushPath } from 'redux-simple-router';

class BaseLayout extends Component {
  static propTypes = {
      children: PropTypes.object,
      dispatch: PropTypes.func.isRequired,
  }

  componentWillMount() {
      // 判断是否有登录缓存
      const {dispatch} = this.props;
      const accessToken = localStorage.accessToken;
      if (accessToken) {
          dispatch(authLoginByStore(accessToken));
      } else {
          dispatch(pushPath('/login'));
      }
  }

  render() {
      return this.props.children;
  }
}

export default connect(null)(BaseLayout);
