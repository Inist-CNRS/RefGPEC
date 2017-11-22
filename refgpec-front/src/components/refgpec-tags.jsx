import React from "react";
import RefGpecTag from "./refgpec-tag.jsx";
var createReactClass = require("create-react-class");
var RefGpecTags = createReactClass({
  displayName: "RefGpecTags",

  getInitialState: function() {
    return {
      error: "",
      tag_code: this.props.skillData.tag_code
    };
  },

  render: function() {
    var self = this;
    let rgTags = [];
    Object.keys(self.props.skillData.tag).forEach(function(key) {
      rgTags.push(
        <RefGpecTag
          key={key}
          tag_code={key}
          skillData={self.props.skillData.tag[key]}
          ajaxLoading={self.props.skillData.ajaxLoading}
        />
      );
    });

    return (
      <select
        className="form-control"
        value={self.props.value || ""}
        onChange={self.handleChange}
        readOnly={self.props.readOnly}
      >
        <option />
        {rgTags}
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

    this.props.onDestroy(this.state.tag);
  },

  handleViewAssociatedProfils: function(event) {
    console.log("TODO: handleViewAssociatedProfils");
    event.preventDefault(); // Let's stop this event.
    event.stopPropagation(); // Really this time.
  },

  componentDidMount() {}
});
export default RefGpecTags;
