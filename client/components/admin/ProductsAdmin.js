import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
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
  }

  render(){
    const { onSubmitHandler } = this;
    const {products} = this.props
    return (

      <div>
      {console.log(this.props.products)}
        <h3>Products </h3>
        <hr/>
        <button onClick={ onSubmitHandler } className="btn btn-sucess"> Add Product </button>
        { this.state.formVisible ?
          <AddProductForm visible={this.state.formVisible}/> : ''
        }
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Categories</th>
            </tr>
          </thead>
          <tbody>
            {
              products.map(product =>{
                const category = product.categories;

                return (
                  <tr key= {product.id}>
                    <td> <Link to = {`/products/${product.id}`}>{ product.name } </Link></td>
                    <td> { product.description } </td>
                    <td> { product.price } </td>
                    <td> { product.inventoryQuantity } </td>
                    <td>
                      {
                        category.map(cat => {
                          return cat.name + ' '
                        })
                      }
                    </td>
                  </tr>
                )
              })
            }
           </tbody>
        </table>
      </div>
    )
  }
}

const mapState = ({ products }) => ({ products })

export default connect(mapState)(ProductsAdmin)
