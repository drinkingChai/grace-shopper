import React from 'react';
import { Link } from 'react-router-dom'
import Order from './Order'

const formatDate = (_date) => {
  const date = new Date(_date)
  return `${date.getMonth()}/${date.getDate()}/${date.getYear()}`
}

export default function Orders ({ orders }) {
  orders = orders.filter(order => order.id && !order.isCart)

  return (
    <div className="panel panel-default">
      <h4 className='panel-heading'>Your Orders</h4>
      <div className='panel-body'>
        { orders.map(order => <Order key={ order.id } order={ order }/>) }
      </div>
    </div>
  )
};
