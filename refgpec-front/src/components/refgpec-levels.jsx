import React from 'react';
import RefGpecLevel from './refgpec-level.jsx';
import {NotificationContainer,NotificationManager} from "react-notifications"
var RefGpecLevels = React.createClass({
  displayName: 'RefGpecLevels',

  getInitialState: function () {
    return {
      newShortName: '',
      newFreeComment: '',
    };
  },

  render: function () {
    var self = this;

    // model is not ready ? then do not render anything
    if (self.props.levelsModel.initializing) {
      return null;
    }

    let rgLevels = [];
    Object.keys(self.props.levelsModel.levels).forEach(function (key) {
      rgLevels.push(
        <RefGpecLevel
          key={key} levelId={key}
          levelData={self.props.levelsModel.levels[key]}
          onSave={self.handleSave}
          onDestroy={self.handleDestroy}
          ajaxLoading={self.props.levelsModel.ajaxLoading}
        />);
    });

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
                    <th className="levels-col-shortname">Nom court</th>
                    <th className="levels-col-commentary">Commentaires</th>
                    <th className="levels-col-code">Code</th>
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
                      <textarea className="form-control" rows="2"
                        placeholder="Expliquez en quelque mots la signification de cette modulation de compétence"
                        data-fieldname="newFreeComment"
                        value={this.state.newFreeComment}
                        onChange={this.handleChange}
                        disabled={self.props.levelsModel.ajaxLoading}
                      />
                    </td>
                    <td>
                      <a href="" className="btn fa fa-plus-square fa-2x" role="button"
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
    if (this.props.levelsModel.ajaxLoading) return;
    if (this.state.newShortName) {
      this.props.levelsModel.addLevel(this.state.newShortName, this.state.newFreeComment);
        this.setState({ newShortName: '', newFreeComment: '' });
        let self = this;
            if(! (self.props.levelsModel.feedback)){
                NotificationManager.success('', 'La modulation '+ self.state.newShortName + ' a été ajouté');
            }else
            {NotificationManager.error('',self.props.levelsModel.feedback ); }




    }

    event.preventDefault(); // Let's stop this event.
    event.stopPropagation(); // Really this time.
  },

  handleNavigateTab: function (event) {
    this.props.onTabChange(event.target.getAttribute('href'));
  },

  handleDestroy: function (levelId){
      this.props.levelsModel.destroy(levelId);
      let self = this;
          if(! (self.props.levelsModel.feedback)){
              NotificationManager.success('', 'La modulation '+ levelId + ' a été supprimé');
          }else
          {NotificationManager.error('',self.props.levelsModel.feedback ); }
  },

  handleSave: function (levelId,levelState){
      this.props.levelsModel.save(levelId, levelState);
      let self = this;

          if(! (self.props.levelsModel.feedback)){
              NotificationManager.success('', 'La modulation '+ levelId + ' a été modifié');
          }else
          {NotificationManager.error('',self.props.levelsModel.feedback ); }

  },

  componentDidMount () {

  },



});
export default RefGpecLevels;