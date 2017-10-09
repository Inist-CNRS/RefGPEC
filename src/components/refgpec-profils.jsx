import React from 'react';
import RefGpecProfil from './refgpec-profil.jsx';
import $ from 'jquery';
var RefGpecProfils = React.createClass({
  displayName: 'RefGpecProfils',

  getInitialState: function () {
    return {
      newProfilOrga: '',
      newProfilShortName: '',
      newProfilFreeComments: '',
      error: ''
    };
  },

  render: function () {
    var self = this;

    // model is not ready ? then do not render anything
    if (self.props.profilsModel.initializing ||
        self.props.orgaModel.initializing) {
      return null;
    }

    let rgProfils = [];
    Object.keys(self.props.profilsModel.profils).forEach(function (key) {
      rgProfils.push(
        <RefGpecProfil
          key={key} profilId={key}
          orgaModel={self.props.orgaModel}
          profilData={self.props.profilsModel.profils[key]}
          onSave={self.props.profilsModel.save.bind(self.props.profilsModel)}
          onDestroy={self.props.profilsModel.destroy.bind(self.props.profilsModel)}
          ajaxLoading={self.props.profilsModel.ajaxLoading}
        />);
    });

    let rgOrgaList = [];
    Object.keys(self.props.orgaModel.orga).forEach(function (key) {
      rgOrgaList.push(<option value={key} key={key}>{self.props.orgaModel.orga[key].orgaShortName}</option>);
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

                  {/* FORM USED TO CREATE A NEW PROFIL */}
                  <tr className="form-new-profil">
                   
                    <td></td>

                    <td className="text-center">
                      <a href="" onClick={this.handleNoClick}>
                        <span className="fa fa-upload fa-2x" data-toggle="modal" data-target="#profils-file-modal"></span>
                      </a>

                      {/* Modal d'upload du fichier PDF du profil de poste */}
                      <div className="modal fade" id="profils-file-modal" tabIndex="-1" role="dialog">
                        <div className="modal-dialog" role="document">
                          <div className="modal-content">
                            <div className="modal-header">
                              <button type="button" className="close" data-dismiss="modal" aria-label="Ferme"><span aria-hidden="true">&times;</span></button>
                              <h4 className="modal-title">Uploader le PDF du profil de poste</h4>
                            </div>
                            <div className="modal-body">
                              <p><input className="form-control" type="file" placeholder="PDF du profil" accept="application/pdf" /></p>
                              <div className="alert alert-info" role="alert">Le nom du fichier sur le disque dur n'a pas d'importance, il sera renommé par RefGPEC en fonction du code du profil.</div>
                            </div>
                            <div className="modal-footer">
                              <button type="button" className="btn btn-default" data-dismiss="modal">Fermer</button>
                              <button type="button" className="btn btn-primary">Uploader</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <select className="form-control"
                        value={this.state.newProfilOrga}
                        data-fieldname="newProfilOrga"
                        onChange={this.handleChange}
                        disabled={this.props.profilsModel.ajaxLoading}
                      >
                        <option></option>
                        
                        {rgOrgaList}

                      </select>                    
                    </td>

                    <td colSpan="2">
                      <input className="form-control" type="text"
                        placeholder="Intitulé du profil"
                        value={this.state.newProfilShortName}
                        data-fieldname="newProfilShortName"
                        onChange={this.handleChange}
                        onKeyPress={this.handleKeyPress}
                        disabled={this.props.profilsModel.ajaxLoading}
                      />
                    </td>

                    <td>
                      <textarea className="form-control" rows="1"
                        placeholder="Commentaires libres"
                        value={this.state.newProfilFreeComments}
                        data-fieldname="newProfilFreeComments"
                        onChange={this.handleChange}
                        disabled={this.props.profilsModel.ajaxLoading}
                      />
                    </td>

                    <td id="profils-new-profil"
                        data-placement="top" data-toggle="popover"
                        data-trigger="manual" data-title="Erreur nouveau profil"
                        data-content={this.state.error}
                    >
                      <a href="" className="btn fa fa-plus-square fa-2x" role="button"
                         onClick={this.handleSubmit}
                         disabled={self.props.profilsModel.ajaxLoading}
                         title="Ajouter ce profil au référentiel" />
                    </td>
                  </tr>


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

  handleNoClick: function (event) {
    event.preventDefault(); // Let's stop this event.
    event.stopPropagation(); // Really this time.
  },

  handleNavigateTab: function (event) {
    this.props.onTabChange(event.target.getAttribute('href'));
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
    
    if (self.props.profilsModel.ajaxLoading) return;
    if (self.state.newProfilShortName && self.state.newProfilOrga) {
      self.props.profilsModel.addProfil(
        self.state.newProfilOrga, self.state.newProfilShortName, self.state.newProfilFreeComments
      );
      self.setState({
        newProfilOrga: '',
        newProfilShortName: '',
        newProfilFreeComments: '',
      });
    } else {
      var missingFields = [];
      if (!self.state.newProfilShortName) missingFields.push('Intitulé du profil');
      if (!self.state.newProfilOrga) missingFields.push('Position dans l\'organigramme');
      self.setState({ error: 'Il manque des champs avant de pouvoir ajouter le profil :\n' + missingFields.join(', ') });
      setTimeout(function () {
        $('#profils-new-profil').popover(self.state.error ? 'show' : 'hide');
        setTimeout(function () {
          $('#profils-new-profil').popover('hide');
        }, 5000);
      }, 100);
    }

    event.preventDefault(); // Let's stop this event.
    event.stopPropagation(); // Really this time.
  },


  componentDidMount () {

//    $().modal();
  },



});
export default RefGpecProfils;