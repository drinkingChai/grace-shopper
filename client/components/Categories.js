import React, { Component } from 'react';
import { connect } from 'react-redux';
import Products from './Products';

const SearchBar = ({ searchInput, handleSearch }) => {
  return (
    <form className="col-xs-6 col-sm-3">
      <input value={ searchInput } onChange={(ev) => handleSearch(ev.target.value)} placeholder="Search..." type="text" className="form-control" />
    </form>
  );
};

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
          <SearchBar { ...this.props } { ...this.state } handleSearch={ handleSearch } />
          <CategoryFilter { ...this.props } { ...this.state } handleFilter={ handleFilter } />
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
