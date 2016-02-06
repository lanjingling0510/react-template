import React, {Component} from 'react';

class Radio extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.value,
        };

        this.handleRadioChange = this.handleRadioChange.bind(this);
        this.renderRadioOptions = this.renderRadioOptions.bind(this);
    }

    static propTypes = {
        data: React.PropTypes.array.isRequired,
        value: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number,
        ]),
        onChange: React.PropTypes.func,
    }

    static defaultProps = {
        value: null,
        onChange: () => {
        },
    }

    handleRadioChange(event) {
        const target = event.target;

        if (target.value !== this.state.value) {
            this.props.onChange(target.value);
        }

        this.setState({value: target.value});
    }

    renderRadioOptions(value, index) {
        return (
            <label
                key={index}
                htmlFor={value.label}
                className="form-field-checkbox"
            >
                <span className="form-field-checkbox-name">{value.label}</span>
                <label htmlFor={value.label} className="form-field-checkbox-input">
                    <input type="radio"
                           id={value.label}
                           value={value.value}
                           checked={value.value === this.state.value}
                           onChange={this.handleRadioChange}/>
                    <i className="checkbox-icon fa fa-check"></i>
                </label>
            </label>
        );
    }

    render() {
        return (
            <div>{this.props.data.map(this.renderRadioOptions)}</div>
        );
    }
}

export default Radio;
