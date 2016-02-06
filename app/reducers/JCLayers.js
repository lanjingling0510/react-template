import {RECEIVE_JCLAYERS, EDIT_JCLAYER, CREATE_JCLAYER, DELETE_JCLAYER} from '../actions/JCLayers.js';

export function JCLayers(state = [], action) {
    let index;
    switch (action.type) {
        case RECEIVE_JCLAYERS:
            return [...state, ...action.JCLayers];
        case EDIT_JCLAYER:
            index = state.findIndex(layer => layer._id === action.JCLayer._id);
            return [
                ...state.slice(0, index),
                action.JCLayer,
                ...state.slice(index + 1),
            ];
        case CREATE_JCLAYER:
            return [...state, action.JCLayer];
        case DELETE_JCLAYER:
            index = state.findIndex(layer => layer._id === action.JCLayerID);
            return [
                ...state.slice(0, index),
                ...state.slice(index + 1),
            ];
        default:
            return state;
    }
}
