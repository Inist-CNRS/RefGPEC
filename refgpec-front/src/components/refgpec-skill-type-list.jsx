import React from "react";

var RefGpecSkillTypeList = React.createClass({
    displayName: 'RefGpecSkillTypeList',

    getInitialState: function () {
        return {
            skill_code: this.props.skillData.skill_code,
            skill_shortname: this.props.skillData.skill_shortname,
            error: ''
        };
    },

    render: function () {
        return (
            <option value={this.state.skill_code}>{this.state.skill_shortname}</option>
        );
    },

    componentDidMount () {

    },


});
export default RefGpecSkillTypeList;