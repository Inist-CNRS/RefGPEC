// inspired by
// https://github.com/tastejs/todomvc/tree/gh-pages/examples/react/js

import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";

import "font-awesome/css/font-awesome.css";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

import RefGpecHome from "./components/refgpec-home.jsx";

import RefGpecProfilsModel from "./models/refgpec-profils-model.js";
import RefGpecSkillsModel from "./models/refgpec-skills-model.js";
import RefGpecSkillsTypesModel from "./models/refgpec-skills-types-model.js";
import RefGpecSkillsDomainsModel from "./models/refgpec-skills-domains-model.js";
import RefGpecLevelsModel from "./models/refgpec-levels-model.js";
import RefGpecProfilsSkillsModel from "./models/refgpec-profils-skills-model.js";
import RefGpecOrgaModel from "./models/refgpec-orga-model.js";

var modelOptions = {
  fakeLoadingMaxDelay: 500
  //fakeData: true
};
var levelsModel = new RefGpecLevelsModel(modelOptions);
var skillsModel = new RefGpecSkillsModel(modelOptions);
var skillsTypesModel = new RefGpecSkillsTypesModel(modelOptions);
var skillsDomainsModel = new RefGpecSkillsDomainsModel(modelOptions);
var profilsModel = new RefGpecProfilsModel(modelOptions);
var orgaModel = new RefGpecOrgaModel(modelOptions);
var profilsSkillsModel = new RefGpecProfilsSkillsModel(modelOptions);

function render() {
  ReactDOM.render(
    <RefGpecHome
      orgaModel={orgaModel}
      levelsModel={levelsModel}
      skillsModel={skillsModel}
      skillsTypesModel={skillsTypesModel}
      skillsDomainsModel={skillsDomainsModel}
      profilsModel={profilsModel}
      profilsSkillsModel={profilsSkillsModel}
    />,
    document.getElementById("refgpec")
  );
}

profilsModel.subscribe(render);
skillsModel.subscribe(render);
skillsTypesModel.subscribe(render);
skillsDomainsModel.subscribe(render);
levelsModel.subscribe(render);
orgaModel.subscribe(render);
profilsSkillsModel.subscribe(render);

$(function() {
  render();
});
