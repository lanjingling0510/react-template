import React from 'react';
import ReactDOM from 'react-dom';
import Modal from '../components/Modal.js';
import {SHOW_MODAL, CLOSE_MODAL} from '../actions/modal.js';
let _overlayWrapper = null;

export function modal(state = {
    title: '',
    content: '',
    type: 'modal',
    confirmText: '确定',
    cancelText: '取消',
    modalHeight: 'auto',
}, action) {
    if (action.type === SHOW_MODAL) {
        const props = Object.assign(state, action.modal);
        const onConfirm = props.onConfirm;
        const onCancel = props.onCancel;
        props.onConfirm = () => {
            if (onConfirm) onConfirm();
            _unmountOverlay();
        };
        props.onCancel = () => {
            if (onCancel) onCancel();
            _unmountOverlay();
        };

        _renderOverlay(props);
        delete props.onConfirm;
        delete props.onCancel;
        delete props.title;
        return props;
    } else if (action.type === CLOSE_MODAL) {
        _unmountOverlay();
    }
    return state;
}

function _renderOverlay(props) {
    _mountOverlayWrapper();
    const reactElement = <Modal{...props} />;
    ReactDOM.render(reactElement, _overlayWrapper);
}

function _unmountOverlay() {
    ReactDOM.unmountComponentAtNode(_overlayWrapper);
    if (_overlayWrapper) {
        document.body.removeChild(_overlayWrapper);
        _overlayWrapper = null;
    }
}

// create Overlay wrapper
function _mountOverlayWrapper() {
    _overlayWrapper = document.createElement('div');
    document.body.appendChild(_overlayWrapper);
}
