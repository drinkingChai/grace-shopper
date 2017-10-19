import React, { Component } from 'react';
import { connect } from 'react-redux';
import Products from './Products';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';

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
    const { categories, products } = this.props;

    return (
      <div>
        <div className="row">
          <SearchBar { ...this.state } handleSearch={ handleSearch } />
          <CategoryFilter categories={ categories } handleFilter={ handleFilter } />
        </div>
        <Products { ...this.props } { ...this.state } />
      </div>
    );
  }
}

const mapStateToProps = ({ categories, products }) => {
  return { categories, products };
};

export default connect(mapStateToProps)(FilterableProductsPanel);
