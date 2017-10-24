import axios from 'axios';

const GET_PRODUCTS = 'GET_PRODUCTS';

const getProducts = (products) => {
  return {
    type: GET_PRODUCTS,
    products
  }
};

export const fetchProducts = () => {
  return dispatch => {
    return axios.get('/api/products')
      .then(res => res.data)
      .then(products => dispatch(getProducts(products)))
  }
};

export const createProd = (prodData) =>
   dispatch => {
    return axios.post('/api/products', prodData)
      .then(res => res.data)
      .then(() => dispatch(fetchProducts()))
  }

export const updateProduct = (productId, prodData) =>
  dispatch =>
   axios.put(`/api/products/${productId}`, prodData)
   .then(() => dispatch(fetchProducts()))

const reducer = (products = [], action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products;
    default:
      return products;
  }
};

export default reducer;
