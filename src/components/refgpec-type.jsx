import React from "react";

var RefGpecType = React.createClass({
  displayName: 'RefGpecType',

  getInitialState: function () {
    return {
      st_code: this.props.skillData.st_code,
      st_shortname: this.props.skillData.st_shortname,
      mustBeSaved: false,
      error: ''
      };
  },

  render: function () {

    return (
           <option value={this.state.st_code}>{this.state.st_shortname}</option>

    );
  },

  handleSubmit: function (event) {
    if (this.state.mustBeSaved) {
      this.props.onSave(this.state.st_code, this.state.item);
      this.setState({mustBeSaved: false});
    }
  },

  handleChange: function (event) {
   console.log('skill.handleChange');

        // if it's a change in a select box,
        // tells the component to save data soon
    if (event.target.tagName === 'SELECT') {
      this.setState({mustBeSaved: true});
    } else if (event.target.value !== this.state[event.target.getAttribute('data-fieldname')]) {
      console.log('mustBeSaved', event.target.getAttribute('data-fieldname'));
      this.setState({mustBeSaved: true});
    }
    var newState = {};
    newState[event.target.getAttribute('data-fieldname')] = event.target.value;
    this.setState(newState);
  },

  handleDestroy: function (event) {
    event.preventDefault(); // Let's stop this event.
    event.stopPropagation(); // Really this time.
    if (this.props.ajaxLoading) return;
    this.props.onDestroy(this.state.st_code);
  },

  handleViewAssociatedProfils: function (event) {
    console.log('TODO: handleViewAssociatedProfils');
    event.preventDefault(); // Let's stop this event.
    event.stopPropagation(); // Really this time.
  },

  componentDidMount () {

  },


});
export default RefGpecType;