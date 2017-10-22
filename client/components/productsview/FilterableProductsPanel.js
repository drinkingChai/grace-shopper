import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { updateCartItem, fetchCategory } from '../../store';
import Products from './Products';
import SearchBar from '../SearchBar';
import CategoryFilter from '../CategoryFilter';

class FilterableProductsPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(searchInput) {
    this.setState({ searchInput });
  }

  render() {
    const { handleSearch } = this;
    const { searchInput } = this.state;
    const { categories, products, currentCategory, handleFilter } = this.props;

    console.log(this.props);
    // const selectedCategory = categories.filter(cat => cat.id === activeCategory * 1);
    // const filteredProducts = selectedCategory ? selectedCategory.products : products;

    return (
      <div>
        <div className="row filter-row">
          <SearchBar searchInput={ searchInput } handleSearch={ handleSearch } />
          <CategoryFilter categories={ categories } handleFilter={ handleFilter } />
        </div>
        <Products filteredProducts={ currentCategory.products || products } searchInput={ searchInput } { ...this.props } />
      </div>
    );
  }
}

const mapStateToProps = ({ categories, products, currentCategory }) => {
  return { categories, products, currentCategory };
};

const mapDispatch = (dispatch, ownProps) => {
  return {
    handleFilter(id) {
      dispatch(fetchCategory(id, ownProps.history));
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatch)(FilterableProductsPanel));
