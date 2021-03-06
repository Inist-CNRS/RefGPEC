import React from "react";
import RefGpecSkill from "./refgpec-skill.jsx";
import RefGpecNewSkill from "./refgpec-new-skill.jsx";
import RefGpecResearchSkill from "./refgpec-research-skill";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import { CSVLink } from "react-csv";
import words from "talisman/tokenizers/words";
import unine from "talisman/stemmers/french/unine";
import stopwords from "stopwords-fr";

let createReactClass = require("create-react-class");
let RefGpecSkills = createReactClass({
  displayName: "RefGpecSkills",

  getInitialState: function() {
    return {
      newSkillType: "",
      newSkillShortName: "",
      newSkillFreeComments: "",
      error: "",
      champtri: "",
      type_sort: true,
      filter: {
        SearchSkillType: "",
        SearchFamily: "",
        SearchSkillShortName: ""
      },
      lastSkillAdd: []
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

  filterList: function(event) {
    this.setState({ filter: event });
  },

  render: function() {
    let self = this;
    // model is not ready ? then do not render anything
    if (
      this.props.skillsModel.initializing ||
      this.props.familysModel.initializing ||
      this.props.skillsTypesModel.initializing
    ) {
      return null;
    }
    let rgSkills = [];
    let skillsadd = [];
    let compteurSkill = 0;
    let searchwords = self.state.filter.SearchSkillShortName;
    //console.log("Recherche :", searchwords);
    searchwords = words(searchwords.toLowerCase());
    //console.log("Words :", searchwords);
    searchwords = searchwords.filter(function(word) {
      return stopwords.indexOf(word) === -1;
    });
    //console.log("stopwords :", searchwords);
    searchwords = searchwords.map(unine.complex);
    //console.log("unine complex", searchwords);

    Object.keys(self.props.skillsModel.skills).forEach(function(key, i) {
      //search by ignoring accents and tokenization
      let matching = 0;
      let matchingFamily = 0;
      if (self.state.filter.SearchFamily.length !== 0) {
        let compt = 0;
        let avecfamille = {};
        Object.keys(self.props.skillsModel.skills_familys).forEach(function(
          famille
        ) {
          if (
            self.props.skillsModel.skills_familys[famille].skill_code === key
          ) {
            let j = 0;
            while (j < self.state.filter.SearchFamily.length) {
              if (
                self.props.skillsModel.skills_familys[famille].family_id ===
                self.state.filter.SearchFamily[j].value
              ) {
                matchingFamily += 1;
              }
              j++;
            }
            avecfamille = { [key]: key };
          }

          if (
            compt ===
              Object.keys(self.props.skillsModel.skills_familys).length - 1 &&
            !avecfamille[key] &&
            self.state.filter.SearchFamily[0].value === "Aucune"
          ) {
            matchingFamily += 1;
          }
          compt++;
        });
      }

      let j = 0;
      if (
        searchwords.length !== 0 &&
        self.props.skillsModel.skills[key].tokens.length !== 0
      ) {
        while (matching + j <= searchwords.length && j < searchwords.length) {
          self.props.skillsModel.skills[key].tokens.forEach(function(word) {
            if (
              word === searchwords[j] ||
              word.toLowerCase().includes(searchwords[j].toLowerCase())
            ) {
              matching += 1;
            }
          });
          j += 1;
        }
      }
      if (
        (matching !== 0 || searchwords.length === 0) &&
        (self.props.skillsModel.skills[key].st_code.toLowerCase() ===
          self.state.filter.SearchSkillType.toLowerCase() ||
          self.state.filter.SearchSkillType.toLowerCase() === "") &&
        (self.state.filter.SearchFamily.length === 0 || matchingFamily !== 0)
      ) {
        let skill;
        //console.log(
        //  "Tokens de la compétence ",
        //  self.props.skillsModel.skills[key].skill_shortname + " : ",
        //  self.props.skillsModel.skills[key].tokens
        //);
        // get list of just added skills to be able to put it in top of the long list
        // so that the user can see the skill he just added
        if (
          self.props.skillsModel.lastSkillAdd.indexOf(
            self.props.skillsModel.skills[key].skill_code
          ) !== -1
        ) {
          skillsadd.push(i);
          skill = (
            <RefGpecSkill
              key={key}
              skillId={key}
              skillData={self.props.skillsModel.skills[key]}
              skillsTypesModel={self.props.skillsTypesModel}
              familyModel={self.props.familyModel}
              skillfamilys={self.props.skillsModel.skills_familys}
              profilList={self.props.skillsModel.getListProfils(key)}
              onProfil={self.handleOpenProfilSkills}
              onChangeFamily={self.OpenfamilySkills}
              onSave={self.handleSave}
              onDestroy={self.handleDestroy}
              ajaxLoading={self.props.skillsModel.ajaxLoading}
              style={{ backgroundColor: "#e67300" }}
            />
          );
        } else {
          skill = (
            <RefGpecSkill
              key={key}
              skillId={key}
              skillData={self.props.skillsModel.skills[key]}
              skillsTypesModel={self.props.skillsTypesModel}
              familyModel={self.props.familyModel}
              skillfamilys={self.props.skillsModel.skills_familys}
              profilList={self.props.skillsModel.getListProfils(key)}
              onProfil={self.handleOpenProfilSkills}
              onSave={self.handleSave}
              onDestroy={self.handleDestroy}
              onChangeFamily={self.OpenfamilySkills}
              ajaxLoading={self.props.skillsModel.ajaxLoading}
            />
          );
        }
        rgSkills.push(skill);
      }
    });

    if (self.state.type_sort) {
      rgSkills.sort(function(a, b) {
        if (
          a.props.skillData[self.state.champtri] &&
          b.props.skillData[self.state.champtri]
        ) {
          return a.props.skillData[self.state.champtri]
            .toString()
            .localeCompare(b.props.skillData[self.state.champtri])
            .toString();
        }
      });
    } else {
      rgSkills.sort(function(a, b) {
        if (
          a.props.skillData[self.state.champtri] &&
          b.props.skillData[self.state.champtri]
        ) {
          return a.props.skillData[self.state.champtri]
            .toString()
            .localeCompare(b.props.skillData[self.state.champtri])
            .toString();
        }
      });
      rgSkills.reverse();
    }

    // once the big list is sorted, we extract "just added skills" from the list
    // and we add it at the first position (top of the list)
    Object.keys(skillsadd).forEach(function(key) {
      rgSkills.unshift(rgSkills.splice(skillsadd[key], 1)[0]);
    });
    compteurSkill = Object.keys(self.props.skillsModel.skills).length;

    return (
      <div id="skills">
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-default">
              <div
                className="panel-heading row"
                style={{ marginRight: "0px", marginLeft: "0px" }}
              >
                <div className="col-md-6  text center">
                  Référentiel des compétences{" "}
                </div>
                <div className="col-md-6 text center">
                  {(() => {
                    if (
                      Object.keys(self.props.skillsModel.skillCSV).length !== 0
                    ) {
                      let date =
                        new Date().getFullYear() +
                        "-" +
                        ("0" + (new Date().getMonth() + 1)).slice(-2) +
                        "-" +
                        ("0" + new Date().getDate()).slice(-2);
                      return (
                        <CSVLink
                          data={self.props.skillsModel.skillCSV}
                          style={{ backgroundColor: "#8dc63f", float: "right" }}
                          title="Cliquez pour télecharger le réferentiel des compétences en csv"
                          separator={";"}
                          filename={
                            "Référentiel des compétences - GPEC - " +
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
                  })()}

                  <em
                    style={{
                      float: "right",
                      marginRight: "15px"
                    }}
                  >
                    Actuellement,{" "}
                    <strong style={{ color: "red" }}>
                      {compteurSkill}
                    </strong>{" "}
                    compétences enregistrées dans le référentiel.{" "}
                  </em>
                </div>
              </div>
              <div className="panel-body">
                Depuis cet onglet il est possible d'administrer le référentiel
                des compétences. Ces compétences pourront être{" "}
                <a
                  data-toggle="tab"
                  className="nav-link"
                  href="#profils-skills"
                  onClick={this.handleNavigateTab}
                >
                  associées
                </a>{" "}
                aux différents{" "}
                <a
                  data-toggle="tab"
                  className="nav-link"
                  href="#profils"
                  onClick={this.handleNavigateTab}
                >
                  profils
                </a>{" "}
                en leur associant une{" "}
                <a
                  data-toggle="tab"
                  href="#levels"
                  onClick={this.handleNavigateTab}
                >
                  modulation
                </a>.
                <div className="col-col-md-pull-10" />
              </div>
            </div>
            <table
              id="skills-list"
              className="table table-striped table-bordered"
            >
              <tbody />
            </table>
            <table
              id="skills-list"
              className="table table-striped table-bordered"
            >
              <thead>
                <tr>
                  <th className="skills-col-action" />
                  <th
                    title="Cliquez pour trier par Type"
                    role="button"
                    id="st_code"
                    onClick={this.Sort}
                    className="skills-col-type"
                  >
                    Type <i className="fa fa-sort" aria-hidden="true" />
                  </th>
                  <th id="family_id">Famille(s)</th>
                  <th
                    title="Cliquez pour trier par Nom"
                    role="button"
                    id="skill_shortname"
                    onClick={this.Sort}
                    className="skills-col-shortname"
                  >
                    Nom de la compétence{" "}
                    <i className="fa fa-sort" aria-hidden="true" />
                  </th>
                  <th
                    title="Cliquez pour trier par Commentaire"
                    role="button"
                    id="skill_free_comments"
                    onClick={this.Sort}
                    className="skills-col-commentary"
                  >
                    Commentaires libres{" "}
                    <i className="fa fa-sort" aria-hidden="true" />
                  </th>
                  <th
                    title="Cliquez pour trier par Code"
                    role="button"
                    id="skill_code"
                    onClick={this.Sort}
                    className="skills-col-code"
                  >
                    Code
                    <i className="fa fa-sort" aria-hidden="true" />
                  </th>
                </tr>
              </thead>
              <tbody>
                <RefGpecResearchSkill
                  skillsModel={self.props.skillsModel}
                  skillsTypesModel={self.props.skillsTypesModel}
                  familyModel={self.props.familysModel}
                  onChange={this.filterList}
                />
                <tr>
                  <td colSpan="6" style={{ height: "25px" }} />
                </tr>
                {/* FORM USED TO CREATE A NEW SKILL */}
                <RefGpecNewSkill
                  skillsModel={self.props.skillsModel}
                  skillsTypesModel={self.props.skillsTypesModel}
                  familyModel={self.props.familysModel}
                  onSubmit={self.handleAddSkills}
                />
                {rgSkills}
              </tbody>
            </table>

            <div
              className="progress"
              style={{
                display: self.props.skillsModel.ajaxLoading ? "block" : "none"
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
        <NotificationContainer />
      </div>
    );
  },

  handleAddSkills: function(
    newSkillType,
    newSkillShortName,
    newSkillFreeComments
  ) {
    const self = this;
    if (self.props.skillsModel.ajaxLoading) return;
    if (newSkillShortName && newSkillType) {
      self.props.skillsModel.addSkill(
        newSkillType,
        newSkillShortName,
        newSkillFreeComments,
        function() {
          if (!self.props.skillsModel.feedback.code) {
            NotificationManager.success(
              "",
              "La compétence " + newSkillShortName + " a été ajoutée"
            );
          } else {
            NotificationManager.error(
              "[" +
                self.props.skillsModel.feedback.code +
                "] " +
                self.props.skillsModel.feedback.message,
              "Une erreur a été rencontrée lors de l'ajout : ",
              0
            );
          }
        }
      );

      self.setState({
        newSkillType: "",
        newSkillShortName: "",
        newSkillFreeComments: "",
        error: ""
      });
    } else {
      let missingFields = [];
      if (!newSkillShortName) missingFields.push("Nom de la compétence");
      if (!newSkillType) missingFields.push("Type");
      self.setState({
        error:
          "Il manque des champs avant de pouvoir ajouter la compétence :\n" +
          missingFields.join(", ")
      });
    }
  },

  handleNavigateTab: function(event) {
    window.scrollTo(0, 0);
    this.props.onTabChange(event.target.getAttribute("href"));
  },
  handleDestroy: function(skillId) {
    let self = this;
    self.props.skillsModel.destroy(skillId, function() {
      if (!self.props.skillsModel.feedback.code) {
        NotificationManager.success(
          "",
          "La compétence " + skillId + " a été supprimée"
        );
        self.props.profilsSkillsModel.updateVue();
        self.props.skillsModel.inform();
      } else {
        NotificationManager.error(
          "[" +
            self.props.skillsModel.feedback.code +
            "] " +
            self.props.skillsModel.feedback.message,
          "Une erreur a été rencontrée lors de la suppression : ",
          0
        );
      }
    });
  },

  handleSave: function(skillId, SkillState) {
    let self = this;

    this.props.skillsModel.save(skillId, SkillState, function() {
      if (!self.props.skillsModel.feedback.code) {
        self.props.skillsModel.updateVue();
        self.props.profilsSkillsModel.updateVue();
        NotificationManager.success(
          "",
          "La compétence " + skillId + " a été modifiée"
        );
      } else {
        NotificationManager.error(
          "[" +
            self.props.skillsModel.feedback.code +
            "] " +
            self.props.skillsModel.feedback.message,
          "Une erreur a été rencontrée lors de la modification : ",
          0
        );
      }
    });
  },
  componentDidMount() {},

  handleOpenProfilSkills: function(event) {
    this.props.profilsSkillsModel.getProfilSkillLevel(event.target.id);
  },

  OpenfamilySkills: function(event) {
    this.props.onTabChange("tab-familys-skills");
    if (event.value) {
      this.props.familysSkillsModel.getFamilySkillLevel(event.value);
    } else {
      this.props.familysSkillsModel.getFamilySkillLevel(event.target.id);
    }
  },
  missingField() {
    return !this.state.newSkillShortName || !this.state.newSkillType;
  }
});
export default RefGpecSkills;
