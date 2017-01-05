import React from 'react';

module.exports = React.createClass({
  displayName: 'RefGpecSkills',

  getInitialState: function () {
    return {};
  },

  render: function () {
    var self = this;

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
                  

                  <tr>
                    <td>
                      <div className="btn-group">
                        <button type="button" className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span className="caret"></span></button>
                        <ul className="dropdown-menu">
                          <li><a href="#"><span className="glyphicon glyphicon-remove"></span> Supprimer la compétence</a></li>
                          <li><a href="#"><span className="glyphicon glyphicon-list"></span> Visualiser les profils ayant cette compétence</a></li>
                        </ul>
                      </div>
                    </td>
                    <td>
                      <select className="form-control">
                        <option></option>
                        <option value="tsf">Savoir-faire</option>
                        <option value="tse">Savoir-être</option>
                        <option value="ts" selected>Savoir</option>
                      </select>
                    </td>
                    <td>
                      <select className="form-control">
                        <option></option>
                        <option value="gen">Général</option>
                        <option value="comm">Communication</option>
                        <option value="geadmin">Gestion administrative</option>
                        <option value="info">Informatique</option>
                        <option value="inist">Inist-CNRS</option>
                        <option value="ist">IST</option>
                        <option value="lang" selected>Langues</option>
                        <option value="manag">Management</option>
                        <option value="outils">Outils</option>
                      </select>
                    </td>
                    <td><input className="form-control" type="text" placeholder="Nom de la compétence" value="Anglais" /></td>
                    <td><textarea className="form-control" rows="1" placeholder="Commentaires libres">Anglais, écrit, oral, tout confondu</textarea></td>
                    <td><input className="form-control" type="text" readOnly title="Code de la compétence" value="ts-lang-1" /></td>
                  </tr>


                  <tr>
                    <td>
                      <div className="btn-group">
                        <button type="button" className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span className="caret"></span></button>
                        <ul className="dropdown-menu">
                          <li><a href="#"><span className="glyphicon glyphicon-remove"></span> Supprimer la compétence</a></li>
                          <li><a href="#"><span className="glyphicon glyphicon-list"></span> Visualiser les profils ayant cette compétence</a></li>
                        </ul>
                      </div>
                    </td>
                    <td>
                      <select className="form-control">
                        <option></option>
                        <option value="tsf">Savoir-faire</option>
                        <option value="tse" selected>Savoir-être</option>
                        <option value="ts">Savoir</option>
                      </select>
                    </td>
                    <td>
                      <select className="form-control">
                        <option></option>
                        <option value="gen" selected>Général</option>
                        <option value="comm">Communication</option>
                        <option value="geadmin">Gestion administrative</option>
                        <option value="info">Informatique</option>
                        <option value="inist">Inist-CNRS</option>
                        <option value="ist">IST</option>
                        <option value="lang">Langues</option>
                        <option value="manag">Management</option>
                        <option value="outils">Outils</option>
                      </select>
                    </td>
                    <td><input className="form-control" type="text" placeholder="Nom de la compétence" value="Participation à des instances/groupes de travail" /></td>
                    <td><textarea className="form-control" rows="1" placeholder="Commentaires libres"></textarea></td>
                    <td><input className="form-control" type="text" readOnly title="Code de la compétence" value="tse-gen-1" /></td>
                  </tr>


                  <tr>
                    <td>
                      <div className="btn-group">
                        <button type="button" className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span className="caret"></span></button>
                        <ul className="dropdown-menu">
                          <li><a href="#"><span className="glyphicon glyphicon-remove"></span> Supprimer la compétence</a></li>
                          <li><a href="#"><span className="glyphicon glyphicon-list"></span> Visualiser les profils ayant cette compétence</a></li>
                        </ul>
                      </div>
                    </td>
                    <td>
                      <select className="form-control">
                        <option></option>
                        <option value="tsf" selected>Savoir-faire</option>
                        <option value="tse">Savoir-être</option>
                        <option value="ts">Savoir</option>
                      </select>
                    </td>
                    <td>
                      <select className="form-control">
                        <option></option>
                        <option value="gen">Général</option>
                        <option value="comm">Communication</option>
                        <option value="geadmin">Gestion administrative</option>
                        <option value="info" selected>Informatique</option>
                        <option value="inist">Inist-CNRS</option>
                        <option value="ist">IST</option>
                        <option value="lang">Langues</option>
                        <option value="manag">Management</option>
                        <option value="outils">Outils</option>
                      </select>
                    </td>
                    <td><input className="form-control" type="text" placeholder="Nom de la compétence" value="Langage de programmation" /></td>
                    <td><textarea className="form-control" rows="1" placeholder="Commentaires libres"></textarea></td>
                    <td><input className="form-control" type="text" readOnly title="Code de la compétence" value="tsf-info-1" /></td>
                  </tr>



                  <tr>
                    <td>
                      <div className="btn-group">
                        <button type="button" className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span className="caret"></span></button>
                        <ul className="dropdown-menu">
                          <li><a href="#"><span className="glyphicon glyphicon-remove"></span> Supprimer la compétence</a></li>
                          <li><a href="#"><span className="glyphicon glyphicon-list"></span> Visualiser les profils ayant cette compétence</a></li>
                        </ul>
                      </div>
                    </td>
                    <td>
                      <select className="form-control">
                        <option></option>
                        <option value="tsf" selected>Savoir-faire</option>
                        <option value="tse">Savoir-être</option>
                        <option value="ts">Savoir</option>
                      </select>
                    </td>
                    <td>
                      <select className="form-control">
                        <option></option>
                        <option value="gen">Général</option>
                        <option value="comm">Communication</option>
                        <option value="geadmin">Gestion administrative</option>
                        <option value="info" selected>Informatique</option>
                        <option value="inist">Inist-CNRS</option>
                        <option value="ist">IST</option>
                        <option value="lang">Langues</option>
                        <option value="manag">Management</option>
                        <option value="outils">Outils</option>
                      </select>
                    </td>
                    <td><input className="form-control" type="text" placeholder="Nom de la compétence" value="Elasticsearch" /></td>
                    <td><textarea className="form-control" rows="1" placeholder="Commentaires libres"></textarea></td>
                    <td><input className="form-control" type="text" readOnly title="Code de la compétence" value="tsf-info-2" /></td>
                  </tr>

                  


                  <tr>
                    <td>
                      <div className="btn-group">
                        <button type="button" className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span className="caret"></span></button>
                        <ul className="dropdown-menu">
                          <li><a href="#"><span className="glyphicon glyphicon-remove"></span> Supprimer la compétence</a></li>
                          <li><a href="#"><span className="glyphicon glyphicon-list"></span> Visualiser les profils ayant cette compétence</a></li>
                        </ul>
                      </div>
                    </td>
                    <td>
                      <select className="form-control">
                        <option></option>
                        <option value="tsf" selected>Savoir-faire</option>
                        <option value="tse">Savoir-être</option>
                        <option value="ts">Savoir</option>
                      </select>
                    </td>
                    <td>
                      <select className="form-control">
                        <option></option>
                        <option value="gen">Général</option>
                        <option value="comm">Communication</option>
                        <option value="gadm" selected>Gestion administrative</option>
                        <option value="info">Informatique</option>
                        <option value="inist">Inist-CNRS</option>
                        <option value="ist">IST</option>
                        <option value="lang">Langues</option>
                        <option value="manag">Management</option>
                        <option value="outils">Outils</option>
                      </select>
                    </td>
                    <td><input className="form-control" type="text" placeholder="Nom de la compétence" value="Elaboration et suivi budgétaire" /></td>
                    <td><textarea className="form-control" rows="1" placeholder="Commentaires libres"></textarea></td>
                    <td><input className="form-control" type="text" readOnly title="Code de la compétence" value="tsf-gadm-1" /></td>
                  </tr>




                  <tr>
                    <td>
                      <div className="btn-group">
                        <button type="button" className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span className="caret"></span></button>
                        <ul className="dropdown-menu">
                          <li><a href="#"><span className="glyphicon glyphicon-remove"></span> Supprimer la compétence</a></li>
                          <li><a href="#"><span className="glyphicon glyphicon-list"></span> Visualiser les profils ayant cette compétence</a></li>
                        </ul>
                      </div>
                    </td>
                    <td>
                      <select className="form-control">
                        <option></option>
                        <option value="tsf">Savoir-faire</option>
                        <option value="tse">Savoir-être</option>
                        <option value="ts">Savoir</option>
                      </select>
                    </td>
                    <td>
                      <select className="form-control">
                        <option></option>
                        <option value="gen">Général</option>
                        <option value="comm">Communication</option>
                        <option value="geadmin">Gestion administrative</option>
                        <option value="info">Informatique</option>
                        <option value="inist">Inist-CNRS</option>
                        <option value="ist">IST</option>
                        <option value="lang">Langues</option>
                        <option value="manag">Management</option>
                        <option value="outils">Outils</option>
                      </select>
                    </td>
                    <td><input className="form-control" type="text" placeholder="Nom de la compétence" value="" /></td>
                    <td><textarea className="form-control" rows="1" placeholder="Commentaires libres"></textarea></td>
                    <td><input className="form-control" type="text" readOnly title="Code de la compétence" value="" /></td>
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
