import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../store';

const AllProductsList = (props) => {
  const { products } = props;

  return (
    <section className="col-xs-12 col-sm-8">
      <h2>All Products</h2>
      <ul>
        {
          products.map(product => {
            return (
              <li key={ product.id }>{ product.name }</li>
            )
          })
        }
      </ul>

    </section>
  )
}

class AllProducts extends Component {
  componentDidMount() {
    this.props.fetchProducts();
  }

  render() {
    return (
      <AllProductsList { ...this.props } />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts() {
      dispatch(fetchProducts());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
