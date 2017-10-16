import React from "react";

var RefGpecDomain = React.createClass({
  displayName: 'RefGpecDomain',

  getInitialState: function () {
    return {
      sd_code: this.props.skillData.sd_code,
      sd_shortname: this.props.skillData.sd_shortname,
      mustBeSaved: false,
      error: ''
      };
  },

  render: function () {

    return (
           <option value={this.state.sd_code}>{this.state.sd_shortname}</option>

    );
  },

  handleSubmit: function (event) {

  },

  handleChange: function (event) {

  },

  handleDestroy: function (event) {

  },

  handleViewAssociatedProfils: function (event) {

  },

  componentDidMount () {

  },


});
export default RefGpecDomain;