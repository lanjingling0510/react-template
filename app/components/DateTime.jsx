import React, {PropTypes} from 'react';
import moment from 'moment';

export default class DateTime extends React.Component {
    constructor(props) {
        super(props);
    }

    //static PropTypes = {
    //    datetime: PropTypes.string,
    //}

    formatDateTime(datetime) {
        const format = this.props.format || 'YYYY-MM-DD HH:mm';
        const formatDateTime = moment(datetime).format(format);
        return formatDateTime;
    }

    render() {
        const formatedDateTime = this.formatDateTime(this.props.datetime);
        return (
            <span>{formatedDateTime}</span>
        );
    }
}
