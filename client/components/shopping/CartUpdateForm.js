import React from 'react';
import { connect } from 'react-redux';
import { updateCartItem } from '../../store';

const CartUpdateForm = ({ lineitem, updateCartItem }) => {
  const quantity = [...Array(lineitem.product.inventoryQuantity).keys()];

  return (
    <li className="list-group-item">
      <form className="form form-inline">
        <label>Item: </label> { lineitem.product.name }<br />
        <label>Price: </label> ${ lineitem.product.price }<br />
        <label>Quantity: </label> <select
            className="form-control"
            onChange={(ev) => (updateCartItem(lineitem.product, ev.target.value * 1))}
            value={ lineitem.quantity } >
          {
            !quantity.length ? <option>Sold Out</option> :
              quantity.map(item => (
                <option key={ `${item}x` } value={ item + 1 }>{ item + 1 }</option>
                )
              )
          }
        </select>

        <button
          onClick={(ev) => {
            ev.preventDefault();
            updateCartItem(lineitem.product, 0);
          }}
          className="btn btn-danger btn-sm pull-right">
            <span className="glyphicon glyphicon-trash" />
        </button>
        <button
          className="btn btn-info btn-sm pull-right"
          onClick={(ev) => {
            ev.preventDefault();
            updateCartItem(lineitem.product, lineitem.quantity);
          }}>Update</button>
      </form>
    </li>
  );
};

const mapDispatch = { updateCartItem };

export default connect(null, mapDispatch)(CartUpdateForm);
