import React from 'react';
import { connect } from 'react-redux';

const AllProducts = ({ products }) => {
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

const mapStateToProps = (state) => {
  return {
    products: state.products
  }
}

export default connect(mapStateToProps)(AllProducts);
