import React from 'react';
import classPrefix from '../decorators/classPrefix';
import classNames from 'classnames';
import transitionEvent from '../utils/TransitionEvent';

/*
 *   react component Accordion.Item
 * */

@
classPrefix('accordion-item') class AccordionItem extends React.Component {
  static propTypes = {
      id: React.PropTypes.number,
      className: React.PropTypes.object,
      title: React.PropTypes.node.isRequired,
      open: React.PropTypes.bool,
      children: React.PropTypes.node,
  }


  static defaultProps = {
      open: false,
  }

  state = {
      open: this.props.open,
  }


  componentDidMount() {
      const node = this.refs.itemContent;
      const accordionItem = this.refs.accordionItem;
      if (!this.props.open) {
          node.style.height = 0 + 'px';
          accordionItem.classList.add('accordion-close');
      } else {
          const height = node.scrollHeight || parseInt(node.children[0].style.height, 10);
          node.style.height = height + 'px';
          accordionItem.classList.add('accordion-open');
      }
  }

  handleAccordionItemClick = () => {
      const open = this.state.open;
      if (open) {
          this.setState({open: false}, this._handleCollapse);
      } else {
          this.setState({open: true}, this._handleExpand);
      }
  }


  _handleExpand = () => {
      const node = this.refs.itemContent;
      const accordionItem = this.refs.accordionItem;
      const complete = () => {
          this.collapsing = false;
      };
      accordionItem.classList.remove('accordion-close');
      accordionItem.classList.add('accordion-open');
      transitionEvent.one(node, complete);
      //  获得panel元素auto的高度
      const height = node.scrollHeight;
      node.style.height = height + 'px';
  }


  _handleCollapse = () => {
      const node = this.refs.itemContent;
      const accordionItem = this.refs.accordionItem;
      const complete = () => {
          accordionItem.classList.remove('accordion-open');
          accordionItem.classList.add('accordion-close');
          this.collapsing = false;
      };
      transitionEvent.one(node, complete);
      node.style.height = 0 + 'px';
  }


  render() {
      const addPrefix = this.addPrefix;
      const props = this.props;

      const itemHeader = React.createElement(
        'div', {
            onClick: this.handleAccordionItemClick,
            className: classNames('card-header', addPrefix('hd')),
        },
        props.title
      );

      const itemContent = React.createElement(
          'div',
          {
              ref: 'itemContent',
              className: classNames({
                  [addPrefix('bd')]: true,
              }),
          },
          props.children
      );

      const itemClassName = classNames('card', this.getPrefix(), this.props.className);
      return (
          <li className = {itemClassName} ref="accordionItem">
              {itemHeader}
              {itemContent}
          < /li>
      );
  }
}

export default AccordionItem;
