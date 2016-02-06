import {
    RECEIVE_USERS,
    RECEIVE_USER,
    RECEIVE_USER_BYSTORE,
    EDIT_USER,
}
from '../actions/users.js';

export function users(state = [], action) {
    let index;
    switch (action.type) {
        case RECEIVE_USERS:
            return action.users;
        case RECEIVE_USER:
            return [...state, action.user];
        case EDIT_USER:
            index = state.findIndex(user => user._id === action.user._id);
            return [
                ...state.slice(0, index),
                action.user,
                ...state.slice(index + 1),
            ];
        default:
            return state;
    }
}

export function currentUser(state = null, action) {
    if (action.type === RECEIVE_USER_BYSTORE) {
        return action.user._id;
    } else if (action.type === RECEIVE_USER) {
        return action.user._id;
    }

    return state;
}
