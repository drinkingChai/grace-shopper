import React, { Component } from 'react'
import { connect } from 'react-redux'
import AddProductForm from './AddProductForm';

class ProductsAdmin extends Component {

  constructor(){
    super();
    this.state = {
      formVisible: false
    }
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onSubmitHandler(ev){
    ev.preventDefault();
    this.setState({
      formVisible: !this.state.formVisible
    })
    console.log(this.state.formVisible);
  }

  render(){
    const { onSubmitHandler } = this;
    return (
      <div>
        <h3>Products </h3>
        <hr/>
        <button onClick={ onSubmitHandler } className="btn btn-sucess"> Add Product </button>
        { this.state.formVisible ?
          <AddProductForm/> : ''
        }
      </div>
    )
  }
}

const mapState = ({ products }) => ({ products })

export default connect(mapState)(ProductsAdmin)
