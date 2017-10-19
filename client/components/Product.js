import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ReviewForm from './ReviewForm';

const Product = ({ product, currentUser }) => {
  console.log(product);
  if (!product) return <div>Product not found.</div>

  return (
    <section>
      <div className="col-xs-12 col-sm-6">
        <img src={product.photo} width="100%" />
      </div>
      <div className="col-xs-12 col-sm-6">
        <h2>{ product.name }</h2>
        <h3 className="product-desc">{ product.description }</h3>
      </div>
      <div className="col-xs-12 col-sm-4">
        <h4>${ product.price }</h4>
        <div>
          {
            currentUser.userId ? <ReviewForm product={ product } /> : <p><Link to="/login">Login</Link> to leave a review.</p>
          }
        </div>
      </div>
      <div className="col-xs-10">
        <div className="well">
          <h3>Product Reviews:</h3>
          <div>
          {
                !product.reviews.length ?
                  <p>No reviews.</p> :
                  <p>Rating: {(product.reviews.map(review => review.rating).reduce((total, curr) => { return total + curr}, 0) / product.reviews.length).toFixed(1)} out of 5, with {product.reviews.length} reviews.
                  </p>
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
          </div>
        </div>
      </div>
    </section>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    product: state.products.find(prod => prod.id == ownProps.match.params.id),
    currentUser: state.currentUser
  }
};

export default connect(mapStateToProps)(Product);
