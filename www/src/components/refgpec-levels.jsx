import React from 'react';
import RefGpecLevel from './refgpec-level.jsx';

module.exports = React.createClass({
  displayName: 'RefGpecLevels',

  getInitialState: function () {
    return {};
  },

  render: function () {
    var self = this;

    let rgLevels = [];
    Object.keys(self.props.model.levels).forEach(function (key) {
      rgLevels.push(<RefGpecLevel
        key={key} levelId={key}
        levelData={self.props.model.levels[key]}
        onSave={self.props.model.save.bind(self.props.model)}
        onDestroy={self.props.model.destroy.bind(self.props.model)}
        onAskLevelIdExists={self.props.model.doesLevelExists.bind(self.props.model)}
      />);
    });
    rgLevels.push(<RefGpecLevel
      key=""
      onSave={self.props.model.save.bind(self.props.model)}
      onDestroy={self.props.model.destroy.bind(self.props.model)}
      onAskLevelIdExists={self.props.model.doesLevelExists.bind(self.props.model)}
    />);

    return (
 
        // MODULATIONS DES COMPETENCES
        <div id="levels" className="tab-pane fade">

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

                </tbody>
              </table>
              <input className="btn btn-primary btn-lg" type="submit" value="Enregistrer" />

            </div>
          </div>


        </div> // MODULATIONS DES COMPETENCES


    );
  },

  handleNavigateTab: function (event) {
    this.props.onTabChange(event.target.getAttribute('href'));
  },

  componentDidMount () {

  },



});
