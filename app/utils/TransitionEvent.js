import events from './Events.js';


let TRANSITION;
let TRANSITIONEND;
if (typeof document.body.style.transition === 'string') {
    TRANSITION = 'transition';
    TRANSITIONEND = 'transitionend';
} else if (typeof document.body.style.webkitTransition === 'string') {
    TRANSITION = 'webkitTransition';
    TRANSITIONEND = 'webkitTransitionEnd';
} else if (typeof document.body.style.MozTransition === 'string') {
    TRANSITION = 'MozTransition';
}


const transitionEvent = {
    one(node, eventListener) {
        events.one(node, TRANSITIONEND, eventListener);
    },

    on(node, eventListener) {
        events.on(node, TRANSITIONEND, eventListener);
    },

    off(node, eventListener) {
        events.off(node, TRANSITIONEND, eventListener);
    },
};

export default transitionEvent;


