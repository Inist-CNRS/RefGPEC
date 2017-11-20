import React from "react";
var createReactClass = require("create-react-class");
var RefGpecType = createReactClass({
  displayName: "RefGpecType",

  getInitialState: function() {
    return {
      st_code: this.props.skillData.st_code,
      st_shortname: this.props.skillData.st_shortname,
      error: "",
      ajaxLoading: false
    };
  },

  render: function() {
    return (
      <option value={this.state.st_code}>{this.state.st_shortname}</option>
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
export default RefGpecType;
