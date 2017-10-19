import React, { Component } from 'react';
import { connect } from 'react-redux';
import { writeReview } from '../store';

class ReviewForm extends Component {
  // can be presentational
  constructor(){
    super();
    this.state = {
      rating: 0,
      title: '',
      blurb: '',
      date: {},
      counter: 0
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onChangeHandler(ev) {
    const { name, value } = ev.target;
    this.setState({[name]: value, counter: value.length });
//    this.setState(Object.assign(this.state, { [name]: value}));
  }

//  componentWillReceiveProps(nextProps) {
//    this.setState(nextProps);
//  }

  onSubmitHandler(ev) {
    ev.preventDefault();
    
    
    this.props.writeReview({
      productId: this.props.product.id, 
      userId: this.props.state.currentUser.id, 
      title: this.state.title,
      blurb: this.state.blurb, 
      rating: this.state.rating,
      date: this.state.date,
      counter: this.state.counter
    })
    .catch(err => console.log(err.message))
      
    this.setState({
        rating: this.state.rating || 0,
        title: '',
        blurb: '',
        date: {},
        counter: 0
    });
  }
  
  render(){
    const {onChangeHandler, onSubmitHandler} = this
    const { blurb, title, date, counter } = this.state
    const rating = [...Array(6).keys()];
    return (
      
        <div className="panel panel-primary">
          <h3 className="panel-heading"> Give a Review! </h3>
          <form onSubmit={ onSubmitHandler } className="form panel-body">
            <label> Rating: </label> 
            <select className="form-control" name="rating" onChange={ onChangeHandler }>
              {
                rating.map(rate => <option key={`${rate}`} value={ rate }> {rate} </option>)
              }
            </select>
            <label htmlFor="title"> Title </label>
            <input className="form-control" name="title" type="text" value={ title } onChange={(event)=> this.setState({title:event.target.value})} placeholder="Title" autoFocus/>
            <label htmlFor="blurb"> Your Review </label>
            <textarea name="blurb" value={ blurb } onChange={ onChangeHandler} className="form-control blurb" />
            <p className="counter">{ counter }/240</p>
            <button className="btn btn-success">Submit </button>
          </form>
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
