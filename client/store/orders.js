import axios from 'axios';

const GET_ORDERS = 'GET_ORDERS';

export const getOrders = (orders) => {
  return {
    type: GET_ORDERS,
    orders
  }
};

export const fetchOrders = () => dispatch =>
  axios.get('/api/orders')
    .then(res => res.data)
    .then(orders => dispatch(getOrders(orders)))
    .catch(err => console.log(err.message))

export const fetchOrder = orderId => dispatch =>
  axios.get(`/api/orders/${orderId}`)
    .then(res => res.data)

const reducer = (orders = [], action) => {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders;
    default:
      return orders;
  }
};

export default reducer;
