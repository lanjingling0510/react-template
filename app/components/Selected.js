import React, {Component} from 'react';
import classNames from 'classnames';
import Events from '../utils/Events.js';

class Selected extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.value,
            open: false,
        };

        this.setSelectedState = this.setSelectedState.bind(this);
        this.handleOuterClick = this.handleOuterClick.bind(this);
        this.bindOuterHandlers = this.bindOuterHandlers.bind(this);
        this.unbindOuterHandlers = this.unbindOuterHandlers.bind(this);
        this.renderSelectOptions = this.renderSelectOptions.bind(this);
    }

    static propTypes = {
        data: React.PropTypes.array.isRequired,
        placeholder: React.PropTypes.string,
        theme: React.PropTypes.string,
        value: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number,
        ]),
        onChange: React.PropTypes.func,
    }

    static defaultProps = {
        placeholder: '点击选择...',
        theme: 'primary',
        value: null,
        onChange: () => {
        },
    }


    setSelectedState(isOpen, value) {
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

    handleSelectedClick(isOpen, value) {
        this.setSelectedState(isOpen, value);
    }


    // close selected when click outer selected
    handleOuterClick() {
        this.setSelectedState(false);
    }

    bindOuterHandlers() {
        Events.on(document, 'click', this.handleOuterClick);
    }

    unbindOuterHandlers() {
        Events.off(document, 'click', this.handleOuterClick);
    }


    renderSelectOptions(value, index) {
        return <li key={index} onClick={this.handleSelectedClick.bind(this, false, value.value)}>{value.label}</li>;
    }

    render() {
        const state = this.state;
        const selectedClasName = classNames(
            'form-field-select',
            'field-' + this.props.theme,
            {
                active: state.open,
            }
        );

        const selectedOptionsClassName = classNames(
            'select-list',
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

export default Selected;
