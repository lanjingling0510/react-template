import {RECEIVE_JCPROFILES} from '../actions/JCProfiles.js';

export function fetcheds(state = [], action) {
    switch (action.type) {
        case RECEIVE_JCPROFILES:
            return [
                ...state,
                'JCProfiles',
            ];
        default:
            return state;
    }
}
