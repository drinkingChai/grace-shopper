import React, { Component } from 'react';
import { connect } from 'react-redux';
import { writeReview } from '../store';

class ReviewForm extends Component {
  constructor(){
    super();
    this.state = {
      rating: 0,
      blurb: ''
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onChangeHandler(ev) {
    const { name, value } = ev.target;
    this.setState(Object.assign(this.state, { [name]: value}))
  }

  onSubmitHandler(ev) {
    ev.preventDefault();
    this.props.writeReview({product: this.props.product.id, user: this.props.state.currentUser.id, blurb: this.state.blurb, rating: this.state.rating})
      .catch(err => console.log(err.message))
  }
  render(){

    const {onChangeHandler, onSubmitHandler} = this
    const { blurb } = this.state
    const rating = [...Array(6).keys()];
    return (
      <div>
        <div className="panel panel-primary">
          <h3 className="panel-heading"> Give a Review! </h3>
          <form onSubmit={ onSubmitHandler } className="form panel-body">
            <label> Rating: </label> <select className="form-control" name="rating" onChange={ onChangeHandler }>
            {
              rating.map(rate => <option key={`${rate}`} value={ rate }> {rate} </option>)
            }
            </select>
            <label htmlFor="blurb"> Your Review </label>
            <textarea name="blurb" value={ blurb } onChange={ onChangeHandler} className="form-control" />
            <button className="btn btn-success">Submit </button>
          </form>
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state, ownProps) => {


  return {
   state,
   product: ownProps.product
  }
}

const mapDispatch = { writeReview }

export default connect(mapStateToProps, mapDispatch)(ReviewForm)
