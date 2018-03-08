import React from "react";
import RefGpecTypes from "./refgpec-types.jsx";
import RefGpecFamilys from "./refgpec-list-familys";
import { OverlayTrigger, Popover } from "react-bootstrap";

const WAIT_INTERVAL = 500;
const ENTER_KEY = 13;
let createReactClass = require("create-react-class");
let RefGpecResearchSkill = createReactClass({
  displayName: "RefGpecResearchSkill",

  getInitialState: function() {
    return {
      SearchSkillType: "",
      SearchFamily: "",
      SearchSkillShortName: ""
    };
  },

  render: function() {
    let self = this;

    // model is not ready ? then do not render anything
    if (
      self.props.skillsModel.initializing ||
      self.props.familyModel.initializing ||
      this.props.skillsTypesModel.initializing
    ) {
      return null;
    }

    return (
      <tr className="form-new-skill">
        <td style={{ textAlign: "center" }} className="skills-col-action">
          <OverlayTrigger
            trigger="focus"
            placement="top"
            overlay={
              <Popover id="popover-positioned-top">{this.state.error}</Popover>
            }
          >
            <i
              className="fa fa-search fa-3"
              style={{ fontSize: "2em" }}
              disabled={true}
              title="Rechercher dans le référentiel"
            />
          </OverlayTrigger>
        </td>
        <td className="skills-col-type">
          <RefGpecTypes
            skillData={self.props.skillsTypesModel}
            ajaxLoading={self.props.skillsTypesModel.ajaxLoading}
            data-fieldname="SearchSkillType"
            onChange={this.handleTypeChange}
            value={this.state.SearchSkillType}
          />
        </td>
        <td className="skills-col-domain">
          <RefGpecFamilys
            skillData={this.props.skillsModel}
            ajaxLoading={self.props.familyModel.ajaxLoading}
            data-fieldname="SearchFamily"
            onChange={this.handleFamilyChange}
            value={this.state.SearchFamily}
          />
        </td>
        <td colSpan="3" className="skills-col-shortname">
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
              placeholder="Nom de la compétence à rechercher"
              value={this.state.SearchSkillShortName}
              data-fieldname="SearchSkillShortName"
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
              disabled={this.props.skillsModel.ajaxLoading}
            />
          </div>
        </td>
      </tr>
    );
  },

  handleTypeChange: function(event) {
    this.setState({ SearchSkillType: event });
    this.timer = setTimeout(this.triggerChange, WAIT_INTERVAL);
  },
  handleFamilyChange: function(event) {
    this.setState({ SearchFamily: event });
    this.timer = setTimeout(this.triggerChange, WAIT_INTERVAL);
  },
  handleChange: function(event) {
    clearTimeout(this.timer);
    this.setState({ SearchSkillShortName: event.target.value });
    this.timer = setTimeout(this.triggerChange, WAIT_INTERVAL);
  },

  handleKeyDown(e) {
    if (e.keyCode === ENTER_KEY) {
      this.triggerChange();
    }
  },

  triggerChange() {
    this.props.onChange(this.state);
  },

  resetSearch() {
    this.setState({ SearchSkillShortName: "" });
    this.timer = setTimeout(this.triggerChange, WAIT_INTERVAL);
  },
  componentWillMount() {
    this.timer = null;
  }
});
export default RefGpecResearchSkill;
