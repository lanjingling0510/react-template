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
        };

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    static propTypes = {
        modal: React.PropTypes.node.isRequired,
        onConfirm: React.PropTypes.func,
        onCancel: React.PropTypes.func,
    }


    open() {
        const modalElement = this.props.getOverlayDOMNode().querySelector('.modal-dialog');

        this.setState({
            isModalActive: true,
            modalMarginTop: -modalElement.offsetHeight / 2,
        });
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


    // overlay is the modal
    renderOverlay() {
        console.log(this);
        if (!this.state.isModalActive) {
            return React.createElement('span', null);
        }

        return cloneElement(this.props.modal, {
            marginTop: this.state.modalMarginTop,
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
        console.log(this);
        const child = React.Children.only(this.props.children);
        const props = {
            onClick: this.open,
        };

        return cloneElement(child, props);
    }
}

export default ModalTrigger;
