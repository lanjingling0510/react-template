import makeActionCreator from '../utils/makeActionCreator.js';
import 'isomorphic-fetch';

/* ------------------------------------------------------------
 * action types
 * ------------------------------------------------------------ */

export const REQUEST_LAYER_CLASSES = 'REQUEST_LAYER_CLASSES';
export const RECEIVE_LAYER_CLASSES = 'RECEIVE_LAYER_CLASSES';
export const CREATE_LAYER_CLASS = 'CREATE_LAYER_CLASS';


/* ------------------------------------------------------------
 * action creator
 * ------------------------------------------------------------ */

const requestLayerClasses = makeActionCreator(REQUEST_LAYER_CLASSES, 'querystring');
const receiveLayerClasses = makeActionCreator(RECEIVE_LAYER_CLASSES, 'layerClasses');
export const fetchLayerClassesIfNeeded = function (querystring) {
    return (dispatch, getState) => {
        if (shouldFetchLayerClasses(getState())) {
            return dispatch(fetchLayerClasses(querystring));
        }
    };
};

const fetchLayerClasses = querystring => (dispatch, getState, baseUrl, authorization) => {
    dispatch(requestLayerClasses(querystring));
    return fetch(`${baseUrl}/layer-classes`, {
        headers: {
            'Authorization': authorization,
        },
    })
    .then(res => {
        if (res.ok) return res.json();
        throw new Error(res.statusText);
    })
    .then(json => dispatch(receiveLayerClasses(json)));
};


export const createLayerClass = layerClass => (dispatch, getState, baseUrl, authorization) => {
    return fetch(`${baseUrl}/layer-classes`, {
        method: 'post',
        headers: {
            'Authorization': authorization,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(layerClass),
    }).then(res => {
        if (!res.ok) throw new Error(res.statusText);
    });
};

function shouldFetchLayerClasses(state) {
    return state.layerClasses.length === 0;
}
