import React from "react";
import RefGpecType from "./refgpec-type.jsx";
var createReactClass = require("create-react-class");
var RefGpecTypes = createReactClass({
  displayName: "RefGpecTypes",

  getInitialState: function() {
    return {
      error: "",
      st_code: this.props.skillData.st
    };
  },

  render: function() {
    var self = this;
    let rgTypes = [];
    Object.keys(self.props.skillData.st).forEach(function(key) {
      rgTypes.push(
        <RefGpecType
          key={key}
          st_code={key}
          skillData={self.props.skillData.st[key]}
          ajaxLoading={self.props.skillData.ajaxLoading}
        />
      );
    });

    return (
      <select
        className="form-control"
        value={self.props.value}
        onChange={self.handleChange}
        readOnly={self.props.readOnly}
        disabled={this.props.disabled}
      >
        <option />
        {rgTypes}
      </select>
    );
  },

  handleChange: function(event) {
    this.props.onChange(event.target.value);
  },

  handleDestroy: function(event) {
    event.preventDefault(); // Let's stop this event.
    event.stopPropagation(); // Really this time.

    if (this.props.ajaxLoading) return;

    this.props.onDestroy(this.state.st_code);
  },

  handleViewAssociatedProfils: function(event) {
    console.log("TODO: handleViewAssociatedProfils");
    event.preventDefault(); // Let's stop this event.
    event.stopPropagation(); // Really this time.
  },

  componentDidMount() {}
});
export default RefGpecTypes;
