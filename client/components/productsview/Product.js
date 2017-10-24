import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ReviewForm from './ReviewForm';
import { updateProduct } from '../../store'

class Product extends Component{
  constructor(props) {
    super(props);
    this.state = { product: props.product, formVisible: false }
    console.log('sate', this.state);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.editFormVisible = this.editFormVisible.bind(this);
  }

  componentWillReceiveProps({ product }) {
    this.setState({ product })
  }

  onChangeHandler (ev) {
    const { name, value } = ev.target;
    this.setState({[name]: value});
  }

  onSubmitHandler(ev) {
    ev.preventDefault();

    this.props.updateProduct(this.state.id, {
      name: this.state.name
    })
    .catch(err => console.log(err.message))
    this.setState({formVisible: false})
  }

  editFormVisible(){
    this.setState({formVisible: !this.state.formVisible})
  }


  render() {
    const { product } = this.state;
    const {currentUser, categories} = this.props
    const { onChangeHandler, onSubmitHandler, editFormVisible } = this
    if (!product) return <div>Product not found.</div>

    return (
      <section>
        <div className="col-xs-12 col-sm-6">
          <img src={product.photo} width="100%" />
        </div>
        <div className="col-xs-12 col-sm-6">
          <h2>{ product.name }</h2>
          <h4>
          {/* add some styling here for the categories*/}
           {
            product.categories.map(category => `${category.name} `)
           }
          </h4>
          <h3 className="product-desc">{ product.description }</h3>
        </div>
        <div className="col-xs-12 col-sm-4">
          { currentUser.isAdmin ?
            <div>
              <button className="btn" onClick={ editFormVisible}> Edit Product </button>

              { this.state.formVisible ?
                <form onSubmit={ onSubmitHandler }>
                  <input className="form-control" name="name" type="text" value = { product.name } onChange={onChangeHandler}/>
                  <input className="form-control" name="description" type="text" value = { product.description } onChange={onChangeHandler}/>
                  <input className="form-control" name="price" type="number" value = { product.price } onChange={onChangeHandler}/>
                  <input className="form-control" name="inventoryQuantity" type="number" value = { product.inventoryQuantity } onChange={onChangeHandler}/>
                    {/*
                      categories.map(category =>
                        <div><input onChange= { onChangeHandler } type="checkbox" name="categories" value={category.name}/> {category.name} </div>
                      )

                  */}
                  <button className="btn btn-success"> Update </button>
                </form> : ''
              }
              </div> : ''
            }
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
}

const mapStateToProps = (state, ownProps) => {

  return {
    product: state.products.find(prod => prod.id == ownProps.match.params.id),
    currentUser: state.currentUser,
    categories: state.categories
  }
};

const mapDispatchToProps = { updateProduct }

export default connect(mapStateToProps, mapDispatchToProps)(Product);
