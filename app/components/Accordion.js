import React from 'react';
import AccordionItem from './AccordionItem';
import classPrefix from '../decorators/classPrefix';
import classNames from 'classnames';


/*
 *   react component Accordion
 * */

@classPrefix('accordion') class Accordion extends React.Component {
    static propTypes = {
        data: React.PropTypes.array.isRequired,
        autoToggle: React.PropTypes.bool,
    }

    static defaultProps = {
        autoToggle: true,
    }

    state = {
        data: this.props.data,
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.data,
        });
    }

    //  传给子组件，建立连接
    handleChanged = (id, toggleOpen) => {
        this.setState({
            data: this.state.data.map((value, index) => {
                if (id === index) {
                    value.open = toggleOpen;
                } else {
                    value.open = this.props.autoToggle ? false : value.open;
                }
                return value;
            }),
        });
    }

    renderAccordionItem = (value, index) => {
        return (
            <AccordionItem
                key={index}
                id={index}
                open={value.open}
                title={value.title}
                onChanged={this.handleChanged}
                >
                {value.content}
            </AccordionItem>
        );
    }

    render() {
        const children = this.state.data.map(this.renderAccordionItem);
        const accordionClassName = classNames(this.getPrefix(), this.props.className);
        return (
            <ul className={accordionClassName}>{children}</ul>
        );
    }
}

Accordion.Item = AccordionItem;
export default Accordion;
