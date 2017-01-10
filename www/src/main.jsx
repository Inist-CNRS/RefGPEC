// inspired by
// https://github.com/tastejs/todomvc/tree/gh-pages/examples/react/js




import    React from 'react';
import ReactDOM from 'react-dom';

import RefGpecHome         from './components/refgpec-home.jsx';
import RefGpecSkillsModel  from './models/refgpec-skills-model.js';
import RefGpecLevelsModel  from './models/refgpec-levels-model.js';

import { Router, Route, Link, browserHistory } from 'react-router';

var levelsModel = new RefGpecLevelsModel();
var skillsModel = new RefGpecSkillsModel();

function render() {
  ReactDOM.render((
    <RefGpecHome
      levelsModel={levelsModel}
      skillsModel={skillsModel}
    />
  ), document.getElementById('refgpec'));
}

skillsModel.subscribe(render);
levelsModel.subscribe(render);
render();