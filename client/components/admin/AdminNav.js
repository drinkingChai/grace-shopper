import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminNav() {
  return (
    <div className='navbar navbar-default navbar-inverse'>
      <div className='container-fluid'>
        <ul className='nav navbar-nav'>
          <li><Link to='/admin/users'>Users</Link></li>
          <li><Link to='/admin/products'>Products</Link></li>
          <li><Link to='/admin/orders'>Orders</Link></li>
          <li><Link to='/admin/categories'>Categories</Link></li>
        </ul>
      </div>
    </div>
  )
}
