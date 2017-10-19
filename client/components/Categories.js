import React, { Component } from 'react';
import { connect } from 'react-redux';
import Products from './Products';

class SearchBar extends Component {
  render() {
    const { searchInput } = this.props;
    return (
      <form className="col-xs-6 col-sm-3">
        <input className="form-control" type="text" placeholder="Search..." value={ searchInput } />
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
    }
  }

  render() {
    return (
      <div>
        <div className="row">
          <SearchBar />
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
