import React from 'react';
import overlay from '../decorators/overlay.jsx';
const cloneElement = React.cloneElement;

/*
 *  react component ModalTrigger
 * */

@overlay class ModalTrigger extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalActive: false,
            modalMarginTop: null,
            modalHeight: null,
        };

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.toggle = this.toggle.bind(this);
        this.renderOverlay = this.renderOverlay.bind(this);
    }

    static propTypes = {
        modal: React.PropTypes.node.isRequired,
        onConfirm: React.PropTypes.func,
        onCancel: React.PropTypes.func,
    }

    static defaultProps = {
        onConfirm: () => {},
        onCancel: () => {},
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
        if (!this.state.isModalActive) {
            return React.createElement('span', null);
        }

        return cloneElement(this.props.modal, {
            marginTop: this.state.modalMarginTop,
            modalHeight: this.state.modalHeight,
            onConfirm: () => {
                this.close();
                this.props.onConfirm();
            },
            onCancel: () => {
                this.close();
                this.props.onCancel();
            },
        });
    }

    render() {
        const child = React.Children.only(this.props.children);
        const props = {
            onClick: this.open,
        };

        return cloneElement(child, props);
    }
}

export default ModalTrigger;
