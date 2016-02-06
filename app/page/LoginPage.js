import React, { PropTypes, Component } from 'react';
import {connect} from 'react-redux';
import {authLogin} from '../actions/auth.js';
import {showModal} from '../actions/modal.js';
import { pushPath } from 'redux-simple-router';


class LoginPage extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
    }

    handleLoginClick = () => {
        const {dispatch} = this.props;
        const user = {
            username: this.refs.username.value,
            password: this.refs.password.value,
        };
        dispatch(authLogin(user))
        .then(() => {
            dispatch(pushPath('/map'));
        })
        .catch(err => {
            dispatch(showModal({
                type: 'warning',
                content: err,
            }));
        });
    }

    render() {
        return (
            <div className="app-content row-align-center">
                <div className="form center-block" style={{width: '420px'}}>
                    <div className="form-group">
                        <label className="form-label">账号</label>
                        <input
                            type="text"
                            className="form-field-text field-primary"
                            ref="username"
                            />
                    </div>
                    <div className="form-group">
                        <label className="form-label">密码</label>
                        <input
                            type="password"
                            className="form-field-text field-primary"
                            ref="password"
                            />
                    </div>
                    <div className="form-group">
                        <label className="form-label"></label>
                        <button
                            className="btn btn-lg btn-primary"
                            onClick={this.handleLoginClick}
                            >登录</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(null)(LoginPage);
