import React from 'react';
import { connect } from 'react-redux';
import ReviewForm from './ReviewForm';

const Product = ({product, currentUser}) => {


  console.log(product);
  if (!product) return <div>No product here!</div>

  return (
    <div className="col-xs-12 col-sm-8">
      <h2> {product.name} </h2>
      <h3> {product.description} </h3>
      <img src = {product.photo} width="100%" height="225px"/>
      <p>Price: {product.price} </p>
      <p>Quantity Left: {product.inventoryQuantity} </p>
      {
        product.reviews.map(review => {
          return (
            <div key={review.id}>
              <p>{review.rating}</p>
              <p>{review.blurb} - {review.user.name}</p>

            </div>
          )
        })
      }
      { currentUser.userId ?
        <ReviewForm product={ product} />:
        'Login to leave a review!'
      }
    </div>

  )
}



const mapStateToProps = (state, ownProps) => {


  return {
    product: state.products.find(prod => prod.id == ownProps.match.params.id),
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(Product)
