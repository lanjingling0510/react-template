import ReactDOM from 'react-dom';

// TODO 装饰函数只在编译时运行一次
function overlay(ComposedComponent) {
    let _overlayWrapper = null;
    let _overlayInstance = null;

    const Overlay = {
        componentDidMount() {
            console.log('overlay componentDidMount...');
            this._renderOverlay();
        },

        componentDidUpdate() {
            console.log('overlay componentDidUpdate...');
            this._renderOverlay();
        },

        componentWillUnmount() {
            console.log('overlay componentWillUnmount...');
            this._unmountOverlay();
        },

        _renderOverlay() {
            if (!_overlayWrapper) {
                this._mountOverlayWrapper();
            }

            //  reactElement sush as overpop element
            const reactElement = this.renderOverlay();

            if (reactElement) {
                // return a instance of component
                _overlayInstance = ReactDOM.render(reactElement, _overlayWrapper);
            }
        },

        // remove a mounted Overlay from wrapper
        _unmountOverlay() {
            ReactDOM.unmountComponentAtNode(_overlayWrapper);
            _overlayInstance = null;

            if (_overlayWrapper) {
                document.body.removeChild(_overlayWrapper);
                _overlayWrapper = null;
            }
        },


        // create Overlay wrapper
        _mountOverlayWrapper() {
            _overlayWrapper = document.createElement('div');
            document.body.appendChild(_overlayWrapper);
        },


        getOverlayDOMNode() {
            if (_overlayInstance) {
                return ReactDOM.findDOMNode(_overlayInstance);
            }

            return null;
        },
    };

    Object.assign(ComposedComponent.prototype, Overlay);
}

export default overlay;
