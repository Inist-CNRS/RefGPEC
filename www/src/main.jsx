// inspired by
// https://github.com/tastejs/todomvc/tree/gh-pages/examples/react/js




import    React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';

import RefGpecHome         from './components/refgpec-home.jsx';

import RefGpecProfilsModel from './models/refgpec-profils-model.js';
import RefGpecSkillsModel  from './models/refgpec-skills-model.js';
import RefGpecLevelsModel  from './models/refgpec-levels-model.js';

var levelsModel  = new RefGpecLevelsModel();
var skillsModel  = new RefGpecSkillsModel();
var profilsModel = new RefGpecProfilsModel();

function render() {
  ReactDOM.render((
    <RefGpecHome
      levelsModel={levelsModel}
      skillsModel={skillsModel}
      profilsModel={profilsModel}
    />
  ), document.getElementById('refgpec'));
}

profilsModel.subscribe(render);
skillsModel.subscribe(render);
levelsModel.subscribe(render);
render();