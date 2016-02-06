import React, { Component } from 'react';
import {Link} from 'react-router';

class JCCaseListPage extends Component {
    renderItem() {
        return (
            <tr>
                <td><Link to={`/JCCase/cfasdf`}>新闻名字</Link></td>
                <td>编辑时间</td>
                <td>编辑管理员</td>
                <td>新闻正文内容</td>
                <td><a className="text-danger">顶</a></td>
            </tr>
        );
    }

    render() {
        return (
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>新闻名字</th>
                            <th>编辑时间</th>
                            <th>编辑管理员</th>
                            <th>新闻正文内容</th>
                            <th>顶</th>
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

export default JCCaseListPage;
