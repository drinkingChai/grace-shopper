import React, { Component } from 'react';
import Products from './Products';

class SearchBar extends Component {
  render() {
    return (
      <form className="col-xs-6 col-sm-4">
        <input type="text" placeholder="Search..." />
      </form>
    );
  }
}

class CategoryFilter extends Component {
  render() {
    return (
      <div className="col-xs-6 col-sm-4">
        <select>
          <option></option>
        </select>
      </div>
    );
  }
}

class FilterableProductsPanel extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <SearchBar />
          <CategoryFilter />
        </div>
        <Products />
      </div>
    );
  }
}

export default FilterableProductsPanel;
