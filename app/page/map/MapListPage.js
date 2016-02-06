import React, { PropTypes, Component } from 'react';
import {connect} from 'react-redux';
import makeActionDispatch from '../../utils/makeActionDispatch.js';
import {fetchJCProfilesIfNeeded, editJCProfile, selectJCProfile} from '../../actions/JCProfiles.js';
import {Link} from 'react-router';
import Detail from '../../layout/Detail.jsx';
import Dropdown from '../../components/Dropdown.js';
import ProfileEditor from './ProfileEditor.js';

class MapListPage extends Component {
    static propTypes = {
        fetchJCProfilesIfNeeded: PropTypes.func.isRequired,
        editJCProfile: PropTypes.func.isRequired,
        selectJCProfile: PropTypes.func.isRequired,
        JCProfiles: PropTypes.array,
        currentProfile: PropTypes.number,
    }

    static defaultProps = {
        JCProfiles: [],
    }

    componentDidMount() {
        const {fetchJCProfilesIfNeeded: get, selectJCProfile: select} = this.props;
        get({page: 1}).then((profiles) => {
            select(profiles[0].JCMapId);
        });
    }

    handleSelectProfileClick = (profile) => () => {
        const {selectJCProfile: select} = this.props;
        select(profile.JCMapId);
    }

    renderItem = (profile) => {
        return (
            <tr key={profile.JCMapId}
                onClick={this.handleSelectProfileClick(profile)}
                >
                <td>{profile.JCProjectName}</td>
                <td>{profile.author}</td>
                <td></td>
                <td>{profile.createdAt}</td>
                <td>
                    <Link className="text-info" to={`/map/${profile._id}`}>修改</Link> / <a className="text-danger">删除</a>
                </td>
            </tr>
        );
    }

    render() {
        const {JCProfiles, currentProfile} = this.props;
        const selectedData = {
            data: [
                {
                    label: '应用类型1',
                    value: '应用类型1',
                },
                {
                    label: '应用类型2',
                    value: '应用类型2',
                },
            ],
            value: '应用类型1',
        };
        return (
            <div className="app-content row height100 row-no-margin">
                <div className="col-1 overflowY margin">
                    <div className="breadcrumb">
                        <li className="active">地图管理</li>
                    </div>
                    <div className="row row-align-center row-justify row-no-margin">
                        <h4 className="color-gray-text">地图总数: 2</h4>
                        <div>
                            <div className="form-inline">
                                <Link className="btn btn-primary" to="/map/create">创建地图</Link>
                            </div>
                            <div className="form-inline">
                                <label className="form-label" style={{ width: '30px'}} ><i className="fa fa-search"></i></label>
                                <input className="field-primary" type="text" placeholder="编号/归属者/名字"/>
                            </div>
                        </div>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>名称</th>
                                <th>所在地</th>
                                <th>归属者</th>
                                <th><Dropdown {...selectedData}/></th>
                                <th>创建时间</th>
                            </tr>

                        </thead>
                        <tbody>
                            {JCProfiles.map(this.renderItem)}
                        </tbody>
                    </table>
                </div>
                <Detail title="地图属性">
                    <ProfileEditor
                        data={JCProfiles.find(val => val.JCMapId === currentProfile)}
                        onSave={this.props.editJCProfile}/>
                </Detail>
            </div>
        );
    }
}

function selectJCProfiles(state) {
    return {JCProfiles: state.JCProfiles, currentProfile: state.currentJCProfile};
}

function selectAction(dispatch) {
    return {
        fetchJCProfilesIfNeeded: makeActionDispatch(fetchJCProfilesIfNeeded, dispatch),
        editJCProfile: makeActionDispatch(editJCProfile, dispatch),
        selectJCProfile: makeActionDispatch(selectJCProfile, dispatch),
    };
}

export default connect(selectJCProfiles, selectAction)(MapListPage);
