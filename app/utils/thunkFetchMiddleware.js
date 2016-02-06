
const baseUrl = 'https://apis.aliyun183.jcbel.com/jims/1';


const thunkMiddleMiddleware = store => {
    const dispatch = store.dispatch;
    const getState = store.getState;
    return next => action => {
        if (typeof action === 'function') {
            const authorization = 'Bearer ' + store.getState().auth.accessToken;
            return action(dispatch, getState, baseUrl, authorization);
        }
        return next(action);
    };
};


export default thunkMiddleMiddleware;
