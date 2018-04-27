import React from "react";
import Select from "react-select";
import "react-select/dist/react-select.css";
const WAIT_INTERVAL = 200;
let createReactClass = require("create-react-class");
let RefGpecProfilsList = createReactClass({
  displayName: "RefGpecProfilsList",

  getInitialState: function() {
    return {
      mustBeSaved: false,
      error: "",
      profil_code: this.props.skillData.profil_code,
      value: this.props.value || {}
    };
  },

  render: function() {
    if (!this.props.skillData) {
      return null;
    }
    let self = this;
    let rgProfils = [];
    Object.keys(self.props.skillData.profils).forEach(function(key) {
      rgProfils.push({
        value: self.props.skillData.profils[key].profil_code,
        label: self.props.skillData.profils[key].profil_shortname
      });
    });
    rgProfils.sort(function(a, b) {
      if (a.label && b.label) {
        return a.label.trim().localeCompare(b.label.trim());
      }
    });
    return (
      <Select
        multi={false}
        clearable={this.props.clear}
        placeholder="Choisissez un Profil"
        options={rgProfils}
        value={self.state.value}
        readOnly={this.props.readOnly}
        disabled={this.props.disabled}
        onChange={this.handleChange}
        valueRenderer={this.renderValue}
      />
    );
  },

  handleChange: function(event) {
    if (event !== null) {
      clearTimeout(this.timer);
      this.setState({ value: event.value });
      this.timer = setTimeout(this.triggerChange, WAIT_INTERVAL);
    } else {
      if (this.props.clear) {
        this.setState({ value: "" });
        this.timer = setTimeout(this.triggerChange, WAIT_INTERVAL);
      }
    }
  },
  triggerChange() {
    this.props.onChange(this.state.value);
  },
  handleDestroy: function(event) {},

  componentDidMount() {}
});
export default RefGpecProfilsList;
