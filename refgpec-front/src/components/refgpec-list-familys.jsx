import React from "react";
import RefGpecFamily from "./refgpec-list-family.jsx";
let createReactClass = require("create-react-class");
let RefGpecListFamilys = createReactClass({
  displayName: "RefGpecListFamilys",

  getInitialState: function() {
    return {
      mustBeSaved: false,
      error: "",
      family_id: undefined
    };
  },

  render: function() {
    if (!this.props.skillData) {
      return null;
    }
    let self = this;
    let rgFamilys = [];
    Object.keys(self.props.skillData.listFamillys).forEach(function(key) {
      rgFamilys.push(
        <RefGpecFamily
          key={key}
          family_id={key}
          skillData={self.props.skillData.listFamillys[key]}
          ajaxLoading={self.props.skillData.ajaxLoading}
        />
      );
    });

    return (
      <select
        className="form-control"
        value={self.props.value}
        readOnly={this.props.readOnly}
        disabled={this.props.disabled}
      >
        <option />
        {rgFamilys}
      </select>
    );
  },

  handleDestroy: function(event) {},

  componentDidMount() {}
});
export default RefGpecListFamilys;
