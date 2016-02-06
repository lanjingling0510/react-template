import React, { PropTypes, Component } from 'react';
import JCFieldEditor from './JCFieldEditor.js';
import ArraySelectEditor from './ArraySelectEditor.js';

class FormEditor extends Component {
    static propTypes = {
        action: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.bool,
        ]),
        data: PropTypes.object.isRequired,
        JCFields: PropTypes.array,
        ignoreFields: PropTypes.array,
        arraySelectFields: PropTypes.array,
        onSave: PropTypes.func.isRequired,
        onDelete: PropTypes.func,
    }


    static defaultProps = {
        action: null,
        JCFields: ['JCFields'],
        ignoreFields: ['JCLayers', '_id'],
        arraySelectFields: ['用户'],
    }

    state = {
        action: this.props.action,
    }

    handleEditClick = () => {
        this.setState({action: 'edit'});
    }

    handleSaveClick = () => {
        const labels = Object.keys(this.props.data);
        const {JCFields, ignoreFields} = this.props;
        const data = {...this.props.data};
        labels.forEach(label => {
            if (JCFields.includes(label)) {
                data[label] = this.refs[label + '-input'].getJCField();
            } else if (ignoreFields.includes(label)) {
                // ...
            } else {
                data[label] = this.refs[label + '-input'].value;
            }
        });
        this.props.onSave(data);
        this.setState({action: null});
    }

    renderFields = () => {
        const labels = Object.keys(this.props.data);
        return <div>{labels.map(this.renderField)}</div>;
    }

    renderField = (label) => {
        const {action} = this.state;
        const {data, JCFields, ignoreFields, arraySelectFields} = this.props;

        if (JCFields.includes(label)) {
            return (
                <div className="form-group" key={label}>
                    <label className="form-label">{label}</label>
                    <JCFieldEditor
                        ref={label + '-input'}
                        data={data[label]}
                        action={action} />
                </div>
            );
        } else if (ignoreFields.includes(label)) {
            return null;
        } else if (arraySelectFields.includes(label)) {
            return (
                <div className="form-group" key={label}>
                    <label className="form-label">{label}</label>
                    <ArraySelectEditor
                        ref={label + '-input'}
                        data={data[label]}
                        action={action} />
                </div>
            );
        }

        return (
            <div className="form-group" key={label}>
                <label className="form-label">{label}</label>
                <input ref={label + '-input'}
                    className="form-field-text form-field-sm field-primary"
                    readOnly={action === 'edit' && label !== '_id' ? false : true}
                    type="text"
                    defaultValue={data[label]} />
            </div>
        );
    }


    render() {
        const {action} = this.state;
        const {data, onDelete} = this.props;
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
                {this.renderFields()}
            </div>
        );
    }
}

export default FormEditor;
