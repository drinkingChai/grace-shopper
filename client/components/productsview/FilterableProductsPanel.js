import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateCartItem } from '../../store';
import Products from './Products';
import SearchBar from '../SearchBar';
import CategoryFilter from '../CategoryFilter';

class FilterableProductsPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      activeCategory: 0
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }

  handleSearch(searchInput) {
    this.setState({ searchInput });
  }

  handleFilter(activeCategory) {
    this.setState({ activeCategory });
  }

  render() {
    const { handleSearch, handleFilter } = this;
    const { searchInput, activeCategory } = this.state;
    const { categories, products } = this.props;

    const selectedCategory = categories.filter(cat => cat.id === activeCategory * 1);
    const filteredProducts = selectedCategory.length ? selectedCategory[0].products : products;

    return (
      <div>
        <div className="row filter-row">
          <SearchBar searchInput={ searchInput } handleSearch={ handleSearch } />
          <CategoryFilter categories={ categories } handleFilter={ handleFilter } />
        </div>
        <Products filteredProducts={ filteredProducts } searchInput={ searchInput } { ...this.props } />
      </div>
    );
  }
}

const mapStateToProps = ({ categories, products }) => {
  return { categories, products };
};

const mapDispatch = { updateCartItem };

export default connect(mapStateToProps, mapDispatch)(FilterableProductsPanel);
