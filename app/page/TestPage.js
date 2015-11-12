import React, {Component } from 'react';
import Dropdown from '../components/Dropdown';
import ModalTrigger from '../components/ModalTrigger';
import Modal from '../components/Modal';
import Accordion from '../components/Accordion';

export default class TestPage extends Component {
    constructor(props) {
        super(props);
    }

    handleClick() {
        alert('hehe');
    }

    render() {
        const modal = <Modal ref="modal" type="modal" title="modal">这一个 Modal 窗口。</Modal>;
        const modal2 = <Modal ref="modal" type="alert" title="alert">这一个 Alert 窗口。</Modal>;
        const modal3 = <Modal ref="modal" type="confirm" title="confirm">这一个 confirm 窗口。</Modal>;

        const accordionData =
            [
                {
                    'title': <span>寻宝</span>,
                    'content': (
                        <ul className="list-group">
                            <a href="#" className="list-group-item">首页</a>
                            <a href="#" className="list-group-item">场馆介绍</a>
                            <a href="#" className="list-group-item">展会指南管理</a>
                            <a href="#" className="list-group-item">展区导航管理</a>
                        </ul>
                    ),
                    'open': true,
                },
                {
                    'title': <span>我就这样告别山下的家</span>,
                    'content': (
                        <ul className="list-group">
                            <a href="#" className="list-group-item">首页</a>
                            <a href="#" className="list-group-item">场馆介绍</a>
                            <a href="#" className="list-group-item">展会指南管理</a>
                            <a href="#" className="list-group-item">展区导航管理</a>
                        </ul>
                    ),
                },
            ];


        return (
            <div className="container">

                {/* navbar */}
                <div className="offcanvas-bar">
                    <Accordion autoToggle={true} data={accordionData}/>
                </div>

                {/* main */}
                <div className="main">
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

                    <div className="row margin-top">
                        <ModalTrigger modal={modal2}>
                            <button className="btn btn-primary">提示框</button>
                        </ModalTrigger>
                    </div>

                    <div className="row margin-top">
                        <ModalTrigger modal={modal3}>
                            <button className="btn btn-primary">验证框</button>
                        </ModalTrigger>
                    </div>
                </div>
            </div>
        );
    }
}



