import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateCartItem } from '../store';

class CartUpdateForm extends Component {
  constructor(props) {
    super(props);
    this.state = props;
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(ev) {
    const { lineitem } = this.state;
    Object.assign(lineitem, { quantity: ev.target.value });
    this.setState({ lineitem });
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

    return (
      <form onSubmit={ onSubmit }>
        { lineitem.product.name } x <input type="number" value={ lineitem.quantity } onChange={ onChange } />
        <button>Update</button>
        <button onClick={ () => this.props.updateCartItem(lineitem.product, 0) }>
          <span className="glyphicon glyphicon-trash" />
        </button>
      </form>
    )
  }
}

const mapDispatch = { updateCartItem };

export default connect(null, mapDispatch)(CartUpdateForm);
