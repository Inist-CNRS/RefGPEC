import React from "react";

var RefGpecLevelList = React.createClass({
    displayName: 'RefGpecLevelList',

    getInitialState: function () {
        return {
            level_code: this.props.skillData.level_code,
            level_shortname: this.props.skillData.level_shortname,
            error: ''
        };
    },

    render: function () {

        return (
            <option value={this.state.level_code}>{this.state.level_shortname}</option>

        );
    },

    componentDidMount () {

    },


});
export default RefGpecLevelList;