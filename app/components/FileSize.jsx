import React from 'react';

export default class FileSize extends React.Component {
    constructor(props) {
        super(props);
    }

    formatSize(size) {
        const units = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        let times = 0;
        let shrinkedSize = size;

        while (shrinkedSize >= 1000 && times < units.length - 1) {
            shrinkedSize /= 1024;
            times += 1;
        }
        shrinkedSize = shrinkedSize.toFixed(2);
        return `${shrinkedSize} ${units[times]}`;
    }

    render() {
        const formatedSize = this.formatSize(this.props.size);
        return (
            <span>{formatedSize}</span>
        );
    }
}
