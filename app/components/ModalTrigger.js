import React from 'react';
import overlay from '../decorators/overlay';
import Modal from './Modal';


/*
 *  react component ModalTrigger
 * */

@overlay class ModalTrigger extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalActive: props.active,
            modalMarginTop: null,
            modalHeight: null,
        };

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.toggle = this.toggle.bind(this);
        this.renderOverlay = this.renderOverlay.bind(this);
    }

    static propTypes = {
        active: React.PropTypes.bool,
        type: React.PropTypes.oneOf(['alert', 'confirm', 'modal', 'success', 'warning']),
        title: React.PropTypes.string,
        content: React.PropTypes.string,
        confirmText: React.PropTypes.string,
        cancelText: React.PropTypes.string,
        onConfirm: React.PropTypes.func,
        onCancel: React.PropTypes.func,
    }

    static defaultProps = {
        active: false,
        title: '',
        content: '',
        type: 'modal',
        confirmText: '确定',
        cancelText: '取消',
        onConfirm: () => {
        },
        onCancel: () => {
        },
    }

    // 比较props或者states，返回true则更新照常，返回false则取消更新，且不会调用下面的两个生命周期函数
    shouldComponentUpdate(nextProps, newState) {
        return nextProps.active !== this.props.active || newState.modalMarginTop !== this.state.modalMarginTop;
    }


    //  父组件修改state导致子组件的props变化，则触发componentWillReceiveProps，同时
    //  触发render，componentDidUpdate，此时可修改子组件的state
    componentWillReceiveProps(nextProps) {
        console.log('ModalTrigger componentWillReceiveProps...');
        nextProps.active && this.open();
        !nextProps.active && this.close();
    }

    open() {
        this.setState({
            isModalActive: true,
        }, this.setModalStyle);
    }

    close() {
        this.setState({
            isModalActive: false,
        });
    }

    toggle() {
        if (this.state.isModalActive) {
            this.close();
        } else {
            this.open();
        }
    }


    setModalStyle() {
        const style = {};

        if (this.props.modalHeight) {
            let modalHeight = this.props.modalHeight.toString();
            if (modalHeight.includes('%')) {
                modalHeight = modalHeight.slice(0, -1) / 100 * this.getOverlayDOMNode().clientHeight;
            } else {
                modalHeight = Number(modalHeight);
            }

            style.modalHeight = modalHeight;
            style.modalMarginTop = -modalHeight / 2;
        } else {
            const modal = this.getOverlayDOMNode().querySelector('.modal-dialog');
            style.modalMarginTop = -modal.offsetHeight / 2;
        }

        this.setState(style);
    }


    // overlay is the modal
    renderOverlay() {
        const props = this.props;
        const state = this.state;

        const modalProps = {
            title: props.title,
            type: props.type,
            confirmText: props.confirmText,
            cancelText: props.cancelText,
            marginTop: state.modalMarginTop,
            modalHeight: state.modalHeight,
            onConfirm: () => {
                this.close();
                props.onConfirm();
            },
            onCancel: () => {
                this.close();
                props.onCancel();
            },
            children: props.content,
        };

        if (!this.state.isModalActive) {
            return React.createElement(
                'span', null
            );
        }
        return <Modal {...modalProps}/>;
    }

    render() {
        const props = {
            onClick: this.open,
        };

        return <div {...props} />;
    }
}

export default ModalTrigger;
