import React from "react";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import RefGpecFamily from "./refgpec-family.jsx";
let createReactClass = require("create-react-class");
let RefGpecFamilys = createReactClass({
  displayName: "RefGpecFamilys",

  getInitialState: function() {
    return {
      newId: "",
      newShortName: "",
      newFreeComment: "",
      newNumber: "0",
      champtri: "family_id",
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
      let nb_skill = {};

      let famille;
      // get list of just added profils to be able to put it in top of the long list
      // so that the user can see the profil he just added
      if (
        self.props.familysModel.lastFamilleAdd.indexOf(
          self.props.familysModel.family[key].famille_id
        ) !== -1
      ) {
        famillesadd.push(i);
        famille = (
          <RefGpecFamily
            key={key}
            familleId={key}
            familleData={self.props.familysModel.family[key]}
            onSave={self.handleSave}
            onDestroy={self.handleDestroy}
            onProfil={self.handleOpenProfilSkills}
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
            onDestroy={self.handleDestroy}
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
        return a.props.familleData[self.state.champtri] >
          b.props.familleData[self.state.champtri]
          ? 1
          : b.props.familleData[self.state.champtri] >
            a.props.familleData[self.state.champtri]
            ? -1
            : 0;
      });
    } else {
      rgFamilles.sort(function(a, b) {
        return a.props.familleData[self.state.champtri] <
          b.props.familleData[self.state.champtri]
          ? 1
          : b.props.familleData[self.state.champtri] <
            a.props.familleData[self.state.champtri]
            ? -1
            : 0;
      });
      Object.keys(famillesadd).forEach(function(key) {
        rgFamilles.unshift(rgFamilles.splice(famillesadd[key], 1)[0]);
      });
    }
    return (
      // Familles DES COMPETENCES
      <div id="familys">
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-default">
              <div className="panel-heading">Familles des compétences</div>
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
                    id="family_shortname"
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
                  <td>
                    <a
                      className="fa fa-plus-square fa-2x"
                      role="button"
                      disabled={true}
                      title="Ajouter cette famille"
                    />
                  </td>
                  <td>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="ID de la famille"
                      data-fieldname="newId"
                      value={this.state.newId}
                      onChange={this.handleChange}
                      onKeyPress={this.handleKeyPress}
                      disabled={true}
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
                      disabled={true}
                    />
                  </td>

                  <td>
                    <textarea
                      className="form-control"
                      rows="2"
                      placeholder="Expliquez en quelque mots la signification de cette famille de compétence"
                      data-fieldname="newFreeComment"
                      value={this.state.newFreeComment}
                      onChange={this.handleChange}
                      disabled={true}
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan="6" style={{ height: "25px" }} />
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

  handleChange: function(event) {},

  handleSubmit: function(event) {},

  handleNavigateTab: function(event) {
    window.scrollTo(0, 0);
    this.props.onTabChange(event.target.getAttribute("href"));
  },

  handleDestroy: function(levelId) {},

  handleSave: function(levelId, levelState) {},

  componentDidMount() {}
});
export default RefGpecFamilys;
