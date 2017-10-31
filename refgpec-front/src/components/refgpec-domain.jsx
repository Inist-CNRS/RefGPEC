import React from "react";
var createReactClass = require('create-react-class');
var RefGpecDomain = createReactClass({
  displayName: 'RefGpecDomain',

  getInitialState: function () {
    return {
      sd_code: this.props.skillData.sd_code,
      sd_shortname: this.props.skillData.sd_shortname,
      error: ''
      };
  },

  render: function () {

    return (
           <option value={this.state.sd_code}>{this.state.sd_shortname}</option>

    );
  },

  componentDidMount () {

  },


});
export default RefGpecDomain;