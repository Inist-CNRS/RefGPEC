import React from "react";
var createReactClass = require('create-react-class');
var RefGpecType = createReactClass({
  displayName: 'RefGpecType',

  getInitialState: function () {
    return {
      st_code: this.props.skillData.st_code,
      st_shortname: this.props.skillData.st_shortname,
      error: ''
      };
  },

  render: function () {

    return (
           <option value={this.state.st_code}>{this.state.st_shortname}</option>

    );
  },

  componentDidMount () {

  },


});
export default RefGpecType;