import React from 'react';
import classNames from 'classnames';
import Events from '../utils/Events.js';
import classPrefix from '../decorators/classPrefix';

/*
 *  react component Dropdown
 * */


@classPrefix('dropdown') class Dropdown extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
        };

        this.setDropdownState = this.setDropdownState.bind(this);
        this.handleDropdownClick = this.handleDropdownClick.bind(this);
        this.handleOuterClick = this.handleOuterClick.bind(this);
        this.bindOuterHandlers = this.bindOuterHandlers.bind(this);
        this.unbindOuterHandlers = this.unbindOuterHandlers.bind(this);
    }

    static propTypes = {
        title: React.PropTypes.node.isRequired,
        btnStype: React.PropTypes.string,
        onOpen: React.PropTypes.func, // open callback
        onClose: React.PropTypes.func, // close callback
    }

    static defaultProps = {
        btnStype: 'btn-primary',
    }

    componentWillMount() {
        console.log('dropdown componentWillMount...');
        this.unbindOuterHandlers();
    }

    setDropdownState(state, callback) {
        if (state) {
            this.bindOuterHandlers();
        } else {
            this.unbindOuterHandlers();
        }

        this.setState({
            open: state,
        }, function () {
            callback && callback();
            state && this.props.onOpen && this.props.onOpen();
            !state && this.props.onClose && this.props.onClose();
        });
    }

    handleDropdownClick(e) {
        this.setDropdownState(!this.state.open);
    }

    // close dropdown when click outer dropdown
    handleOuterClick() {
        this.setDropdownState(false);
    }

    bindOuterHandlers() {
        Events.on(document, 'click', this.handleOuterClick);
    }

    unbindOuterHandlers() {
        Events.off(document, 'click', this.handleOuterClick);
    }


    render() {
        const addPrefix = this.addPrefix;
        const dropdownClassName = classNames(
            this.getPrefix(),
            {
                active: this.state.open,
            }
        );
        const toggleClassName = classNames(
            'btn',
            'btn-lg',
            addPrefix('toggle'),
            this.props.btnStype,
            {
                active: this.state.open,
            }
        );
        const menuClassName = classNames(
            addPrefix('menu'),
            {
                [addPrefix('animation-in')]: this.state.open,
                [addPrefix('animation-out')]: !this.state.open,
            }
        );

        return (
            <div className={dropdownClassName}>
                <button className={toggleClassName}
                        ref="dropdownToggle"
                        onClick={this.handleDropdownClick}
                    >
                    {this.props.title}
                </button>

                <ul
                    className={menuClassName}
                    >
                    {this.props.children}
                </ul>
            </div>
        );
    }
}


Dropdown.Item = class extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        href: React.PropTypes.string,
        onClick: React.PropTypes.func,
    }

    render() {
        let children = null;
        if (this.props.href) {
            children = React.createElement(
                'a',
                {href: this.props.href},
                this.props.children
            );
        } else {
            children = React.createElement(
                'a',
                {onClick: this.props.onClick},
                this.props.children
            );
        }

        return (
            <li>{children}</li>
        );
    }
};

export default Dropdown;
