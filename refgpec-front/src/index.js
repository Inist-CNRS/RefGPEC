// inspired by
// https://github.com/tastejs/todomvc/tree/gh-pages/examples/react/js

import React from "react";
import ReactDOM from "react-dom";
import { Modal } from "react-bootstrap";
import $ from "jquery";

import "font-awesome/css/font-awesome.css";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

import RefGpecHome from "./components/refgpec-home.jsx";

import RefGpecProfilsModel from "./models/refgpec-profils-model.js";
import RefGpecSkillsModel from "./models/refgpec-skills-model.js";
import RefGpecSkillsTypesModel from "./models/refgpec-skills-types-model.js";
import RefGpecFamilyModel from "./models/refgpec-family-model.js";
import RefGpecLevelsModel from "./models/refgpec-levels-model.js";
import RefGpecProfilsSkillsModel from "./models/refgpec-profils-skills-model.js";
import RefGpecFamilysSkillsModel from "./models/refgpec-familys-skills-model.js";
import RefGpecIndexModel from "./models/refgpec-index-model";

let modelOptions = {
  fakeLoadingMaxDelay: 500
  //fakeData: true
};
let indexModel = new RefGpecIndexModel(modelOptions);
let levelsModel = new RefGpecLevelsModel(modelOptions);
let skillsModel = new RefGpecSkillsModel(modelOptions);
let skillsTypesModel = new RefGpecSkillsTypesModel(modelOptions);
let familysModel = new RefGpecFamilyModel(modelOptions);
let familysSkillsModel = new RefGpecFamilysSkillsModel(modelOptions);
let profilsModel = new RefGpecProfilsModel(modelOptions);
let profilsSkillsModel = new RefGpecProfilsSkillsModel(modelOptions);

profilsModel.subscribe(render);
skillsModel.subscribe(render);
skillsTypesModel.subscribe(render);
familysModel.subscribe(render);
levelsModel.subscribe(render);
profilsSkillsModel.subscribe(render);
familysSkillsModel.subscribe(render);
indexModel.subscribe(render);
function render() {
  if (detectIE()) {
    return ReactDOM.render(
      <Modal show>
        <Modal.Header>
          <Modal.Title>
            <h2 className="modal-title text-center">
              Internet Explorer/edge Reconnu !
            </h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Vous utilisez actuellement une version d'Internet Explorer/Edge.
          </p>

          <p>
            {" "}
            Veuillez utiliser un navigateur compatible avec RefGPEC (Mozilla
            Firefox/Google Chrome) afin de continuer. Merci de votre
            compréhension.
          </p>
        </Modal.Body>
      </Modal>,
      document.getElementById("refgpec")
    );
  } else {
    return ReactDOM.render(
      <RefGpecHome
        indexModel={indexModel}
        levelsModel={levelsModel}
        skillsModel={skillsModel}
        skillsTypesModel={skillsTypesModel}
        familysModel={familysModel}
        profilsModel={profilsModel}
        profilsSkillsModel={profilsSkillsModel}
        familysSkillsModel={familysSkillsModel}
      />,
      document.getElementById("refgpec")
    );
  }
}

function detectIE() {
  let ua = window.navigator.userAgent;
  let msie = ua.indexOf("MSIE ");
  if (msie > 0) {
    // IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)), 10);
  }

  let trident = ua.indexOf("Trident/");
  if (trident > 0) {
    // IE 11 => return version number
    let rv = ua.indexOf("rv:");
    return parseInt(ua.substring(rv + 3, ua.indexOf(".", rv)), 10);
  }

  let edge = ua.indexOf("Edge/");
  if (edge > 0) {
    // Edge (IE 12+) => return version number
    return parseInt(ua.substring(edge + 5, ua.indexOf(".", edge)), 10);
  }

  // other browser
  return false;
}
$(function() {
  render();
});
