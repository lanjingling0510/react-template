import React, { PropTypes, Component } from 'react';
import {Link} from 'react-router';
import FormEditor from '../../components/FormEditor.js';


class ARDeviceEditPage extends Component {
    static propTypes = {
        params: PropTypes.object.isRequired,
        tag: PropTypes.object,
    }

    static defaultProps = {
        tag: {
            '设备编号': '01',
            '设备名字': 'name',
            '设备类别': 'type',
            '连接状态': 'connection',
            '电量': '40',
            '蓝牙信号强度': '40',
            '升降状态': '30',
            '设备特征值': 'eee',
            '设备权限': '可升降',
            '用户': [
                {_id: '01', value: 'value01'},
                {_id: '02', value: 'value02'},
                {_id: '03', value: 'value01'},
            ],
        },
    }


    render() {
        const {tag} = this.props;
        return (
            <div>
                <div className="margin-bottom">
                    <ol className="breadcrumb">
                        <li><Link to="ARDevice">标签管理</Link></li>
                        <li className="active">标签ID:{tag._id}</li>
                    </ol>
                </div>
                <FormEditor
                    data={tag}
                    onSave={() => {}}/>
            </div>
        );
    }
}


export default ARDeviceEditPage;
