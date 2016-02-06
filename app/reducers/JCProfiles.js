import {
    RECEIVE_JCPROFILES,
    SELECT_JCPROFILE,
    EDIT_JCPROFILE,
    CREATE_JCPROFILE,
}
from '../actions/JCProfiles.js';
import {CREATE_JCLAYER} from '../actions/JCLayers.js';

export function JCProfiles(state = [], action) {
    let index;
    switch (action.type) {
        case RECEIVE_JCPROFILES:
            return action.JCProfiles;
        case EDIT_JCPROFILE:
            index = state.findIndex(profile => profile._id === action.JCProfile._id);
            return [
                ...state.slice(0, index),
                action.JCProfile,
                ...state.slice(index + 1),
            ];
        case CREATE_JCPROFILE:
            return [
                ...state,
                action.JCProfile,
            ];
        case CREATE_JCLAYER:
            index = state.findIndex(profile => profile._id === action.JCProfile._id);
            return [
                ...state.slice(0, index),
                {...state[index], JCLayers: [...state[index].JCLayers, action.JCLayer._id]},
                ...state.slice(index + 1),
            ];
        default:
            return state;
    }
}

export function currentJCProfile(state = null, action) {
    switch (action.type) {
        case SELECT_JCPROFILE:
            return action.JCProfileID;
        default:
            return state;
    }
}
