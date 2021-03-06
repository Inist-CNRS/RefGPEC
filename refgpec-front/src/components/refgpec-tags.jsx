import React from "react";
import Select from "react-select";
import "react-select/dist/react-select.css";
let createReactClass = require("create-react-class");
let RefGpecTags = createReactClass({
  displayName: "RefGpecTags",

  getInitialState: function() {
    return {
      error: "",
      value: { value: this.props.value, label: this.props.value }
    };
  },

  render: function() {
    let self = this;
    let rgTags = [];

    Object.keys(self.props.skillData).forEach(function(key) {
      rgTags.push({
        value: self.props.skillData[key].profil_tag,
        label: self.props.skillData[key].profil_tag
      });
    });
    return (
      <Select.Creatable
        clearable={false}
        multi={false}
        options={rgTags}
        onChange={this.handleChange}
        value={self.state.value}
        promptTextCreator={label => "Créer le Tag " + label}
      />
    );
  },

  handleChange: function(value) {
    if (!value) {
      this.setState({ value: "" }, function() {
        this.handleBlur();
      });
    } else {
      this.setState({ value: value.label }, function() {
        this.handleBlur();
      });
    }
  },
  handleBlur: function(value) {
    this.props.onChange(this.state.value);
  },

  componentDidMount() {}
});
export default RefGpecTags;
