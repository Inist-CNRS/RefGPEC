import React from "react";
import RefGpecProfilSkill from "./refgpec-profil-skill.jsx";
import RefGPECProfilsList from "./refgpec-profils-list";
import RefGpecSkillsTypeList from "./refgpec-skills-type-list";
import RefGpecLevelslist from "./refgpec-levels-list";
import { OverlayTrigger, Popover } from "react-bootstrap";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
var createReactClass = require("create-react-class");
var RefGpecProfilsSkills = createReactClass({
  displayName: "RefGpecProfilsSkills",

  getInitialState: function() {
    return {
      layout: "vertical",
      selectedProfil: "",
      PDF_path: "",
      newSkill: "",
      newLevel: "",
      newFreeComment: "",
      error: "",
      champtri: "psl_code",
      type_tri: true
    };
  },
  trieprofil(event) {
    if (this.state.champtri === event.target.id) {
      this.setState({
        champtri: event.target.id,
        type_tri: !this.state.type_tri
      });
    } else {
      this.setState({ champtri: event.target.id, type_tri: true });
    }
  },

  render: function() {
    var self = this;
    if (
      self.props.profilsSkillsModel.initializing ||
      self.props.skillsModel.initializing ||
      self.props.skillsTypesModel.initializing ||
      self.props.skillsDomainsModel.initializing ||
      self.props.profilsModel.initializing ||
      self.props.levelsModel.initializing
    ) {
      return null;
    }

    let rgPS = [];
    Object.keys(self.props.profilsSkillsModel.psl).forEach(function(key) {
      rgPS.push(
        <RefGpecProfilSkill
          key={key}
          psId={key}
          levelsModel={self.props.levelsModel}
          skillsModel={self.props.skillsModel}
          skillsTypesModel={self.props.skillsTypesModel}
          skillsDomainsModel={self.props.skillsDomainsModel}
          psData={self.props.profilsSkillsModel.profilsSkillsLevels[key]}
          onSave={self.handleSave}
          onDestroy={self.handleDestroy}
          ajaxLoading={self.props.profilsSkillsModel.ajaxLoading}
        />
      );
    });
    if (self.state.type_tri) {
      rgPS.sort(function(a, b) {
        return a.props.psData[self.state.champtri] >
          b.props.psData[self.state.champtri]
          ? 1
          : b.props.psData[self.state.champtri] >
            a.props.psData[self.state.champtri]
            ? -1
            : 0;
      });
    } else {
      rgPS.sort(function(a, b) {
        return a.props.psData[self.state.champtri] <
          b.props.psData[self.state.champtri]
          ? 1
          : b.props.psData[self.state.champtri] <
            a.props.psData[self.state.champtri]
            ? -1
            : 0;
      });
    }
    // layout stuff
    let layoutBtnClasses = "btn btn-default pull-right fa fa-2x ";
    layoutBtnClasses +=
      self.state.layout === "horizontal" ? "fa-arrows-h" : "fa-arrows-v";
    let layoutColClasses = "col-lg-6 ";
    layoutColClasses +=
      self.state.layout === "horizontal" ? "" : "profils-skills-vertical";

    return (
      <div id="profils-skills">
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-default">
              <div className="panel-heading">Profils &amp; Compétences</div>
              <div className="panel-body">
                <button
                  type="button"
                  className={layoutBtnClasses}
                  title="Basculer l'affichage profil/compétences horizontalement et verticalement"
                  onClick={this.handleSwitchLayout}
                />

                <p>
                  Depuis cet onglet il est possible d'associer à chaque profils
                  des{" "}
                  <a
                    data-toggle="tab"
                    className="nav-link"
                    href="#skills"
                    onClick={this.handleNavigateTab}
                  >
                    compétences issues du référentiel
                  </a>{" "}
                  puis d'associer une{" "}
                  <a
                    data-toggle="tab"
                    href="#levels"
                    onClick={this.handleNavigateTab}
                  >
                    modulation
                  </a>{" "}
                  à chacunes de ces compétences.
                </p>

                {/* FORMULAIRE DE BASCULE D'UN PROFIL A L'AUTRE */}
                <p>
                  Vous êtes en train de modifier les associations de compétences
                  sur le profil suivant :
                  <RefGPECProfilsList
                    skillData={self.props.profilsModel}
                    ajaxLoading={self.props.profilsModel.ajaxLoading}
                    data-fieldname="ProfilSelect"
                    onChange={this.handleChangeProfil}
                    value={self.props.profilsSkillsModel.profil}
                  />
                </p>
              </div>
            </div>

            <div className="row">
              {/* PROFILS ET COMPETENCES : ZONE FORMULAIRE */}
              <div className={layoutColClasses}>
                <div className="panel panel-default">
                  <div className="panel-heading">
                    Savoirs, savoir-faire et savoir-être nécessaires pour
                    occuper le poste de manière optimale
                  </div>
                  <div className="panel-body">
                    <table
                      id="profils-skills-list"
                      className="table table-striped table-bordered"
                    >
                      <thead>
                        <tr>
                          <th className="profils-skills-col-action" />
                          <th className="profils-skills-col-name">
                            Types &amp; Domaines
                          </th>
                          <th className="profils-skills-col-name">
                            Compétences
                          </th>
                          <th
                            title="Cliquez pour trier par Modulation"
                            role="button"
                            id="level_code"
                            onClick={this.trieprofil}
                            className="profils-skills-col-name"
                          >
                            Modulations{" "}
                            <i className="fa fa-sort" aria-hidden="true" />
                          </th>
                          <th
                            title="Cliquez pour trier par Commentaire"
                            role="button"
                            id="psl_free_comments"
                            onClick={this.trieprofil}
                            className="profils-skills-col-commentary"
                          >
                            Commentaires libres{" "}
                            <i className="fa fa-sort" aria-hidden="true" />
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {rgPS}

                        <tr>
                          <td>
                            <OverlayTrigger
                              show={null}
                              trigger="focus"
                              data-title="Erreur nouveau profil_Skills"
                              placement="top"
                              overlay={
                                <Popover id="popover-positioned-top">
                                  {this.state.error}
                                </Popover>
                              }
                            >
                              <a
                                href=""
                                onClick={this.handleSubmit}
                                className="fa fa-plus-square fa-2x"
                                role="button"
                                title="Associer la compétence au profil"
                              />
                            </OverlayTrigger>
                          </td>
                          <td colSpan="2">
                            <RefGpecSkillsTypeList
                              skillData={self.props.skillsModel}
                              ajaxLoading={self.props.skillsModel.ajaxLoading}
                              data-fieldname="newSkill"
                              onChange={this.handleSkillChange}
                              value={this.state.newSkill}
                            />
                          </td>
                          <td>
                            <RefGpecLevelslist
                              skillData={self.props.levelsModel}
                              ajaxLoading={self.props.levelsModel.ajaxLoading}
                              data-fieldname="newLevel"
                              onChange={this.handleLevelChange}
                              value={this.state.newLevel}
                            />
                          </td>
                          <td>
                            {" "}
                            <textarea
                              className="form-control"
                              rows="1"
                              placeholder="Commentaires libres"
                              value={this.state.newFreeComment}
                              data-fieldname="newFreeComment"
                              onChange={this.handleChangeFreeComm}
                              disabled={
                                this.props.profilsSkillsModel.ajaxLoading
                              }
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div
                      className="progress"
                      style={{
                        display: self.props.profilsSkillsModel.ajaxLoading
                          ? "block"
                          : "none"
                      }}
                    >
                      <div
                        className="progress-bar progress-bar-striped active"
                        role="progressbar"
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* PROFILS ET COMPETENCES : ZONE PDF PREVIEW */}
              <div className={layoutColClasses}>
                <div
                  className="embed-responsive embed-responsive-4by3"
                  style={{ height: "1200px" }}
                >
                  <iframe
                    title="pdf-preview"
                    className="embed-responsive-item"
                    src={this.state.PDF_path}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <NotificationContainer />
      </div>
    );
  },

  handleSkillChange: function(event) {
    this.setState({ newSkill: event });
  },
  handleLevelChange: function(event) {
    this.setState({ newLevel: event });
  },
  handleChangeFreeComm: function(event) {
    this.setState({ newFreeComment: event.target.value });
  },

  handleSubmit: function(event) {
    const self = this;
    if (self.props.profilsSkillsModel.ajaxLoading) return;
    if (!self.missingField()) {
      self.props.profilsSkillsModel.addProfilSkill(
        self.state.selectedProfil,
        self.state.newSkill,
        self.state.newLevel,
        self.state.newFreeComment,
        function() {
          if (!self.props.profilsSkillsModel.feedback) {
            NotificationManager.success(
              "",
              "La compétence " +
                self.state.newSkill +
                " a été ajoutée au profil " +
                self.state.selectedProfil
            );
            self.props.skillsModel.updateVue();
            self.props.levelsModel.updateVue();
            self.props.profilsModel.updateVue();
          } else {
            NotificationManager.error(
              "",
              self.props.profilsSkillsModel.feedback
            );
          }
        }
      );

      self.setState({
        newLevel: "",
        newSkill: "",
        newFreeComment: "",
        error: ""
      });
    } else {
      var missingFields = [];
      if (!self.state.selectedProfil) missingFields.push("Profil de poste");
      if (!self.state.newLevel) missingFields.push("Modulation");
      if (!self.state.newSkill) missingFields.push("Compétence");
      self.setState({
        error:
          "Il manque des champs avant de pouvoir ajouter la compétence :\n" +
          missingFields.join(", ")
      });
    }
    event.preventDefault(); // Let's stop this event.
    event.stopPropagation(); // Really this time.
  },

  handleDestroy: function(profilSkillId) {
    let self = this;
    if (self.props.profilsSkillsModel.ajaxLoading) return;
    self.props.profilsSkillsModel.destroy(
      profilSkillId,
      self.state.selectedProfil,
      function() {
        if (!self.props.profilsSkillsModel.feedback) {
          NotificationManager.success(
            "",
            "La compétence " +
              profilSkillId +
              " a été supprimée du profil " +
              self.state.selectedProfil
          );
          self.props.skillsModel.updateVue();
          self.props.levelsModel.updateVue();
          self.props.profilsModel.updateVue();
        } else {
          NotificationManager.error("", self.props.profilsSkillsModel.feedback);
        }
      }
    );
  },

  handleChangeProfil: function(event) {
    let self = this;
    let chemin_pdf = "";
    if (event) {
      let code_profil = event;
      self.props.profilsSkillsModel.getProfilSkillLevel(
        code_profil,
        function() {
          chemin_pdf =
            self.props.profilsModel.profils[code_profil].profil_pdf_path;
          self.setState({ selectedProfil: code_profil, PDF_path: chemin_pdf });
        }
      );
    }
  },
  handleSave: function(profiSkillId, profilSkillState) {
    let self = this;
    this.props.profilsSkillsModel.save(
      profiSkillId,
      profilSkillState,
      function() {
        if (!self.props.profilsSkillsModel.feedback) {
          NotificationManager.success(
            "",
            "L'association  " +
              profilSkillState.psSkillShortName.skill_shortname +
              " a été modifiée"
          );
          self.props.levelsModel.updateVue();
        } else {
          NotificationManager.error("", self.props.profilsSkillsModel.feedback);
        }
      }
    );
  },

  handleNavigateTab: function(event) {
    this.props.onTabChange(event.target.getAttribute("href"));
  },

  handleSwitchLayout: function(event) {
    if (this.state.layout === "vertical") {
      this.setState({ layout: "horizontal" });
    } else {
      this.setState({ layout: "vertical" });
    }
  },

  componentDidUpdate() {},

    componentWillReceiveProps(nextProps){
    if(nextProps.profilsSkillsModel.profil !== this.state.selectedProfil){
        this.setState({ selectedProfil: nextProps.profilsSkillsModel.profil, PDF_path: this.props.profilsModel.profils[nextProps.profilsSkillsModel.profil].profil_pdf_path });
    }
    },



    missingField() {
    return (
      !this.state.selectedProfil || !this.state.newLevel || !this.state.newSkill
    );
  }
});
export default RefGpecProfilsSkills;
