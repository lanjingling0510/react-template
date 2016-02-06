import React, { PropTypes, Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {fetchUsersIfNeeded} from '../../actions/users.js';


class UserListPage extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        users: PropTypes.array,
    }

    static defaultProps = {
        users: [],
    }

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(fetchUsersIfNeeded({page: 1}));
    }

    renderItem = (user) => {
        return (
            <tr key={user._id}>
                <td>{user.username}</td>
                <td><Link className="text-info" to={`/account/user/${user._id}`}>{user.nickname}</Link></td>
                <td>{user.phone}</td>
                <td>{user.createdAt}</td>
                <td>{user.createdPersion}</td>
                <td>{user.mapAuth}</td>
                <td>{user.arAuth}</td>
                <td>
                    <a className="text-danger">删除</a>
                </td>
            </tr>
        );
    }

    render() {
        const {users} = this.props;
        return (
            <div>
                <table className="table">
                    <thead>
                    <tr>
                        <th>账号名</th>
                        <th>昵称</th>
                        <th>手机</th>
                        <th>创建时间</th>
                        <th>创建人</th>
                        <th>地图权限</th>
                        <th>AR设备控制权限</th>
                        <th>操作</th>
                    </tr>

                    </thead>
                    <tbody>
                        {users.map(this.renderItem)}
                    </tbody>
                </table>
            </div>
        );
    }
}

function selectUsers(state) {
    return {users: state.users};
}

export default connect(selectUsers)(UserListPage);
