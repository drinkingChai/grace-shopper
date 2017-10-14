import React from 'react';
import { connect } from 'react-redux';

const Product = ({products}) => {

  // const product = products.filter(product => product)
  const prod = products.products[0];
  const currentUser = products.currentUser;
  return (
    <div className="col-sm-6">
      <h2> {prod.name} </h2>
      <h3> {prod.description} </h3>
      <img src = {prod.photo} width="100%" height="225px"/>
      <p>Price: {prod.price} </p>
      <p>Quantity Left: {prod.inventoryQuantity} </p>
      <p> Reviews will be here! </p>
      { currentUser.userId ?
        'Add Reviews' :
        'Not logged in!'
      }
    </div>

  )
}



const mapStateToProps = (state) => {

  return {
    products: state
  }
}

export default connect(mapStateToProps)(Product)
