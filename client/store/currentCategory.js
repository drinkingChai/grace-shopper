import axios from 'axios';

const GET_CATEGORY = 'GET_CATEGORY';

const getCategory = (category) => {
  return {
    type: GET_CATEGORY,
    category
  }
};

export const fetchCategory = (id, history) => {
  return dispatch => {
    axios.get(`/api/categories/${id}`)
      .then(res => res.data)
      .then(category => {
        dispatch(getCategory(category));
        if (history) history.push(`/categories/${id}`);
      })
  };
};

export const updateCategory = (id, name) => {
  return dispatch => {
    return axios.put(`/api/categories/${id}`, name)
      .then(res => res.data)
      .then(category => dispatch(getCategory(category)))
  };
};

export default function reducer(category = 0, action) {
  switch(action.type) {
    case (GET_CATEGORY):
      return action.category;

    default:
      return category;
  }
}
