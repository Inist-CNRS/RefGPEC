import React from "react";
let createReactClass = require("create-react-class");
let RefGpecProfilList = createReactClass({
  displayName: "RefGpecProfilList",

  getInitialState: function() {
    return {
      profil_code: this.props.skillData.profil_code,
      profil_shortname: this.props.skillData.profil_shortname,
      error: ""
    };
  },

  render: function() {
    return (
      <option value={this.state.profil_code}>
        {this.state.profil_shortname}
      </option>
    );
  },

  componentDidMount() {}
});
export default RefGpecProfilList;
