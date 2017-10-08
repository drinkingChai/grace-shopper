import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux'
import Root from './components/Root';
import store from './store'

ReactDOM.render(
  <Router>
    <Provider store={ store }>
      <Root />
    </Provider>
  </Router>,
  document.getElementById('main')
);
