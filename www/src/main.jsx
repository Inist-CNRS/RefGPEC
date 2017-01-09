// inspired by
// https://github.com/tastejs/todomvc/tree/gh-pages/examples/react/js




import    React from 'react';
import ReactDOM from 'react-dom';

import RefGpecHome         from './components/refgpec-home.jsx';
import RefGpecSkillsModel  from './models/refgpec-skills-model.js';
import RefGpecLevelsModel  from './models/refgpec-levels-model.js';

import { Router, Route, Link, browserHistory } from 'react-router';

var model       = new RefGpecLevelsModel();
var skillsModel = new RefGpecSkillsModel();

function render() {
  ReactDOM.render((
    <RefGpecHome model={model} skillsModel={skillsModel} />
  ), document.getElementById('refgpec'));
}

skillsModel.subscribe(render);
model.subscribe(render);
render();