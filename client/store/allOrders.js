import axios from 'axios';
import { fetchOrders } from './orders'

const GET_ALL_ORDERS = 'GET_ALL_ORDERS';

const getAllOrders = allOrders => ({ type: GET_ALL_ORDERS, allOrders });

export const fetchAllOrders = () => dispatch =>
  axios.get('/api/orders/all-orders')
    .then(res => dispatch(getAllOrders(res.data)))

export const changeOrderStatus = (id, status) => dispatch =>
  axios.put(`/api/orders/change-status/${id}`, status)
    .then(() => dispatch(fetchAllOrders()))
    .then(() => dispatch(fetchOrders()))

const reducer = (allOrders = [], action) => {
  switch (action.type) {
    case GET_ALL_ORDERS:
      return action.allOrders;
    default:
      return allOrders;
  }
};

export default reducer;
