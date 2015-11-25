import './UploadFile.css';
import Q from 'q';  // eslint-disable-line id-length
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import uuid from 'node-uuid';

class UploadFile extends Component {
    constructor(props) {
        super(props);

        this.selectFile = this.selectFile.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
        this.renderFileUpload = this.renderFileUpload.bind(this);

        this.state = {
            file: null,
        };
    }

    static propTypes = {
        url: React.PropTypes.string,
        maxWidth: React.PropTypes.number,
        name: React.PropTypes.string,
        onComplete: React.PropTypes.func,
    }

    static defaultProps = {
        url: null,
        maxWidth: 999,
        name: 'file',
        onComplete: () => {},
    }

    render() {
        const file = this.state.file;
        const fileStyle = {maxWidth: this.props.maxWidth};
        return (
            <div style={fileStyle}>
                <label htmlFor="file" type="button"
                       className="btn btn-lg btn-success btn-full margin-bottom">选择文件</label>
                <input type="file" id="file" className="hide" onChange={this.selectFile}/>
                {file ? this.renderFileUpload() : null}
            </div>
        );
    }


    renderFileUpload() {
        const file = this.state.file;
        return (
            <div className="fileUpload">
                <div className="fileUpload-content text-center text-muted">
                    {file.name}
                </div>
                <div className="fileUpload-progress">
                    <span ref="fileUploadBar" className="fileUpload-bar" onClick={this.uploadFile}></span>
                </div>
                <input onClick={this.uploadFile} type="button" value="上传"
                       className="btn btn-lg btn-info btn-full margin-top btn-radius"/>
            </div>
        );
    }


    selectFile(event) {
        const file = event.target.files[0];
        this.setState({file: file});
    }

    /* eslint-disable camelcase */
    uploadFile() {
        const file = this.state.file;
        const progress_width = 289;
        const formData = new FormData();
        const progressBar = ReactDOM.findDOMNode(this.refs.fileUploadBar);
        const url = this.props.url || `http://file-warehouse.jcbel.com/projection/${uuid.v1()}/${file.name}`;

        formData.append(this.props.name, file);
        this._httpRequest(url, formData)
            .then(responseText => {
                progressBar.style.width = progress_width + 'px';
                this.setState({file: null});
                this.props.onComplete(responseText, url);
            }, error => {
                alert(error.data);
            }, progress => {
                progressBar.style.width = progress * progress_width + 'px';
            });
    }


    _httpRequest(url, data) {
        const deferred = Q.defer();

        const http = {
            _requestObj: null,
            _newRequestObj: function () {
                if (window.XMLHttpRequest) {
                    this._requestObj = new XMLHttpRequest();
                } else if (window.ActiveXObject) {
                    deferred.reject('我讨厌ie...');
                }
            },
            _sendRequestObj: function () {
                this._requestObj.open('post', url, true);
                this._requestObj.send(data);
            },
            _readyStateChange: function () {
                const requestObj = this._requestObj;
                requestObj.onreadystatechange = function () {
                    if (requestObj.readyState === 0) {
                        //  open方法尚未被调用
                        console.log('readyState==0...');
                    } else if (requestObj.readyState === 1) {
                        //  还未调用send方法
                        console.log('readyState==1...');
                    } else if (requestObj.readyState === 2) {
                        //  已经调用send方法，但响应主体还未到达
                        console.log('readyState==2...');
                    } else if (requestObj.readyState === 3) {
                        //  本分数据已经到达，但还不可以访问
                        console.log('readyState==3...');
                    } else if (requestObj.readyState === 4) {
                        //  全部数据已经到达，数据和报头都可以访问了
                        console.log('readyState==4...');
                        deferred.resolve(requestObj.responseText);
                    }
                };
            },
            _uploadOnProgress: function () {
                const requestObj = this._requestObj;
                requestObj.upload.onprogress = function (event) {
                    deferred.notify(event.loaded / event.total);
                };
            },
        };

        http._newRequestObj();
        http._uploadOnProgress();
        http._readyStateChange();
        http._sendRequestObj();
        return deferred.promise;
    }
}

export default UploadFile;
