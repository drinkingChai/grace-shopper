import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchCategory } from '../../store';
import Products from './Products';
import SearchBar from '../SearchBar';
import CategoryFilter from '../CategoryFilter';

class FilterableProductsPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: ''
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    const { getCategory, currentCategory } = this.props;
    getCategory(currentCategory);
  }

  handleSearch(searchInput) {
    this.setState({ searchInput });
  }

  render() {
    const { handleSearch } = this;
    const { searchInput } = this.state;
    const { categories, products, currentCategory } = this.props;
    const filteredProducts = currentCategory.products || products;
    // const selectedCategory = categories.filter(cat => cat.id === activeCategory * 1);
    // const filteredProducts = selectedCategory ? selectedCategory.products : products;

    return (
      <div>
        <div className="row filter-row">
          <SearchBar searchInput={ searchInput } handleSearch={ handleSearch } />
          <CategoryFilter { ...this.props } />
        </div>
        <Products filteredProducts={ filteredProducts } searchInput={ searchInput } { ...this.props } />
      </div>
    );
  }
}

const mapStateToProps = ({ categories, products, currentCategory }) => {
  return { categories, products, currentCategory };
};

const mapDispatch = (dispatch, ownProps) => {
  return {
    getCategory(category) {
      if (!category && !ownProps.match.params.id) return;
      else if (!category) category = ownProps.match.params.id;
      dispatch(fetchCategory(category, ownProps.history));
    },
    handleFilter(id) {
      dispatch(fetchCategory(id, ownProps.history));
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatch)(FilterableProductsPanel));
