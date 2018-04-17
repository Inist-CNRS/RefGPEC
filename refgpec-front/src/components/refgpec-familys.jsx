import React from "react";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import { OverlayTrigger, Popover } from "react-bootstrap";
import RefGpecFamily from "./refgpec-family.jsx";
let createReactClass = require("create-react-class");
let RefGpecFamilys = createReactClass({
  displayName: "RefGpecFamilys",

  getInitialState: function() {
    return {
      newId: "",
      newShortName: "",
      newFreeComment: "",
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
    let self = this;

    // model is not ready ? then do not render anything
    if (self.props.familysModel.initializing) {
      return null;
    }

    let rgFamilles = [];
    let famillesadd = [];
    Object.keys(self.props.familysModel.family).forEach(function(key, i) {
      let liste_skill = self.props.familysModel.getListSkills(key);
      let famille;
      // get list of just added profils to be able to put it in top of the long list
      // so that the user can see the profil he just added
      if (
        self.props.familysModel.lastFamilleAdd.indexOf(
          self.props.familysModel.family[key].family_id
        ) !== -1
      ) {
        famillesadd.push(i);
        famille = (
          <RefGpecFamily
            key={key}
            familleId={key}
            familleData={self.props.familysModel.family[key]}
            liste_skill={liste_skill}
            onSave={self.handleSave}
            onDestroy={self.handleDestroy}
            onSkill={self.handleOpenFamilySkills}
            ajaxLoading={self.props.familysModel.ajaxLoading}
            Color={
              "rgb(0,255," +
              (255 -
                Math.floor(
                  255 /
                    Object.keys(self.props.familysModel.family).length *
                    (self.props.familysModel.family[key].family_id - 1)
                )) +
              ")"
            }
            style={{ backgroundColor: "#e67300" }}
          />
        );
      } else {
        famille = (
          <RefGpecFamily
            key={key}
            familleId={key}
            familleData={self.props.familysModel.family[key]}
            onSave={self.handleSave}
            liste_skill={liste_skill}
            onDestroy={self.handleDestroy}
            onSkill={self.handleOpenFamilySkills}
            ajaxLoading={self.props.familysModel.ajaxLoading}
            Color={
              "rgb(0,255," +
              (255 -
                Math.floor(
                  255 /
                    Object.keys(self.props.familysModel.family).length *
                    (self.props.familysModel.family[key].family_id - 1)
                )) +
              ")"
            }
          />
        );
      }
      rgFamilles.push(famille);
    });
    if (self.state.type_sort) {
      rgFamilles.sort(function(a, b) {
        if (
          a.props.familleData[self.state.champtri] &&
          b.props.familleData[self.state.champtri]
        ) {
          return a.props.familleData[self.state.champtri]
            .toString()
            .localeCompare(b.props.familleData[self.state.champtri])
            .toString();
        }
      });
    } else {
      rgFamilles.sort(function(a, b) {
        if (
          a.props.familleData[self.state.champtri] &&
          b.props.familleData[self.state.champtri]
        ) {
          return a.props.familleData[self.state.champtri]
            .toString()
            .localeCompare(b.props.familleData[self.state.champtri])
            .toString();
        }
      });
      rgFamilles.reverse();
    }

    Object.keys(famillesadd).forEach(function(key) {
      rgFamilles.unshift(rgFamilles.splice(famillesadd[key], 1)[0]);
    });
    let compteurFamille = 0;
    compteurFamille = Object.keys(self.props.familysModel.family).length;
    return (
      // Familles DES COMPETENCES
      <div id="familys">
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-default">
              <div
                className="panel-heading row"
                style={{ marginRight: "0px", marginLeft: "0px" }}
              >
                <div className="col-md-6  text center">
                  Familles des compétences
                </div>
                <div className="col-md-6 text center">
                  <em
                    style={{
                      float: "right",
                      marginRight: "15px"
                    }}
                  >
                    Actuellement,{" "}
                    <strong style={{ color: "red" }}>
                      {compteurFamille}
                    </strong>{" "}
                    Famille de compétences enregistrées dans le référentiel.{" "}
                  </em>
                </div>
              </div>
              <div className="panel-body">
                <p>
                  Depuis cet onglet il est possible d'administrer les
                  différentes familles de compétences que l'on pourra ensuite{" "}
                  <a
                    onClick={this.handleNavigateTab}
                    data-toggle="tab"
                    className="nav-link"
                    href="#family-skills"
                  >
                    associer à chaque compétence
                  </a>.
                </p>
              </div>
            </div>

            <table
              id="family-list"
              className="table table-striped table-bordered"
            >
              <thead>
                <tr>
                  <th className="family-col-action" />
                  <th
                    title="Cliquez pour trier par ID"
                    role="button"
                    id="family_id"
                    onClick={this.Sort}
                    className="family-col-id"
                  >
                    ID <i className="fa fa-sort" aria-hidden="true" />{" "}
                  </th>
                  <th
                    title="Cliquez pour trier par Nom court"
                    role="button"
                    id="family_name"
                    onClick={this.Sort}
                    className="family-col-shortname"
                  >
                    Nom Court <i
                      className="fa fa-sort"
                      aria-hidden="true"
                    />{" "}
                  </th>

                  <th
                    title="Cliquez pour trier par Commentaires"
                    role="button"
                    id="family_free_comments"
                    onClick={this.Sort}
                    className="family-col-commentary"
                  >
                    Commentaires <i
                      className="fa fa-sort"
                      aria-hidden="true"
                    />{" "}
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* FORM USED TO CREATE A NEW Family */}
                <tr className="form-new-family">
                  <td style={{ textAlign: "center" }}>
                    <OverlayTrigger
                      show={null}
                      trigger="focus"
                      data-title="Erreur nouvelle famille"
                      placement="top"
                      overlay={
                        <Popover id="popover-positioned-top">
                          {this.state.error}
                        </Popover>
                      }
                    >
                      <a
                        href=""
                        className="fa fa-plus-square fa-2x"
                        role="button"
                        onClick={this.handleSubmit}
                        title="Ajouter cette famille au référentiel"
                      />
                    </OverlayTrigger>
                  </td>
                  <td>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="ID de la famille unique"
                      data-fieldname="newId"
                      value={this.state.newId}
                      onChange={this.handleChange}
                      onKeyPress={this.handleKeyPress}
                      disabled={this.props.familysModel.ajaxLoading}
                    />
                  </td>
                  <td>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Nom court de la famille"
                      data-fieldname="newShortName"
                      value={this.state.newShortName}
                      onChange={this.handleChange}
                      onKeyPress={this.handleKeyPress}
                      disabled={this.props.familysModel.ajaxLoading}
                    />
                  </td>

                  <td>
                    <textarea
                      className="form-control"
                      rows="1"
                      placeholder="Commentaires libres"
                      data-fieldname="newFreeComment"
                      value={this.state.newFreeComment}
                      onChange={this.handleChange}
                      disabled={this.props.familysModel.ajaxLoading}
                    />
                  </td>
                </tr>
                {rgFamilles}
              </tbody>
            </table>

            <div
              className="progress"
              style={{
                display: self.props.familysModel.ajaxLoading ? "block" : "none"
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

  handleChange: function(event) {
    let newState = {};
    newState[event.target.getAttribute("data-fieldname")] = event.target.value;
    this.setState(newState);
  },

  handleSubmit: function(event) {
    if (this.props.familysModel.ajaxLoading) return;
    let self = this;
    if (this.state.newId && this.state.newShortName) {
      if (!self.props.familysModel.family[this.state.newId.toUpperCase()]) {
        this.props.familysModel.addFamily(
          this.state.newId,
          this.state.newShortName,
          this.state.newFreeComment,
          function() {
            if (!self.props.familysModel.feedback.code) {
              NotificationManager.success(
                "",
                "La famille " + self.state.newShortName + " a été ajoutée"
              );
              self.setState({
                newId: "",
                newShortName: "",
                newFreeComment: ""
              });
            } else {
              NotificationManager.error(
                "[" +
                  self.props.familysModel.feedback.code +
                  "] " +
                  self.props.familysModel.feedback.message,
                "Une erreur a été rencontrée lors de l'ajout : ",
                0
              );
            }
          }
        );
      } else {
        self.setState({
          error: "L'ID est déja existant "
        });
      }
    } else {
      let missingFields = [];
      if (!self.state.newId) missingFields.push("Identifiant");
      if (!self.state.newShortName) missingFields.push("Nom");
      self.setState({
        error:
          "Il manque des champs avant de pouvoir ajouter la compétence :\n" +
          missingFields.join(", ")
      });
    }

    event.preventDefault(); // Let's stop this event.
    event.stopPropagation(); // Really this time.
  },

  handleNavigateTab: function(event) {
    window.scrollTo(0, 0);
    this.props.onTabChange(event.target.getAttribute("href"));
  },

  handleDestroy: function(familyId) {
    let self = this;
    self.props.familysModel.destroy(familyId, function() {
      if (!self.props.familysModel.feedback.code) {
        NotificationManager.success(
          "",
          "La famille " + familyId + " a été supprimée"
        );
        self.props.familysModel.inform();
      } else {
        NotificationManager.error(
          "[" +
            self.props.familysModel.feedback.code +
            "] " +
            self.props.familysModel.feedback.message,
          "Une erreur a été rencontrée lors de la suppression : ",
          0
        );
      }
    });
  },

  handleSave: function(familyId, familyState) {
    let self = this;
    this.props.familysModel.save(familyId, familyState, function() {
      if (!self.props.familysModel.feedback.code) {
        NotificationManager.success(
          "",
          "La famille " + familyId + " a été modifiée"
        );
      } else {
        NotificationManager.error(
          "[" +
            self.props.familysModel.feedback.code +
            "] " +
            self.props.familysModel.feedback.message,
          "Une erreur a été rencontrée lors de la modification : ",
          0
        );
      }
    });
  },

  handleOpenFamilySkills: function(event) {
    this.props.familysSkillsModel.getFamilySkillLevel(event.target.id);
  },

  componentDidMount() {}
});

export default RefGpecFamilys;
