import React, {Component } from 'react';
import Selected from '../components/Selected';
import Radio from '../components/Radio';
import Checkbox from '../components/Checkbox';
import UploadFile from '../components/upload_file/UploadFile';

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
                        <form className="form" style={{width: '400px'}}>
                            <div className="form-group">
                                <label className="form-label">职位类别</label>
                                <input autoFocus="true" type="text" className="form-field-text field-primary"/>
                            </div>
                            <div className="form-group">
                                <label className="form-label">职位类别</label>
                                <Selected {...SelectedData}/>
                            </div>
                            <div className="form-group">
                                <label className="form-label">职位类别</label>
                                <input autoFocus="true" type="text" className="form-field-text field-primary"/>
                            </div>
                            <div className="form-group">
                                <label className="form-label">应用试用端</label>
                                <Checkbox {...CheckboxData} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">应用试用端</label>
                                <Radio {...RadioData} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">上传文件</label>
                                <UploadFile url="xxxx" maxWidth={400}/>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        );
    }
}
