import axios from 'axios'
import { fetchOrders } from './orders'

export const writeReview = (reviewData) => dispatch =>
  axios.post(`/api/reviews/${reviewData.productId}`, reviewData)
    .then(() => dispatch(fetchOrders()))
  .catch(err => console.log(err.message))

const initialState = {}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default reducer;
