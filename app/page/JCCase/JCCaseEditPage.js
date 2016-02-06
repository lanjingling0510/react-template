import React, { PropTypes, Component } from 'react';
import {Link} from 'react-router';
import FormEditor from '../../components/FormEditor.js';


class JCCaseEditPage extends Component {
    static propTypes = {
        params: PropTypes.object.isRequired,
        JCCase: PropTypes.object,
    }

    static defaultProps = {
        JCCase: {
            '新闻名字': 'name',
            '编辑时间': 'info',
            '编辑管理员': 'image',
            '新闻标题': '欣慰标题',
            '新闻封面': '封面',
        },
    }


    render() {
        const {JCCase} = this.props;
        return (
            <div>
                <div className="margin-bottom">
                    <ol className="breadcrumb">
                        <li><Link to="JCCase">案例管理</Link></li>
                        <li className="active">案例ID:{JCCase._id}</li>
                    </ol>
                </div>
                <FormEditor
                    data={JCCase}
                    onSave={() => {}}/>
            </div>
        );
    }
}

export default JCCaseEditPage;
