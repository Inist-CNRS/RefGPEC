import React from "react";
import RefGpecFamilyList from "./refgpec-family-list.jsx";
let createReactClass = require("create-react-class");
let RefGpecFamilysList = createReactClass({
  displayName: "RefGpecFamilysList",

  getInitialState: function() {
    return {
      mustBeSaved: false,
      error: "",
      family_id: this.props.skillData.family_id
    };
  },

  render: function() {
    let self = this;
    let rgFamilys = [];
    Object.keys(self.props.skillData.family).forEach(function(key) {
      rgFamilys.push(
        <RefGpecFamilyList
          key={key}
          family_id={key}
          skillData={self.props.skillData.family[key]}
          ajaxLoading={self.props.skillData.ajaxLoading}
        />
      );
    });

    return (
      <b>
        <select
          className="form-control"
          value={self.props.value}
          onChange={this.handleChange}
          readOnly={this.props.readOnly}
          disabled={this.props.disabled}
        >
          <option />
          {rgFamilys}
        </select>
      </b>
    );
  },

  handleChange: function(event) {
    this.props.onChange(event.target.value);
  },

  handleDestroy: function(event) {},

  componentDidMount() {}
});
export default RefGpecFamilysList;
