import makeActionCreator from '../utils/makeActionCreator.js';
import {features} from './simulateData.js';
/**
 * action types
 */

export const REQUEST_JCFEATURES = 'REQUEST_JCFEATURES';
export const RECEIVE_JCFEATURES = 'RECEIVE_JCFEATURES';


/**
 * action creator
 */

const requestJCFeatures = makeActionCreator(REQUEST_JCFEATURES, 'JCLayer');
const receiveJCFeatures = makeActionCreator(RECEIVE_JCFEATURES, 'JCFeatures');

export const fetchJCFeaturesIfNeed = function (JCLayer) {
    return (dispatch, getState) => {
        const JCFeatures = fetchJCFeaturesByStore(getState(), JCLayer);
        if (JCFeatures.length === 0) {
            return dispatch(fetchJCFeatures(JCLayer));
        }

        return Promise.resolve(JCFeatures);
    };
};

function fetchJCFeatures(JCLayer) {
    return function (dispatch) {
        dispatch(requestJCFeatures(JCLayer));
        return new Promise((resolve) => {
            const featureList = features.filter(feature => JCLayer.JCFeatures.includes(feature._id));
            resolve(featureList);
            dispatch(receiveJCFeatures(featureList));
        });
    };
}

function fetchJCFeaturesByStore(state, JCLayer) {
    return state.JCFeatures.filter(feature => JCLayer.JCFeatures.includes(feature._id));
}
