import React, { Component } from 'react'
import { connect } from 'react-redux'
import { checkOut, fetchOrders, fetchProducts } from '../../store';
import { setErrorAndClear } from '../../store';

import queryParser from '../helpers/queryParser'
import Cart from './Cart'

class CheckOut extends Component {
  constructor() {
    super()
    this.state = {
      address: '',
      paymentInfo: ''
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    const queryMap = queryParser(this.props.location.search)
    if (queryMap.get('guest')) this.setState({ guestCheckout: true, email: '' })
  }

  componentWillReceiveProps(nextProps) {
    const { currentUser } = nextProps
    this.setState({ guestCheckout: !currentUser.userId ? true : false })
  }

  onChange(ev) {
    const { name, value } = ev.target
    this.setState({ [name]: value })
  }

  onSubmit(ev) {
    ev.preventDefault()
    const { checkOut, fetchOrders, fetchProducts, history, setErrorAndClear } = this.props
    const { guestCheckout } = this.state

    checkOut(this.state)
      .then(order => {
        history.push({
          pathname: 'orderconfirm',
          search: `orderId=${order.id}&
            guest=${!guestCheckout ? '' : true}&
            isGuest=${!order.user.isGuest ? '' : true}`
        })
      })
      .then(() => fetchOrders())
      .then(() => fetchProducts())
      .catch(setErrorAndClear)
  }

  render() {
    const { currentUser, order } = this.props
    const { address, paymentInfo, email, guestCheckout, error } = this.state
    const { onChange, onSubmit } = this

    return (
      <div className="col-xs-12 col-sm-8">
        { order && order.lineitems.length ?
            <div>
              <Cart />
              <div className="col-xs-12 col-sm-10">
              <form onSubmit={ onSubmit } className='panel panel-default'>
                <h2 className='panel-heading'>Check Out</h2>
                <div className='panel-body'>
                  <div className='form-group'>
                    <label htmlFor='address'>Address</label>
                    <input name='address' value={ address } onChange={ onChange } className='form-control' placeholder="* required" />
                  </div>

                  <div className='form-group'>
                    <label htmlFor='paymentInfo'>Payment Info</label>
                    <input name='paymentInfo' value={ paymentInfo } onChange={ onChange } className='form-control' placeholder="* payment info" />
                  </div>

                  { guestCheckout ?
                    <div className='form-group'>
                      <label htmlFor='email'>email</label>
                      <input name='email' value={ email } onChange={ onChange } className='form-control'/>
                    </div> : null }
                  {
                    !error ? '' : <p className="alert alert-danger">{ error }</p>
                  }

                  <button className="btn btn-success">Place Order</button>
                </div>
              </form>
            </div>
            </div>
            :
            <div className="well">
              <h3>Your cart is empty!</h3>
            </div> }
      </div>
    )
  }
}

const mapState = ({ currentUser, orders }) => ({
  currentUser,
  order: orders.find(order => order.isCart)
})
const mapDispatch = { checkOut, fetchOrders, fetchProducts, setErrorAndClear }

export default connect(mapState, mapDispatch)(CheckOut)
