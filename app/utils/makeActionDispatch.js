const makeActionDispatch = (func, dispatch) => param => dispatch(func(param));
export default makeActionDispatch;
