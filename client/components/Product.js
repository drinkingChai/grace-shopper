import React from 'react';
import { connect } from 'react-redux';
import ReviewForm from './ReviewForm';

const Product = ({product, currentUser}) => {

//  console.log(product);
  if (!product) return <div>No product here!</div>

  return (
    <div className="col-xs-12 col-sm-8">
      <h2> {product.name} </h2>
      <h3> {product.description} </h3>
      <img src = {product.photo} width="100%" height="225px"/>
      <p>Price: {product.price} </p>
      <p>Quantity Left: {product.inventoryQuantity} </p>
       {
          
          !product.reviews.length ? 
            <p> No reviews </p> :
           
           <p> Rating: { 
              (product.reviews
                .map(review => review.rating)
                .reduce((total,curr)=> { return total+curr}, 0)/product.reviews.length).toFixed(1)
            } out of 5, with {product.reviews.length} reviews.</p>
          
        }
      {
        product.reviews.map(review => {
          return (
            <article className="reviews" key={review.id}>
              <p className="rating">Rating: {review.rating}/5</p>
              <p className="byline">By {review.user.name} on {new Date().toUTCString()} </p>
              <p className="title">{review.title}</p>
              <p className="blurb">{review.blurb}</p>
            </article>
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
