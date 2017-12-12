import React from "react";
import RefGpecTypes from "./refgpec-types.jsx";
import RefGpecDomains from "./refgpec-list-domains";
import { OverlayTrigger, Popover } from "react-bootstrap";

var createReactClass = require("create-react-class");
var RefGpecNewSkill = createReactClass({
  displayName: "RefGpecNewSkill",

  getInitialState: function() {
    return {
      newSkillType: "",
      newSkillDomain: "",
      newSkillShortName: "",
      newSkillFreeComments: "",
      error: "",
    };
  },

  render: function() {
    var self = this;

    // model is not ready ? then do not render anything
    if (
      self.props.skillsModel.initializing ||
      this.props.skillsDomainsModel.initializing ||
      this.props.skillsTypesModel.initializing
    ) {
      return null;
    }

    return (

              <tr className="form-new-skill">
                <td style={{textAlign:"center"}}>
                  <OverlayTrigger
                      trigger="focus"
                      data-title="Erreur nouvelle compétence"
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
                  <input
                      className="form-control"
                      type="text"
                      placeholder="Nom de la compétence"
                      value={this.state.newSkillShortName}
                      data-fieldname="newSkillShortName"
                      onChange={this.handleChange}
                      disabled={this.props.skillsModel.ajaxLoading}
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

  handleKeyPress: function(event) {
    if (event.charCode === 13) {
      this.handleSubmit(event);
    }
  },

  handleTypeChange: function(event) {
    this.setState({ newSkillType: event });
  },
  handleDomainChange: function(event) {
    this.setState({ newSkillDomain: event });
  },
  handleChange: function(event) {
    var newState = {};
    newState[event.target.getAttribute("data-fieldname")] = event.target.value;
    this.setState(newState);
  },

  handleSubmit: function(event) {
    const self = this;
    if (self.props.skillsModel.ajaxLoading) return;
    if (
      self.state.newSkillShortName &&
      self.state.newSkillDomain &&
      self.state.newSkillType
    ) {
        self.props.onSubmit(self.state.newSkillType,self.state.newSkillDomain,self.state.newSkillShortName,self.state.newSkillFreeComments);
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
