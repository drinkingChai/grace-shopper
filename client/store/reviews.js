import axios from 'axios'

export const writeReview = (product, user, rating, blurb) =>
  axios.post(`/api/reviews/${product.id}`, {product, user, rating, blurb} )
  .catch(err => console.log(err.message))

const initialState = {}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default reducer;
