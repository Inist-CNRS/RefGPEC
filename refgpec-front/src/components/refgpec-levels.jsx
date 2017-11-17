import React from 'react';
import RefGpecLevel from './refgpec-level.jsx';
import {NotificationContainer,NotificationManager} from "react-notifications"
var createReactClass = require('create-react-class');
var RefGpecLevels = createReactClass({
  displayName: 'RefGpecLevels',

  getInitialState: function () {
    return {
      newShortName: '',
      newFreeComment: '',
        newNumber:'0',
      champtri :'level_code',
      type_tri : true,
    };
  },
    trieprofil(event){
        if(this.state.champtri===event.target.id){
            this.setState({champtri: event.target.id,type_tri : !this.state.type_tri});
        }else{
            this.setState({champtri: event.target.id,type_tri:true});
        }

    },

  render: function () {
    var self = this;

    // model is not ready ? then do not render anything
    if (self.props.levelsModel.initializing) {
      return null;
    }

    let rgLevels = [];

    Object.keys(self.props.levelsModel.levels).forEach(function (key) {
    let nb_skill={};
    let liste_profil=self.props.levelsModel.getlistprofils(key);
            Object.keys(liste_profil).forEach(function (profil) {
                nb_skill[liste_profil[profil].profil_code]= self.props.levelsModel.getnbSkill(key,liste_profil[profil].profil_code);
            });
      rgLevels.push(
        <RefGpecLevel
          key={key} levelId={key}
          levelData={self.props.levelsModel.levels[key]}
          profillist={liste_profil}
          nbSkill={nb_skill}
          max = {self.props.levelsModel.max}
          onSave={self.handleSave}
          onDestroy={self.handleDestroy}
          ajaxLoading={self.props.levelsModel.ajaxLoading}
        />);
    });
   
      if(self.state.type_tri){
          rgLevels.sort(function(a,b){return (a.props.levelData[self.state.champtri] > b.props.levelData[self.state.champtri]) ? 1 : ((b.props.levelData[self.state.champtri] > a.props.levelData[self.state.champtri]) ? -1 : 0);} );
      }else{
          rgLevels.sort(function(a,b){return (a.props.levelData[self.state.champtri] < b.props.levelData[self.state.champtri]) ? 1 : ((b.props.levelData[self.state.champtri] < a.props.levelData[self.state.champtri]) ? -1 : 0);} );

      }
    return (

        // MODULATIONS DES COMPETENCES
        <div id="levels">

          <div className="row">
            <div className="col-md-12">

              <div className="panel panel-default">
                <div className="panel-heading">Modulations des compétences</div>
                <div className="panel-body">
                  <p>Depuis cet onglet il est possible d'administrer les différentes modulations que l'on pourra ensuite <a onClick={this.handleNavigateTab} data-toggle="tab" className="nav-link" href="#profils-skills">associer à chaques compétences</a>.</p>
                </div>
              </div>
              
              <table id="levels-list" className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th className="levels-col-action"></th>
                      <th title="Cliquez pour trier par Nom court" role="button"  id="level_shortname" onClick={this.trieprofil}  className="levels-col-shortname">Nom Court <i className="fa fa-sort" aria-hidden="true"></i> </th>
                      <th title="Cliquez pour trier par Niveau" role="button"  id="level_number" onClick={this.trieprofil} className="levels-col-number"> Niveau <i className="fa fa-sort" aria-hidden="true"></i> </th>
                    <th title="Cliquez pour trier par Commentaires"  role="button" id="level_free_comments" onClick={this.trieprofil}  className="levels-col-commentary">Commentaires <i className="fa fa-sort" aria-hidden="true"></i> </th>
                    <th title="Cliquez pour trier par Code"  role="button" id="level_code" onClick={this.trieprofil}  className="levels-col-code">Code <i className="fa fa-sort" aria-hidden="true"></i> </th>
                  </tr>
                </thead>
                <tbody>
                  
                  {rgLevels}

                  {/* FORM USED TO CREATE A NEW LEVEL */}
                  <tr className="form-new-level">
                    <td></td>

                    <td>
                      <input className="form-control" type="text"
                        placeholder="Nom court de la modulation"
                        data-fieldname="newShortName"
                        value={this.state.newShortName}
                        onChange={this.handleChange}
                        onKeyPress={this.handleKeyPress}
                        disabled={self.props.levelsModel.ajaxLoading}
                       />
                    </td>
                      <td>
                          <input className="form-control" type="number"
                                 min="1" max ={this.props.levelsModel.max+1}
                                 placeholder="Niveau de la modulation"
                                 data-fieldname="newNumber"
                                 value={this.state.newNumber}
                                 onChange={this.handleChange}
                                 disabled={this.props.levelsModel.ajaxLoading}
                          />
                      </td>
                    <td>
                      <textarea className="form-control" rows="2"
                        placeholder="Expliquez en quelque mots la signification de cette modulation de compétence"
                        data-fieldname="newFreeComment"
                        value={this.state.newFreeComment}
                        onChange={this.handleChange}
                        disabled={self.props.levelsModel.ajaxLoading}
                      />
                    </td>
                    <td>
                      <a href="" className="fa fa-plus-square fa-2x" role="button"
                         onClick={this.handleSubmit}
                         disabled={self.props.levelsModel.ajaxLoading}
                         title="Ajouter cette modulation" />
                    </td>
                  </tr>

                </tbody>
              </table>

              <div className="progress"
                   style={{display: self.props.levelsModel.ajaxLoading ? 'block' : 'none'}}>
                <div className="progress-bar progress-bar-striped active" role="progressbar"
                     style={{width: '100%'}}>
                </div>
              </div>

            </div>
          </div>

          <NotificationContainer/>
        </div> // MODULATIONS DES COMPETENCES

    );

  },

    handleChange: function (event) {
    let newState = {};
    if(event.target.getAttribute('data-fieldname')==="newNumber"){
        newState[event.target.getAttribute('data-fieldname')] = event.target.value;

        if(parseInt(event.target.value,10 )> (this.props.levelsModel.max+2)){
            newState[event.target.getAttribute('data-fieldname')] = this.props.levelsModel.max+1;
        }

        if(parseInt(event.target.value,10 ) < 1){
                newState[event.target.getAttribute('data-fieldname')] = 1;
        }

    }else{
        newState[event.target.getAttribute('data-fieldname')] = event.target.value;
    }
    this.setState(newState);
  },


  handleSubmit: function (event) {
    if (this.props.levelsModel.ajaxLoading) return;
      let self = this;
    if (this.state.newShortName && this.state.newNumber ) {

      this.props.levelsModel.addLevel(this.state.newNumber,this.state.newShortName, this.state.newFreeComment,function(){
          self.setState({newNumber:'', newShortName: '', newFreeComment: '' });
          if(! (self.props.levelsModel.feedback)){
              NotificationManager.success('', 'La modulation '+ self.state.newShortName + ' a été ajoutée');
          }else
          {NotificationManager.error('',self.props.levelsModel.feedback ); }
      });
    }

    event.preventDefault(); // Let's stop this event.
    event.stopPropagation(); // Really this time.
  },

  handleNavigateTab: function (event) {
    this.props.onTabChange(event.target.getAttribute('href'));
  },

  handleDestroy: function (levelId){
      let self = this;
      self.props.levelsModel.destroy(levelId,function(){
          if(! (self.props.levelsModel.feedback)){
              NotificationManager.success('', 'La modulation '+ levelId + ' a été supprimée');
              self.props.profilsSkillsModel.updateVue();
              self.props.levelsModel.inform();
          }else
          {NotificationManager.error('',self.props.levelsModel.feedback ); }
      });

  },

  handleSave: function (levelId,levelState){
      let self = this;
      this.props.levelsModel.save(levelId, levelState,function(){
          if(! (self.props.levelsModel.feedback)){
              NotificationManager.success('', 'La modulation '+ levelId + ' a été modifiée')
          }else
          {NotificationManager.error('',self.props.levelsModel.feedback ); }
      });
  },

  componentDidMount () {

  },



});
export default RefGpecLevels;