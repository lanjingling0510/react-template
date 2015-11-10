import React from 'react';
import classPrefix from '../decorators/classPrefix.jsx';
import classNames from 'classnames';

/*
 *  react component Modal
 * */


@classPrefix('modal') class Modal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            transitioning: false,
        };
    }

    static propTypes = {
        type: React.PropTypes.oneOf(['alert', 'confirm', 'modal']),
        title: React.PropTypes.string.isRequired,
        confirmText: React.PropTypes.string,
        cancelText: React.PropTypes.string,
    }

    //  并不是在组件实例化时被调用，而是在类的声明中就被缓存起来了
    static defaultProps = {
        type: 'modal',
        confirmText: '确定',
        cancelText: '取消',
    }

    componentWillUnmount() {
        console.log('modal componentWillUnmount...');
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

        let confirmBtn = null;
        let cancelBtn = null;

        if (props.type === 'alert') {
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
                style: props.type === 'modal' ? {display: 'none'} : {display: ''},
            },
            confirmBtn,
            cancelBtn
        );


        const style = {
            display: 'block',
            marginTop: props.marginTop,
            height: props.modalHeight,
        };

        const classSet = {};
        classSet[addPrefix('dialog')] = true;
        classSet[addPrefix('animation-in')] = true;


        return (
            <div className={this.getPrefix()}>
                <div style={style} className={classNames(classSet)}>
                    <div className={addPrefix('hd')}>{props.title} {closeIcon}</div>
                    <div className={addPrefix('bd')}>{props.children}</div>
                    {modalFooter}
                </div>
            </div>
        );
    }
}

export default Modal;
