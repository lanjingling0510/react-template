import React, {Component } from 'react';
import ReactCSSTransitionGroup  from 'react-addons-css-transition-group';


class HomePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            items: ['hello', 'world', 'click', 'me'],
        };
    }

    render() {
        const items = this.state.items.map((value, index) => {
            return (
                <div key={index}>{value}</div>
            );
        });
        return (
            <div className="container">
                <div className="app-header">
                    <h1>app-header</h1>
                </div>
                <div className="app-content">
                    <button onClick={this.addItem.bind(this)}>添加</button>
                    <ReactCSSTransitionGroup transitionName="example"
                                             transitionEnterTimeout={500}
                                             transitionLeave={false}
                                             transitionAppear={true}
                                             transitionAppearTimeout={2000}>
                        {items}
                    </ReactCSSTransitionGroup>
                </div>
            </div>
        );
    }

    addItem() {
        const newItem = 'new';
        this.setState({
            items: [...this.state.items, newItem],
        });
    }
}

export default HomePage;
