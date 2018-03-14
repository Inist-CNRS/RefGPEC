import React from "react";
let createReactClass = require("create-react-class");
let RefGpecFamilyList = createReactClass({
  displayName: "RefGpecFamilyList",

  getInitialState: function() {
    return {
      family_id: this.props.skillData.family_id,
      family_name: this.props.skillData.family_name,
      error: ""
    };
  },

  render: function() {
    return (
      <option value={this.state.family_id}>{this.state.family_name}</option>
    );
  },

  componentDidMount() {}
});
export default RefGpecFamilyList;
