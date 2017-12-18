import React from "react";
import RefGpecSkill from "./refgpec-skill.jsx";
import RefGpecNewSkill from "./refgpec-new-skill.jsx";
import RefGpecResearchSkill from "./refgpec-research-skill";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import {CSVLink} from 'react-csv';
var createReactClass = require("create-react-class");
var RefGpecSkills = createReactClass({
  displayName: "RefGpecSkills",

  getInitialState: function() {
    return {
      newSkillType: "",
      newSkillDomain: "",
      newSkillShortName: "",
      newSkillFreeComments: "",
      error: "",
      champtri: "profil_code",
      type_sort: true,
      filter: {SearchSkillType :"",SearchSkillDomain :"",SearchSkillShortName:""},
      lastSkillAdd :[]
    };
  },
  Sort(event) {
    if (this.state.champtri === event.target.id) {
      this.setState({
        champtri: event.target.id,
        type_sort: !this.state.type_sort
      });
    } else {
      this.setState({ champtri: event.target.id, type_sort: true });
    }
  },

    filterList: function(event){
      this.setState({filter:event});
    },

  render: function() {
    var self = this;

    // model is not ready ? then do not render anything
    if (
      self.props.skillsModel.initializing ||
      this.props.skillsDomainsModel.initializing ||
      this.props.skillsTypesModel.initializing
    ) {
      return null;
    }
    let rgSkills = [];
    let skillsadd= [];
    Object.keys(self.props.skillsModel.skills).forEach(function(key,i) {
      if(self.props.skillsModel.skills[key].skill_shortname.toLowerCase().search(self.state.filter.SearchSkillShortName.toLowerCase()) !== -1
        && self.props.skillsModel.skills[key].sd_code.toLowerCase().search(self.state.filter.SearchSkillDomain.toLowerCase()) !== -1
        && self.props.skillsModel.skills[key].st_code.toLowerCase().search(self.state.filter.SearchSkillType.toLowerCase()) !== -1

      ) {
        let skill =
              <RefGpecSkill
                  key={key}
                  skillId={key}
                  skillData={self.props.skillsModel.skills[key]}
                  skillsTypesModel={self.props.skillsTypesModel}
                  skillsDomainsModel={self.props.skillsDomainsModel}
                  profilList={self.props.skillsModel.getListProfils(key)}
                  onProfil={self.handleOpenProfilSkills}
                  onSave={self.handleSave}
                  onDestroy={self.handleDestroy}
                  ajaxLoading={self.props.skillsModel.ajaxLoading}
              />;


              // get list of just added skills to be able to put it in top of the long list
          // so that the user can see the skill he just added
          if(self.props.skillsModel.lastSkillAdd.indexOf(self.props.skillsModel.skills[key].skill_code)!== -1){
              skillsadd.push(i);
          }
          rgSkills.push(skill);
      }
    });



    if (self.state.type_sort) {
      rgSkills.sort(function(a, b) {
        return a.props.skillData[self.state.champtri] >
          b.props.skillData[self.state.champtri]
          ? 1
          : b.props.skillData[self.state.champtri] >
            a.props.skillData[self.state.champtri]
            ? -1
            : 0;
      });
    } else {
      rgSkills.sort(function(a, b) {
        return a.props.skillData[self.state.champtri] <
          b.props.skillData[self.state.champtri]
          ? 1
          : b.props.skillData[self.state.champtri] <
            a.props.skillData[self.state.champtri]
            ? -1
            : 0;
      });

}// once the big list is sorted, we extract "just added skills" from the list
      // and we add it at the first position (top of the list)
      Object.keys(skillsadd).forEach(function(key) {
          rgSkills.unshift((rgSkills.splice(skillsadd[key], 1)[0]));
      });

    return (
      <div id="skills">
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-default">
              <div className="panel-heading row" style={{    marginRight: "0px" , marginLeft:"0px"}}>
                <div className="col-md-6  text center">Référentiel des compétences </div>
                <div className="col-md-6 text center">
                  {(() => {
                      if (Object.keys(self.props.skillsModel.skillCSV).length !==0) {
                          let date =  new Date().getFullYear() + "-"+new Date().getMonth()+"-"+ new Date().getDate();
                          return (
                              <CSVLink  data={self.props.skillsModel.skillCSV} style={{backgroundColor:"#8dc63f",float:"right"}}
                                        title="Cliquez pour télecharger le réferentiel des compétences en csv"
                                        separator={";"}
                                        filename={"Référentiel des compétences - GPEC - "+date+".csv"}
                                        className="btn btn-primary"
                                        target="_blank">
                                Exporter en CSV
                              </CSVLink>
                          );
                      }
                  })()}
                </div>
              </div>
                  <div className="panel-body">
                    Depuis cet onglet il est possible d'administrer le référentiel
                    des compétences.<br />
                    Ces compétences pourront être{" "}
                    <a
                        data-toggle="tab"
                        className="nav-link"
                        href="#profils-skills"
                        onClick={this.handleNavigateTab}
                    >
                      associées
                    </a>{" "}
                    aux différents{" "}
                    <a
                        data-toggle="tab"
                        className="nav-link"
                        href="#profils"
                        onClick={this.handleNavigateTab}
                    >
                      profils
                    </a>{" "}
                    en leur associant une{" "}
                    <a
                        data-toggle="tab"
                        href="#levels"
                        onClick={this.handleNavigateTab}
                    >
                      modulation
                    </a>.
              <div className="col-col-md-pull-10">

                </div>
              </div>


            </div>
            <table
                id="skills-list"
                className="table table-striped table-bordered"
            >
              <tbody>
            <RefGpecResearchSkill
                skillsModel={self.props.skillsModel}
                skillsTypesModel={self.props.skillsTypesModel}
                skillsDomainsModel={self.props.skillsDomainsModel}
                onChange={this.filterList}
            />
              </tbody>
            </table>
            <table
              id="skills-list"
              className="table table-striped table-bordered"
            >
              <thead>
                <tr>
                  <th className="skills-col-action" />
                  <th
                    title="Cliquez pour trier par Type"
                    role="button"
                    id="st_code"
                    onClick={this.Sort}
                    className="skills-col-type"
                  >
                    Type <i className="fa fa-sort" aria-hidden="true" />
                  </th>
                  <th
                    title="Cliquez pour trier par Domaine"
                    role="button"
                    id="sd_code"
                    onClick={this.Sort}
                    className="skills-col-domain"
                  >
                    Domaine <i className="fa fa-sort" aria-hidden="true" />
                  </th>
                  <th
                    title="Cliquez pour trier par Nom"
                    role="button"
                    id="skill_shortname"
                    onClick={this.Sort}
                    className="skills-col-shortname"
                  >
                    Nom de la compétence{" "}
                    <i className="fa fa-sort" aria-hidden="true" />
                  </th>
                  <th
                    title="Cliquez pour trier par Commentaire"
                    role="button"
                    id="skill_free_comments"
                    onClick={this.Sort}
                    className="skills-col-commentary"
                  >
                    Commentaires libres{" "}
                    <i className="fa fa-sort" aria-hidden="true" />
                  </th>
                  <th
                    title="Cliquez pour trier par Code"
                    role="button"
                    id="skill_code"
                    onClick={this.Sort}
                    className="skills-col-code"
                  >
                    Code
                  </th>
                </tr>
              </thead>
              <tbody>
              {/* FORM USED TO CREATE A NEW SKILL */}
              <RefGpecNewSkill
                  skillsModel={self.props.skillsModel}
                  skillsTypesModel={self.props.skillsTypesModel}
                  skillsDomainsModel={self.props.skillsDomainsModel}
                  onSubmit = {self.handleAddSkills}
                />

              <tr><td colSpan="6" style={{height:"25px"}}></td></tr>

                {rgSkills}


              </tbody>
            </table>

            <div
              className="progress"
              style={{
                display: self.props.skillsModel.ajaxLoading ? "block" : "none"
              }}
            >
              <div
                className="progress-bar progress-bar-striped active"
                role="progressbar"
                style={{ width: "100%" }}
              />
            </div>
          </div>
        </div>
        <NotificationContainer />
      </div>
    );
  },



  handleAddSkills: function(newSkillType,newSkillDomain,newSkillShortName,newSkillFreeComments) {
    const self = this;
    if (self.props.skillsModel.ajaxLoading) return;
    if (
     newSkillShortName &&
      newSkillDomain &&
     newSkillType
    ) {
      self.props.skillsModel.addSkill(
       newSkillType,
        newSkillDomain,
       newSkillShortName,
        newSkillFreeComments,
        function() {
          if (!self.props.skillsModel.feedback) {
            NotificationManager.success(
              "",
              "La compétence " + newSkillShortName + " a été ajoutée"
            );
          } else {
            NotificationManager.error("", self.props.skillsModel.feedback);
          }
        }
      );

      self.setState({
        newSkillType: "",
        newSkillDomain: "",
        newSkillShortName: "",
        newSkillFreeComments: "",
        error: "",
      });

    } else {
      var missingFields = [];
      if (!newSkillShortName)
        missingFields.push("Nom de la compétence");
      if (!newSkillDomain) missingFields.push("Domaine");
      if (!newSkillType) missingFields.push("Type");
      self.setState({
        error:
          "Il manque des champs avant de pouvoir ajouter la compétence :\n" +
          missingFields.join(", ")
      });
      // setTimeout(function () {
      //   $('#skills-new-skill').popover(self.state.error ? 'show' : 'hide');
      //   setTimeout(function () {
      //     $('#skills-new-skill').popover('hide');
      //   }, 5000);
      // }, 100);
    }
  },

  handleNavigateTab: function(event) {
      window.scrollTo(0, 0);
    this.props.onTabChange(event.target.getAttribute("href"));
  },
  handleDestroy: function(skillId) {
    let self = this;
    self.props.skillsModel.destroy(skillId, function() {
      if (!self.props.skillsModel.feedback) {

        NotificationManager.success(
          "",
          "La compétence " + skillId + " a été supprimée"
        );
        self.props.profilsSkillsModel.updateVue();
        self.props.skillsModel.inform();
      } else {
        NotificationManager.error("", self.props.skillsModel.feedback);
      }
    });
  },

  handleSave: function(skillId, SkillState) {
    let self = this;

    this.props.skillsModel.save(skillId, SkillState, function() {
      if (!self.props.skillsModel.feedback) {
          self.props.skillsModel.updateVue();
          self.props.profilsSkillsModel.updateVue();
        NotificationManager.success(
          "",
          "La compétence " + skillId + " a été modifiée"
        );
      } else {
        NotificationManager.error("", self.props.skillsModel.feedback);
      }
    });
  },
  componentDidMount() {},

    handleOpenProfilSkills: function(event) {
        this.props.profilsSkillsModel.getProfilSkillLevel(event.target.id);
    },

  missingField() {
    return (
      !this.state.newSkillShortName ||
      !this.state.newSkillDomain ||
      !this.state.newSkillType
    );
  }
});
export default RefGpecSkills;
