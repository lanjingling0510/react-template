import React, { PropTypes, Component } from 'react';

class ProfileEditor extends Component {
    static propTypes = {
        action: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.bool,
        ]),
        data: PropTypes.object,
        onSave: PropTypes.func.isRequired,
        onDelete: PropTypes.func,
    }


    static defaultProps = {
        action: null,
        data: {},
    }

    state = {
        data: this.props.data,
        action: this.props.action,
    }


    componentWillReceiveProps(nextProps) {
        this.setState({data: nextProps.data});
    }

    handleEditClick = () => {
        this.setState({action: 'edit'});
    }

    handleSaveClick = () => {
        this.props.onSave(this.state.data);
    }

    handleInputChange = (label) => (event) => {
        const data = this.props.data;
        this.setState({
            data: {...data, [label]: event.target.value},
        });
    }

    render() {
        const {action, data} = this.state;
        const {onDelete} = this.props;
        return (
            <div className="form">
                <div className="form-group">
                <a
                    className="btn btn-sm btn-info"
                    onClick={this.handleEditClick}
                    style={{display: action === 'edit' ? 'none' : 'block'}}
                    >编辑</a>
                <a
                    className="btn btn-sm btn-warning"
                    onClick={this.handleSaveClick}
                    style={{display: action === 'edit' ? 'block' : 'none'}}
                    >保存</a>
                <a
                    className="btn btn-sm btn-danger"
                    onClick={onDelete && onDelete.bind(null, data._id)}
                    style={{display: onDelete ? '' : 'none'}}
                    >删除</a>
                </div>
                <div className="form-group">
                    <label className="form-label small">地图编号</label>
                    <input ref="_id"
                        className="form-field-text form-field-sm field-primary"
                        readOnly
                        type="text"
                        onChange={this.handleInputChange('JCMapId')}
                        value={data.JCMapId} />
                </div>
                <div className="form-group">
                    <label className="form-label small">地图名称</label>
                    <input ref="JCProjectName"
                        className="form-field-text form-field-sm field-primary"
                        readOnly={action === 'edit' ? false : true}
                        type="text"
                        onChange={this.handleInputChange('JCProjectName')}
                        value={data.JCProjectName} />
                </div>
                <div className="form-group">
                    <label className="form-label small">地图容量</label>
                    <input ref="JCMapCapacity"
                        className="form-field-text form-field-sm field-primary"
                        readOnly={action === 'edit' ? false : true}
                        type="text"
                        onChange={this.handleInputChange('JCMapCapacity')}
                        value={data.JCMapCapacity} />
                </div>
            </div>
        );
    }
}

export default ProfileEditor;
