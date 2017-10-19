import React from 'react';
import { connect } from 'react-redux';
import { updateCartItem } from '../store';
import { Link } from 'react-router-dom';

const Products = ({ products, updateCartItem, categories, searchInput, activeCategory }) => {
  const selectedCategory = categories.filter(cat => cat.id === activeCategory * 1);
  const filteredProducts = selectedCategory.length ? selectedCategory[0].products : products;

  return (
    <ul className="list-unstyled">
      {
        filteredProducts.map(product => {
          if (product.name.indexOf(searchInput) === -1) return;
          return (
            <li key={ product.id } className="col-xs-12 col-sm-6">
              <div className="panel panel-default product-panel">
                <Link to ={`/products/${product.id}`}>
                <h3 className="panel-heading" style={{ margin: 0 }}>{ product.name }</h3>
                </Link>
                <div className="panel-body">
                  <img src={ product.photo } width="100%" height="225px"/>
                  <p>{ product.description }</p>
                  <h5><label>Price:</label> ${ product.price }</h5>
                  {
                    product.inventoryQuantity === 0 ?
                    <p className="label label-default">Sold Out</p> :
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={ () => updateCartItem(product, 1) }>
                      Add to Cart <span className="glyphicon glyphicon-shopping-cart" />
                    </button>
                  }
                </div>
              </div>
            </li>
          )
        })
      }
    </ul>
  )
}

// const mapStateToProps = (state) => {
//   return {
//     products: state.products
//   }
// };

const mapDispatch = { updateCartItem };

export default connect(null, mapDispatch)(Products);
