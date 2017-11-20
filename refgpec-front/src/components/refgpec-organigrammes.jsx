import React from "react";
import RefGpecOrganigramme from "./refgpec-organigramme.jsx";
var createReactClass = require("create-react-class");
var RefGpecOrganigrammes = createReactClass({
  displayName: "RefGpecOrganigrammes",

  getInitialState: function() {
    return {
      error: "",
      orga_code: this.props.skillData.orga_code
    };
  },

  render: function() {
    var self = this;
    let rgOrganigrammes = [];
    Object.keys(self.props.skillData.orga).forEach(function(key) {
      rgOrganigrammes.push(
        <RefGpecOrganigramme
          key={key}
          orga_code={key}
          skillData={self.props.skillData.orga[key]}
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
        {rgOrganigrammes}
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

    this.props.onDestroy(this.state.orga);
  },

  handleViewAssociatedProfils: function(event) {
    console.log("TODO: handleViewAssociatedProfils");
    event.preventDefault(); // Let's stop this event.
    event.stopPropagation(); // Really this time.
  },

  componentDidMount() {}
});
export default RefGpecOrganigrammes;
