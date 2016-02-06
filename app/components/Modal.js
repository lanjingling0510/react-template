import React, {PropTypes, Component} from 'react';
import classPrefix from '../decorators/classPrefix';
import classNames from 'classnames';

/*
 *  react component Modal
 * */


@classPrefix('modal') class Modal extends Component {
    static propTypes = {
        type: React.PropTypes.oneOf(['alert', 'confirm', 'modal', 'success', 'warning']),
        title: PropTypes.string,
        content: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.element,
        ]),
        confirmText: PropTypes.string,
        cancelText: PropTypes.string,
        modalHeight: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ]),
        onConfirm: PropTypes.func,
        onCancel: PropTypes.func,
    }

    //  并不是在组件实例化时被调用，而是在类的声明中就被缓存起来了
    static defaultProps = {
        title: '',
        content: '',
        type: 'modal',
        confirmText: '确定',
        cancelText: '取消',
        modalHeight: 'auto',
    }

    render() {
        const addPrefix = this.addPrefix;
        const props = this.props;
        const closeIcon = React.createElement(
            'i',
            {
                onClick: props.onCancel,
                className: 'fa fa-times close',
                style: props.type === 'modal' ? {display: 'block'} : {display: 'none'},
            }
        );

        //  modalBody
        let modalBdChildren;
        if (props.type === 'success') {
            modalBdChildren = <div><i className="fa fa-2x fa-check text-success"></i> {props.content}</div>;
        } else if (props.type === 'warning') {
            modalBdChildren = <div><i className="fa fa-2x fa-exclamation-triangle text-danger"></i> {props.content}</div>;
        } else if (props.type === 'confirm') {
            modalBdChildren = <div><i className="fa fa-2x fa-question text-danger"></i> {props.content}</div>;
        }else {
            modalBdChildren = props.content;
        }


        // modalFooter
        let confirmBtn = null;
        let cancelBtn = null;
        if (['alert', 'success', 'warning'].indexOf(props.type) !== -1) {
            confirmBtn = (
                <div className="col-1">
                    <div className="btn btn-full btn-lg" onClick={props.onConfirm}>{props.confirmText}</div>
                </div>
            );
        } else if (props.type === 'confirm') {
            confirmBtn = (
                <div className="col-1">
                    <div className="btn btn-full btn-lg" onClick={props.onConfirm}>{props.confirmText}</div>
                </div>
            );
            cancelBtn = (
                <div className="col-1">
                    <div className="btn btn-full btn-lg" onClick={props.onCancel}>{props.cancelText}</div>
                </div>
            );
        }

        const modalFooter = React.createElement(
            'div',
            {
                className: `${addPrefix('footer')} row row-no-margin row-no-padding`,
            },
            confirmBtn,
            cancelBtn
        );


        // modalDialog
        const style = {
            height: props.modalHeight,
        };

        const modalDialogClassName = classNames(
            addPrefix('dialog'),
            addPrefix('animation-in')
        );


        return (
            <div className={this.getPrefix()}>
                <div style={style} className={modalDialogClassName}>
                    <div className={addPrefix('hd')}>{props.title} {closeIcon}</div>
                    <div className={addPrefix('bd')}>{modalBdChildren}</div>
                    {props.type === 'modal' ? '' : modalFooter}
                </div>
            </div>
        );
    }
}

export default Modal;
