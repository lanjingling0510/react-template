import React, {Component} from 'react';
import ReactDOM from 'react-dom';

function overlay(ComposedComponent) {
    return class Overlay extends Component {
        constructor() {
            super();
            this.renderOverlay = ComposedComponent.prototype.renderOverlay.bind();
        }

        static propTypes = {
            container: React.PropTypes.node,
        }

        componentDidMount() {
            console.log('overlay componentDidMount...');
            this._renderOverlay();
        }

        componentDidUpdate() {
            console.log('overlay componentDidUpdate...');
            this._renderOverlay();
        }

        componentWillUnmount() {
            console.log('overlay componentWillUnmount...');
            this._unmountOverlay();
        }


        _renderOverlay() {
            if (!this._overlayWrapper) {
                this._mountOverlayWrapper();
            }

            //  reactElement sush as overpop element
            const overlay = this.renderOverlay();

            if (overlay) {
                // return a instance of component
                this._overlayInstance = ReactDOM.render(overlay, this._overlayWrapper);
            }
        }

        // remove a mounted Overlay from wrapper
        _unmountOverlay() {
            ReactDOM.unmountComponentAtNode(this._overlayWrapper);
            this._overlayInstance = null;

            if (this._overlayWrapper) {
                document.body.removeChild(this._overlayWrapper);
                this._overlayWrapper = null;
            }
        }


        // create Overlay wrapper
        _mountOverlayWrapper() {
            this._overlayWrapper = document.createElement('div');
            document.body.appendChild(this._overlayWrapper);
        }


        getOverlayDOMNode() {
            if (this._overlayInstance) {
                return ReactDOM.findDOMNode(this._overlayInstance);
            }

            return null;
        }

        render() {
            const reactElement = <ComposedComponent {...this.props} getOverlayDOMNode={this.getOverlayDOMNode.bind(this)}>{this.props.children}</ComposedComponent>;
            return reactElement;
        }
    };
}

export default overlay;
