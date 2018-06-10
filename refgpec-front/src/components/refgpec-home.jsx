import React from "react";
import $ from "jquery";
import { Modal } from "react-bootstrap";
import RefGpecIndex from "./refgpec-index.jsx";
import RefGpecProfilsSkills from "./refgpec-profils-skills.jsx";
import RefGpecFamilysSkills from "./refgpec-familys-skills.jsx";
import RefGpecProfils from "./refgpec-profils.jsx";
import RefGpecSkills from "./refgpec-skills.jsx";
import RefGpecLevels from "./refgpec-levels.jsx";
import RefGpecFamilys from "./refgpec-familys.jsx";
import logo from "../img/gpec_40x40.png";
import "react-notifications/lib/notifications.css";
import ReactCountdownClock from "react-countdown-clock";
let createReactClass = require("create-react-class");
let RefGpecHome = createReactClass({
  displayName: "RefGpecHome",

  getInitialState: function() {
    return {
      Modal: true
    };
  },

  closeModal() {
    this.setState({ Modal: false });
  },

  doTabChange: function(tabId) {
    tabId = tabId.replace("#", "").replace("tab-", "");
    if (!tabId) tabId = "index";
    // this is not optimal but it fix the bug when
    // nav from the panels hypertexte links
    document.location.hash = "tab-" + tabId;

    // cleanup hidden tabs
    [
      "index",
      "profils-skills",
      "profils",
      "skills",
      "levels",
      "familys",
      "familys-skills"
    ].forEach(function(tabName) {
      if (document.getElementById(tabName) && tabName !== tabId) {
        document.getElementById(tabName).style.display = "none";
        document
          .getElementById("tab-" + tabName)
          .parentNode.classList.remove("active");
        document
          .getElementById("tab-" + tabName)
          .parentNode.classList.remove("in");
      }
    });

    // show the selected tab
    let elt = document.getElementById("tab-" + tabId);
    elt && elt.parentNode.classList.add("active");
    elt && elt.parentNode.classList.add("in");
    if (document.getElementById(tabId)) {
      document.getElementById(tabId).style.display = "block";
    }
  },

  handleTabChange: function(event) {
    window.scrollTo(0, 0);
    document.location.hash = "tab-" + event.target.getAttribute("href");
  },
  showModal: function(event) {
    return !!(
      this.props.skillsModel.initializing ||
      this.props.profilsModel.initializing ||
      this.props.skillsTypesModel.initializing ||
      this.props.levelsModel.initializing ||
      this.props.profilsSkillsModel.initializing ||
      this.props.familysSkillsModel.initializing ||
      this.props.familysModel.initializing
    );
  },

  render: function() {
    let TextFooter =
      "Chargement des données en cours.<br /> Veuillez patienter.";
    let timesup;
    if (!this.showModal()) {
      timesup = (
        <ReactCountdownClock
          seconds={2}
          color="#000"
          alpha={0.5}
          size={50}
          onComplete={this.closeModal}
        />
      );
      TextFooter = "Lancement de l'application dans : ";
    }
    const refgpecTabs = [];
    refgpecTabs.push(
      <RefGpecIndex
        key="1"
        indexModel={this.props.indexModel}
        onTabChange={this.doTabChange}
      />
    );

    refgpecTabs.push(
      <RefGpecProfils
        key="2"
        profilsModel={this.props.profilsModel}
        profilsSkillsModel={this.props.profilsSkillsModel}
        familysSkillsModel={this.props.familysSkillsModel}
        familysModel={this.props.familysModel}
        onTabChange={this.doTabChange}
      />
    );

    refgpecTabs.push(
      <RefGpecProfilsSkills
        key="3"
        profilsSkillsModel={this.props.profilsSkillsModel}
        skillsModel={this.props.skillsModel}
        skillsTypesModel={this.props.skillsTypesModel}
        familysModel={this.props.familysModel}
        profilsModel={this.props.profilsModel}
        levelsModel={this.props.levelsModel}
        familysSkillsModel={this.props.familysSkillsModel}
        onTabChange={this.doTabChange}
      />
    );

    refgpecTabs.push(
      <RefGpecSkills
        key="4"
        skillsModel={this.props.skillsModel}
        skillsTypesModel={this.props.skillsTypesModel}
        familysModel={this.props.familysModel}
        profilsSkillsModel={this.props.profilsSkillsModel}
        familysSkillsModel={this.props.familysSkillsModel}
        onTabChange={this.doTabChange}
      />
    );

    refgpecTabs.push(
      <RefGpecLevels
        key="5"
        levelsModel={this.props.levelsModel}
        profilsSkillsModel={this.props.profilsSkillsModel}
        onTabChange={this.doTabChange}
      />
    );
    refgpecTabs.push(
      <RefGpecFamilys
        key="6"
        familysModel={this.props.familysModel}
        familysSkillsModel={this.props.familysSkillsModel}
        onTabChange={this.doTabChange}
      />
    );
    refgpecTabs.push(
      <RefGpecFamilysSkills
        key="7"
        familysSkillsModel={this.props.familysSkillsModel}
        skillsModel={this.props.skillsModel}
        skillsTypesModel={this.props.skillsTypesModel}
        familysModel={this.props.familysModel}
        profilsModel={this.props.profilsModel}
        levelsModel={this.props.levelsModel}
        onTabChange={this.doTabChange}
      />
    );

    return (
      <div id="content">
        {/* ONGLETS POUR LA NAVIGATION */}
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <img className="gpec-logo" src={logo} alt="" />
              <a
                className="gpec-title navbar-brand"
                id="tab-index"
                onClick={this.handleTabChange}
                href="#index"
                data-toggle="tab"
                title="Application de gestion d'un référentiel de profils/compétences pour une démarche GPEC"
              >
                RefGPEC
              </a>
            </div>
            <div className="navbar-collapse collapse">
              <ul className="nav navbar-nav">
                <li className="nav-item">
                  <a
                    data-toggle="tab"
                    className="nav-link"
                    id="tab-profils"
                    href="#profils"
                    onClick={this.handleTabChange}
                  >
                    Profils de poste
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    data-toggle="tab"
                    className="nav-link"
                    id="tab-profils-skills"
                    href="#profils-skills"
                    onClick={this.handleTabChange}
                  >
                    Profils &amp; Compétences
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    data-toggle="tab"
                    className="nav-link"
                    id="tab-skills"
                    href="#skills"
                    onClick={this.handleTabChange}
                  >
                    Référentiel des compétences
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    data-toggle="tab"
                    className="nav-link"
                    id="tab-levels"
                    href="#levels"
                    onClick={this.handleTabChange}
                  >
                    Modulations des compétences
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    data-toggle="tab"
                    className="nav-link"
                    id="tab-familys"
                    href="#familys"
                    onClick={this.handleTabChange}
                  >
                    Gestion des Familles
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    data-toggle="tab"
                    className="nav-link"
                    id="tab-familys-skills"
                    href="#familys-skills"
                    onClick={this.handleTabChange}
                  >
                    Familles &amp; Compétences
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="gpec-content tab-content">
          {refgpecTabs}

          {/* LOADING DATA MODAL */}
          <Modal show={this.state.Modal}>
            <Modal.Header closeButton>
              <Modal.Title>
                <h2 className="modal-title text-center">
                  Initialisation de RefGPEC
                </h2>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ul className="list-group">
                <li className="list-group-item">
                  <span
                    className={this.getDataLoadedClassName(
                      "profilsSkillsModel"
                    )}
                  />
                  Profils &amp; Compétences
                </li>
                <li className="list-group-item">
                  <span
                    className={this.getDataLoadedClassName("profilsModel")}
                  />
                  Profils de poste
                </li>
                <li className="list-group-item">
                  <span
                    className={this.getDataLoadedClassName("skillsModel")}
                  />
                  Référentiel des compétences
                </li>
                <li className="list-group-item">
                  <span
                    className={this.getDataLoadedClassName("levelsModel")}
                  />
                  Modulations des compétences
                </li>

                <li className="list-group-item">
                  <span
                    className={this.getDataLoadedClassName("FamilyModel")}
                  />
                  Familles
                </li>
                <li className="list-group-item">
                  <span
                    className={this.getDataLoadedClassName("familySkillsModel")}
                  />
                  Familles &amp; Compétences
                </li>
                <li className="list-group-item">
                  <span className={this.getDataLoadedClassName("typeModel")} />
                  Types
                </li>
              </ul>
            </Modal.Body>
            <Modal.Footer>
              <div
                className="text-center"
                dangerouslySetInnerHTML={{ __html: TextFooter }}
              />
              <div
                style={{
                  textAlign: "center",
                  position: "relative",
                  left: "42%"
                }}
                className="text-center"
              >
                {timesup}
              </div>
            </Modal.Footer>
          </Modal>
        </div>

        <footer className="gpec-footer">
          <hr />
          <div className="col-lg-12">
            <p className="muted pull-right">
              <span className="fa fa-github" /> &nbsp;
              <a href="https://github.com/Inist-CNRS/refgpec">RefGPEC</a>{" "}
              version 2.7.0
            </p>
          </div>
        </footer>
      </div>
    );
  },

  getDataLoadedClassName(modelType) {
    let self = this;

    if (modelType === "skillsModel") {
      return self.props.skillsModel.initializing
        ? "pull-right fa fa-2x fa-square"
        : "pull-right fa fa-2x fa-check-square";
    } else if (modelType === "profilsModel") {
      return self.props.profilsModel.initializing
        ? "pull-right fa fa-2x fa-square"
        : "pull-right fa fa-2x fa-check-square";
    } else if (modelType === "levelsModel") {
      return self.props.levelsModel.initializing
        ? "pull-right fa fa-2x fa-square"
        : "pull-right fa fa-2x fa-check-square";
    } else if (modelType === "typeModel") {
      return self.props.skillsTypesModel.initializing
        ? "pull-right fa fa-2x fa-square"
        : "pull-right fa fa-2x fa-check-square";
    } else if (modelType === "DomainModel") {
      return self.props.familysModel.initializing
        ? "pull-right fa fa-2x fa-square"
        : "pull-right fa fa-2x fa-check-square";
    } else {
      return "pull-right fa fa-2x fa-check-square";
    }
  },

  componentDidMount() {
    let self = this;
    $(function() {
      // activate the selected tab when clicking on a tab
      $(window).on("hashchange", function() {
        self.doTabChange(document.location.hash);
      });
    });
  },

  componentDidUpdate() {
    let self = this;

    // need this when initializing the first DOM rendering
    // it certenlay could be optimized because this call is useless
    // once the DOM is fully loaded
    self.doTabChange(document.location.hash);
  }
});
export default RefGpecHome;
