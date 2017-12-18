import React from "react";
var createReactClass = require("create-react-class");
var RefGpecTag = createReactClass({
  displayName: "RefGpecTag",

  getInitialState: function() {
    return {
      tag_code: this.props.skillData.profil_tag,
      error: "",
      ajaxLoading: false
    };
  },

  render: function() {
    return <option value={this.state.tag_code}>{this.state.tag_code}</option>;
  },

  componentDidMount() {},

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state !== nextState) {
      return true;
    }
    return false;
  }
});
export default RefGpecTag;
