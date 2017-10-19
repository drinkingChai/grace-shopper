import React, { Component } from 'react';
import { connect } from 'react-redux';
import Products from './Products';

class SearchBar extends Component {
  render() {
    const { searchInput, handleSearch } = this.props;
    console.log(handleSearch)

    return (
      <form className="col-xs-6 col-sm-3">
        <input value={ searchInput } onChange={(ev) => handleSearch(ev.target.value)} placeholder="Search..." type="text" className="form-control" />
      </form>
    );
  }
}

class CategoryFilter extends Component {
  render() {
    // console.log(this.props)
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
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      activeCategory: 0
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(searchInput) {
    this.setState({ searchInput });
  }

  render() {
    const { handleSearch } = this;
    return (
      <div>
        <div className="row">
          <SearchBar { ...this.props } { ...this.state } handleSearch={ handleSearch } />
          <CategoryFilter { ...this.props } { ...this.state } />
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
