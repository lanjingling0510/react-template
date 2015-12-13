import React, {Component } from 'react';


class HomePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            items: ['hello', 'world', 'click', 'me'],
            active: true,
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
                <div className={{active: this.state.active}}>
                    <h1>app-header</h1>
                </div>
                <div className="content">
                    <button onClick={this.addItem.bind(this)}>添加</button>
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
