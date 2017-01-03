import    React from 'react';
import ReactDOM from 'react-dom';
import Home     from './components/home.jsx';

import { Router, Route, Link, browserHistory } from 'react-router';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/"  component={Home} />
  </Router>
), document.getElementById('refgpec'));