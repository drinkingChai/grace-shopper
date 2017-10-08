import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Nav from './Nav'
import UserAuth from './UserAuth'

export default class Root extends Component {
  render() {
    return (
      <div>
        {/* Nav wrapped in route so it can get histor, location etc.. */}
        <Route component={ Nav }/>

        {/* can be moved to different component, here for testing */}
        <Route component={ UserAuth }/> 

        <h1>Grace Shopper!</h1>



      </div>
    )
  }
}
