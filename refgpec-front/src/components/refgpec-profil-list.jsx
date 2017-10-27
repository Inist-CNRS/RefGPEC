import React from "react";

var RefGpecProfilList = React.createClass({
    displayName: 'RefGpecProfilList',

    getInitialState: function () {
        return {
            profil_code: this.props.skillData.profil_code,
            profil_shortname: this.props.skillData.profil_shortname,
            code_orga: this.props.skillData.code_orga,
            error: ''
        };
    },

    render: function () {

        return (
            <option value={this.state.profil_code}>{this.state.profil_shortname}</option>

        );
    },

    componentDidMount () {

    },


});
export default RefGpecProfilList;