import React from 'react';
import { connect } from 'react-redux';
import { addToCart } from '../store'

const AllProducts = ({ products, addToCart }) => {
  return (
    <div className="col-xs-12 col-sm-10">
      <ul className="list-unstyled">
        {
          products.map(product => {
            return (
              <li key={ product.id } className="col-xs-12 col-sm-6 col-md-4">
                <div className="panel panel-default">
                  <h3 className="panel-heading" style={{ margin: 0 }}>{ product.name }</h3>
                  <div className="panel-body">
                    <img src={ product.photo } width="100%" />
                    <p>{ product.description }</p>
                    <h5><label>Price:</label> ${ product.price }</h5>
                    {
                      product.inventoryQuantity === 0 ?
                      <p className="label label-default">Sold Out</p> :
                        <button className="btn btn-sm btn-primary" onClick={ ()=> addToCart(product) }>Add to Cart <span className="glyphicon glyphicon-shopping-cart" /></button>
                    }
                  </div>
                </div>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
  }
}

const mapDispatch = { addToCart }

export default connect(mapStateToProps, mapDispatch)(AllProducts);
