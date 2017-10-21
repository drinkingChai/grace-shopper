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
      .catch(err => console.log(err.message));
  }
};

const reducer = (categories = [], action) => {
  switch(action.type) {
    case GET_CATEGORIES:
      return action.categories;
    default:
      return categories;
  }
};

export default reducer;
