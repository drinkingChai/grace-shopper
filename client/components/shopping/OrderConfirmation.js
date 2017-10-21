import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchOrder } from '../../store'

import queryParser from '../helpers/queryParser'

class OrderConfirmation extends Component {
  componentDidMount() {
    const { location, fetchOrder } = this.props
    fetchOrder(queryParser(location.search).get('orderId'))
      .then(order => this.setState({ order }))
  }

  render() {
    if (!this.state || !this.state.order) return <div></div>
    
    const { location } = this.props
    const { order } = this.state
    const queryMap = queryParser(location.search)

    return (
      <div className='well'>
        <h3>Your receipt</h3>
        <hr/>
        <h4>Your order number is { order.id }</h4>
        <p>An email has been sent to { order.user.email }</p>
        { queryMap.get('guest') ?
            queryMap.get('isGuest') ?
            <Link to={ `/register?email=${order.user.email}` } className='btn btn-default'>Register</Link> :
            <div>
              Account is registered, would you like to log in?
              <br/>
              <Link to='/login' className='btn btn-default'>Log in</Link>
            </div> :
            null }
      </div>
    )
  }
}

const mapDispatch = { fetchOrder }

export default connect(null, mapDispatch)(OrderConfirmation)
