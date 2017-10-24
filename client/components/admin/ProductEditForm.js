import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateProduct, setErrorAndClear } from '../../store'

class ProductEditForm extends Component{
  constructor(props){
    super(props)
    this.state = props.product;
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.onChangeCheck = this.onChangeCheck.bind(this);

  }

  componentWillMount(){
    let productCategories = [];
    for (let i = 0; i < this.state.categories.length; i++){
      productCategories.push(this.state.categories[i].name)
    }
    this.setState({prodCats: productCategories})
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
      inventoryQuantity: this.state.inventoryQuantity,
      prodCats: this.state.prodCats})
    .catch(this.props.setErrorAndClear)
    // this.setState({formVisible: false})
  }

  onChangeCheck(ev){

    let newProdCats = this.state.prodCats;
    /*create a temp array that has the current products. If the indexOf is -1, it means
    it's not currently in the array, so add it, set the new state
    If it's not -1, it means it's in there and we're unchecking, so splice it out and then set new state
    */
    if (this.state.prodCats.indexOf(ev.target.value) === -1){
      newProdCats.push(ev.target.value)
    }
    else {
      newProdCats.splice(this.state.prodCats.indexOf(ev.target.value), 1);
    }
    this.setState({prodCats: newProdCats})

  }


  render(){
    const product = this.state;
    const categories = this.props.allCategories;



    const { onChangeHandler, onSubmitHandler, onChangeCheck } = this
    return (
      <form onSubmit={ onSubmitHandler }>
          <input className="form-control" name="name" type="text" value = { product.name } onChange={onChangeHandler}/>
          <input className="form-control" name="description" type="text" value = { product.description } onChange={onChangeHandler}/>
          <input className="form-control" name="price" type="number" value = { product.price } onChange={onChangeHandler}/>
          <input className="form-control" name="inventoryQuantity" type="number" value = { product.inventoryQuantity } onChange={onChangeHandler}/>
            {
              categories.map(category =>
                <div key={category.id}><input type="checkbox"  name="categories" value={category.name} defaultChecked={this.state.prodCats.indexOf(category.name) === -1 ? null : 'true'} onChange= { onChangeCheck }/> {category.name}</div>
              )

          }
          <button className="btn btn-success"> Update </button>
        </form>

    )
  }
}


const mapDispatchToProps = { updateProduct, setErrorAndClear }

export default connect(null, mapDispatchToProps)(ProductEditForm);
