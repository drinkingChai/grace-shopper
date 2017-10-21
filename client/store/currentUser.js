import axios from 'axios';
import {getOrders, fetchOrders} from './orders';
import { fetchAllOrders } from './allOrders'
import { clearUsers } from './users'

const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'

const login = user => ({ type: LOGIN, user })
const logout = () => ({ type: LOGOUT })

export const checkSession = () => dispatch =>
  axios.get('/api/sessions')
    .then(res => {
      dispatch(login(res.data))
      if (res.data.isAdmin) return dispatch(fetchAllOrders())
    })
    .then(() => dispatch(fetchOrders()))
    .catch(err => console.log(err.message))

export const loginUser = (email, password) => dispatch =>
  axios.put('/api/sessions', { email, password })
    .then(() => dispatch(checkSession()))

export const logoutUser = () => dispatch =>
  axios.delete('/api/sessions')
    .then(() => dispatch(logout()))
    .then(() => dispatch(fetchOrders()))
    .then(() => dispatch(clearUsers()))
    .catch(err => console.log(err.message))

export const registerUser = userData => dispatch =>
  axios.post('/api/users', userData)

export const registerGuest = guestData => dispatch =>
  axios.put('/api/sessions/guest-to-user', guestData)
    .then(res => dispatch(checkSession()))

export const updateAccount = userData => dispatch =>
  axios.put('/api/users', userData)
    .then(() => dispatch(checkSession()))
    .catch(err => console.log(err.message))

export const updateUserPassword = passwordData => dispatch =>
  axios.put('/api/users/update-password', passwordData)
    .then(() => dispatch(checkSession()))


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
