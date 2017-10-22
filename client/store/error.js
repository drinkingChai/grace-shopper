const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';
const CLEAR_ERROR_MESSAGE = 'CLEAR_ERROR_MESSAGE';

export const setError = message => ({ type: SET_ERROR_MESSAGE, message })
export const clearError = () => ({ type: CLEAR_ERROR_MESSAGE })

export const setErrorAndClear = message => dispatch => {
  setTimeout(() => dispatch(clearError()), 2500)
  dispatch(setError(message))
}

const reducer = (error = '', action) => {
  switch(action.type) {
    case SET_ERROR_MESSAGE:
      return action.message;
    case CLEAR_ERROR_MESSAGE:
      return ''
    default:
      return error;
  }
};

export default reducer;
