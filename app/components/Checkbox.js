import React, {Component} from 'react';

class Checkbox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.value,
        };

        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.renderCheckboxOptions = this.renderCheckboxOptions.bind(this);
    }

    static propTypes = {
        data: React.PropTypes.array.isRequired,
        value: React.PropTypes.array,
        onChange: React.PropTypes.func,
    }

    static defaultProps = {
        value: [],
        onChange: () => {
        },
    }

    handleCheckboxChange(event) {
        const target = event.target;
        const stateValue = this.state.value.slice();

        if (stateValue.indexOf(target.value) === -1) {
            stateValue.push(target.value);
        } else {
            const index = stateValue.findIndex(value => value === target.value);
            stateValue.splice(index, 1);
        }

        this.props.onChange(stateValue);
        this.setState({value: stateValue});
    }

    renderCheckboxOptions(value, index) {
        return (
            <label
                key={index}
                htmlFor={value.label}
                className="form-field-checkbox"
                >
                <span className="form-field-checkbox-name">{value.label}</span>
                <label htmlFor={value.label} className="form-field-checkbox-input">
                    <input type="checkbox"
                           id={value.label}
                           value={value.value}
                           checked={this.state.value.indexOf(value.value) !== -1}
                           onChange={this.handleCheckboxChange}/>
                    <i className="checkbox-icon fa fa-check"></i>
                </label>
            </label>
        );
    }

    render() {
        return (
            <div>{this.props.data.map(this.renderCheckboxOptions)}</div>
        );
    }
}

export default Checkbox;
