import React from 'react';
import RefGpecLevelsItem from './refgpec-levels-item.jsx';

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
                  
                  <RefGpecLevelsItem
                    code="4"
                    shortName="Expertise"
                    freeComment="Fait d'avoir acquis une très grande maîtrise grâce à une longue expérience et d'être reconnu par ses pairs et sollicité"
                  />
                  <RefGpecLevelsItem
                    code="3"
                    shortName="Maîtrise"
                    freeComment="Capacité d'user à son gré d'une compétence, d'un savoir, d'une technique"
                  />
                  <RefGpecLevelsItem
                    code="2"
                    shortName="Application"
                    freeComment="Capacité à mettre en œuvre et/ou en pratique, une compétence, un savoir, une technique"
                  />
                  <RefGpecLevelsItem
                    code="1"
                    shortName="Notions"
                    freeComment="Connaissances élémentaires et/ou incomplètes"
                  />

                  <RefGpecLevelsItem
                    code=""
                    shortName=""
                    freeComment=""
                  />

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
