import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createProd } from '../../store'

class AddProductForm extends Component {

  constructor(){
    super();
    this.state = {
      name: '',
      description: '',
      price: 0,
      inventoryQuantity: 0,
      photo: ''
    }
    this.onChangeHandler = this.onChangeHandler.bind(this)
    this.onSubmitHandler = this.onSubmitHandler.bind(this)
  }

  onChangeHandler(ev) {
    const { name, value } = ev.target;
    this.setState({[name]: value});

  }

  onSubmitHandler(ev) {
    ev.preventDefault();

    this.props.createProd({
      name: this.state.name,
      description: this.state.description,
      price: this.state.price,
      inventoryQuantity: this.state.inventoryQuantity,
      photo: this.state.photo
    })
    .catch(err => console.log(err.message))

    this.setState({
      name: '',
      description: '',
      price: 0,
      inventoryQuantity: 0,
      photo: ''
    })

  }

  render(){
    const { onChangeHandler, onSubmitHandler } = this
    const { name, description, price, inventoryQuantity, photo } = this.state;
    return (
      <div className="panel panel-primary">
        <h3 className="panel-heading"> Add a Product </h3>
        <form onSubmit={ onSubmitHandler } className="form panel-boy">

        <label htmlFor="name"> Name </label>
        <input className="form-control" name="name" type="text" value = { name } onChange= { onChangeHandler }/>

        <label htmlFor="description"> Description </label>
        <input className="form-control" name="description" type="text" value = { description } onChange= { onChangeHandler }/>

        <label htmlFor="price"> Price </label>
        <input className="form-control" name="price" type="number" value = { price } onChange= { onChangeHandler } />

        <label htmlFor="inventoryQuantity"> Quantity </label>
        <input className="form-control" name="inventoryQuantity" type="number" value = { inventoryQuantity } onChange= { onChangeHandler }  />

        <label htmlFor="photo">  Photo URL </label>
        <input className="form-control" name="photo" type="text" value = { photo } onChange= { onChangeHandler }/>
        <button className="btn btn-danger"> Create Product </button>

       </form>
      </div>
  )


  }

}

const mapState = (state) =>{
  return {
    state
  }
}

const mapDispatch = { createProd }


export default connect(mapState, mapDispatch)(AddProductForm)
