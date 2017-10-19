import React, { Component } from 'react';
import { connect } from 'react-redux';
import Products from './Products';
import SearchBar from './SearchBar';

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
    return (
      <div>
        <div className="row">
          <SearchBar { ...this.state } handleSearch={ handleSearch } />
          <CategoryFilter { ...this.props } { ...this.state } handleFilter={ handleFilter } />
        </div>
        <Products { ...this.props } { ...this.state } />
      </div>
    );
  }
}

const mapStateToProps = ({ categories, products, handleSearch }) => {
  return { categories, products, handleSearch };
};

export default connect(mapStateToProps)(FilterableProductsPanel);
