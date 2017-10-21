import React, { Component } from 'react'
import { connect } from 'react-redux'


class SingleProductAdmin extends Component {

  constructor(){
    super();
    this.state = {
      name: '',
      description: '',
      price: 0,
      inventoryQuantity: 0,
      photo: '',
      edit: true
    }
    this.changeEdit = this.changeEdit.bind(this);
  }

    onChangeHandler(ev) {
      const { name, value } = ev.target;
      this.setState({[name]: value});
    }

    changeEdit(){
      console.log(this.state.edit);
      this.setState({edit: !this.state.edit})
    }

    render(){
      let buttonLabel = this.state.edit === true ? 'Edit Product' : 'Save Edits'
      const { products } = this.props
      const { changeEdit } = this
      return (
       <tbody>
        {
          products.map(product =>{
            const category = product.categories;

            return (
              <tr key= {product.id}>
                <td> { product.name }</td>
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
                <td>
                  <button className="btn btn-danger" onClick={ changeEdit}> {buttonLabel}
                  </button>
                </td>
              </tr>
            )
          })
        }
       </tbody>
      )

    }
}

export default connect()(SingleProductAdmin);
