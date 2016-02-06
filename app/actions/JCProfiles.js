import makeActionCreator from '../utils/makeActionCreator.js';
import 'isomorphic-fetch';

/* ------------------------------------------------------------
 * action types
 * ------------------------------------------------------------ */

export const EDIT_JCPROFILE = 'EDIT_JCPROFILE';
export const CREATE_JCPROFILE = 'CREATE_JCPROFILE';
export const SELECT_JCPROFILE = 'SELECT_JCPROFILE';

export const REQUEST_JCPROFILES = 'REQUEST_JCPROFILES';
export const RECEIVE_JCPROFILES = 'RECEIVE_JCPROFILES';

/* ------------------------------------------------------------
 * action creator
 * ------------------------------------------------------------ */


const _editJCProfile = makeActionCreator(EDIT_JCPROFILE, 'JCProfile');
const _createJCProfile = makeActionCreator(CREATE_JCPROFILE, 'JCProfile');

const requestJCProfiles = makeActionCreator(REQUEST_JCPROFILES, 'querystring');
const receiveJCProfiles = makeActionCreator(RECEIVE_JCPROFILES, 'JCProfiles');
export const selectJCProfile = makeActionCreator(SELECT_JCPROFILE, 'JCProfileID');
export const fetchJCProfilesIfNeeded = querystring => (dispatch, getState) => {
    if (shouldFetchJCProfiles(getState())) {
        return dispatch(fetchJCProfiles(querystring));
    }

    return Promise.resolve(getState().JCProfiles);
};


export const editJCProfile = profile => (dispatch, getState, baseUrl, authorization) => {
    return fetch(`${baseUrl}/profiles/${profile._id}`, {
        method: 'put',
        headers: {
            'Authorization': authorization,
        },
    })
    .then(res => {
        if (res.ok) return res.json();
        throw new Error(res.statusText);
    })
    .then(json => dispatch(_editJCProfile(json)));
};

export const createJCProfile = (profile) => (dispatch, getState, baseUrl, authorization) => {
    return fetch(`${baseUrl}/profiles`, {
        method: 'post',
        headers: {
            'Authorization': authorization,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
    }).then(res => {
        if (res.ok) return res.json();
        throw new Error(res.statusText);
    }).then(json => dispatch(_createJCProfile(json)));
};

/* ------------------------------------------------------------
 * function
 * ------------------------------------------------------------ */

const fetchJCProfiles = querystring => (dispatch, getState, baseUrl, authorization) => {
    dispatch(requestJCProfiles(querystring));
    return fetch(`${baseUrl}/profiles`, {
        headers: {
            'Authorization': authorization,
        },
    }).then(res => {
        if (res.ok) return res.json();
        throw new Error(res.statusText);
    }).then(json => {
        dispatch(receiveJCProfiles(json));
        return json;
    });
};

function shouldFetchJCProfiles(state) {
    return state.fetcheds.indexOf('JCProfiles') === -1;
}
