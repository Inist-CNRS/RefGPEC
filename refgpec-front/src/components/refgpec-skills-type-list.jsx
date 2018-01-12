import React from "react";
import "react-select-plus/dist/react-select-plus.css";
import Select from "react-select-plus";
var createReactClass = require("create-react-class");
var RefGpecSkillsTypesList = createReactClass({
  displayName: "RefGpecSkillsTypesList",

  getInitialState: function() {
    return {
      mustBeSaved: false,
      error: "",
      skill_code: this.props.skillData.skill_code
    };
  },

  render: function() {
    let self = this;
    let ops = [];
    let rgDomain = this.props.skillData.listDomain;
    let rgType = this.props.skillData.listType;
    Object.keys(rgDomain).forEach(function(dom) {
      let option2 = [];

      Object.keys(rgType).forEach(function(type) {
        let option = [];
        Object.keys(self.props.skillData.skills).forEach(function(key) {
          if (
            self.props.skillData.skills[key].sd_code === dom &&
            self.props.skillData.skills[key].st_code === type
          ) {
            option.push({
              label: self.props.skillData.skills[key].skill_shortname,
              value: self.props.skillData.skills[key].skill_code
            });
          }
        });
        option2.push({
          label: rgType[type].st_shortname,
          options: option
        });
      });
      ops.push({
        label: rgDomain[dom].sd_shortname,
        options: option2
      });
    });

    return (
      <Select
        onChange={this.handleChange}
        options={ops}
        placeholder="Selectionnez une compétence"
        value={this.props.value}
      />
    );
  },

  handleChange: function(event) {
    if (!event) {
      this.props.onChange("");
    } else {
      this.props.onChange(event.value);
    }
  }
});
export default RefGpecSkillsTypesList;
