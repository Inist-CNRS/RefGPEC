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
      updating: false,
      skill_code: this.props.skillData.skill_code
    };
  },

  render: function() {
    let self = this;
    let color = [];
    let ops = [];
    let rgDomain = this.props.skillData.listDomain;
    let rgType = this.props.skillData.listType;
    Object.keys(rgType).forEach(function(key, i) {
      if (i === 0) {
        color[key] = "rgb(204,153, 102)";
      } else if (i === 1) {
        color[key] = "rgb(204, 51, 255)";
      } else {
        color[key] = "rgb(255, 153, 153)";
      }
    });
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
      <div>
        {(() => {
          if (this.props.value) {
            return (
              <span>
                <Select
                  onChange={this.handleChange}
                  options={ops}
                  placeholder="Selectionnez une compétence"
                  value={this.props.value}
                />

                <p>
                  <span
                    className="label label-warning"
                    style={{
                      backgroundColor:
                        color[
                          self.props.skillData.skills[this.props.value].st_code
                        ]
                    }}
                  >
                    {
                      rgType[
                        this.props.skillData.skills[this.props.value].st_code
                      ].st_shortname
                    }
                  </span>
                  &nbsp;
                  <span
                    style={{ backgroundColor: "#808080" }}
                    className="label label-primary"
                  >
                    {
                      rgDomain[
                        this.props.skillData.skills[this.props.value].sd_code
                      ].sd_shortname
                    }
                  </span>
                </p>
              </span>
            );
          } else {
            return (
              <Select
                onChange={this.handleChange}
                options={ops}
                placeholder="Selectionnez une compétence"
                value={this.props.value}
              />
            );
          }
        })()}
      </div>
    );
  },

  handleChange: function(event) {
    if (!event) {
      this.props.onChange("");
    } else {
      this.props.onChange(event.value);
      this.setState({ updating: false });
    }
  }
});
export default RefGpecSkillsTypesList;
