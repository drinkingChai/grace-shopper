import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateProduct, updateCartItem } from '../../store';
import ReviewForm from './ReviewForm';
import ProductEditForm from '../admin/ProductEditForm';
import Cart from '../shopping/Cart';

class Product extends Component{
  constructor(props) {
    super(props);
    this.state = { product: props.product, formVisible: false };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.editFormVisible = this.editFormVisible.bind(this);
  }

  componentWillReceiveProps({ product }) {
    this.setState({ product });
  }

  onChangeHandler (ev) {
    const { name, value } = ev.target;
    this.setState({[name]: value});
  }

  componentWillMount(){
    this.setState({ formVisible: false });
  }

  editFormVisible(){
    this.setState({ formVisible: !this.state.formVisible });
  }

  render() {
    const { product } = this.state
    const {currentUser, categories, updateCartItem } = this.props
    const { editFormVisible } = this
    const divStyle = {
     background: '#ff9933',
     zIndex: '0',
     position: 'relative',
     top: '-1.55em',
     left: '3.42em',
     width: 2*1+'em',
     height: '1em'
    }
    
    if (!product) return <div>Product not found.</div>

    return (
      <div>
        <Cart />
        <div className="col-xs-12 col-sm-10">
          <div className="col-xs-12 col-sm-6">
            <img src={product.photo} width="100%" />
          </div>

          <div className="col-xs-12 col-sm-6">
            <h2>{ product.name }</h2>
            <br />
            <h3><label>Categories:&nbsp;</label>
             {
              product.categories.map(category =>
                <Link to={ `/categories/${ category.id }` } key={ category.id }><p>{category.name}</p></Link>)
             }
            </h3>
            <h3 className="product-desc">{ product.description }</h3>
          </div>
          <div className="col-xs-12 col-sm-6">
              <h4>${ product.price }</h4>
              { currentUser.isAdmin ?
              <div>
                <button className="btn btn-default" onClick={ editFormVisible}> Edit Product </button>
                { this.state.formVisible ?
                   <ProductEditForm product={ product } allCategories={categories} /> : ''
                }
                </div> :
                <button className="btn btn-sm btn-primary"
                  onClick={ () => updateCartItem(product, 1) }>
                  Add to Cart <span className="glyphicon glyphicon-shopping-cart" />
                </button>
              }
          </div>

          <div className="col-xs-10">
            <div>
              {
                currentUser.userId ? <ReviewForm product={ product } /> : <p className="alert alert-primary"><Link to="/login">Login</Link> to leave a review.</p>
              }
            </div>
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
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {

  return {
    product: state.products.find(prod => prod.id == ownProps.match.params.id),
    currentUser: state.currentUser,
    categories: state.categories
  }
};

const mapDispatchToProps = { updateProduct, updateCartItem }

export default connect(mapStateToProps, mapDispatchToProps)(Product);
