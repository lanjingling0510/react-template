import {RECEIVE_ACCESSTOKEN, RECEIVE_PROFILE, AUTH_LOGOUT, AUTH_LOGIN_STORE} from '../actions/auth.js';

export function auth(state = {}, action) {
    switch (action.type) {
        case AUTH_LOGIN_STORE:
            return {
                accessToken: action.accessToken,
            };
        case AUTH_LOGOUT:
            localStorage.clear();
            return {};
        case RECEIVE_ACCESSTOKEN:
            return {
                ...state,
                accessToken: action.accessToken,
            };
        case RECEIVE_PROFILE:
            return {
                ...state,
                profile: action.profile,
            };
        default:
            return state;
    }
}
