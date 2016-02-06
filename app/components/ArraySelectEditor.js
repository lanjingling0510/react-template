import React, {Component, PropTypes} from 'react';
import Selected from '../components/Selected.js';


class ArraySelectEditor extends Component {
    static propTypes = {
        action: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.bool,
        ]),
        data: PropTypes.array,
        selectTypes: PropTypes.array,
    }

    static defaultProps = {
        data: [],
        selectTypes: [
            {
                label: 'select01',
                value: 'value01',
            }, {
                label: 'select02',
                value: 'value02',
            },
        ],
    }

    state = {
        data: this.props.data,
    }

    handleAddItemClick = () => {
        const data = this.state.data;
        this.setState({
            data: [
                ...data,
                {_id: '05', value: 'value01'},
            ],
        });
    }

    handleDeleteItemClick = (index) => {
        return () => {
            const data = this.state.data;
            this.setState({
                data: [
                    ...data.slice(0, index),
                    ...data.slice(index + 1),
                ],
            });
        };
    }

    renderEditItem = (item, index) => {
        return (
            <div key={index} className="form-group row-align-center">
                <Selected
                    data={this.props.selectTypes}
                    value={item.value}
                    size="sm"/>
                <i className="fa fa-lg fa-times-circle text-danger margin-left-sm"
                    onClick={this.handleDeleteItemClick(index)}/>
            </div>
        );
    }

    renderReadOnlyItem = (item, index) => {
        return (
            <div key={index} className="form-group">
                <div className="field-readOnly">{item.value}</div>
            </div>
        );
    }

    renderAddBtn = () => {
        return (
            <div className="form-group">
                <div className="text-right col-1">
                    <i className="fa fa-lg fa-plus-circle text-muted"
                        onClick={this.handleAddItemClick}>
                    </i>
                </div>
            </div>
        );
    }

    render() {
        const {action} = this.props;
        const {data} = this.state;
        return (
            <div className="form">
                {
                    action === 'edit' ?
                    data.map(this.renderEditItem) :
                    data.map(this.renderReadOnlyItem)
                }
                {
                    action === 'edit' ?
                    this.renderAddBtn() : null
                }
            </div>
        );
    }
}

export default ArraySelectEditor;
