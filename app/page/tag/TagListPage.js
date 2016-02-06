import React, { Component } from 'react';
import {Link} from 'react-router';

class TagListPage extends Component {
    renderItem() {
        return (
            <tr>
                <td>标签编号</td>
                <td><Link to={`/tag/1234567`}>标签名称</Link></td>
                <td>标签信息</td>
                <td>图片组</td>
                <td>地理位置</td>
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
                            <th>标签编号</th>
                            <th>标签名字</th>
                            <th>标签备注信息</th>
                            <th>图片组</th>
                            <th>地理位置</th>
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

export default TagListPage;
