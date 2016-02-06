import React, { PropTypes, Component } from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {createJCProfile} from '../../actions/JCProfiles.js';

class MapCreatePage extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
    }

    handleCreateProfileClick = () => {
        const {dispatch} = this.props;
        const refs = this.refs;
        const profile = {
            JCProjectName: refs.JCProjectName.value,
            JCMapCapacity: refs.JCMapCapacity.value,
        };
        dispatch(createJCProfile(profile));
    }

    render() {
        return (
            <div className="margin app-content">
                <div className="breadcrumb">
                    <li><Link to="/map">地图管理</Link></li>
                    <li className="active">新建地图</li>
                </div>

                <div>
                    <div className="form center-block">
                            <div className="form-group">
                                <label className="form-label">地图名称</label>
                                <input ref="JCProjectName"
                                    className="form-field-text form-field-sm field-primary"
                                    type="text"
                                    defaultValue="" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">地图容量</label>
                                <input ref="JCMapCapacity"
                                    className="form-field-text form-field-sm field-primary"
                                    type="text"
                                    defaultValue="" />
                            </div>
                            <div className="form-group row-justify-end">
                                <a className="btn btn-info"
                                    onClick={this.handleCreateProfileClick}
                                    >创建</a>
                            </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(null)(MapCreatePage);
