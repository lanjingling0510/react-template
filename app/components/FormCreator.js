import React, { PropTypes, Component } from 'react';
import JCFieldEditor from './JCFieldEditor.js';


class FormCreator extends Component {
    static propTypes = {
        data: PropTypes.object.isRequired,
        objectFields: PropTypes.array,
        ignoreFields: PropTypes.array,
        onCreate: PropTypes.func.isRequired,
    }


    static defaultProps = {
        objectFields: ['JCFields'],
        ignoreFields: ['JCLayers', '_id'],
    }

    handleCreateClick = () => {
        const labels = Object.keys(this.props.data);
        const {objectFields, ignoreFields} = this.props;
        const data = {...this.props.data};
        labels.forEach(label => {
            if (objectFields.includes(label)) {
                data[label] = this.refs[label + '-input'].getJCField();
            } else if (ignoreFields.includes(label)) {
                // ...
            } else {
                data[label] = this.refs[label + '-input'].value;
            }
        });
        this.props.onCreate(data);
    }

    renderFields = () => {
        const labels = Object.keys(this.props.data);
        return <div>{labels.map(this.renderField)}</div>;
    }

    renderField = (label) => {
        const {data, objectFields, ignoreFields} = this.props;

        if (objectFields.includes(label)) {
            return (
                <div className="form-group" key={label}>
                    <label className="form-label">{label}</label>
                    <JCFieldEditor
                        ref={label + '-input'}
                        data={data[label]}
                        action={'edit'} />
                </div>
            );
        } else if (ignoreFields.includes(label)) {
            return null;
        }

        return (
            <div className="form-group" key={label}>
                <label className="form-label">{label}</label>
                <input ref={label + '-input'}
                    className="form-field-text form-field-sm field-primary"
                    type="text"
                    defaultValue={data[label]} />
            </div>
        );
    }


    render() {
        return (
            <div className="form">
                <div className="form-group">
                <a
                    className="btn btn-sm btn-info"
                    onClick={this.handleCreateClick}
                    >创建</a>
                </div>
                {this.renderFields()}
            </div>
        );
    }
}

export default FormCreator;
