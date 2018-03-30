import React from "react";
import RefGpecProfil from "./refgpec-profil.jsx";
import RefGpecResearchProfil from "./refgpec-research-profil.jsx";
import RefGpecNewProfil from "./refgpec-new-profil.jsx";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import { CSVLink } from "react-csv";
import words from "talisman/tokenizers/words";
import unine from "talisman/stemmers/french/unine";
import stopwords from "stopwords-fr";
let createReactClass = require("create-react-class");
let RefGpecProfils = createReactClass({
  displayName: "RefGpecProfils",

  getInitialState: function() {
    return {
      showModal: false,
      newProfilTag: "",
      newProfilShortName: "",
      newProfilFreeComments: "",
      newProfilPdfPath: "",
      error: "",
      champtri: "",
      type_sort: true,
      filter: { SearchProfilTag: "", SearchProfilShortName: "" }
    };
  },
  close() {
    this.setState({ showModal: false });
  },

  open() {
    this.setState({ showModal: true });
  },

  filterList: function(event) {
    this.setState({ filter: event });
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

    // model is not ready ? then do not render anything
    if (self.props.profilsModel.initializing) {
      return null;
    }
    let rgTagList = this.props.profilsModel.listTag;
    let rgProfils = [];
    let compteurProfil = 0;
    let profilsadd = [];
    let searchwords = self.state.filter.SearchProfilShortName;
    searchwords = words(searchwords.toLowerCase());
    searchwords = searchwords.filter(function(word) {
      return stopwords.indexOf(word) === -1;
    });
    searchwords = searchwords.map(unine.complex);

    Object.keys(self.props.profilsModel.profils).forEach(function(key, i) {
      let tag = "";
      let matching = 0;
      let j = 0;
      if (
        searchwords.length !== 0 &&
        self.props.profilsModel.profils[key].tokens.length !== 0
      ) {
        while (matching + j <= searchwords.length && j < searchwords.length) {
          self.props.profilsModel.profils[key].tokens.forEach(function(word) {
            if (word === searchwords[j]) {
              matching += 1;
            }
          });
          j += 1;
        }
      }

      if (self.props.profilsModel.profils[key].profil_tag) {
        tag = self.props.profilsModel.profils[key].profil_tag;
      }
      if (
        (matching !== 0 || searchwords.length === 0) &&
        tag.search(self.state.filter.SearchProfilTag) !== -1
      ) {
        let profil;
        // get list of just added profils to be able to put it in top of the long list
        // so that the user can see the profil he just added
        if (
          self.props.profilsModel.lastProfilAdd.indexOf(
            self.props.profilsModel.profils[key].profil_code
          ) !== -1
        ) {
          profilsadd.push(i);
          profil = (
            <RefGpecProfil
              key={key}
              profilId={key}
              tagList={rgTagList}
              profilsSkillsModel={self.props.profilsSkillsModel}
              profilData={self.props.profilsModel.profils[key]}
              skilllist={self.props.profilsModel.getlistskills(key)}
              onSave={self.handleSave}
              onDestroy={self.handleDestroy}
              style={{ backgroundColor: "#e67300" }}
            />
          );
        } else {
          profil = (
            <RefGpecProfil
              key={key}
              profilId={key}
              tagList={rgTagList}
              profilsSkillsModel={self.props.profilsSkillsModel}
              profilData={self.props.profilsModel.profils[key]}
              skilllist={self.props.profilsModel.getlistskills(key)}
              onSave={self.handleSave}
              onDestroy={self.handleDestroy}
            />
          );
        }
        rgProfils.push(profil);
      }
    });

    if (self.state.type_sort) {
      rgProfils.sort(function(a, b) {
        if (
          a.props.profilData[self.state.champtri] &&
          b.props.profilData[self.state.champtri]
        ) {
          return a.props.profilData[self.state.champtri]
            .toString()
            .localeCompare(b.props.profilData[self.state.champtri])
            .toString();
        }
      });
    } else {
      rgProfils.sort(function(a, b) {
        if (
          a.props.profilData[self.state.champtri] &&
          b.props.profilData[self.state.champtri]
        ) {
          return a.props.profilData[self.state.champtri]
            .toString()
            .localeCompare(b.props.profilData[self.state.champtri])
            .toString();
        }
      });
      rgProfils.reverse();
    }
    // once the big list is sorted, we extract "just added profils" from the list
    // and we add it at the first position (top of the list)
    Object.keys(profilsadd).forEach(function(key) {
      rgProfils.unshift(rgProfils.splice(profilsadd[key], 1)[0]);
    });

    compteurProfil = Object.keys(self.props.profilsModel.profils).length;
    return (
      <div id="profils">
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-default">
              <div
                className="panel-heading row"
                style={{ marginRight: "0px", marginLeft: "0px" }}
              >
                <div className="col-md-6  text center">Profils de poste</div>
                <div className="col-md-6 text center">
                  {(() => {
                    if (
                      Object.keys(self.props.profilsModel.profilCSV).length !==
                      0
                    ) {
                      let date =
                        new Date().getFullYear() +
                        "-" +
                        ("0" + (new Date().getMonth() + 1)).slice(-2) +
                        "-" +
                        ("0" + new Date().getDate()).slice(-2);
                      return (
                        <CSVLink
                          data={self.props.profilsModel.profilCSV}
                          style={{ backgroundColor: "#8dc63f", float: "right" }}
                          title="Cliquez pour télecharger le réferentiel des profils en csv"
                          separator={";"}
                          filename={
                            "Référentiel des profils de poste - GPEC - " +
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
                      {compteurProfil}
                    </strong>{" "}
                    profils de poste enregistrés dans le référentiel.{" "}
                  </em>
                </div>
              </div>
              <div className="panel-body">
                <p>
                  Depuis cet onglet il est possible d'ajouter et de supprimer
                  des profils de poste. Ces mêmes profils seront ensuite
                  disponibles dans l'onglet{" "}
                  <a
                    data-toggle="tab"
                    href="#profils-skills"
                    onClick={this.handleNavigateTab}
                  >
                    Profils &amp; Compétences
                  </a>{" "}
                  pour pouvoir leur associer des{" "}
                  <a
                    data-toggle="tab"
                    href="#skills"
                    onClick={this.handleNavigateTab}
                  >
                    compétences{" "}
                  </a>
                  <a
                    data-toggle="tab"
                    href="#levels"
                    onClick={this.handleNavigateTab}
                  >
                    modulées
                  </a>.
                </p>
              </div>
            </div>

            <table
              id="profils-list"
              className="table table-striped table-bordered"
            >
              <thead>
                <tr>
                  <th className="profils-col-action" />
                  <th className="profils-col-file">PDF du profil</th>
                  <th
                    title="Cliquez pour trier par tag"
                    role="button"
                    id="profil_tag"
                    onClick={this.Sort}
                    className="profils-col-tag"
                  >
                    {" "}
                    Tag <i className="fa fa-sort" aria-hidden="true" />
                  </th>
                  <th
                    title="Cliquez pour trier par Nom court"
                    role="button"
                    id="profil_shortname"
                    onClick={this.Sort}
                    className="profils-col-title"
                  >
                    Intitulé du profil{" "}
                    <i className="fa fa-sort" aria-hidden="true" />
                  </th>
                  <th className="profils-col-stats">
                    Nombre de compétences associées
                  </th>
                  <th
                    title="Cliquez pour trier par Commentaire"
                    role="button"
                    id="profil_free_comments"
                    onClick={this.Sort}
                    className="profils-col-commentary"
                  >
                    Commentaires libres{" "}
                    <i className="fa fa-sort" aria-hidden="true" />
                  </th>
                </tr>
              </thead>
              <tbody>
                <RefGpecResearchProfil
                  profilsModel={this.props.profilsModel}
                  tagList={rgTagList}
                  onChange={this.filterList}
                />
                <tr>
                  <td colSpan="6" style={{ height: "25px" }} />
                </tr>
                {/* FORM USED TO CREATE A NEW PROFIL */}
                <RefGpecNewProfil
                  profilsModel={this.props.profilsModel}
                  onSubmit={self.handleSubmit}
                />

                {rgProfils}
              </tbody>
            </table>

            <div
              className="progress"
              style={{
                display: self.props.profilsModel.ajaxLoading ? "block" : "none"
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

  handleSave: function(profilId, profilState) {
    let self = this;
    this.props.profilsModel.save(profilId, profilState, function() {
      if (!self.props.profilsModel.feedback.code) {
        self.props.profilsModel.updateVue();
        self.props.profilsSkillsModel.updateVue();
        NotificationManager.success(
          "",
          "Le Profil " + profilId + " a été modifié"
        );
      } else {
        NotificationManager.error(
          "[" +
            self.props.profilsModel.feedback.code +
            "] " +
            self.props.profilsModel.feedback.message,
          "Une erreur a été rencontrée lors de la modification : ",
          0
        );
      }
    });
  },

  handleNavigateTab: function(event) {
    window.scrollTo(0, 0);
    this.props.onTabChange(event.target.getAttribute("href"));
  },

  handleKeyPress: function(event) {
    if (event.charCode === 13) {
      this.handleSubmit(event);
    }
  },

  handleChange: function(event) {
    let newState = {};
    newState[event.target.getAttribute("data-fieldname")] = event.target.value;
    this.setState(newState);
  },

  handleSubmit: function(
    newProfilTag,
    newProfilShortName,
    newProfilFreeComments,
    newProfilPdfPath
  ) {
    const self = this;
    if (self.props.profilsModel.ajaxLoading) return;

    self.props.profilsModel.addProfil(
      newProfilTag,
      newProfilShortName,
      newProfilFreeComments,
      newProfilPdfPath,
      function() {
        if (!self.props.profilsModel.feedback.code) {
          self.props.profilsModel.updateVue();
          self.props.profilsSkillsModel.updateVue();
          NotificationManager.success(
            "",
            "le profil " + newProfilShortName + " a été ajouté"
          );
        } else {
          NotificationManager.error(
            "[" +
              self.props.profilsModel.feedback.code +
              "] " +
              self.props.profilsModel.feedback.message,
            "Une erreur a été rencontrée lors de l'ajout : ",
            0
          );
        }
      }
    );
  },

  handleDestroy: function(profilId) {
    let self = this;
    this.props.profilsModel.destroy(profilId, function() {
      if (!self.props.profilsModel.feedback.code) {
        self.props.profilsSkillsModel.updateVue();
        self.props.profilsModel.inform();
        NotificationManager.success(
          "",
          "le profil " + profilId + " a été supprimé"
        );
      } else {
        NotificationManager.error(
          "[" +
            self.props.profilsModel.feedback.code +
            "] " +
            self.props.profilsModel.feedback.message,
          "Une erreur a été rencontrée lors de la suppression : ",
          0
        );
      }
    });
  },

  missingField() {
    return !this.state.newProfilShortName || !this.state.newProfilTag;
  }
});
export default RefGpecProfils;
