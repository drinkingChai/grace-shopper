import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateCartItem } from '../store'

class CartUpdateForm extends Component {
  constructor(props) {
    super(props)
    this.state = props
    this.onChangeHandler = this.onChangeHandler.bind(this)
    this.onSubmitHandler = this.onSubmitHandler.bind(this)
  }

  onChangeHandler(ev) {
    const { lineitem } = this.state
    Object.assign(lineitem, { quantity: ev.target.value })
    this.setState({ lineitem })
  }

  onSubmitHandler(ev) {
    ev.preventDefault()
    const { lineitem } = this.state
    this.props.updateCartItem(lineitem.product, lineitem.quantity)
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps)
  }

  render() {
    const { lineitem } = this.state
    const { onChangeHandler, onSubmitHandler } = this

    return (
      <form onSubmit={ onSubmitHandler }>
        { lineitem.product.name } x <input type='number' value={ lineitem.quantity } onChange={ onChangeHandler }/>
        <button>Update</button>
        <button onClick={ () => this.props.updateCartItem(lineitem.product, 0) }><span className='glyphicon glyphicon-trash'></span></button>
      </form>
    )
  }
}

const mapDispatch = { updateCartItem }

export default connect(null, mapDispatch)(CartUpdateForm)
