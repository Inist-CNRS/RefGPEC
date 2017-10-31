import React from 'react';
import RefGpecSkillTypeList from "./refgpec-skill-type-list.jsx";
var RefGpecSkillsTypesList = React.createClass({
    displayName: 'RefGpecSkillsTypesList',

    getInitialState: function () {
        return {
            mustBeSaved: false,
            error: '',
            skill_code: this.props.skillData.skill_code,


        };
    },

    render: function () {
        var self = this;
        let rgskill = [];
        let rgDomain = this.props.skillData.listDomain;

        Object.keys(rgDomain).forEach(function (dom){
            var listoption = [];
            rgskill.push(
                <optgroup key={dom} label ={rgDomain[dom].sd_shortname}>
                    {(() => {

                        Object.keys(self.props.skillData.skills).forEach(function (key) {
                            if (self.props.skillData.skills[key].sd_code === dom) {
                                listoption.push(
                                    <RefGpecSkillTypeList
                                        key={key} profil_code={key}
                                        skillData={self.props.skillData.skills[key]}
                                        ajaxLoading={self.props.skillData.ajaxLoading}
                                    />);
                            }
                        });
                        return (listoption)
                    })()}

                </optgroup>

            )
        });

        return (

            <select className="form-control"
                    value={self.props.value}
                    onChange={this.handleChange}
                    readOnly={this.props.readOnly}
                    disabled={this.props.disabled}
            >
                <option></option>
                {rgskill}

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
export default RefGpecSkillsTypesList;