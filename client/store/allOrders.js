import axios from 'axios';

const GET_ALL_ORDERS = 'GET_ALL_ORDERS';

const getAllOrders = allOrders => ({ type: GET_ALL_ORDERS, allOrders })

export const fetchAllOrders = () => dispatch =>
  axios.get('/api/orders/all-orders')
    .then(res => dispatch(getAllOrders(res.data)))
    .catch(err => console.log(err.message))

const reducer = (allOrders = [], action) => {
  switch (action.type) {
    case GET_ALL_ORDERS:
      return action.allOrders
    default:
      return allOrders;
  }
};

export default reducer;
