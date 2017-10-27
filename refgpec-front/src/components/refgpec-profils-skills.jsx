import React from 'react';
import RefGpecProfilSkill from './refgpec-profil-skill.jsx';
import RefGPECProfilsList from './refgpec-profils-list';
import { OverlayTrigger, Popover} from "react-bootstrap";
import {NotificationContainer,NotificationManager} from "react-notifications"
var RefGpecProfilsSkills = React.createClass({
    displayName: 'RefGpecProfilsSkills',

    getInitialState: function () {
        return {
            layout: 'vertical',
            selectedProfil: '',
            listSkill : '',
            PDF_path : '',
            newShortName: '',
            newType:'',
            newDomain:'',
            newLevel:'',
            error: '',
        };
    },

    render: function () {

        var self = this;
        let rgPS = [];
        Object.keys(self.state.listSkill).forEach(function (key) {
            rgPS.push(
                <RefGpecProfilSkill
                    key={key} psId={key}
                    levelsModel={self.props.levelsModel}
                    skillsModel={self.props.skillsModel}
                    skillsTypesModel={self.props.skillsTypesModel}
                    skillsDomainsModel={self.props.skillsDomainsModel}
                    psData={self.props.profilsSkillsModel.profilsSkillsLevels[key]}
                    onSave={self.props.profilsSkillsModel.save.bind(self.props.profilsSkillsModel)}
                    onDestroy={self.props.profilsSkillsModel.destroy.bind(self.props.profilsSkillsModel)}
                    ajaxLoading={self.props.profilsSkillsModel.ajaxLoading}
                />);
        });

        // layout stuff
        let layoutBtnClasses = 'btn btn-default pull-right fa fa-2x ';
        layoutBtnClasses += (self.state.layout === 'horizontal') ? 'fa-arrows-h' : 'fa-arrows-v';
        let layoutColClasses = 'col-lg-6 ';
        layoutColClasses += (self.state.layout === 'horizontal') ? '' : 'profils-skills-vertical';

        return (

            <div id="profils-skills">

              <div className="row">
                <div className="col-md-12">

                  <div className="panel panel-default">
                    <div className="panel-heading">Profils &amp; Compétences</div>
                    <div className="panel-body">

                      <button type="button"
                              className={layoutBtnClasses}
                              title="Basculer l'affichage profil/compétences horizontalement et verticalement"
                              onClick={this.handleSwitchLayout}
                      />

                      <p>
                        Depuis cet onglet il est possible d'associer à chaque profils
                        des <a data-toggle="tab" className="nav-link" href="#skills" onClick={this.handleNavigateTab}>compétences issues du référentiel</a> puis
                        d'associer une <a data-toggle="tab" href="#levels" onClick={this.handleNavigateTab}>modulation</a> à chacunes de ces compétences.
                      </p>

                        {/* FORMULAIRE DE BASCULE D'UN PROFIL A L'AUTRE */}
                      <p>
                        Vous êtes en train de modifier les associations de compétences sur le profil suivant :
                        <RefGPECProfilsList
                            skillData={self.props.profilsModel}
                            ajaxLoading={self.props.profilsModel.ajaxLoading}
                            data-fieldname="ProfilSelect"
                            onChange={this.handleChangeProfil}
                            value={this.state.selectedProfil}
                        />
                        </p>

                    </div>
                  </div>


                  <div className="row">

                      {/* PROFILS ET COMPETENCES : ZONE FORMULAIRE */}
                    <div className={layoutColClasses}>
                      <div className="panel panel-default">
                        <div className="panel-heading">Savoirs, savoir-faire et savoir-être nécessaires pour occuper le poste de manière optimale</div>
                        <div className="panel-body">

                          <table id="profils-skills-list" className="table table-striped table-bordered">
                            <thead>
                            <tr>
                              <th className="profils-skills-col-action"></th>
                              <th className="profils-skills-col-name">Types &amp; Domaines</th>
                              <th className="profils-skills-col-name">Compétences</th>
                              <th className="profils-skills-col-name">Modulations</th>
                              <th className="profils-skills-col-commentary">Commentaires libres</th>
                            </tr>
                            </thead>
                            <tbody>

                            {rgPS}


                                    <tr>
                                        <td>
                                            <OverlayTrigger show={this.missingField} trigger="focus"
                                                            data-title="Erreur nouveau profil_Skills" placement="top"
                                                            overlay={
                                                                <Popover id="popover-positioned-top">
                                                                    {this.state.error }
                                                                </Popover>}
                                            >
                                                <a href="" onClick={this.handleSubmit}
                                                className="fa fa-plus-square fa-2x" role="button"
                                                      title="Associer la compétence au profil"/>
                                            </OverlayTrigger>

                                        </td>
                                        <td colSpan="2">
                                            <select className="form-control" id="skills-datalist">
                                                <option></option>
                                                <optgroup label="Général">
                                                    <option value="tse-gen-1">Participation à des instances/groupes de
                                                        travail
                                                    </option>
                                                </optgroup>
                                                <optgroup label="Langues">
                                                    <option value="ts-lang-1">Anglais</option>
                                                </optgroup>
                                                <optgroup label="Informatique">
                                                    <option value="tsf-info-1">Langage de programmation</option>
                                                    <option value="tsf-info-2">Elasticsearch</option>
                                                </optgroup>
                                                <optgroup label="Gestion administrative">
                                                    <option value="tsf-gadm-1">Elaboration et suivi budgétaire</option>
                                                </optgroup>
                                            </select>
                                        </td>
                                        <td>
                                            <select className="form-control" id="levels-datalist">
                                                <option></option>
                                                <option value="4"
                                                        title="Fait d'avoir acquis une très grande maîtrise grâce à une longue expérience et d'être reconnu par ses pairs et sollicité">
                                                    Expertise
                                                </option>
                                                <option value="3"
                                                        title="Capacité d'user à son gré d'une compétence, d'un savoir, d'une technique">
                                                    Maîtrise
                                                </option>
                                                <option value="2"
                                                        title="Capacité à mettre en œuvre et/ou en pratique, une compétence, un savoir, une technique">
                                                    Pratique
                                                </option>
                                                <option value="1" title="Connaissances élémentaires et/ou incomplètes">
                                                    Notions
                                                </option>
                                            </select>
                                        </td>
                                        <td><textarea className="form-control" rows="1"
                                                      placeholder="Commentaires libres"></textarea></td>
                                    </tr>
                            </tbody>
                          </table>

                        </div>
                      </div>


                    </div>


                      {/* PROFILS ET COMPETENCES : ZONE PDF PREVIEW */}
                    <div className={layoutColClasses}>
                      <div className="embed-responsive embed-responsive-4by3" style={{ height: "1200px" }}>
                        <iframe className="embed-responsive-item" src={this.state.PDF_path}></iframe>
                      </div>
                    </div>
                  </div>


                </div>
              </div>
                <NotificationContainer/>
            </div>





        );
    },

    handleSubmit: function (event) {
        const self = this;
        if (self.props.profilsSkillsModel.ajaxLoading) return;

        if (!self.missingField()) {
            if(! (self.props.profilsSkillsModel.feedback)){
                NotificationManager.success('', 'La compétence '+ self.state.newShortName + ' a été ajouté au profil ...');
            }else
            {NotificationManager.error('',self.props.profilsSkillsModel.feedback ); }
            self.setState({
                newDomain: '',
                newLevel: '',
                newShortName: '',
                newType: '',
                error: ''
            });
        } else {

            var missingFields = [];
            if (!self.state.selectedProfil) missingFields.push('Profil de poste');
            if (!self.state.newDomain) missingFields.push('Domaine');
            if (!self.state.newLevel) missingFields.push('Modulation');
            if (!self.state.newShortName) missingFields.push('Compétence');
            if (!self.state.newType) missingFields.push('Type');
            self.setState({error: 'Il manque des champs avant de pouvoir ajouter la compétence :\n' + missingFields.join(', ')});
        }

        event.preventDefault(); // Let's stop this event.
        event.stopPropagation(); // Really this time.
    },

    handleChangeProfil: function(event){
        if(event) {
            let code_profil = event;
            let list_skill = this.props.profilsSkillsModel.getProfilSkillLevel(code_profil);
            let chemin_pdf = this.props.profilsModel.profils[code_profil].profil_pdf_path;
            this.setState({selectedProfil: code_profil, listSkill: list_skill, PDF_path: chemin_pdf});
        }
    },


    handleNavigateTab: function (event) {
        this.props.onTabChange(event.target.getAttribute('href'));
    },

    handleSwitchLayout: function (event) {
        if (this.state.layout === 'vertical') {
            this.setState({ layout: 'horizontal' });
        } else {
            this.setState({ layout: 'vertical' });
        }
    },

    componentDidUpdate() {

    },

    missingField() {
        return (!this.state.selectedProfil) || (!this.state.newDomain) || (!this.state.newLevel) || (!this.state.newShortName) || (!this.state.newType);
    }


});
export default RefGpecProfilsSkills;