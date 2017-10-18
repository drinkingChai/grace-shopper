import axios from 'axios';

const GET_USERS = 'GET_USERS';

export const getUsers = users => ({ type: GET_USERS, users })

export const fetchUsers = () => dispatch =>
  axios.get('/api/users')
    .then(res => res.data)
    .then(users => dispatch(getUsers(users)))
    .catch(err => console.log(err.message))

const reducer = (users = [], action) => {
  switch (action.type) {
    case GET_USERS:
      return action.users
    default:
      return users;
  }
};

export default reducer;
