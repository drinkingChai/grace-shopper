import axios from 'axios';

const GET_PRODUCTS = 'GET_PRODUCTS';
const GET_PRODUCT = 'GET_PRODUCT';


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
      .catch(err => console.log(err.message))
  }
};

export const createProd = (prodData) =>
   dispatch => {
    return axios.post('/api/products', prodData)
      .then(res => res.data)
      .then(() => dispatch(fetchProducts()))
      // .then(product => dispatch(getProduct(product)))
      .catch(err => console.log(err.message))
  }


const reducer = (products = [], action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products;
    case GET_PRODUCT:
      return [...products, action.product]

    default:
      return products;
  }
};

export default reducer;
