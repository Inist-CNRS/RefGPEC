import React from "react";
let createReactClass = require("create-react-class");
let RefGpecListFamily = createReactClass({
  displayName: "RefGpecListFamily",

  getInitialState: function() {
    return {
      family_id: this.props.skillData.family_id,
      family_name: this.props.skillData.family_name,
      error: "",
      ajaxLoading: false
    };
  },

  render: function() {
    return (
      <option value={this.state.family_id}>{this.state.family_name}</option>
    );
  },

  componentDidMount() {},

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state !== nextState) {
      return true;
    }
    return false;
  }
});
export default RefGpecListFamily;
