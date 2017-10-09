import React from 'react';
import { connect } from 'react-redux';

const AllProducts = ({ products }) => {
  return (
    <div className="col-xs-12 col-sm-10">
      <ul className="list-unstyled">
        {
          products.map(product => {
            return (
              <li key={ product.id }>
                <div className="col-xs-12 col-sm-6 col-md-3 panel panel-default" style={{ marginRight: '10px' }}>
                  <h3 className="panel-heading">{ product.name }</h3>
                  <div className="panel-body">
                    <img src={ product.photo } width="100%" />
                    <p>{ product.description }</p>
                    <h5><label>Price:</label> ${ product.price }</h5>
                    {
                      product.inventoryQuantity === 0 ?
                      <p className="label label-default">Sold Out</p> :
                      <button className="btn btn-sm btn-primary">Add to Cart <span className="glyphicon glyphicon-shopping-cart" /></button>
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
    products: state.products
  }
}

export default connect(mapStateToProps)(AllProducts);
