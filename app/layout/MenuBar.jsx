import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import Header from './Header.jsx';
import AccordionItem from '../components/AccordionItem';


class MenuBar extends Component {
    static propTypes = {
        children: PropTypes.object,
    }

    render() {
        return (
            <section className="app-container">
                <aside className="app-menubar">
                    <Header />
                    <AccordionItem title="甲虫管理" open={Boolean(true)}>
                        <ul className="list-group">
                            <Link to="/" className="list-group-item">地图管理</Link>
                            <Link to="/layerClass/create" className="list-group-item">layerClasses</Link>
                            <Link to="/ARDevice" className="list-group-item">AR设备管理</Link>
                        </ul>
                    </AccordionItem>
                    <AccordionItem title="日常管理" open={Boolean(true)}>
                        <ul className="list-group">
                            <Link to="/JCCase" className="list-group-item">甲虫案例管理</Link>
                            <Link to="/" className="list-group-item">消息推送管理</Link>
                            <Link to="/" className="list-group-item">用户反馈管理</Link>
                            <Link to="/" className="list-group-item">商品及订单管理</Link>
                            <Link to="/" className="list-group-item">室内导航使用申请管理</Link>
                        </ul>
                    </AccordionItem>
                    <AccordionItem title="账号管理" open={Boolean(true)}>
                        <ul className="list-group">
                            <Link to="account/user" className="list-group-item">普通用户账号</Link>
                            <Link to="account/admin" className="list-group-item">后台管理员账号</Link>
                        </ul>
                    </AccordionItem>
                </aside>
               { this.props.children}
            </section>
        );
    }
}

export default MenuBar;
