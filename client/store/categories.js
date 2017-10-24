import axios from 'axios';

const GET_CATEGORIES = 'GET_CATEGORIES';

const getCategories = (categories) => {
  return {
    type: GET_CATEGORIES,
    categories
  }
};

export const fetchCategories = () => {
  return dispatch => {
    axios.get('/api/categories')
      .then(res => res.data)
      .then(categories => dispatch(getCategories(categories)))
  }
};

export const createCategory = (categoryData) => dispatch => {
  return axios.post('/api/categories', categoryData)
    .then(res => res.data)
    .then(() => dispatch(fetchCategories()))
}

export const deleteCategory = categoryId => dispatch =>
  axios.delete(`/api/categories/${categoryId}`)
    .then(() => dispatch(fetchCategories()))

const reducer = (categories = [], action) => {
  switch(action.type) {
    case GET_CATEGORIES:
      return action.categories;
    default:
      return categories;
  }
};

export default reducer;
