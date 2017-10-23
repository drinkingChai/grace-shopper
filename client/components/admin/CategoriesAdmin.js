import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createCategory, deleteCategory, fetchCategory, updateCategory, fetchCategories } from '../../store';


class CategoriesAdmin extends Component {
  constructor(){
    super();
    this.state = {
      formVisible: false,
      editForm: false,
      name: ''
    }
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.toggleEditButton = this.toggleEditButton.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.toggleCategoryEdit = this.toggleCategoryEdit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  toggleEditButton(ev){
    ev.preventDefault();
    this.setState({ formVisible: !this.state.formVisible });
  }

  toggleCategoryEdit(ev) {
    ev.preventDefault();
    const { editForm } = this.state;
    const { fetchCategory } = this.props;
    this.setState({ editForm: true });
    fetchCategory(ev.target.value);
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

  onCancel(ev) {
   ev.preventDefault();
   this.setState({ editForm: false });
  }

  render() {
    const { onChangeHandler, onSubmitHandler, toggleEditButton, handleDelete, toggleCategoryEdit, onCancel } = this;
    const { name, editForm } = this.state;
    const { categories } = this.props;

    return (
      <div>
        <div className="col-xs-12 col-sm-8">
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
                      <button value={ category.id } className="btn btn-xs btn-warning"
                        onClick={ toggleCategoryEdit }>Edit Category</button>
                    </td>
                    <td>
                     <button className="btn btn-xs btn-danger"
                      onClick={() => handleDelete(category.id)}>x</button>
                    </td>
                  </tr>
                  )
                })
              }
              </tbody>
            </table>
        </div>

        { !editForm ? null : <EditCategoryForm { ...this.props } onCancel={ onCancel } /> }
      </div>
    )
  }
}

const EditCategoryForm = ({ currentCategory, updateCategory, onCancel }) => {
  const onChange = (ev) => {
    ev.preventDefault();
    updateCategory(currentCategory.id, { name: ev.target.name.value });
    onCancel(ev);
  };

  return (
    <div className="col-xs-12 col-sm-4">
      <form onSubmit={ onChange }>
        <h3>Edit Category Name</h3>
        <input name="name" className="form-control" placeholder="Enter new name" />
        <button className="btn btn-xs btn-success" type="submit">Update</button>
        <button className="btn btn-xs btn-default" onClick={ onCancel }>Cancel</button>
      </form>
    </div>
  )
};

const mapState = ({ categories, currentCategory }) => {
  return { categories, currentCategory };
};

const mapDispatch = { createCategory, deleteCategory, fetchCategory, updateCategory };

export default connect(mapState, mapDispatch)(CategoriesAdmin);
