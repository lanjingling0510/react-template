import makeActionCreator from '../utils/makeActionCreator.js';
import 'isomorphic-fetch';

/**
 * action types
 */

export const REQUEST_ACCESSTOKEN = 'REQUEST_ACCESSTOKEN';
export const REQUEST_PROFILE = 'REQUEST_PROFILE';
export const RECEIVE_ACCESSTOKEN = 'RECEIVE_ACCESSTOKEN';
export const RECEIVE_PROFILE = 'RECEIVE_PROFILE';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';
export const AUTH_LOGIN_STORE = 'AUTH_LOGIN_STORE';

/**
 * action creator
 */

export const authLogout = makeActionCreator(AUTH_LOGOUT);
export const authLoginByStore = makeActionCreator(AUTH_LOGIN_STORE, 'accessToken');
export const authLogin = function (user) {
    return (dispatch, getState) => {
        if (!isLogined(getState().auth)) {
            return dispatch(fetchAccessToken(user));
        }
    };
};

const requestAccessToken = makeActionCreator(REQUEST_ACCESSTOKEN, 'user');
const receiveAccessToken = makeActionCreator(RECEIVE_ACCESSTOKEN, 'accessToken');


const fetchAccessToken = user => (dispatch, getState, baseUrl) => {
    dispatch(requestAccessToken(user));
    return fetch(`${baseUrl}/self/token`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    }).then(res => {
        if (res.ok) return res.json();
        throw new Error(res.statusText);
    }).then(json => {
        const accessToken = json.access_token;
        localStorage.setItem('accessToken', accessToken);
        dispatch(receiveAccessToken(accessToken));
        return accessToken;
    });
};

function isLogined(auth) {
    return auth && auth.accessToken ? true : false;
}
