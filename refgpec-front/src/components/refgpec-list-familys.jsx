import React from "react";
import Select from "react-select";
import "react-select/dist/react-select.css";
let createReactClass = require("create-react-class");
const WAIT_INTERVAL = 200;
let RefGpecListFamilys = createReactClass({
  displayName: "RefGpecListFamilys",

  getInitialState: function() {
    return {
      mustBeSaved: false,
      error: "",
      value: undefined
    };
  },

  render: function() {
    if (!this.props.skillData) {
      return null;
    }

    let self = this;
    let rgFamilys = [];
    rgFamilys.push({ value: "Aucune", label: "Aucune Famille" });
    Object.keys(self.props.skillData.family).forEach(function(key) {
      rgFamilys.push({
        value: self.props.skillData.family[key].family_id,
        label: self.props.skillData.family[key].family_name
      });
    });
    return (
      <Select
        multi={this.props.multi}
        placeholder="Choisissez une ou plusieurs Familles"
        options={rgFamilys}
        value={self.state.value}
        readOnly={this.props.readOnly}
        disabled={this.props.disabled}
        onChange={this.handleSelectChange}
        valueRenderer={this.renderValue}
      />
    );
  },
  renderValue: function(option) {
    return <em>{option.value}</em>;
  },
  handleSelectChange(value) {
    clearTimeout(this.timer);
    this.setState({ value });
    this.timer = setTimeout(this.triggerChange, WAIT_INTERVAL);
  },
  triggerChange() {
    this.props.onChange(this.state.value);
  },
  componentDidMount() {}
});
export default RefGpecListFamilys;
