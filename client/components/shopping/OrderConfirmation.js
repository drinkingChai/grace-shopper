import React, { Component } from 'react'
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
    
    const { order } = this.state

    return (
      <div className='well'>
        <h3>Your receipt</h3>
        <hr/>
        <h4>Your order number is { order.id }</h4>
        <p>An email has been sent to { order.user.email }</p>
      </div>
    )
  }
}

const mapDispatch = { fetchOrder }

export default connect(null, mapDispatch)(OrderConfirmation)
