import React from 'react';
import classPrefix from '../decorators/classPrefix.jsx';


/*
 *  react component Modal
 * */


@classPrefix('modal')
class Modal extends React.Component {
    constructor(props) {
        super(props);
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

    render() {
        const addPrefix = this.addPrefix;
        const props = this.props;
        console.log(props.type);
        const closeIcon = React.createElement(
            'i',
            {
                className: 'fa fa-times close',
                style: props.type === 'modal' ? {display: 'block'} : {display: 'none'},
            }
        );

        let confirmBtn = null;
        let cancelBtn = null;

        if (props.type === 'alert') {
            confirmBtn = (
                <div className="col-1">
                    <div className="btn btn-full btn-lg">{props.confirmText}</div>
                </div>
            );
        } else if (props.type === 'confirm') {
            confirmBtn = (
                <div className="col-1">
                    <div className="btn btn-full btn-lg">{props.confirmText}</div>
                </div>
            );
            cancelBtn = (
                <div className="col-1">
                    <div className="btn btn-full btn-lg">{props.cancelText}</div>
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
        };

        return (
            <div className={this.getPrefix()} style={style}>
                <div className={addPrefix('dialog')}>
                    <div className={addPrefix('hd')}>我是标题 {closeIcon}</div>
                    <div className={addPrefix('bd')}>{props.children}</div>
                    {modalFooter}
                </div>
            </div>
        );
    }
}

export default Modal;
