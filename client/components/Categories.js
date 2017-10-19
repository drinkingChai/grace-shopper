import React, { Component } from 'react';
import { connect } from 'react-redux';
import Products from './Products';

class SearchBar extends Component {
  render() {
    return (
      <form className="col-xs-6 col-sm-3">
        <input className="form-control" type="text" placeholder="Search..." />
      </form>
    );
  }
}

class CategoryFilter extends Component {
  render() {
    const { categories } = this.props;
    return (
      <form className="col-xs-6 col-sm-3">
        <select className="form-control">
        {
          categories.map(category => <option key={ category.id } value={ category.id }>{ category.name }</option>)
        }
        </select>
      </form>
    );
  }
}

class FilterableProductsPanel extends Component {
  render() {
    const { categories, products } = this.props;
    return (
      <div>
        <div className="row">
          <SearchBar />
          <CategoryFilter categories={ categories } />
        </div>
        <Products products={ products } />
      </div>
    );
  }
}

const mapStateToProps = ({ categories, products }) => {
  return { categories, products };
};

export default connect(mapStateToProps)(FilterableProductsPanel);
