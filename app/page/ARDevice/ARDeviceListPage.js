import React, { Component } from 'react';
import {Link} from 'react-router';

class ARDeviceListPage extends Component {
    renderItem() {
        return (
            <tr>
                <td>设备编号</td>
                <td><Link className="text-info" to={`/ARDevice/1234567`}>设备名字</Link></td>
                <td>设备类别</td>
                <td>连接状态</td>
                <td>可升降</td>
                <td>
                    <a className="text-danger">删除</a>
                </td>
            </tr>
        );
    }

    render() {
        return (
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>设备编号</th>
                            <th>设备名字</th>
                            <th>设备类别</th>
                            <th>连接状态</th>
                            <th>设备权限</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderItem()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ARDeviceListPage;
