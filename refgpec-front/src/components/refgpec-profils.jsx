import React from "react";
import RefGpecProfil from "./refgpec-profil.jsx";
import RefGpecResearchProfil from "./refgpec-research-profil.jsx";
import RefGpecNewProfil from "./refgpec-new-profil.jsx";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
var createReactClass = require("create-react-class");
var RefGpecProfils = createReactClass({
  displayName: "RefGpecProfils",

  getInitialState: function() {
    return {
      showModal: false,
      newProfilTag: "",
      newProfilShortName: "",
      newProfilFreeComments: "",
      newProfilPdfPath: "",
      error: "",
      champtri: "profil_code",
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
    var self = this;

    // model is not ready ? then do not render anything
    if (self.props.profilsModel.initializing) {
      return null;
    }
    let rgTagList = this.props.profilsModel.listTag;
    let rgProfils = [];
    Object.keys(self.props.profilsModel.profils).forEach(function(key) {
      let tag = "";
      if (self.props.profilsModel.profils[key].profil_tag) {
        tag = self.props.profilsModel.profils[key].profil_tag;
      }
      if (
        self.props.profilsModel.profils[key].profil_shortname
          .toLowerCase()
          .search(self.state.filter.SearchProfilShortName.toLowerCase()) !==
          -1 &&
        tag.search(self.state.filter.SearchProfilTag) !== -1
      ) {
        rgProfils.push(
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
    });

    if (self.state.type_sort) {
      rgProfils.sort(function(a, b) {
        return a.props.profilData[self.state.champtri] >
          b.props.profilData[self.state.champtri]
          ? 1
          : b.props.profilData[self.state.champtri] >
            a.props.profilData[self.state.champtri]
            ? -1
            : 0;
      });
    } else {
      rgProfils.sort(function(a, b) {
        return a.props.profilData[self.state.champtri] <
          b.props.profilData[self.state.champtri]
          ? 1
          : b.props.profilData[self.state.champtri] <
            a.props.profilData[self.state.champtri]
            ? -1
            : 0;
      });
    }
    return (
      <div id="profils">
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-default">
              <div className="panel-heading">Profils de poste</div>
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
              <tbody>
                <RefGpecResearchProfil
                  profilsModel={this.props.profilsModel}
                  tagList={rgTagList}
                  onChange={this.filterList}
                />
              </tbody>
            </table>
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
                {/* FORM USED TO CREATE A NEW PROFIL */}
                <RefGpecNewProfil
                  profilsModel={this.props.profilsModel}
                  onSubmit={self.handleSubmit}
                />

                <tr>
                  <td colSpan="6" style={{ height: "25px" }} />
                </tr>
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
      if (!self.props.profilsModel.feedback) {
        self.props.profilsModel.updateVue();
        self.props.profilsSkillsModel.updateVue();
        NotificationManager.success(
          "",
          "Le Profil " + profilId + " a été modifié"
        );
      } else {
        NotificationManager.error("", self.props.profilsModel.feedback);
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
    var newState = {};
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
        if (!self.props.profilsModel.feedback) {
          self.props.profilsModel.updateVue();
          self.props.profilsSkillsModel.updateVue();
          NotificationManager.success(
            "",
            "le profil " + newProfilShortName + " a été ajouté"
          );
        } else {
          NotificationManager.error("", self.props.profilsModel.feedback);
        }
      }
    );
  },

  handleDestroy: function(profilId) {
    let self = this;
    this.props.profilsModel.destroy(profilId, function() {
      if (!self.props.profilsModel.feedback) {
        self.props.profilsSkillsModel.updateVue();
        self.props.profilsModel.inform();
        NotificationManager.success(
          "",
          "le profil " + profilId + " a été supprimé"
        );
      } else {
        NotificationManager.error("", self.props.profilsModel.feedback);
      }
    });
  },

  missingField() {
    return !this.state.newProfilShortName || !this.state.newProfilTag;
  }
});
export default RefGpecProfils;
