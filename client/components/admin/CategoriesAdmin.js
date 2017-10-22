import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createCategory, deleteCategory } from '../../store';


class CategoriesAdmin extends Component {
  constructor(){
    super();
    this.state = {
      formVisible: false,
      name: ''
    }
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.toggleEditButton = this.toggleEditButton.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  toggleEditButton(ev){
    ev.preventDefault();
    this.setState({
      formVisible: !this.state.formVisible
    })
  }

  handleDelete(id){
    this.props.deleteCategory(id)
  }

  onSubmitHandler(ev) {
    ev.preventDefault();

    this.props.createCategory({
      name: this.state.name
    })
    .catch(err => console.log(err.message))

    this.setState({
      name: '',
      formVisible: false
    })

  }

  onChangeHandler(ev) {
    const { name, value } = ev.target;
    this.setState({[name]: value});
  }

  render() {
    const { onChangeHandler, onSubmitHandler, toggleEditButton, handleDelete } = this
    const { name } = this.state
    const {categories} = this.props
    return (
      <div>
        <h3>Categories</h3>
        <button onClick= { toggleEditButton } className="btn btn-success"> Add Category </button>
        {/* Add Category Form */}
        { this.state.formVisible ?
          <div className="panel panel-primary">
            <h4 className="panel-heading"> Add a Category </h4>
              <form onSubmit={ onSubmitHandler } className="form panel-body">
                <label htmlFor="name"> Category Name </label>
                <input className="form-control" name="name" type="text" value = { name } onChange= { onChangeHandler }/>
                <button className="btn btn-danger"> Create Category </button>
              </form>
          </div> : ''
        }
        <table className="table">
          <thead>
            <tr>
              <th> ID </th>
              <th> Name </th>
            </tr>
          </thead>
          <tbody>
            {
              categories.map(category => {
                return(
                 <tr key= {category.id}>
                  <td> {category.id} </td>
                  <td> {category.name} </td>
                  <td>
                   <button className="btn" onClick={()=>handleDelete(category.id)}> X
                   </button>
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

  const mapState = (state) => {
    return {
      categories: state.categories
    }
  }
  const mapDispatch = { createCategory, deleteCategory }

  export default connect(mapState, mapDispatch)(CategoriesAdmin)

