import React from "react";
import RefGpecSkill from "./refgpec-skill.jsx";
import RefGpecTypes from "./refgpec-types.jsx";
import RefGpecDomains from './refgpec-domains';
import {OverlayTrigger, Popover} from "react-bootstrap";
var RefGpecSkills = React.createClass({
    displayName: 'RefGpecSkills',

    getInitialState: function () {
        return {
            newSkillType: '',
            newSkillDomain: '',
            newSkillShortName: '',
            newSkillFreeComments: '',
            error: ''
        };
    },

    render: function () {
        var self = this;

        // model is not ready ? then do not render anything
        if (self.props.skillsModel.initializing) {
            return null;
        }




        let rgSkills = [];
        Object.keys(self.props.skillsModel.skills).forEach(function (key) {
            rgSkills.push(
                <RefGpecSkill
                    key={key} skillId={key}
                    skillData={self.props.skillsModel.skills[key]}
                    skillsTypesModel={self.props.skillsTypesModel}
                    skillsDomainsModel={self.props.skillsDomainsModel}
                    onSave={self.props.skillsModel.save.bind(self.props.skillsModel)}
                    onDestroy={self.props.skillsModel.destroy.bind(self.props.skillsModel)}
                    ajaxLoading={self.props.skillsModel.ajaxLoading}
                />);
        });

        return (

            <div id="skills">


                <div className="row">
                    <div className="col-md-12">

                        <div className="panel panel-default">
                            <div className="panel-heading">Référentiel des compétences</div>
                            <div className="panel-body">
                                <p>
                                    Depuis cet onglet il est possible d'administrer le référentiel des compétences.<br/>
                                    Ces compétences pourront être <a data-toggle="tab" className="nav-link"
                                                                     href="#profils-skills"
                                                                     onClick={this.handleNavigateTab}>associées</a> aux
                                    différents <a data-toggle="tab" className="nav-link" href="#profils"
                                                  onClick={this.handleNavigateTab}>profils</a> en leur associant une <a
                                    data-toggle="tab" href="#levels" onClick={this.handleNavigateTab}>modulation</a>.
                                </p>
                            </div>
                        </div>


                        <table id="skills-list" className="table table-striped table-bordered">
                            <thead>
                            <tr>
                                <th className="skills-col-action"></th>
                                <th className="skills-col-type">Type</th>
                                <th className="skills-col-domain">Domaine</th>
                                <th className="skills-col-shortname">Nom de la compétence</th>
                                <th className="skills-col-commentary">Commentaires libres</th>
                                <th className="skills-col-code">Code</th>
                            </tr>
                            </thead>
                            <tbody>

                            {rgSkills}


                            {/* FORM USED TO CREATE A NEW SKILL */}
                            <tr className="form-new-skill">
                                <td></td>
                                <td>
                                    <RefGpecTypes
                                        skillData={self.props.skillsTypesModel}
                                        ajaxLoading={self.props.skillsTypesModel.ajaxLoading}
                                    />

                                </td>
                                <td>
                                    <RefGpecDomains
                                        skillData={self.props.skillsDomainsModel}
                                        ajaxLoading={self.props.skillsDomainsModel.ajaxLoading}
                                    />
                                </td>
                                <td>
                                    <input className="form-control" type="text"
                                           placeholder="Nom de la compétence"
                                           value={this.state.newSkillShortName}
                                           data-fieldname="newSkillShortName"
                                           onKeyPress={this.handleKeyPress}
                                           onChange={this.handleChange}
                                           disabled={this.props.skillsModel.ajaxLoading}
                                    />
                                </td>
                                <td>
                      <textarea className="form-control" rows="1"
                                placeholder="Commentaires libres"
                                value={this.state.newSkillFreeComments}
                                data-fieldname="newSkillFreeComments"
                                onChange={this.handleChange}
                                disabled={this.props.skillsModel.ajaxLoading}
                      />
                                </td>

                                <td>
                                    <OverlayTrigger show={this.missingField()} trigger="focus"
                                                    data-title="Erreur nouvelle compétence" placement="top"
                                                    overlay={
                                                        <Popover id="popover-positioned-top">
                                                            {this.state.error }
                                                        </Popover>}
                                    >
                                        <a href="" className="btn fa fa-plus-square fa-2x" role="button"
                                           onClick={this.handleSubmit}
                                           title="Ajouter cette compétence au référentiel"/>
                                    </OverlayTrigger>
                                </td>

                                {/*<td id="skills-new-skill"*/}
                                {/*data-placement="top" data-toggle="popover"*/}
                                {/*data-trigger="manual" data-title="Erreur nouvelle compétence"*/}
                                {/*data-content={this.state.error}*/}
                                {/*>*/}
                                {/*<a href="" className="btn fa fa-plus-square fa-2x" role="button"*/}
                                {/*onClick={this.handleSubmit}*/}
                                {/*disabled={self.props.skillsModel.ajaxLoading}*/}
                                {/*title="Ajouter cette compétence au référentiel" />*/}
                                {/*</td>*/}
                            </tr>

                            </tbody>
                        </table>

                        <div className="progress"
                             style={{display: self.props.skillsModel.ajaxLoading ? 'block' : 'none'}}>
                            <div className="progress-bar progress-bar-striped active" role="progressbar"
                                 style={{width: '100%'}}>
                            </div>
                        </div>

                    </div>
                </div>

            </div>



        );
    },


    handleKeyPress: function (event) {
        if (event.charCode === 13) {
            this.handleSubmit(event);
        }
    },

    handleChange: function (event) {
        var newState = {};
        newState[event.target.getAttribute('data-fieldname')] = event.target.value;
        this.setState(newState);
    },


    handleSubmit: function (event) {
        const self = this;

        if (self.props.skillsModel.ajaxLoading) return;
        if (self.state.newSkillShortName && self.state.newSkillDomain && self.state.newSkillType) {
            self.props.skillsModel.addSkill(self.state.newSkillType, self.state.newSkillDomain, self.state.newSkillShortName, self.state.newSkillFreeComments);
            self.setState({
                newSkillType: '',
                newSkillDomain: '',
                newSkillShortName: '',
                newSkillFreeComments: '',
            });
        } else {
            var missingFields = [];
            if (!self.state.newSkillShortName) missingFields.push('Nom de la compétence');
            if (!self.state.newSkillDomain) missingFields.push('Domaine');
            if (!self.state.newSkillType) missingFields.push('Type');
            self.setState({error: 'Il manque des champs avant de pouvoir ajouter la compétence :\n' + missingFields.join(', ')});
            // setTimeout(function () {
            //   $('#skills-new-skill').popover(self.state.error ? 'show' : 'hide');
            //   setTimeout(function () {
            //     $('#skills-new-skill').popover('hide');
            //   }, 5000);
            // }, 100);
        }

        event.preventDefault(); // Let's stop this event.
        event.stopPropagation(); // Really this time.
    },

    handleNavigateTab: function (event) {
        this.props.onTabChange(event.target.getAttribute('href'));
    },

    componentDidMount () {

    },

    missingField() {
        return (!this.state.newProfilShortName) || (!this.state.newProfilOrga);
    }

});
export default RefGpecSkills;