import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateCartItem } from '../../store';

class CartUpdateForm extends Component {
  // can this be presentational?
  constructor(props) {
    super(props);
    this.state = props;
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(ev) {
    const { lineitem } = this.state;
    this.props.updateCartItem(lineitem.product, ev.target.value * 1);
  }

  onSubmit(ev) {
    ev.preventDefault();
    const { lineitem } = this.state;
    this.props.updateCartItem(lineitem.product, lineitem.quantity);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
  }

  render() {
    const { lineitem } = this.state;
    const { onChange, onSubmit } = this;
    const quantity = [...Array(10).keys()];

    return (
      <li className="list-group-item">
        <form onSubmit={ onSubmit } className="form form-inline">
          <label>Item: </label> { lineitem.product.name }<br />
          <label>Price: </label> ${ lineitem.product.price }<br />
          <label>Quantity: </label> <select className="form-control" onChange={ onChange } value={ this.state.lineitem.quantity } >
            {
              quantity.map(item => (
                <option key={ `${item}x` } value={ item + 1 }>{ item + 1 }</option>
                )
              )
            }
          </select>

          <button
            onClick={() => this.props.updateCartItem(lineitem.product, 0)}
            className="btn btn-danger btn-sm pull-right">
              <span className="glyphicon glyphicon-trash" />
          </button>
          <button className="btn btn-info btn-sm pull-right">Update</button>
        </form>
      </li>
    )
  }
}

const mapDispatch = { updateCartItem };

export default connect(null, mapDispatch)(CartUpdateForm);
