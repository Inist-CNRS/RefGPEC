import React from "react";
import RefGpecTypes from "./refgpec-types.jsx";
import RefGpecDomains from "./refgpec-list-domains";
import { OverlayTrigger, Popover } from "react-bootstrap";
import Select from "react-select";
import "react-select/dist/react-select.css";
var createReactClass = require("create-react-class");
var RefGpecNewSkill = createReactClass({
  displayName: "RefGpecNewSkill",

  getInitialState: function() {
    return {
      newSkillType: "",
      newSkillDomain: "",
      newSkillShortName: undefined,
      newSkillFreeComments: "",
      error: ""
    };
  },

  render: function() {
    var self = this;
    let ops = [];

    // model is not ready ? then do not render anything
    if (
      self.props.skillsModel.initializing ||
      this.props.skillsDomainsModel.initializing ||
      this.props.skillsTypesModel.initializing
    ) {
      return null;
    }
    Object.keys(self.props.skillsModel.skills).forEach(function(key) {
      ops.push({
        label: self.props.skillsModel.skills[key].skill_shortname,
        value: self.props.skillsModel.skills[key].skill_shortname
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
          <RefGpecDomains
            skillData={self.props.skillsDomainsModel}
            ajaxLoading={self.props.skillsDomainsModel.ajaxLoading}
            data-fieldname="newSkillDomain"
            onChange={this.handleDomainChange}
            value={this.state.newSkillDomain}
          />
        </td>
        <td>
          <Select.Creatable
            clearable={true}
            multi={false}
            options={ops}
            onChange={this.handleChange}
            value={this.state.newSkillShortName}
            placeholder="Nom de la compétence"
            promptTextCreator={label => "Créer la compétence " + label}
            data-fieldname="newSkillShortName"
            disabled={this.props.skillsModel.ajaxLoading}
            onBlurResetsInput={false}
            onBlur={this.handleBlur}
          />
        </td>
        <td>
          <textarea
            className="form-control"
            rows="1"
            placeholder="Commentaires libres"
            value={this.state.newSkillFreeComments}
            data-fieldname="newSkillFreeComments"
            onChange={this.handleChange}
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
  handleDomainChange: function(event) {
    this.setState({ newSkillDomain: event });
  },
  handleChange: function(event) {
    if (!event) {
      this.setState({ newSkillShortName: "" });
    } else {
      this.setState({ newSkillShortName: event });
    }
  },
  handleBlur: function(event) {
    if (!event.target.value) {
      this.setState({ newSkillShortName: "" });
    } else {
      this.setState({ newSkillShortName: event.target });
    }
  },

  handleSubmit: function(event) {
    const self = this;
    if (self.props.skillsModel.ajaxLoading) return;
    if (
      self.state.newSkillShortName &&
      self.state.newSkillDomain &&
      self.state.newSkillType
    ) {
      self.props.onSubmit(
        self.state.newSkillType,
        self.state.newSkillDomain,
        self.state.newSkillShortName.value,
        self.state.newSkillFreeComments
      );
      self.setState({
        newSkillType: "",
        newSkillDomain: "",
        newSkillShortName: "",
        newSkillFreeComments: "",
        error: ""
      });
    }
    event.preventDefault(); // Let's stop this event.
    event.stopPropagation(); // Really this time.
  },

  missingField() {
    return (
      !this.state.newSkillShortName ||
      !this.state.newSkillDomain ||
      !this.state.newSkillType
    );
  }
});
export default RefGpecNewSkill;
