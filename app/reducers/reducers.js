import {SELECT_USER, RECEIVE_SUBJECTS} from '../actions/index.js';

export function selectedUser(state = 'cyt', action) {
    switch (action.type) {
        case SELECT_USER:
            return action.user;
        default:
            return state;
    }
}

export function subjectsByUser(state = {}, action) {
    if (action.type === RECEIVE_SUBJECTS) {
        return {
            ...state, [action.user]: action.subjects,
        };
    }

    return state;
}
