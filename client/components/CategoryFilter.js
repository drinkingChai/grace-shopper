import React from 'react';

const CategoryFilter = ({ currentCategory, categories, handleFilter }) => {
  return (
    <form className="col-xs-6 col-sm-3">
      <select
        className="form-control"
        onChange={(ev) => handleFilter(ev.target.value)}
        value={ currentCategory.id }>
          <option key="0" value="">All Categories</option>
          {
            categories.map(category =>
              <option key={ category.id } value={ category.id }>{ category.name }</option>)
          }
      </select>
    </form>
  );
};

export default CategoryFilter;
