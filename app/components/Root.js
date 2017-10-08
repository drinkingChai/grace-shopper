import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import store, { fetchProducts } from './store';

// Components
import Nav from './Nav';
import AllProducts from './AllProducts';


export default class Root extends Component {
  render() {
    return (
      <main className="container">
        {/* Nav wrapped in route so it can get histor, location etc.. */}
        <Route component={ Nav }/>

        <h1>GraceShopper</h1>
        <section className="col-xs-12">
          <AllProducts  />
        </section>
      </main>
    )
  }
}
