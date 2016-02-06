import {RECEIVE_LAYER_CLASSES} from '../actions/layerClass.js';

export function layerClasses(state = [], action) {
    switch (action.type) {
        case RECEIVE_LAYER_CLASSES:
            return action.layerClasses;
        default:
            return state;
    }
}
