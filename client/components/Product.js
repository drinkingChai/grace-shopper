import React from 'react';
import { connect } from 'react-redux';
import ReviewForm from './ReviewForm';

const Product = ({product, currentUser}) => {

  // const product = products.filter(product => product)
  console.log(product);
  return (
    <div className="col-xs-12 col-sm-8">
      <h2> {product.name} </h2>
      <h3> {product.description} </h3>
      <img src = {product.photo} width="100%" height="225px"/>
      <p>Price: {product.price} </p>
      <p>Quantity Left: {product.inventoryQuantity} </p>
      <p> Reviews will be here! </p>
      { currentUser.userId ?
        <ReviewForm />:
        'Login to leave a review!'
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
