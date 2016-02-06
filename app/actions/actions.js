import request from 'superagent';
import makeActionCreator from '../utils/makeActionCreator.js';
/**
 * action types
 */

export const SELECT_USER = 'SELECT_USER';
export const REQUEST_SUBJECTS = 'REQUEST_SUBJECTS';
export const RECEIVE_SUBJECTS = 'RECEIVE_SUBJECTS';


export const selectUser = makeActionCreator(SELECT_USER, 'user');
export function fetchSubjectsIfNeeded(user) {
    return (dispatch, getState) => {
        if (shouldFetchSubjects(getState(), user)) {
            return dispatch(fetchSubjects(user));
        }
    };
}


function requestSubjects(user) {
    return {
        type: REQUEST_SUBJECTS,
        user,
    };
}

function receiveSubjects(user, subjects) {
    return {
        type: RECEIVE_SUBJECTS,
        user,
        subjects,
    };
}


function fetchSubjects(user) {
    return function (dispatch) {
        dispatch(requestSubjects(user));
        return new Promise((resolve, reject) => {
            request.get(`http://www.cyt-rain.cn:3000/test?name=${user}`)
                .end((err, res) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(res.body);
                    dispatch(receiveSubjects(user, res.body.subjects));
                });
        });
    };
}


function shouldFetchSubjects(state, user) {
    const subjects = state.subjectsByUser[user];
    return subjects ? false : true;
}
