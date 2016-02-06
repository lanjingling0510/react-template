import React, { PropTypes, Component } from 'react';
import {Link} from 'react-router';
import FormEditor from '../../components/FormEditor.js';


class TagEditPage extends Component {
    static propTypes = {
        params: PropTypes.object.isRequired,
        tag: PropTypes.object,
    }

    static defaultProps = {
        tag: {
            '标签编号': '01',
            '标签名字': 'name',
            '标签备注信息': 'info',
            '图片组': 'image',
            '地理位置': '40',
            '范围': '50-40',
            '电量': '30',
            '靠近推送网页': 'www.baidu.com',
        },
    }


    render() {
        const {tag} = this.props;
        return (
            <div>
                <div className="margin-bottom">
                    <ol className="breadcrumb">
                        <li><Link to="tag">标签管理</Link></li>
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


export default TagEditPage;
