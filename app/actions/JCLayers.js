import makeActionCreator from '../utils/makeActionCreator.js';
import {layers} from './simulateData.js';
/**
 * action types
 */


export const REQUEST_JCLAYERS = 'REQUEST_JCLAYERS';
export const RECEIVE_JCLAYERS = 'RECEIVE_JCLAYERS';
export const EDIT_JCLAYER = 'EDIT_JCLAYER';
export const CREATE_JCLAYER = 'CREATE_JCLATER';
export const DELETE_JCLAYER = 'DELETE_JCLAYER';

/**
 * action creator
 */

const requestJCLayers = makeActionCreator(REQUEST_JCLAYERS, 'JCProfile');
const receiveJCLayers = makeActionCreator(RECEIVE_JCLAYERS, 'JCLayers');
const _editJCLayer = makeActionCreator(EDIT_JCLAYER, 'JCLayer');
const _createJCLayer = makeActionCreator(CREATE_JCLAYER, 'JCLayer', 'JCProfile');
const _deleteJCLayer = makeActionCreator(DELETE_JCLAYER, 'JCLayerID');

export const fetchJCLayersIfNeeded = function (JCProfile) {
    return (dispatch, getState) => {
        if (shouldFetchJCLayers(getState(), JCProfile)) {
            return dispatch(fetchJCLayers(JCProfile));
        }
    };
};

export const editJCLayer = function (JCLayer) {
    return (dispatch) => {
        dispatch(_editJCLayer(JCLayer));
    };
};

export const createJCLayer = function (JCLayer, JCProfile) {
    return (dispatch) => {
        dispatch(_createJCLayer(JCLayer, JCProfile));
    };
};

export const deleteJCLayer = function (JCLayerID) {
    return (dispatch) => {
        dispatch(_deleteJCLayer(JCLayerID));
    };
};

function fetchJCLayers(JCProfile) {
    return function (dispatch) {
        dispatch(requestJCLayers(JCProfile));
        return new Promise((resolve) => {
            const layerList = layers.filter(layer => JCProfile.JCLayers.includes(layer._id));
            resolve(layerList);
            dispatch(receiveJCLayers(layerList));
        });
    };
}

function shouldFetchJCLayers(state, JCProfile) {
    const layerList = state.JCLayers.filter(layer => JCProfile.JCLayers.includes(layer._id));
    return layerList.length === 0;
}
