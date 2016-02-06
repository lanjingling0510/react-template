import {RECEIVE_JCFEATURES} from '../actions/JCFeatures.js';

export function JCFeatures(state = [], action) {
    switch (action.type) {
        case RECEIVE_JCFEATURES:
            return [...state, ...action.JCFeatures];
        default:
            return state;
    }
}
