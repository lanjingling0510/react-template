import React, { PropTypes, Component } from 'react';
import Dropdown from './Dropdown.js';

class JCFieldEditor extends Component {
    static propTypes = {
        action: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.bool,
        ]),
        data: PropTypes.object,
        JCFieldTypes: PropTypes.arrayOf(PropTypes.string),
    }

    static defaultProps = {
        data: {},
        JCFieldTypes: [
            'DOUBLE',
            'INTEGER',
            'TEXT',
            'BLOB',
        ],
    }

    state = {
        data: this.props.data,
    }

    handleAddItemClick = () => {
        const data = this.state.data;
        const JCFieldTypes = this.props.JCFieldTypes;
        this.setState({
            data: {...data, [Symbol()]: JCFieldTypes[0]},
        });
    }


    handleDeleteItemClick = (label) => {
        const data = {...this.state.data};
        delete data[label];
        return () => {
            this.setState({
                data: data,
            });
        };
    }

    getJCField = () => {
        const data = this.state.data;
        const refs = this.refs;
        const result = {};
        Reflect.ownKeys(data).forEach((label, index) => {
            const key = refs[`input-${index}`].value;
            if (key) result[key] = refs[`select-${index}`].value;
        });

        return result;
    }

    renderItem = (label, index) => {
        const JCFieldTypes = this.props.JCFieldTypes;
        const data = this.state;
        const action = this.props.action;
        return (
            <div className="row row-no-padding row-no-margin row-align-center" key={index}>
                <input
                    className="col-1"
                    ref={`input-${index}`}
                    defaultValue={typeof label === 'symbol' ? '' : label}
                    readOnly={action === 'edit' ? false : true}
                    />
                <select
                    className="form-field-text form-field-sm field-primary col-1"
                    ref={`select-${index}`}
                    defaultValue={data[label]}
                    disabled={action === 'edit' ? false : true}
                    >
                    {JCFieldTypes.map(this.renderJCFieldType)}
                </select>
                <i className="fa fa-lg fa-times-circle text-danger margin-left-sm"
                    style={{display: action === 'edit' ? '' : 'none'}}
                    onClick={this.handleDeleteItemClick(label)}>
                </i>
            </div>
        );
    }

    renderJCFieldType = (JCFieldType, index) => {
        return (
            <option key={index} value={JCFieldType}>{JCFieldType}</option>
        );
    }

    render() {
        const {data} = this.state;
        const {action} = this.props;
        return (
                <Dropdown
                    title="feature附加属性"
                    btnStype={action === 'edit' ? 'btn-primary' : null}>
                    {Reflect.ownKeys(data).map(this.renderItem)}
                    <div className="text-right">
                        <i className="fa fa-lg fa-plus-circle text-muted"
                            style={{display: action === 'edit' ? '' : 'none'}}
                            onClick={this.handleAddItemClick}>
                        </i>
                    </div>
                </Dropdown>
        );
    }
}

export default JCFieldEditor;
