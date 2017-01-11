import React from 'react';
import RefGpecProfil from './refgpec-profil.jsx';

module.exports = React.createClass({
  displayName: 'RefGpecProfils',

  getInitialState: function () {
    return {
      newProfilType: '',
      newProfilDomain: '',
      newProfilShortName: '',
      newProfilFreeComments: '',
      error: ''
    };
  },

  render: function () {
    var self = this;

    let rgProfils = [];
    Object.keys(self.props.profilsModel.profils).forEach(function (key) {
      rgProfils.push(
        <RefGpecProfil
          key={key} profilId={key}
          profilData={self.props.profilsModel.profils[key]}
          onSave={self.props.profilsModel.save.bind(self.props.profilsModel)}
          onDestroy={self.props.profilsModel.destroy.bind(self.props.profilsModel)}
          ajaxLoading={self.props.profilsModel.ajaxLoading}
        />);
    });

    return (
 
         <div id="profils">

          <div className="row">
            <div className="col-md-12">

              <div className="panel panel-default">
                <div className="panel-heading">Profils de poste</div>
                <div className="panel-body">
                  <p>
                  Depuis cet onglet il est possible d'ajouter et de supprimer des profils de poste. Ces mêmes profils seront ensuite disponibles dans l'onglet <a data-toggle="tab" href="#profils-skills" onClick={this.handleNavigateTab}>Profils &amp; Compétences</a> pour pouvoir leur associer des <a data-toggle="tab" href="#skills" onClick={this.handleNavigateTab}>compétences</a> <a data-toggle="tab" href="#levels" onClick={this.handleNavigateTab}>modulées</a>.
                  </p>
                </div>
              </div>


              <table id="profils-list" className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th className="profils-col-action"></th>
                    <th className="profils-col-file">PDF du profil</th>
                    <th className="profils-col-orga">Position dans l'organigramme</th>
                    <th className="profils-col-title">Intitulé du profil</th>
                    <th className="profils-col-stats">Nombre de compétences associées</th>
                    <th className="profils-col-commentary">Commentaires libres</th>
                    <th className="profils-col-code">Code</th>
                  </tr>
                </thead>
                <tbody>

                  {rgProfils}

                  {/* FORM USED TO CREATE A NEW SKILL => TODO*/}


                </tbody>
              </table>

              <div className="progress"
                   style={{display: self.props.profilsModel.ajaxLoading ? 'block' : 'none'}}>
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
