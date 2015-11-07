import React, {Component } from 'react';
import Dropdown from '../components/Dropdown.jsx';
import ModalTrigger from '../components/ModalTrigger.jsx';
import Modal from '../components/Modal.jsx';

export default class TestPage extends Component {
    constructor(props) {
        super(props);
    }

    handleClick() {
        alert('hehe');
    }

    render() {
        const modal = <Modal ref="modal" type="alert" title="Amaze UI">这一个 Alert 窗口。</Modal>;

        return (
            <div className="container">
                <div className="row margin-top">
                    <Dropdown
                        title="下拉框"
                        btnStype="btn-danger"
                    >
                        <Dropdown.Item onClick={this.handleClick}>触发事件</Dropdown.Item>
                        <Dropdown.Item href="http://www.baidu.com">去百度</Dropdown.Item>
                    </Dropdown>
                </div>

                <div className="row margin-top">
                    <ModalTrigger modal={modal}>
                        <button className="btn btn-primary">对话框</button>
                    </ModalTrigger>
                </div>

            </div>
        );
    }
}
