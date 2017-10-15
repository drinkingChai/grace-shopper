import axios from 'axios';
import {getOrders, fetchOrders} from './orders';

const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'

const login = user => ({ type: LOGIN, user })
const logout = () => ({ type: LOGOUT })

export const checkSession = () => dispatch =>
  axios.get('/api/sessions')
    .then(res => dispatch(login(res.data)))
    .then(() => dispatch(fetchOrders()))
    .catch(err => console.log(err.message))

export const loginUser = (email, password) => dispatch =>
  axios.put('/api/sessions', { email, password })
    .then(() => dispatch(checkSession()))
    .catch(err => console.log(err.message))

export const logoutUser = () => dispatch =>
  axios.delete('/api/sessions')
    .then(() => dispatch(logout()))
    .then(() => dispatch(fetchOrders()))
    .catch(err => console.log(err.message))

export const registerUser = userData => dispatch =>
  axios.post('/api/users', userData)
    .then(res => dispatch(loginUser(res.data)))
    .catch(err => console.log(err.message))




const reducer = (currentUser = {}, action) => {
  switch (action.type) {
    case LOGIN:
      return action.user
    case LOGOUT:
      return {}
    default:
      return currentUser;
  }
};

export default reducer;
