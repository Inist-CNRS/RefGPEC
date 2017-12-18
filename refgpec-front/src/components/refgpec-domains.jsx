import React from "react";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import RefGpecDomain from "./refgpec-domain.jsx";
let createReactClass = require("create-react-class");
let RefGpecDomains = createReactClass({
  displayName: "RefGpecDomains",

  getInitialState: function() {
    return {
      champtri: "sd_code",
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
export default RefGpecDomains;
