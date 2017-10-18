import axios from 'axios';

const GET_USERS = 'GET_USERS';
const CLEAR_USERS = 'CLEAR_USERS';

const getUsers = users => ({ type: GET_USERS, users })
export const clearUsers = () => ({ type: CLEAR_USERS })

export const fetchUsers = () => dispatch =>
  axios.get('/api/users')
    .then(res => dispatch(getUsers(res.data)))

export const promoteUser = userId => dispatch =>
  axios.put(`/api/users/update-user/${userId}`, { isAdmin: true })
    .then(() => dispatch(fetchUsers()))

export const demoteUser = userId => dispatch =>
  axios.put(`/api/users/update-user/${userId}`, { isAdmin: false })
    .then(() => dispatch(fetchUsers()))

export const disableUser = userId => dispatch =>
  axios.put(`/api/users/update-user/${userId}`, { isDisabled: true })
    .then(() => dispatch(fetchUsers()))

export const enableUser = userId => dispatch =>
  axios.put(`/api/users/update-user/${userId}`, { isDisabled: false })
    .then(() => dispatch(fetchUsers()))

export const promptPasswordChange = userId => dispatch =>
  axios.put(`/api/users/update-user/${userId}`, { passwordChange: true })
    .then(() => dispatch(fetchUsers()))

export const deleteUser = userId => dispatch =>
  axios.delete(`/api/users/${userId}`)
    .then(() => dispatch(fetchUsers()))

const reducer = (users = [], action) => {
  switch (action.type) {
    case GET_USERS:
      return action.users
    case CLEAR_USERS:
      return []
    default:
      return users;
  }
};

export default reducer;
