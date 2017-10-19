import React from 'react';

const CategoryFilter = ({ categories, handleFilter }) => {
  return (
    <form className="col-xs-6 col-sm-3">
      <select className="form-control" onChange={(ev) => handleFilter(ev.target.value)}>
      {
        categories.map(category => <option key={ category.id } value={ category.id }>{ category.name }</option>)
      }
      </select>
    </form>
  );
};

export default CategoryFilter;
