import React, { PropTypes, Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import FormEditor from '../../components/FormEditor.js';
import {fetchUser, editUser} from '../../actions/users.js';


class UserEditPage extends Component {
    static propTypes = {
        params: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
        user: PropTypes.object,
    }

    static defaultProps = {
        user: {},
    }

    componentDidMount = () => {
        const {dispatch, params} = this.props;
        dispatch(fetchUser(params._id));
    }

    onSaveUser = (user) => {
        const {dispatch} = this.props;
        dispatch(editUser(user));
    }

    render() {
        const {user} = this.props;
        return (
            <div>
                <div className="margin-bottom">
                    <ol className="breadcrumb">
                        <li><Link to="account/user">普通用户账号</Link></li>
                        <li className="active">账号:{user._id}</li>
                    </ol>
                </div>
                <FormEditor
                    data={user}
                    onSave={this.onSaveUser}/>
            </div>
        );
    }
}

function selectCurrentUser(state) {
    const user = state.users.find(User => User._id === state.currentUser);
    return {user};
}

export default connect(selectCurrentUser)(UserEditPage);
