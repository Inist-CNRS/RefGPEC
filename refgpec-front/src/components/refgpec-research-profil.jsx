import React from "react";
import RefGpecFamilys from "./refgpec-list-familys";
import "react-select/dist/react-select.css";
const WAIT_INTERVAL = 500;
const ENTER_KEY = 13;
var createReactClass = require("create-react-class");
var RefGpecResearchProfil = createReactClass({
  displayName: "RefGpecResearchProfil",

  getInitialState: function() {
    return {
      SearchProfilShortName: "",
      SearchProfilFamily: ""
    };
  },

  render: function() {
    var self = this;
    // model is not ready ? then do not render anything
    if (
      self.props.profilsModel.initializing ||
      self.props.familysModel.initializing
    ) {
      return null;
    }

    return (
      <tr className="form-research-profil">
        <td style={{ width: "93px", textAlign: "center" }}>
          <i
            className="fa fa-search fa-3"
            style={{ fontSize: "2em" }}
            disabled={true}
            title="Rechercher un profil"
          />
        </td>
        <td colSpan="2">
          <RefGpecFamilys
            skillData={this.props.familysModel}
            ajaxLoading={self.props.profilsModel.ajaxLoading}
            data-fieldname="SearchProfilFamily"
            placeholder="Famille à rechercher"
            onChange={this.handleFamilyChange}
            multi={true}
          />
        </td>

        <td colSpan="4" width="300px">
          <div className="input-group">
            <span
              style={{ cursor: "pointer" }}
              onClick={this.resetSearch}
              className="input-group-addon"
            >
              <i className="fa fa-times fa-fw" />
            </span>
            <input
              className="form-control"
              type="text"
              placeholder="Nom du profil à rechercher"
              value={this.state.SearchProfilShortName}
              data-fieldname="SearchProfilShortName"
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
              disabled={this.props.profilsModel.ajaxLoading}
            />
          </div>
        </td>
      </tr>
    );
  },

  handleChange: function(event) {
    clearTimeout(this.timer);
    this.setState({ SearchProfilShortName: event.target.value });
    this.timer = setTimeout(this.triggerChange, WAIT_INTERVAL);
  },

  handleKeyDown(e) {
    if (e.keyCode === ENTER_KEY) {
      this.triggerChange();
    }
  },

  handleFamilyChange: function(event) {
    this.setState({ SearchProfilFamily: event });
    this.timer = setTimeout(this.triggerChange, WAIT_INTERVAL);
  },

  triggerChange() {
    this.props.onChange(this.state);
  },
  resetSearch() {
    this.setState({ SearchProfilShortName: "" });
    this.timer = setTimeout(this.triggerChange, WAIT_INTERVAL);
  },
  componentWillMount() {
    this.timer = null;
  }
});
export default RefGpecResearchProfil;
