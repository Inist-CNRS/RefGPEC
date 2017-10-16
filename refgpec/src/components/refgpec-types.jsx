import React from 'react';
import RefGpecType from "./refgpec-type.jsx";
var RefGpecTypes = React.createClass({
  displayName: 'RefGpecType',

  getInitialState: function () {
    return {
      mustBeSaved: false,
      error: '',
      st_code: this.props.skillData.st,
    };
  },

  render: function () {
    var self = this;
    let rgTypes = [];
    Object.keys(self.props.skillData.st).forEach(function (key) {
      rgTypes.push(
                <RefGpecType
                    key={key} st_code={key}
                    skillData={self.props.skillData.st[key]}
                    ajaxLoading={self.props.skillData.ajaxLoading}

                />);
    });


    return (
            <select className="form-control"
                    value={self.props.value}
                    data-fieldname="newSkillTypes"
                    onChange={this.handleChange}
                    readOnly={this.props.ajaxLoading}
            >
                <option></option>
                {rgTypes}
            </select>
    );
  },

  handleChange: function (event) {
    console.log('skill.handleChange')

        // if it's a change in a select box,
        // tells the component to save data soon
    if (event.target.tagName === 'SELECT') {
      this.setState({ mustBeSaved: true });
    } else if (event.target.value !== this.state[event.target.getAttribute('data-fieldname')]) {
      console.log('mustBeSaved', event.target.getAttribute('data-fieldname'));
      this.setState({ mustBeSaved: true });
    }

    let newState = {};
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
export default RefGpecTypes;