import React from "react";
import RefGpecTypes from "./refgpec-types.jsx";
import { OverlayTrigger, Popover } from "react-bootstrap";
import "react-select/dist/react-select.css";
import RefGpecSugestSkills from "./refgpec-suggest-skills.jsx";
let createReactClass = require("create-react-class");
let RefGpecNewSkill = createReactClass({
  displayName: "RefGpecNewSkill",

  getInitialState: function() {
    return {
      newSkillType: "",
      newSkillFamily: "",
      newSkillShortName: undefined,
      newSkillFreeComments: "",
      error: ""
    };
  },

  render: function() {
    let self = this;
    let ops = [];

    // model is not ready ? then do not render anything
    if (
      self.props.skillsModel.initializing ||
      this.props.familyModel.initializing ||
      this.props.skillsTypesModel.initializing
    ) {
      return null;
    }
    Object.keys(self.props.skillsModel.skills).forEach(function(key) {
      ops.push({
        label: self.props.skillsModel.skills[key].skill_shortname,
        value: self.props.skillsModel.skills[key].tokens
      });
    });
    return (
      <tr className="form-new-skill">
        <td style={{ textAlign: "center" }}>
          <OverlayTrigger
            trigger="focus"
            data-title="Erreur nouvelle compétence"
            placement="top"
            overlay={
              <Popover id="popover-positioned-top">{this.state.error}</Popover>
            }
          >
            <a
              href=""
              className="fa fa-plus-square fa-2x"
              role="button"
              onClick={this.handleSubmit}
              title="Ajouter cette compétence au référentiel"
            />
          </OverlayTrigger>
        </td>
        <td>
          <RefGpecTypes
            skillData={self.props.skillsTypesModel}
            ajaxLoading={self.props.skillsTypesModel.ajaxLoading}
            data-fieldname="newSkillType"
            onChange={this.handleTypeChange}
            value={this.state.newSkillType}
          />
        </td>
        <td>
          <select className="form-control" readOnly={true} disabled={true} />
        </td>
        <td>
          <RefGpecSugestSkills
            SkillData={self.props.skillsModel}
            onSubmit={this.handleChangeShortname}
          />
        </td>
        <td>
          <textarea
            className="form-control"
            rows="1"
            placeholder="Commentaires libres"
            value={this.state.newSkillFreeComments}
            data-fieldname="newSkillFreeComments"
            onChange={this.handleChangeCommentary}
            disabled={this.props.skillsModel.ajaxLoading}
          />
        </td>
        <td />
      </tr>
    );
  },
  handleTypeChange: function(event) {
    this.setState({ newSkillType: event });
  },
  handleChangeShortname: function(event) {
    this.setState({ newSkillShortName: event.target.value });
  },
  handleChangeCommentary: function(event) {
    if (!event) {
      this.setState({ newSkillFreeComments: "" });
    } else {
      this.setState({ newSkillFreeComments: event.target.value });
    }
  },
  handleSubmit: function(event) {
    const self = this;
    if (self.props.skillsModel.ajaxLoading) return;

    if (!this.missingField()) {
      self.props.onSubmit(
        self.state.newSkillType,
        self.state.newSkillShortName,
        self.state.newSkillFreeComments
      );
      self.setState({
        newSkillType: "",
        newSkillShortName: "",
        newSkillFreeComments: "",
        error: ""
      });
    } else {
      let missingFields = [];
      if (!self.state.newSkillShortName)
        missingFields.push("Nom de la compétence");
      if (!self.state.newSkillType) missingFields.push("Type de la compétence");
      self.setState({
        error:
          "Il manque des champs avant de pouvoir ajouter la compétence :\n" +
          missingFields.join(", ")
      });
    }
    event.preventDefault(); // Let's stop this event.
    event.stopPropagation(); // Really this time.
  },

  missingField() {
    return !this.state.newSkillShortName || !this.state.newSkillType;
  }
});
export default RefGpecNewSkill;
