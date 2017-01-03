import React from 'react';

module.exports = React.createClass({
  displayName: 'RefGpecLevels',

  render: function () {

    return (
 
        // MODULATIONS DES COMPETENCES
        <div id="levels" className="tab-pane fade">

          <div className="row">
            <div className="col-md-8">

              <div className="panel panel-default">
                <div className="panel-heading">Modulations des compétences</div>
                <div className="panel-body">
                  <p>Depuis cet onglet il est possible d'administrer les différentes modulations que l'on pourra ensuite <a data-toggle="tab" className="nav-link" href="#profils-skills">associer à chaques compétences</a>.</p>
                </div>
              </div>


              <table id="levels-list" className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th className="levels-col-action"></th>
                    <th className="levels-col-shortname">Nom court</th>
                    <th className="levels-col-commentary">Commentaires</th>
                    <th className="levels-col-code">Valeur numérique</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="btn-group">
                        <button type="button" className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span className="caret"></span></button>
                        <ul className="dropdown-menu">
                          <li><a href="#"><span className="glyphicon glyphicon-remove"></span> Supprimer la compétence</a></li>
                        </ul>
                      </div>
                    </td>
                    <td><input className="form-control" type="text" placeholder="Nom court de la modulation" value="Expertise" /></td>
                    <td><textarea className="form-control" rows="1">Fait d'avoir acquis une très grande maîtrise grâce à une longue expérience et d'être reconnu par ses pairs et sollicité</textarea></td>
                    <td><input className="form-control" type="number" placeholder="" value="4" /></td>
                  </tr>
                  <tr>
                    <td>
                      <div className="btn-group">
                        <button type="button" className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span className="caret"></span></button>
                        <ul className="dropdown-menu">
                          <li><a href="#"><span className="glyphicon glyphicon-remove"></span> Supprimer la compétence</a></li>
                        </ul>
                      </div>
                    </td>
                    <td><input className="form-control" type="text" placeholder="Nom court de la modulation" value="Maîtrise" /></td>
                    <td><textarea className="form-control" rows="1">Capacité d'user à son gré d'une compétence, d'un savoir, d'une technique</textarea></td>
                    <td><input className="form-control" type="number" placeholder="" value="3" /></td>
                  </tr>
                  <tr>
                    <td>
                      <div className="btn-group">
                        <button type="button" className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span className="caret"></span></button>
                        <ul className="dropdown-menu">
                          <li><a href="#"><span className="glyphicon glyphicon-remove"></span> Supprimer la compétence</a></li>
                        </ul>
                      </div>
                    </td>
                    <td><input className="form-control" type="text" placeholder="Nom court de la modulation" value="Application" /></td>
                    <td><textarea className="form-control" rows="1">Capacité à mettre en œuvre et/ou en pratique, une compétence, un savoir, une technique</textarea></td>
                    <td><input className="form-control" type="number" placeholder="" value="2" /></td>
                  </tr>
                  <tr>
                    <td>
                      <div className="btn-group">
                        <button type="button" className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span className="caret"></span></button>
                        <ul className="dropdown-menu">
                          <li><a href="#"><span className="glyphicon glyphicon-remove"></span> Supprimer la compétence</a></li>
                        </ul>
                      </div>
                    </td>
                    <td><input className="form-control" type="text" placeholder="Nom court de la modulation" value="Notions" /></td>
                    <td><textarea className="form-control" rows="1">Connaissances élémentaires et/ou incomplètes</textarea></td>
                    <td><input className="form-control" type="number" placeholder="" value="1" /></td>
                  </tr>
                  <tr>
                    <td>
                      {/*<div className="btn-group">
                        <button type="button" className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span className="caret"></span></button>
                        <ul className="dropdown-menu">
                          <li><a href="#"><span className="glyphicon glyphicon-remove"></span> Supprimer la compétence</a></li>
                        </ul>
                      </div>*/}
                    </td>
                    <td><input className="form-control" type="text" placeholder="Nom court de la modulation" value="" /></td>
                    <td><textarea className="form-control" placeholder="Expliquez en quelque mots la signification de cette modulation de compétence" rows="1"></textarea></td>
                    <td><input className="form-control" type="number" placeholder="" value="" /></td>
                  </tr>
                </tbody>
              </table>
              <input className="btn btn-primary btn-lg" type="submit" value="Enregistrer" />

            </div>
          </div>


        </div> // MODULATIONS DES COMPETENCES


    );
  },

  componentDidMount () {

  },



});
