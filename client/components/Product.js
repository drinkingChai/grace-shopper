import React from 'react';
import { connect } from 'react-redux';

const Product = ({product, currentUser}) => {

  // const product = products.filter(product => product)
  console.log(product);
  if (!product) return <div>No product here!</div>

  return (
    <div className="col-sm-6">
      <h2> {product.name} </h2>
      <h3> {product.description} </h3>
      <img src = {product.photo} width="100%" height="225px"/>
      <p>Price: {product.price} </p>
      <p>Quantity Left: {product.inventoryQuantity} </p>
      <p> Reviews will be here! </p>
      { currentUser.userId ?
        'Add Reviews' :
        'Not logged in!'
      }
    </div>

  )
}



const mapStateToProps = (state, ownProps) => {
  console.log(ownProps);
  const { match } = ownProps;
  return {
    product: state.products.find(prod => prod.id == match.params.id),
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(Product)
