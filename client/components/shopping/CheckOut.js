import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { checkOut } from '../../store';

import queryParser from '../helpers/queryParser'
import Cart from './Cart'

class CheckOut extends Component {
  constructor() {
    super()
    this.state = {
      address: '',
      paymentInfo: '',
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
    this.props.checkOut(this.state)
      .then(() => this.props.currentUser.isAdmin ? this.props.fetchAllOrders() : null)
      .then(() => this.props.history.push('/orderconfirmation'))
      .catch(err => console.log(err.message))
  }

  render() {
    const { currentUser, order } = this.props
    const { address, paymentInfo, email, guestCheckout } = this.state
    const { onChange, onSubmit } = this

    return (
      <div>
        { order && order.lineitems.length ?
            <div>
              <Cart />

              <form onSubmit={ onSubmit } className='panel panel-primary'>
                <h4 className='panel-heading'>Check Out</h4>
                <div className='panel-body'>
                  <div className='form-group'>
                    <label htmlFor='address'>Address</label>
                    <input name='address' value={ address } onChange={ onChange } className='form-control'/>
                  </div>

                  <div className='form-group'>
                    <label htmlFor='paymentInfo'>Payment Info</label>
                    <input name='paymentInfo' value={ paymentInfo } onChange={ onChange } className='form-control'/>
                  </div>

                  { guestCheckout ?
                    <div className='form-group'>
                      <label htmlFor='email'>email</label>
                      <input name='email' value={ email } onChange={ onChange } className='form-control'/>
                    </div> : null }

                  <button className='btn btn-default'>Place order</button>
                </div>
              </form>
            </div>
            :
            <div className='well'>
              <h3>Your cart is empty! add some stuff!</h3>
            </div> }
      </div>
    )
  }
}

const mapState = ({ currentUser, orders }) => ({
  currentUser,
  order: orders.find(order => order.isCart)
})
const mapDispatch = { checkOut }

export default connect(mapState, mapDispatch)(CheckOut)
