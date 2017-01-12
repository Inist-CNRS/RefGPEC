// inspired by
// https://github.com/tastejs/todomvc/tree/gh-pages/examples/react/js




import    React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';

import RefGpecHome         from './components/refgpec-home.jsx';

import RefGpecProfilsModel from './models/refgpec-profils-model.js';
import RefGpecSkillsModel  from './models/refgpec-skills-model.js';
import RefGpecLevelsModel  from './models/refgpec-levels-model.js';
import RefGpecOrgaModel    from './models/refgpec-orga-model.js';

var modelOptions = {
  fakeLoadingMaxDelay: 500,
  //fakeData: true
};
var levelsModel  = new RefGpecLevelsModel(modelOptions);
var skillsModel  = new RefGpecSkillsModel(modelOptions);
var profilsModel = new RefGpecProfilsModel(modelOptions);
var orgaModel    = new RefGpecOrgaModel(modelOptions);

function render() {
  ReactDOM.render((
    <RefGpecHome
      orgaModel={orgaModel}
      levelsModel={levelsModel}
      skillsModel={skillsModel}
      profilsModel={profilsModel}
    />
  ), document.getElementById('refgpec'));
}

profilsModel.subscribe(render);
skillsModel.subscribe(render);
levelsModel.subscribe(render);
orgaModel.subscribe(render);

render();