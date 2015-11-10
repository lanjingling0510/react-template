import React, {Component } from 'react';
import Selected from '../components/Selected.jsx';
import Radio from '../components/Radio.jsx';
import Checkbox from '../components/Checkbox.jsx';
import UploadFile from '../components/upload_file/UploadFile.jsx';

export default class FormPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            type: 'ios',
        };
        this.changeField = this.changeField.bind(this);
    }

    changeField(event) {
        const target = event.target;
        this.setState({[target.name]: target.value});
    }

    render() {
        const state = this.state;
        const SelectedData = {
            data: [
                {value: 'one', label: 'One'},
                {value: 'two', label: 'Two'},
                {value: 'three', label: 'Three'},
            ],
            value: 'one',
            onChange: function (value) {
                console.log('选择:' + value);
            },
        };

        const RadioData = {
            data: [
                {value: 'one', label: 'One'},
                {value: 'two', label: 'Two'},
                {value: 'three', label: 'Three'},
            ],
            value: 'two',
            onChange: function (value) {
                console.log('选择:' + value);
            },
        };

        const CheckboxData = {
            data: [
                {value: '1', label: '计算机'},
                {value: '2', label: '数学'},
                {value: '3', label: '语文'},
            ],
            value: ['2', '1'],
            onChange: function (value) {
                console.log('选择:' + value);
            },
        };


        return (
            <div className="container">

                {/* navbar */}
                <div className="offcanvas-bar">
                </div>

                {/* main */}
                <div className="main">

                    <div className="margin-top">
                        <form className="form">
                            <table>
                                <tbody>
                                <tr>
                                    <td width="25px" className="form-label"><span className="redstar">*</span></td>
                                    <td width="100px" className="form-label">职位类别</td>
                                    <td>
                                        <input autoFocus="true" type="text" className="form-field-text field-primary"/>
                                    </td>
                                </tr>

                                <tr>
                                    <td className="form-label"><span className="redstar">*</span></td>
                                    <td className="form-label">职位类别</td>
                                    <td>
                                        <Selected {...SelectedData}/>
                                    </td>
                                </tr>

                                <tr>
                                    <td className="form-label label-radio"><span className="redstar">*</span></td>
                                    <td className="form-label label-radio">应用试用端</td>
                                    <td>
                                        <Radio {...RadioData} />
                                    </td>
                                </tr>

                                <tr>
                                    <td className="form-label label-radio"><span className="redstar">*</span></td>
                                    <td className="form-label label-radio">应用试用端</td>
                                    <td>
                                        <Checkbox {...CheckboxData} />
                                    </td>
                                </tr>

                                <tr>
                                    <td className="form-label label-radio"><span className="redstar">*</span></td>
                                    <td className="form-label label-radio">上传文件</td>
                                    <td>
                                        <UploadFile url="xxxx" maxWidth={400}/>
                                    </td>
                                </tr>

                                </tbody>
                            </table>
                        </form>
                    </div>

                </div>
            </div>
        );
    }
}
