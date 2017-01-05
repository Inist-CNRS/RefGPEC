// inspired by
// https://github.com/tastejs/todomvc/tree/gh-pages/examples/react/js




import    React from 'react';
import ReactDOM from 'react-dom';

import RefGpecHome        from './components/refgpec-home.jsx';
import RefGpecLevelsModel from './models/refgpec-levels-model.js';

import { Router, Route, Link, browserHistory } from 'react-router';

var model = new RefGpecLevelsModel();

function render() {
  ReactDOM.render((
    <RefGpecHome model={model} />
  ), document.getElementById('refgpec'));
}

model.subscribe(render);
render();