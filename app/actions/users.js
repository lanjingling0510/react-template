import makeActionCreator from '../utils/makeActionCreator.js';
import {users} from './simulateData.js';
/**
 * action types
 */

export const REQUEST_USER = 'REQUEST_USER';
export const RECEIVE_USER = 'RECEIVE_USER';
export const RECEIVE_USER_BYSTORE = 'RECEIVE_USER_BYSTORE';
export const EDIT_USER = 'EDIT_USER';

export const REQUEST_USERS = 'REQUEST_USERS';
export const RECEIVE_USERS = 'RECEIVE_USERS';

/**
 * action creator
 */

const requestUser = makeActionCreator(REQUEST_USER, 'userID');
const receiveUser = makeActionCreator(RECEIVE_USER, 'user');
const receiveUserByStore = makeActionCreator(RECEIVE_USER_BYSTORE, 'user');
const _editUser = makeActionCreator(EDIT_USER, 'user');

const requestUsers = makeActionCreator(REQUEST_USERS, 'querystring');
const receiveUsers = makeActionCreator(RECEIVE_USERS, 'users');

export const fetchUsersIfNeeded = function (querystring) {
    return (dispatch, getState) => {
        if (shouldFetchUsers(getState())) {
            return dispatch(fetchUsers(querystring));
        }
    };
};

export const fetchUser = function (userID) {
    return (dispatch, getState) => {
        let user = fetchUserByStore(getState(), userID);
        if (user) {
            dispatch(receiveUserByStore(user));
            return Promise.resolve(user);
        }

        dispatch(requestUser(userID));
        user = users.find(item => item._id === userID);
        dispatch(receiveUser(user));
        return Promise.resolve(user);
    };
};

export const editUser = function (user) {
    return (dispatch) => {
        dispatch(_editUser(user));
    };
};

function fetchUsers(querystring) {
    return function (dispatch) {
        dispatch(requestUsers(querystring));
        return new Promise(() => {
            dispatch(receiveUsers(users));
        });
    };
}

function shouldFetchUsers(state) {
    return state.users.length === 0 || state.currentUser === state.users[0]._id;
}

function fetchUserByStore(state, userID) {
    return state.JCProfiles.find(JCProfile => JCProfile._id === userID);
}
