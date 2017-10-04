import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Nav from './Nav'

export default class Root extends Component {
  render() {
    return (
      <div>
        {/* Nav wrapped in route so it can get histor, location etc.. */}
        <Route component={ Nav }/>

        <h1>Grace Shopper!</h1>



      </div>
    )
  }
}
