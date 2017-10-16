import React, { Component } from 'react';
import { connect } from 'react-redux';

class ReviewForm extends Component {
  constructor(){
    super();
    this.state = {
      rating: 0,
      blurb: ''
    };
    // this.onChangeHandler = this.onChangeHandler.bind(this);
    // this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  render(){
    const rating = [...Array(6).keys()];
    return (
      <div>
        <div className="panel panel-primary">
          <h3 className="panel-heading"> Give a Review! </h3>
          <form className="form panel-body">
            <label> Rating: </label> <select className="form-control" name="rating">
            {
              rating.map(rate => <option key={`${rate}`} value={ rate }> {rate} </option>)
            }
            </select>
            <label htmlFor="blurb"> Your Review </label>
            <textarea name="blurb" className="form-control" />
            <button className="btn btn-success">Submit </button>
          </form>
        </div>
      </div>
    )
  }

}

export default connect()(ReviewForm)
