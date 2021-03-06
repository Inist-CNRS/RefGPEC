import React from "react";
import RefGpecLevel from "./refgpec-level.jsx";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
let createReactClass = require("create-react-class");
let RefGpecLevels = createReactClass({
  displayName: "RefGpecLevels",

  getInitialState: function() {
    return {
      newShortName: "",
      newFreeComment: "",
      newNumber: "0",
      champtri: "level_code",
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

    // model is not ready ? then do not render anything
    if (self.props.levelsModel.initializing) {
      return null;
    }

    let rgLevels = [];
    let levelsadd = [];
    Object.keys(self.props.levelsModel.levels).forEach(function(key, i) {
      let nb_skill = {};
      let liste_profil = self.props.levelsModel.getListProfils(key);
      Object.keys(liste_profil).forEach(function(profil) {
        nb_skill[
          liste_profil[profil].profil_code
        ] = self.props.levelsModel.getnbSkill(
          key,
          liste_profil[profil].profil_code
        );
      });
      let level;
      // get list of just added profils to be able to put it in top of the long list
      // so that the user can see the profil he just added
      if (
        self.props.levelsModel.lastLevelAdd.indexOf(
          self.props.levelsModel.levels[key].level_code
        ) !== -1
      ) {
        levelsadd.push(i);
        level = (
          <RefGpecLevel
            key={key}
            levelId={key}
            levelData={self.props.levelsModel.levels[key]}
            profilList={liste_profil}
            nbSkill={nb_skill}
            max={self.props.levelsModel.max}
            onSave={self.handleSave}
            onDestroy={self.handleDestroy}
            onProfil={self.handleOpenProfilSkills}
            ajaxLoading={self.props.levelsModel.ajaxLoading}
            Color={
              "rgb(0,255," +
              (255 -
                Math.floor(
                  255 /
                    Object.keys(self.props.levelsModel.levels).length *
                    (self.props.levelsModel.levels[key].level_number - 1)
                )) +
              ")"
            }
            style={{ backgroundColor: "#e67300" }}
          />
        );
      } else {
        level = (
          <RefGpecLevel
            key={key}
            levelId={key}
            levelData={self.props.levelsModel.levels[key]}
            profilList={liste_profil}
            nbSkill={nb_skill}
            max={self.props.levelsModel.max}
            onSave={self.handleSave}
            onDestroy={self.handleDestroy}
            onProfil={self.handleOpenProfilSkills}
            ajaxLoading={self.props.levelsModel.ajaxLoading}
            Color={
              "rgb(0,255," +
              (255 -
                Math.floor(
                  255 /
                    Object.keys(self.props.levelsModel.levels).length *
                    (self.props.levelsModel.levels[key].level_number - 1)
                )) +
              ")"
            }
          />
        );
      }
      rgLevels.push(level);
    });
    if (self.state.type_sort) {
      rgLevels.sort(function(a, b) {
        if (
          a.props.levelData[self.state.champtri] &&
          b.props.levelData[self.state.champtri]
        ) {
          return a.props.levelData[self.state.champtri]
            .toString()
            .localeCompare(b.props.levelData[self.state.champtri])
            .toString();
        }
      });
    } else {
      rgLevels.sort(function(a, b) {
        if (
          a.props.levelData[self.state.champtri] &&
          b.props.levelData[self.state.champtri]
        ) {
          return a.props.levelData[self.state.champtri]
            .toString()
            .localeCompare(b.props.levelData[self.state.champtri])
            .toString();
        }
      });
      rgLevels.reverse();
    }

    Object.keys(levelsadd).forEach(function(key) {
      rgLevels.unshift(rgLevels.splice(levelsadd[key], 1)[0]);
    });
    return (
      // MODULATIONS DES COMPETENCES
      <div id="levels">
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-default">
              <div className="panel-heading">Modulations des compétences</div>
              <div className="panel-body">
                <p>
                  Depuis cet onglet il est possible d'administrer les
                  différentes modulations que l'on pourra ensuite{" "}
                  <a
                    onClick={this.handleNavigateTab}
                    data-toggle="tab"
                    className="nav-link"
                    href="#profils-skills"
                  >
                    associer à chaque compétence
                  </a>.
                </p>
              </div>
            </div>

            <table
              id="levels-list"
              className="table table-striped table-bordered"
            >
              <thead>
                <tr>
                  <th className="levels-col-action" />
                  <th
                    title="Cliquez pour trier par Nom court"
                    role="button"
                    id="level_shortname"
                    onClick={this.Sort}
                    className="levels-col-shortname"
                  >
                    Nom Court <i
                      className="fa fa-sort"
                      aria-hidden="true"
                    />{" "}
                  </th>

                  <th
                    title="Cliquez pour trier par Commentaires"
                    role="button"
                    id="level_free_comments"
                    onClick={this.Sort}
                    className="levels-col-commentary"
                  >
                    Commentaires <i
                      className="fa fa-sort"
                      aria-hidden="true"
                    />{" "}
                  </th>
                  <th
                    title="Cliquez pour trier par Niveau"
                    role="button"
                    id="level_number"
                    onClick={this.Sort}
                    className="levels-col-number"
                  >
                    {" "}
                    Modulation <i
                      className="fa fa-sort"
                      aria-hidden="true"
                    />{" "}
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* FORM USED TO CREATE A NEW LEVEL */}
                <tr className="form-new-level">
                  <td>
                    <a
                      href=""
                      className="fa fa-plus-square fa-2x"
                      role="button"
                      onClick={this.handleSubmit}
                      disabled={self.props.levelsModel.ajaxLoading}
                      title="Ajouter cette modulation"
                    />
                  </td>

                  <td>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Nom court de la modulation"
                      data-fieldname="newShortName"
                      value={this.state.newShortName}
                      onChange={this.handleChange}
                      onKeyPress={this.handleKeyPress}
                      disabled={self.props.levelsModel.ajaxLoading}
                    />
                  </td>

                  <td>
                    <textarea
                      className="form-control"
                      rows="2"
                      placeholder="Expliquez en quelque mots la signification de cette modulation de compétence"
                      data-fieldname="newFreeComment"
                      value={this.state.newFreeComment}
                      onChange={this.handleChange}
                      disabled={self.props.levelsModel.ajaxLoading}
                    />
                  </td>
                  <td>
                    <input
                      className="form-control"
                      type="number"
                      min="1"
                      max={this.props.levelsModel.max + 1}
                      placeholder="Niveau de la modulation"
                      data-fieldname="newNumber"
                      value={this.state.newNumber}
                      onChange={this.handleChange}
                      disabled={this.props.levelsModel.ajaxLoading}
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan="6" style={{ height: "25px" }} />
                </tr>

                {rgLevels}
              </tbody>
            </table>

            <div
              className="progress"
              style={{
                display: self.props.levelsModel.ajaxLoading ? "block" : "none"
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
      </div> // MODULATIONS DES COMPETENCES
    );
  },

  handleChange: function(event) {
    let newState = {};
    if (event.target.getAttribute("data-fieldname") === "newNumber") {
      newState[event.target.getAttribute("data-fieldname")] =
        event.target.value;

      if (parseInt(event.target.value, 10) > this.props.levelsModel.max + 2) {
        newState[event.target.getAttribute("data-fieldname")] =
          this.props.levelsModel.max + 1;
      }

      if (parseInt(event.target.value, 10) < 1) {
        newState[event.target.getAttribute("data-fieldname")] = 1;
      }
    } else {
      newState[event.target.getAttribute("data-fieldname")] =
        event.target.value;
    }
    this.setState(newState);
  },

  handleSubmit: function(event) {
    if (this.props.levelsModel.ajaxLoading) return;
    let self = this;
    if (this.state.newShortName && this.state.newNumber) {
      this.props.levelsModel.addLevel(
        this.state.newNumber,
        this.state.newShortName,
        this.state.newFreeComment,
        function() {
          self.setState({
            newNumber: "0",
            newShortName: "",
            newFreeComment: ""
          });
          if (!self.props.levelsModel.feedback.code) {
            NotificationManager.success(
              "",
              "La modulation " + self.state.newShortName + " a été ajoutée"
            );
          } else {
            NotificationManager.error(
              "[" +
                self.props.levelsModel.feedback.code +
                "] " +
                self.props.levelsModel.feedback.message,
              "Une erreur a été rencontrée lors de l'ajout : ",
              0
            );
          }
        }
      );
    }

    event.preventDefault(); // Let's stop this event.
    event.stopPropagation(); // Really this time.
  },

  handleNavigateTab: function(event) {
    window.scrollTo(0, 0);
    this.props.onTabChange(event.target.getAttribute("href"));
  },

  handleDestroy: function(levelId) {
    let self = this;
    self.props.levelsModel.destroy(levelId, function() {
      if (!self.props.levelsModel.feedback.code) {
        NotificationManager.success(
          "",
          "La modulation " + levelId + " a été supprimée"
        );
        self.props.profilsSkillsModel.updateVue();
        self.props.levelsModel.inform();
      } else {
        NotificationManager.error(
          "[" +
            self.props.levelsModel.feedback.code +
            "] " +
            self.props.levelsModel.feedback.message,
          "Une erreur a été rencontrée lors de la suppression : ",
          0
        );
      }
    });
  },

  handleSave: function(levelId, levelState) {
    let self = this;
    this.props.levelsModel.save(levelId, levelState, function() {
      if (!self.props.levelsModel.feedback.code) {
        self.props.profilsSkillsModel.updateVue();
        NotificationManager.success(
          "",
          "La modulation " + levelId + " a été modifiée"
        );
      } else {
        NotificationManager.error(
          "[" +
            self.props.levelsModel.feedback.code +
            "] " +
            self.props.levelsModel.feedback.message,
          "Une erreur a été rencontrée lors de la modification : ",
          0
        );
      }
    });
  },

  componentDidMount() {},
  handleOpenProfilSkills: function(event) {
    this.props.profilsSkillsModel.getProfilSkillLevel(event.target.id);
  }
});
export default RefGpecLevels;
