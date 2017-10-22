import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateProduct } from '../../store'

class ProductEditForm extends Component{
  constructor(props){
    super(props)
    this.state = props.product;
    this.state.categories = props.categories;
    console.log(this.state);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);

  }


  onChangeHandler (ev) {
    const { name, value } = ev.target;
    this.setState({[name]: value});
  }

  onSubmitHandler(ev) {
    ev.preventDefault();

    this.props.updateProduct(this.state.id, {
      name: this.state.name,
      description: this.state.description,
      price: this.state.price,
      inventoryQuantity: this.state.inventoryQuantity
    })
    .catch(err => console.log(err.message))
    // this.setState({formVisible: false})
  }

  render(){
    const product = this.state;
    const categories = this.state.categories;
    // const { categories } = this.props
    const { onChangeHandler, onSubmitHandler } = this
    return (
      <form onSubmit={ onSubmitHandler }>
          <input className="form-control" name="name" type="text" value = { product.name } onChange={onChangeHandler}/>
          <input className="form-control" name="description" type="text" value = { product.description } onChange={onChangeHandler}/>
          <input className="form-control" name="price" type="number" value = { product.price } onChange={onChangeHandler}/>
          <input className="form-control" name="inventoryQuantity" type="number" value = { product.inventoryQuantity } onChange={onChangeHandler}/>
            {
              categories.map(category =>
                <div key={category.id}><input type="checkbox" name="categories" value={category.name}/> {category.name} </div>
              )

          }
          <button className="btn btn-success"> Update </button>
        </form>

    )
  }
}


const mapDispatchToProps = { updateProduct }

export default connect(null, mapDispatchToProps)(ProductEditForm);
