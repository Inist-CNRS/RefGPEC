import React from "react";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import { OverlayTrigger, Popover } from "react-bootstrap";
import RefGpecDomain from "./refgpec-domain.jsx";
let createReactClass = require("create-react-class");
let RefGpecDomains = createReactClass({
  displayName: "RefGpecDomains",

  getInitialState: function() {
    return {
      newCode: "",
      newShortName: "",
      champtri: "sd_code",
      type_sort: true,
      error: ""
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
    if (self.props.skillsDomainsModel.initializing) {
      return null;
    }

    let rgDomain = [];

    Object.keys(self.props.skillsDomainsModel.sd).forEach(function(key) {
      let liste_skill = self.props.skillsDomainsModel.getListSkills(key);

      rgDomain.push(
        <RefGpecDomain
          key={key}
          DomainId={key}
          DomainData={self.props.skillsDomainsModel.sd[key]}
          skillList={liste_skill}
          onSave={self.handleSave}
          onDestroy={self.handleDestroy}
          ajaxLoading={self.props.skillsDomainsModel.ajaxLoading}
        />
      );
    });

    if (self.state.type_sort) {
      rgDomain.sort(function(a, b) {
        return a.props.DomainData[self.state.champtri] >
          b.props.DomainData[self.state.champtri]
          ? 1
          : b.props.DomainData[self.state.champtri] >
            a.props.DomainData[self.state.champtri]
            ? -1
            : 0;
      });
    } else {
      rgDomain.sort(function(a, b) {
        return a.props.DomainData[self.state.champtri] <
          b.props.DomainData[self.state.champtri]
          ? 1
          : b.props.DomainData[self.state.champtri] <
            a.props.DomainData[self.state.champtri]
            ? -1
            : 0;
      });
    }
    return (
      // MODULATIONS DES DOMAINES
      <div id="domains">
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-default">
              <div className="panel-heading">
                Gestion des Domaines de compétences
              </div>
              <div className="panel-body">
                <p>
                  Depuis cet onglet il est possible d'administrer les différents
                  domaines que l'on pourra ensuite{" "}
                  <a
                    onClick={this.handleNavigateTab}
                    data-toggle="tab"
                    className="nav-link"
                    href="#skills"
                  >
                    atribuer à chaque compétence
                  </a>.
                </p>
              </div>
            </div>
            <table
              id="domains-list"
              className="table table-striped table-bordered"
            >
              <thead>
                <tr>
                  <th className="domains-col-action" />
                  <th
                    title="Cliquez pour trier par Nom"
                    role="button"
                    id="sd_shortname"
                    onClick={this.Sort}
                    className="domains-col-shortname"
                  >
                    Nom du domaine{" "}
                    <i className="fa fa-sort" aria-hidden="true" />
                  </th>
                  <th
                    title="Cliquez pour trier par code"
                    role="button"
                    id="sd_code"
                    onClick={this.Sort}
                    className="domains-col-code"
                  >
                    Code <i className="fa fa-sort" aria-hidden="true" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* FORM USED TO CREATE A NEW SKILL */}

                {/* FORM USED TO CREATE A NEW LEVEL */}
                <tr className="form-new-level">
                  <td>
                    <OverlayTrigger
                      trigger="focus"
                      data-title="Erreur nouveau domaine"
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
                        disabled={self.props.skillsDomainsModel.ajaxLoading}
                        title="Ajouter ce domaine"
                      />
                    </OverlayTrigger>
                  </td>
                  <td>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Nom court du domaine"
                      data-fieldname="newShortName"
                      value={this.state.newShortName}
                      onChange={this.handleChange}
                      disabled={self.props.skillsDomainsModel.ajaxLoading}
                    />
                  </td>
                  <td>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Code du domaine"
                      data-fieldname="newCode"
                      value={this.state.newCode}
                      onChange={this.handleChange}
                      disabled={self.props.skillsDomainsModel.ajaxLoading}
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan="6" style={{ height: "25px" }} />
                </tr>

                {rgDomain}
              </tbody>
            </table>
            <div
              className="progress"
              style={{
                display: self.props.skillsDomainsModel.ajaxLoading
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
    if (this.props.skillsDomainsModel.ajaxLoading) return;
    let self = this;
    if (this.state.newShortName && this.state.newCode) {
      if (!this.props.skillsDomainsModel.sd[this.state.newCode.toLowerCase()]) {
        this.props.skillsDomainsModel.addDomains(
          this.state.newCode,
          this.state.newShortName,
          function() {
            self.setState({
              newCode: "",
              newShortName: "",
              error: ""
            });
            if (!self.props.skillsDomainsModel.feedback.code) {
              NotificationManager.success(
                "",
                "Le domaine " + self.state.newShortName + " a été ajoutée"
              );
            } else {
              NotificationManager.error(
                "[" +
                  self.props.skillsDomainsModel.feedback.code +
                  "] " +
                  self.props.skillsDomainsModel.feedback.message,
                "Une erreur a été rencontrée lors de l'ajout : ",
                0
              );
            }
          }
        );
      } else {
        self.setState({
          error: "le code du domaine est déja existant "
        });
      }
    } else {
      self.setState({
        error: "Veuillez renseigner un code et un nom de domaine"
      });
    }

    event.preventDefault(); // Let's stop this event.
    event.stopPropagation(); // Really this time.
  },

  handleNavigateTab: function(event) {
    window.scrollTo(0, 0);
    this.props.onTabChange(event.target.getAttribute("href"));
  },

  handleDestroy: function(levelId) {},

  handleSave: function(levelId, levelState) {},

  componentDidMount() {}
});
export default RefGpecDomains;
