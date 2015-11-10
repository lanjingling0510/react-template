const bind = window.addEventListener ? 'addEventListener' : 'attachEvent';
const unbind = window.removeEventListener ? 'removeEventListener' : 'detachEvent';
const prefix = bind !== 'addEventListener' ? 'on' : '';

const events = {
    one(node, eventNames, eventListener) {
        const typeArray = eventNames.split(' ');
        const recursiveFunction = function recursiveFunction(e) {
            e.target.removeEventListener(e.type, recursiveFunction);
            return eventListener(e);
        };

        for (let i = typeArray.length; i--;) {
            this.on(node, typeArray[i], recursiveFunction);
        }
    },

    /**
     * Bind `node` event `eventName` to `eventListener`.
     *
     * @param {Element} node
     * @param {String} eventName
     * @param {Function} eventListener
     * @param {Boolean} capture
     * @return {Obejct}
     * @api public
     */

    on(node, eventName, eventListener, capture = false) {
        node[bind](prefix + eventName, eventListener);

        return {
            off: function off() {
                node[unbind](prefix + eventName, eventListener, capture);
            },
        };
    },

    /**
     * Unbind `node` event `eventName`'s callback `eventListener`.
     *
     * @param {Element} node
     * @param {String} eventName
     * @param {Function} eventListener
     * @param {Boolean} capture
     * @return {Function}
     * @api public
     */

    off(node, eventName, eventListener, capture = false) {
        node[unbind](prefix + eventName, eventListener, capture);
        return eventListener;
    },
};

export default events;

