import React, {Component, PropTypes} from 'react';

class Detail extends Component {
    static propTypes = {
        children: PropTypes.node,
        title: PropTypes.string.isRequired,
    }

    render() {
        return (
            <aside className="app-detail">
                    <div className="text-center title">{this.props.title}</div>
                    <div className="padding">
                        {this.props.children}
                    </div>
            </aside>
        );
    }
}

export default Detail;
