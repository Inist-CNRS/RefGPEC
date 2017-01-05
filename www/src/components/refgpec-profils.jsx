import React from 'react';

module.exports = React.createClass({
  displayName: 'RefGpecProfils',

  getInitialState: function () {
    return {};
  },

  render: function () {
    var self = this;

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

                  <tr>
                    <td>
                      <div className="btn-group">
                        <button type="button" className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span className="caret"></span></button>
                        <ul className="dropdown-menu">
                          <li><a href="#"><span className="glyphicon glyphicon-link"></span> Associer des compétences à ce profil</a></li>
                          <li><a href="#"><span className="fa fa-file-pdf-o"></span> Mettre à jour le PDF du profil</a></li>
                          <li><a href="#"><span className="glyphicon glyphicon-remove"></span> Supprimer le profil</a></li>
                        </ul>
                      </div>
                    </td>
                    <td className="text-center">
                      <a href="/profils/dpi-spproj-1.pdf"><span className="fa fa-file-pdf-o fa-2x"></span></a>
                    </td>
                    <td>
                      <select className="form-control">
                        <option></option>
                        <option value="INIST/SGAL/STL">SGAL/STL</option>
                        <option value="INIST/SGAL/SRHU/SP">SGAL/SRHU/SP</option>
                        <option value="INIST/SGAL/SRHU">SGAL/SRHU</option>
                        <option value="INIST/SGAL/SFJ">SGAL/SFJ</option>
                        <option value="INIST/SGAL">SGAL</option>
                        <option value="INIST">INIST</option>
                        <option value="INIST/DSI/SIPROD">DSI/SIPROD</option>
                        <option value="INIST/DSI/SIDEV">DSI/SIDEV</option>
                        <option value="INIST/DSI/SBUR">DSI/SBUR</option>
                        <option value="INIST/DSI">DSI</option>
                        <option value="INIST/DPI/SRDE">DPI/SRDE</option>
                        <option value="INIST/DPI/SPPROJ" selected>DPI/SPPROJ</option>
                        <option value="INIST/DPI">DPI</option>
                        <option value="INIST/DOS/SPUB/EQVALOBBD">DOS/SPUB/EQVALOBBD</option>
                        <option value="INIST/DOS/SPUB/EQTRAD">DOS/SPUB/EQTRAD</option>
                        <option value="INIST/DOS/SPUB/EQSWEB">DOS/SPUB/EQSWEB</option>
                        <option value="INIST/DOS/SPUB/EQSENN">DOS/SPUB/EQSENN</option>
                        <option value="INIST/DOS/SPUB">DOS/SPUB</option>
                        <option value="INIST/DOS/SDOC/EQPORT">DOS/SDOC/EQPORT</option>
                        <option value="INIST/DOS/SDOC/EQNEG">DOS/SDOC/EQNEG</option>
                        <option value="INIST/DOS/SDOC/EQFDD">DOS/SDOC/EQFDD</option>
                        <option value="INIST/DOS/SDOC">DOS/SDOC</option>
                        <option value="INIST/DOS/SAV/SAP">DOS/SAV/SAP</option>
                        <option value="INIST/DOS/SAV/EQVALODR">DOS/SAV/EQVALODR</option>
                        <option value="INIST/DOS/SAV/EQTERM">DOS/SAV/EQTERM</option>
                        <option value="INIST/DOS/SAV">DOS/SAV</option>
                        <option value="INIST/DOS">DOS</option>
                        <option value="INIST/DDO/SF">DDO/SF</option>
                        <option value="INIST/DDO/SCOO">DDO/SCOO</option>
                        <option value="INIST/DDO/SCOM">DDO/SCOM</option>
                        <option value="INIST/DDO">DDO</option>
                      </select>                    
                    </td>
                    <td><input className="form-control" type="text" placeholder="Intitulé du profil" value="Responsable du Service « Pilotage des projets »" /></td>
                    <td>
                      <p>
                        <a href="#"><span className="glyphicon glyphicon-link" title="Associer des compétences à ce profil"></span></a>
                        <span className="label label-danger">0 savoir-faire</span>
                        <span className="label label-success">2 savoir-être</span>
                        <span className="label label-warning">1 savoirs</span>
                      </p>
                    </td>
                    <td><textarea className="form-control" rows="1" placeholder="Commentaires libres"></textarea></td>
                    <td><input className="form-control" type="text" readOnly title="p-dpi_spproj-1" value="p-dpi_spproj-1" /></td>
                  </tr>



                  <tr>
                    <td>
                      <div className="btn-group">
                        <button type="button" className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span className="caret"></span></button>
                        <ul className="dropdown-menu">
                          <li><a href="#"><span className="glyphicon glyphicon-link"></span> Associer des compétences à ce profil</a></li>
                          <li><a href="#"><span className="fa fa-file-pdf-o"></span> Mettre à jour le PDF du profil</a></li>
                          <li><a href="#"><span className="glyphicon glyphicon-remove"></span> Supprimer le profil</a></li>
                        </ul>
                      </div>
                    </td>
                    <td className="text-center">
                      <a href="/profils/dos-spub-eqvalobbd-1.pdf"><span className="fa fa-file-pdf-o fa-2x"></span></a>
                    </td>
                    <td>
                      <select className="form-control">
                        <option></option>
                        <option value="INIST/SGAL/STL">SGAL/STL</option>
                        <option value="INIST/SGAL/SRHU/SP">SGAL/SRHU/SP</option>
                        <option value="INIST/SGAL/SRHU">SGAL/SRHU</option>
                        <option value="INIST/SGAL/SFJ">SGAL/SFJ</option>
                        <option value="INIST/SGAL">SGAL</option>
                        <option value="INIST">INIST</option>
                        <option value="INIST/DSI/SIPROD">DSI/SIPROD</option>
                        <option value="INIST/DSI/SIDEV">DSI/SIDEV</option>
                        <option value="INIST/DSI/SBUR">DSI/SBUR</option>
                        <option value="INIST/DSI">DSI</option>
                        <option value="INIST/DPI/SRDE">DPI/SRDE</option>
                        <option value="INIST/DPI/SPPROJ">DPI/SPPROJ</option>
                        <option value="INIST/DPI">DPI</option>
                        <option value="INIST/DOS/SPUB/EQVALOBBD" selected>DOS/SPUB/EQVALOBBD</option>
                        <option value="INIST/DOS/SPUB/EQTRAD">DOS/SPUB/EQTRAD</option>
                        <option value="INIST/DOS/SPUB/EQSWEB">DOS/SPUB/EQSWEB</option>
                        <option value="INIST/DOS/SPUB/EQSENN">DOS/SPUB/EQSENN</option>
                        <option value="INIST/DOS/SPUB">DOS/SPUB</option>
                        <option value="INIST/DOS/SDOC/EQPORT">DOS/SDOC/EQPORT</option>
                        <option value="INIST/DOS/SDOC/EQNEG">DOS/SDOC/EQNEG</option>
                        <option value="INIST/DOS/SDOC/EQFDD">DOS/SDOC/EQFDD</option>
                        <option value="INIST/DOS/SDOC">DOS/SDOC</option>
                        <option value="INIST/DOS/SAV/SAP">DOS/SAV/SAP</option>
                        <option value="INIST/DOS/SAV/EQVALODR">DOS/SAV/EQVALODR</option>
                        <option value="INIST/DOS/SAV/EQTERM">DOS/SAV/EQTERM</option>
                        <option value="INIST/DOS/SAV">DOS/SAV</option>
                        <option value="INIST/DOS">DOS</option>
                        <option value="INIST/DDO/SF">DDO/SF</option>
                        <option value="INIST/DDO/SCOO">DDO/SCOO</option>
                        <option value="INIST/DDO/SCOM">DDO/SCOM</option>
                        <option value="INIST/DDO">DDO</option>
                      </select>                    
                    </td>
                    <td><input className="form-control" type="text" placeholder="Intitulé du profil" value="Chargé de valorisation des bases documentaires" /></td>
                    <td>
                      <p>
                        <a href="#"><span className="glyphicon glyphicon-link" title="Associer des compétences à ce profil"></span></a>
                        <span className="label label-success">5 savoir-faire</span>
                        <span className="label label-success">3 savoir-être</span>
                        <span className="label label-success">6 savoirs</span>
                      </p>
                    </td>
                    <td><textarea className="form-control" rows="1" placeholder="Commentaires libres"></textarea></td>
                    <td><input className="form-control" type="text" readOnly title="p-dos_spub_eqvalobbd-1" value="p-dos_spub_eqvalobbd-1" /></td>
                  </tr>






                  <tr>
                    <td>
                    </td>
                    <td className="text-center">
                      <a href="#">
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
                              <div className="alert alert-info" role="alert">Le nom du fichier sur le disque dure n'a pas d'importance, il sera renommé par RefGPEC en fonction du code du profil.</div>
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
                      <select className="form-control">
                        <option></option>
                        <option value="INIST/SGAL/STL">SGAL/STL</option>
                        <option value="INIST/SGAL/SRHU/SP">SGAL/SRHU/SP</option>
                        <option value="INIST/SGAL/SRHU">SGAL/SRHU</option>
                        <option value="INIST/SGAL/SFJ">SGAL/SFJ</option>
                        <option value="INIST/SGAL">SGAL</option>
                        <option value="INIST">INIST</option>
                        <option value="INIST/DSI/SIPROD">DSI/SIPROD</option>
                        <option value="INIST/DSI/SIDEV">DSI/SIDEV</option>
                        <option value="INIST/DSI/SBUR">DSI/SBUR</option>
                        <option value="INIST/DSI">DSI</option>
                        <option value="INIST/DPI/SRDE">DPI/SRDE</option>
                        <option value="INIST/DPI/SPPROJ">DPI/SPPROJ</option>
                        <option value="INIST/DPI">DPI</option>
                        <option value="INIST/DOS/SPUB/EQVALOBBD">DOS/SPUB/EQVALOBBD</option>
                        <option value="INIST/DOS/SPUB/EQTRAD">DOS/SPUB/EQTRAD</option>
                        <option value="INIST/DOS/SPUB/EQSWEB">DOS/SPUB/EQSWEB</option>
                        <option value="INIST/DOS/SPUB/EQSENN">DOS/SPUB/EQSENN</option>
                        <option value="INIST/DOS/SPUB">DOS/SPUB</option>
                        <option value="INIST/DOS/SDOC/EQPORT">DOS/SDOC/EQPORT</option>
                        <option value="INIST/DOS/SDOC/EQNEG">DOS/SDOC/EQNEG</option>
                        <option value="INIST/DOS/SDOC/EQFDD">DOS/SDOC/EQFDD</option>
                        <option value="INIST/DOS/SDOC">DOS/SDOC</option>
                        <option value="INIST/DOS/SAV/SAP">DOS/SAV/SAP</option>
                        <option value="INIST/DOS/SAV/EQVALODR">DOS/SAV/EQVALODR</option>
                        <option value="INIST/DOS/SAV/EQTERM">DOS/SAV/EQTERM</option>
                        <option value="INIST/DOS/SAV">DOS/SAV</option>
                        <option value="INIST/DOS">DOS</option>
                        <option value="INIST/DDO/SF">DDO/SF</option>
                        <option value="INIST/DDO/SCOO">DDO/SCOO</option>
                        <option value="INIST/DDO/SCOM">DDO/SCOM</option>
                        <option value="INIST/DDO">DDO</option>
                      </select>                    
                    </td>
                    <td><input className="form-control" type="text" placeholder="Intitulé du profil" value="" /></td>
                    <td>
                      <p>
                        <a href="#"><span className="glyphicon glyphicon-link" title="Associer des compétences à ce profil"></span></a>
                        <span className="label label-danger">0 savoir-faire</span>
                        <span className="label label-danger">0 savoir-être</span>
                        <span className="label label-danger">0 savoirs</span>
                      </p>
                    </td>
                    <td><textarea className="form-control" rows="1" placeholder="Commentaires libres"></textarea></td>
                    <td><input className="form-control" type="text" readOnly title="" value="" /></td>
                  </tr>






                </tbody>
              </table>
              <input className="btn btn-primary btn-lg" type="submit" value="Enregistrer" />



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
