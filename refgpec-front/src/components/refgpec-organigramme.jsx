import React from "react";
var createReactClass = require('create-react-class');
var RefGpecOrganigramme = createReactClass({
    displayName: 'RefGpecOrganigramme',

    getInitialState: function () {
        return {
            orga_code: this.props.skillData.orga_code,
            orga_shortname: this.props.skillData.orga_shortname,
            error: ''
        };
    },

    render: function () {

        return (
            <option value={this.state.orga_code}>{this.state.orga_shortname}</option>

        );
    },

    componentDidMount () {

    },


});
export default RefGpecOrganigramme;