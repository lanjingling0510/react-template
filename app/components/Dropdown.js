import React, {Component} from 'react';
import classNames from 'classnames';
import Events from '../utils/Events.js';

class Dropdown extends Component {
    static propTypes = {
        data: React.PropTypes.array.isRequired,
        placeholder: React.PropTypes.string,
        value: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number,
            React.PropTypes.object,
        ]),
        onChange: React.PropTypes.func,
    }

    static defaultProps = {
        placeholder: '点击选择...',
        value: null,
        onChange: () => {
        },
    }

    state = {
        value: this.props.value,
        open: false,
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.value !== nextProps.value) {
            this.setState({value: nextProps.value});
        }
    }


    setSelectedState = (isOpen, value) => {
        if (isOpen) {
            this.bindOuterHandlers();
        } else {
            this.unbindOuterHandlers();
        }

        if (!isOpen && value && value !== this.state.value) {
            this.props.onChange(value);
        }

        this.setState({
            open: isOpen,
            value: value ? value : this.state.value,
        });
    }

    handleSelectedClick = (isOpen, value) => {
        this.setSelectedState(isOpen, value);
    }


    // close selected when click outer selected
    handleOuterClick = () => {
        this.setSelectedState(false);
    }

    bindOuterHandlers = () => {
        Events.on(document, 'click', this.handleOuterClick);
    }

    unbindOuterHandlers = () => {
        Events.off(document, 'click', this.handleOuterClick);
    }


    renderSelectOptions = (value, index) => {
        return <li key={index} onClick={this.handleSelectedClick.bind(this, false, value.value)}>{value.label}</li>;
    }

    render() {
        const state = this.state;
        const selectedClasName = classNames(
            'dropdown',
            {
                active: state.open,
            }
        );

        const selectedOptionsClassName = classNames(
            'dropdown-menu',
            {
                ['dropdown-animation-in']: state.open,
                ['dropdown-animation-out']: !state.open,
            }
        );

        const selectedLabel = state.value ?
            this.props.data.find(value => value.value === state.value).label : this.props.placeholder;

        return (
            <div className={selectedClasName}>
                <input
                    className="dropdown-toggle"
                    type="button"
                    value={selectedLabel}
                    onClick={this.handleSelectedClick.bind(this, !state.open, null)}
                    />
                <ul className={selectedOptionsClassName}>
                    {this.props.data.map(this.renderSelectOptions)}
                </ul>
            </div>
        );
    }
}

export default Dropdown;
