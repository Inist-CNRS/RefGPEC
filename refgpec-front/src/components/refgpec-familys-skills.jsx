import React from "react";
import RefGpecFamilySkill from "./refgpec-family-skill.jsx";
import RefGPECFamilyList from "./refgpec-familys-list";
import RefGpecSkillsTypeList from "./refgpec-skills-type-list";
import RefGpecLevelslist from "./refgpec-levels-list";
import { OverlayTrigger, Popover } from "react-bootstrap";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
let createReactClass = require("create-react-class");
let RefGpecFamilysSkills = createReactClass({
  displayName: "RefGpecFamilysSkills",

  getInitialState: function() {
    return {
      layout: "vertical",
      selectedFamily: "",
      newSkill: "",
      newLevel: "",
      newFreeComment: "",
      error: "",
      champtri: undefined,
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
    let self = this;
    if (
      self.props.familysSkillsModel.initializing ||
      self.props.skillsModel.initializing ||
      self.props.skillsTypesModel.initializing ||
      self.props.familysModel.initializing ||
      self.props.levelsModel.initializing
    ) {
      return null;
    }
    let familyskill;
    let FSadd = [];
    let rgFS = [];
    Object.keys(self.props.familysSkillsModel.fsl).forEach(function(key, i) {
      if (self.props.familysSkillsModel.familysSkillsLevels[key]) {
        if (
          self.props.familysSkillsModel.lastFamilySkillAdd.indexOf(
            self.props.familysSkillsModel.fsl[key].fsl_code
          ) !== -1
        ) {
          FSadd.push(i);
          familyskill = (
            <RefGpecFamilySkill
              key={key}
              psId={key}
              onSave={self.handleSave}
              onDestroy={self.handleDestroy}
              levelsModel={self.props.levelsModel}
              skillsModel={self.props.skillsModel}
              skillsTypesModel={self.props.skillsTypesModel}
              familyModel={self.props.familysModel}
              psData={self.props.familysSkillsModel.familysSkillsLevels[key]}
              ajaxLoading={self.props.familysSkillsModel.ajaxLoading}
              style={{ backgroundColor: "#e67300" }}
            />
          );
        } else {
          familyskill = (
            <RefGpecFamilySkill
              key={key}
              psId={key}
              onSave={self.handleSave}
              onDestroy={self.handleDestroy}
              levelsModel={self.props.levelsModel}
              skillsModel={self.props.skillsModel}
              skillsTypesModel={self.props.skillsTypesModel}
              familyModel={self.props.familysModel}
              psData={self.props.familysSkillsModel.familysSkillsLevels[key]}
              ajaxLoading={self.props.familysSkillsModel.ajaxLoading}
            />
          );
        }
        rgFS.push(familyskill);
      }
    });

    if (self.state.type_sort) {
      rgFS.sort(function(a, b) {
        if (
          a.props.psData[self.state.champtri] &&
          b.props.psData[self.state.champtri]
        ) {
          return a.props.psData[self.state.champtri]
            .toString()
            .localeCompare(b.props.psData[self.state.champtri])
            .toString();
        }
      });
    } else {
      rgFS.sort(function(a, b) {
        if (
          a.props.psData[self.state.champtri] &&
          b.props.psData[self.state.champtri]
        ) {
          return a.props.psData[self.state.champtri]
            .toString()
            .localeCompare(b.props.psData[self.state.champtri])
            .toString();
        }
      });
      rgFS.reverse();
    }

    // layout stuff
    let layoutColClasses = "col-lg-6 ";
    layoutColClasses +=
      self.state.layout === "horizontal" ? "" : "Familys-skills-vertical";

    // once the big list is sorted, we extract "just added Familys" from the list
    // and we add it at the first position (top of the list)
    Object.keys(FSadd).forEach(function(key) {
      rgFS.unshift(rgFS.splice(FSadd[key], 1)[0]);
    });
    let compteurSF = 0;
    if (this.state.selectedFamily) {
      compteurSF = Object.keys(
        self.props.familysModel.getListSkills(self.state.selectedFamily)
      ).length;
    }

    return (
      <div id="familys-skills">
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
                  Familys &amp; Compétences{" "}
                </div>
                <div className="col-md-6 text center">
                  <em
                    style={{
                      float: "right",
                      marginRight: "15px"
                    }}
                  >
                    Actuellement,{" "}
                    <strong style={{ color: "red" }}>{compteurSF}</strong>{" "}
                    Compétences associées à la Famille{" "}
                    {this.state.selectedFamily} dans le référentiel.{" "}
                  </em>
                </div>
              </div>

              <div className="panel-body">
                <p>
                  Depuis cet onglet il est possible d'associer à chaque Famille
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
                    modulation obligatoire
                  </a>{" "}
                  à chacunes de ces compétences.
                </p>

                {/* FORMULAIRE DE BASCULE D'UNE Famille A L'AUTRE */}
                <div>
                  <p>
                    Vous êtes en train de modifier les associations de
                    compétences sur la famille suivante :
                    <RefGPECFamilyList
                      skillData={self.props.familysModel}
                      ajaxLoading={self.props.familysModel.ajaxLoading}
                      data-fieldname="FamilySelect"
                      onChange={this.handleChangeFamily}
                      value={self.props.familysSkillsModel.family}
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
                    intégrer la famille
                  </div>
                  <div className="panel-body">
                    <table
                      id="Familys-skills-list"
                      className="table table-striped table-bordered"
                    >
                      <thead>
                        <tr>
                          <th className="Familys-skills-col-action" />

                          <th className="Familys-skills-col-name">
                            Compétences
                          </th>
                          <th
                            title="Cliquez pour trier par Modulation"
                            role="button"
                            id="level_code"
                            onClick={this.Sort}
                            className="Familys-skills-col-name"
                          >
                            Modulations{" "}
                            <i className="fa fa-sort" aria-hidden="true" />
                          </th>
                          <th
                            title="Cliquez pour trier par Commentaire"
                            role="button"
                            id="psl_free_comments"
                            onClick={this.Sort}
                            className="Familys-skills-col-commentary"
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
                              data-title="Erreur nouveau family_Skills"
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
                                title="Associer la compétence à la famille"
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
                            />
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="6" style={{ height: "25px" }} />
                        </tr>
                        {rgFS}
                      </tbody>
                    </table>
                    <div
                      className="progress"
                      style={{
                        display: self.props.familysSkillsModel.ajaxLoading
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
    if (self.props.familysSkillsModel.ajaxLoading) return;
    if (!self.missingField()) {
      self.props.familysSkillsModel.addFamilySkill(
        self.state.selectedFamily,
        self.state.newSkill,
        self.state.newLevel,
        self.state.newFreeComment,
        function() {
          if (!self.props.familysSkillsModel.feedback.code) {
            NotificationManager.success(
              "",
              "La compétence " +
                self.state.newSkill +
                " a été ajoutée à la famille " +
                self.state.selectedFamily
            );
            self.props.skillsModel.updateVue();
            self.props.levelsModel.updateVue();
            self.props.familysModel.updateVue();
          } else {
            if (self.props.familysSkillsModel.feedback.code === 999) {
              NotificationManager.error(
                "[" +
                  self.props.familysSkillsModel.feedback.code +
                  "] " +
                  self.props.familysSkillsModel.feedback.message,
                "Une erreur a été rencontrée lors de l'ajout de la compétence  : " +
                  self.props.skillsModel.skills[self.state.newSkill]
                    .skill_shortname,
                0
              );
            } else {
              NotificationManager.error(
                "[" +
                  self.props.familysSkillsModel.feedback.code +
                  "] " +
                  self.props.familysSkillsModel.feedback.message,
                "Une erreur a été rencontrée lors de l'ajout de la compétence ",
                0
              );
            }
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
      let missingFields = [];
      if (!self.state.selectedFamily) missingFields.push("Family de poste");
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

  handleDestroy: function(familySkillId) {
    let self = this;
    if (self.props.familysSkillsModel.ajaxLoading) return;
    self.props.familysSkillsModel.destroy(
      familySkillId,
      self.state.selectedFamily,
      function() {
        if (!self.props.familysSkillsModel.feedback.code) {
          NotificationManager.success(
            "",
            "La compétence " +
              familySkillId +
              " a été supprimée de la famille " +
              self.state.selectedFamily
          );
          self.props.skillsModel.updateVue();
          self.props.levelsModel.updateVue();
          self.props.familysModel.updateVue();
        } else {
          NotificationManager.error(
            "[" +
              self.props.familysSkillsModel.feedback.code +
              "] " +
              self.props.familysSkillsModel.feedback.message,
            "Une erreur a été rencontrée lors de la suppression : ",
            0
          );
        }
      }
    );
  },

  handleChangeFamily: function(event) {
    let self = this;
    if (event) {
      let code_family = event;
      self.props.familysSkillsModel.getFamilySkillLevel(
        code_family,
        function() {
          self.setState({ selectedFamily: code_family });
        }
      );
    }
  },
  handleSave: function(familySkillId, familySkillState) {
    let self = this;
    this.props.familysSkillsModel.save(
      familySkillId,
      familySkillState,
      function() {
        if (!self.props.familysSkillsModel.feedback.code) {
          NotificationManager.success(
            "",
            "L'association  " +
              familySkillState.psSkillShortName.skill_shortname +
              " a été modifiée"
          );
          self.props.levelsModel.updateVue();
        } else {
          NotificationManager.error(
            "[" +
              self.props.familysSkillsModel.feedback.code +
              "] " +
              self.props.familysSkillsModel.feedback.message,
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

  componentDidUpdate() {},

  componentWillReceiveProps(nextProps) {
    if (nextProps.familysSkillsModel.family !== this.state.selectedFamily) {
      this.setState({
        selectedFamily: nextProps.familysSkillsModel.family
      });
    }
  },

  missingField() {
    return (
      !this.state.selectedFamily || !this.state.newLevel || !this.state.newSkill
    );
  }
});
export default RefGpecFamilysSkills;
