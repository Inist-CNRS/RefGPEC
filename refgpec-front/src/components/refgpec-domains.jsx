import React from 'react';
import RefGpecDomain from "./refgpec-domain.jsx";
var RefGpecDomains = React.createClass({
  displayName: 'RefGpecDomains',

  getInitialState: function () {
    return {
      mustBeSaved: false,
      error: '',
      sd_code: this.props.skillData.sd,
    };
  },

  render: function () {
    var self = this;
    let rgDomains = [];
    Object.keys(self.props.skillData.sd).forEach(function (key) {
      rgDomains.push(
      <RefGpecDomain
                    key={key} st_code={key}
                    skillData={self.props.skillData.sd[key]}
                    ajaxLoading={self.props.skillData.ajaxLoading}

      />);
    });


    return (
            <select className="form-control"
                    value={self.props.value}
                    onChange={this.handleChange}
                    readOnly={this.props.readOnly}
                    disabled={this.props.disabled}
            >
                <option></option>
                {rgDomains}
            </select>
    );
  },

  handleChange: function (event) {
    this.props.onChange(event.target.value);
  },

  handleDestroy: function (event) {
  },

  componentDidMount () {

  },



});
export default RefGpecDomains;