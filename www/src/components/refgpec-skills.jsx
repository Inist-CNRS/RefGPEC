import React from 'react';
import RefGpecSkill from './refgpec-skill.jsx';

module.exports = React.createClass({
  displayName: 'RefGpecSkills',

  getInitialState: function () {
    return {};
  },

  render: function () {
    var self = this;

    let rgSkills = [];
    Object.keys(self.props.skillsModel.skills).forEach(function (key) {
      rgSkills.push(
        <RefGpecSkill
          key={key} skillId={key}
          skillData={self.props.skillsModel.skills[key]}
          onSave={self.props.skillsModel.save.bind(self.props.skillsModel)}
          onDestroy={self.props.skillsModel.destroy.bind(self.props.skillsModel)}
          onAskSkillIdExists={self.props.skillsModel.doesSkillExists.bind(self.props.skillsModel)}
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
                  Ces compétences pourront être <a data-toggle="tab" className="nav-link" href="#profils-skills" onClick={this.handleNavigateTab}>associées</a> aux différents <a data-toggle="tab" className="nav-link" href="#profils" onClick={this.handleNavigateTab}>profils</a> en leur associant une <a data-toggle="tab" href="#levels" onClick={this.handleNavigateTab}>modulation</a>.
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

  handleNavigateTab: function (event) {
    this.props.onTabChange(event.target.getAttribute('href'));
  },

  componentDidMount () {

  },



});
