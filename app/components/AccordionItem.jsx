import React from 'react';
import classPrefix from '../decorators/classPrefix.jsx';
import classNames from 'classnames';
import transitionEvent from '../utils/TransitionEvent.js';

/*
 *   react component Accordion.Item
 * */

@classPrefix('accordion-item') class AccordionItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: props.open,
        };

        this.collapsing = false;
        this._handleExpand = this._handleExpand.bind(this);
        this._handleCollapse = this._handleCollapse.bind(this);
        this.handleAccordionItemClick = this.handleAccordionItemClick.bind(this);
    }

    static propTypes = {
        id: React.PropTypes.number,
        title: React.PropTypes.node.isRequired,
        open: React.PropTypes.bool,
        onChanged: React.PropTypes.func,
    }

    static defaultProps = {
        open: false,
        onChanged: () => {
        },
    }


    componentDidMount() {
        const node = this.refs.itemContent;
        if (!this.props.open) {
            node.style.height = 0 + 'px';
            node.classList.add(this.addPrefix('close'));
        } else {
            const height = node.scrollHeight;
            node.style.height = height + 'px';
        }
    }

    // 比较props或者states，返回true则更新照常，返回false则取消更新，且不会调用下面的两个生命周期函数
    shouldComponentUpdate(nextProps) {
        if (nextProps.open === this.props.open) {
            return false;
        }

        return true;
    }

    //  父组件修改state导致子组件的props变化，则触发componentWillReceiveProps，同时
    //  触发render，componentDidUpdate，此时可修改子组件的state
    componentWillReceiveProps(nextProps) {
        console.log('AccordionItem componentWillReceiveProps...');

        if (nextProps.open === this.props.open) {
            return false;
        }

        this.setState({
            open: nextProps.open,
        }, function () {
            this.collapsing = true;
        });
    }

    componentDidUpdate() {
        console.log('Accordion.Item componentDidUpdate...');
        if (this.state.open) {
            this._handleExpand();
        } else {
            this._handleCollapse();
        }
    }


    handleAccordionItemClick() {
        if (this.collapsing) {
            return false;
        }

        this.props.onChanged(this.props.id, !this.state.open);
    }


    _handleExpand() {
        const node = this.refs.itemContent;
        const complete = () => {
            this.collapsing = false;
        };
        node.classList.remove(this.addPrefix('close'));
        node.classList.add(this.addPrefix('open'));
        transitionEvent.one(node, complete);
        //  获得panel元素auto的高度
        const height = node.scrollHeight;
        node.style.height = height + 'px';
    }


    _handleCollapse() {
        const node = this.refs.itemContent;
        const complete = () => {
            node.classList.remove(this.addPrefix('open'));
            node.classList.add(this.addPrefix('close'));
            this.collapsing = false;
        };

        transitionEvent.one(node, complete);
        node.style.height = 0 + 'px';
    }


    render() {
        const addPrefix = this.addPrefix;
        const props = this.props;

        const itemHeader = React.createElement(
            'div',
            {
                onClick: this.handleAccordionItemClick,
                className: classNames('card-header', addPrefix('hd')),
            },
            props.title
        );

        const itemContent = React.createElement(
            'div',
            {
                ref: 'itemContent',
                className: classNames({
                    [addPrefix('bd')]: true,
                }),
            },
            props.children
        );

        const itemClassName = classNames('card', this.getPrefix(), this.props.className);

        return (
            <li className={itemClassName}>
                {itemHeader}
                {itemContent}
            </li>
        );
    }
}

export default AccordionItem;
