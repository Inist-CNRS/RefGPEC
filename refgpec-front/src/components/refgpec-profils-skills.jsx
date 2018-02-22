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
import { CSVLink } from "react-csv";
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
      champtri: "",
      type_sort: true
    };
  },
  Sort(event) {
    if (this.state.champtri === event.target.id) {
      this.setState({
        champtri: event.target.id,
        type_sort: !this.state.type_sort
      });
    } else {
      this.setState({ champtri: event.target.id, type_sort: true });
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
    let profilskill;
    let PSadd = [];
    let rgPS = [];
    Object.keys(self.props.profilsSkillsModel.psl).forEach(function(key, i) {
      if (
        self.props.profilsSkillsModel.lastProfilSkillAdd.indexOf(
          self.props.profilsSkillsModel.psl[key].psl_code
        ) !== -1
      ) {
        PSadd.push(i);
        profilskill = (
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
            style={{ backgroundColor: "#e67300" }}
          />
        );
      } else {
        profilskill = (
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
      }
      rgPS.push(profilskill);
    });

    if (self.state.type_sort) {
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
    let layoutColClasses = "col-lg-6 ";
    layoutColClasses +=
      self.state.layout === "horizontal" ? "" : "profils-skills-vertical";

    // once the big list is sorted, we extract "just added profils" from the list
    // and we add it at the first position (top of the list)
    Object.keys(PSadd).forEach(function(key) {
      rgPS.unshift(rgPS.splice(PSadd[key], 1)[0]);
    });

    return (
      <div id="profils-skills">
        <div className="row">
          <div className="col-md-12">
            <div
              className="panel panel-default"
              style={{ position: "sticky", top: "50px", zIndex: "2" }}
            >
              <div
                className="panel-heading row"
                style={{ marginRight: "0px", marginLeft: "0px" }}
              >
                <div className="col-md-6  text center">
                  Profils &amp; Compétences{" "}
                </div>
                <div className="col-md-6 text center">
                  {(() => {
                    if (
                      self.state.selectedProfil &&
                      self.props.profilsModel.profils[self.state.selectedProfil]
                    ) {
                      if (
                        Object.keys(
                          self.props.profilsSkillsModel.profilsSkillsCSV
                            .length !== 0
                        )
                      ) {
                        let date =
                          new Date().getFullYear() +
                          "-" +
                          ("0" + (new Date().getMonth() + 1)).slice(-2) +
                          "-" +
                          ("0" + new Date().getDate()).slice(-2);
                        return (
                          <CSVLink
                            data={
                              self.props.profilsSkillsModel.profilsSkillsCSV
                            }
                            style={{
                              backgroundColor: "#8dc63f",
                              float: "right"
                            }}
                            title="Cliquez pour télecharger les compétences associées au profil en CSV"
                            separator={";"}
                            filename={
                              "Référentiel_" +
                              self.props.profilsModel.profils[
                                self.state.selectedProfil
                              ].profil_shortname +
                              "_" +
                              date +
                              ".csv"
                            }
                            className="btn btn-primary btn-xs"
                            target="_blank"
                          >
                            Exporter en CSV
                          </CSVLink>
                        );
                      }
                    }
                  })()}
                </div>
              </div>
              <div className="panel-body">
                {(() => {
                  if (this.state.PDF_path) {
                    return (
                      <button
                        type="button"
                        title="Ouvrir le PDF dans une nouvelle fenêtre"
                        onClick={this.handleOpenPDF}
                        style={{
                          float: "right",
                          color: "white",
                          backgroundColor: "#8dc63f",
                          fontSize: "20px",
                          padding: "6px 12px"
                        }}
                      >
                        {" "}
                        <i
                          className="fa fa-file-pdf-o fa-fw"
                          aria-hidden="true"
                        />
                        Version PDF du Profil
                      </button>
                    );
                  }
                })()}

                <p>
                  Depuis cet onglet il est possible d'associer à chaque profil
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
                <div>
                  <p>
                    Vous êtes en train de modifier les associations de
                    compétences sur le profil suivant :
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
                            Compétences
                          </th>
                          <th
                            title="Cliquez pour trier par Modulation"
                            role="button"
                            id="level_code"
                            onClick={this.Sort}
                            className="profils-skills-col-name"
                          >
                            Modulations{" "}
                            <i className="fa fa-sort" aria-hidden="true" />
                          </th>
                          <th
                            title="Cliquez pour trier par Commentaire"
                            role="button"
                            id="psl_free_comments"
                            onClick={this.Sort}
                            className="profils-skills-col-commentary"
                          >
                            Commentaires libres{" "}
                            <i className="fa fa-sort" aria-hidden="true" />
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          {/*FORM USED TO CREATE A NEW PROFILS_SKILLS_LEVELS */}
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
                          <td colSpan="1">
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
                        <tr>
                          <td colSpan="6" style={{ height: "25px" }} />
                        </tr>
                        {rgPS}
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
          if (!self.props.profilsSkillsModel.feedback.code) {
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
              "[" +
                self.props.profilsSkillsModel.feedback.code +
                "] " +
                self.props.profilsSkillsModel.feedback.message,
              "Une erreur a été rencontrée lors de l'ajout : ",
              0
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
        if (!self.props.profilsSkillsModel.feedback.code) {
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
          NotificationManager.error(
            "[" +
              self.props.profilsSkillsModel.feedback.code +
              "] " +
              self.props.profilsSkillsModel.feedback.message,
            "Une erreur a été rencontrée lors de la suppression : ",
            0
          );
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
        if (!self.props.profilsSkillsModel.feedback.code) {
          NotificationManager.success(
            "",
            "L'association  " +
              profilSkillState.psSkillShortName.skill_shortname +
              " a été modifiée"
          );
          self.props.levelsModel.updateVue();
        } else {
          NotificationManager.error(
            "[" +
              self.props.profilsSkillsModel.feedback.code +
              "] " +
              self.props.profilsSkillsModel.feedback.message,
            "Une erreur a été rencontrée lors de la modification : ",
            0
          );
        }
      }
    );
  },

  handleNavigateTab: function(event) {
    window.scrollTo(0, 0);
    this.props.onTabChange(event.target.getAttribute("href"));
  },

  handleOpenPDF: function(event) {
    window.open(this.state.PDF_path, "newwindow", "width=720,height=480");
  },

  componentDidUpdate() {},

  componentWillReceiveProps(nextProps) {
    if (nextProps.profilsSkillsModel.profil !== this.state.selectedProfil) {
      this.setState({
        selectedProfil: nextProps.profilsSkillsModel.profil,
        PDF_path: this.props.profilsModel.profils[
          nextProps.profilsSkillsModel.profil
        ].profil_pdf_path
      });
    }
  },

  missingField() {
    return (
      !this.state.selectedProfil || !this.state.newLevel || !this.state.newSkill
    );
  }
});
export default RefGpecProfilsSkills;
