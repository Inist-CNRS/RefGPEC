import React from 'react';
import RefGpecLevel from './refgpec-level.jsx';

module.exports = React.createClass({
  displayName: 'RefGpecLevels',

  getInitialState: function () {
    return {
      newShortName: '',
      newFreeComment: '',
    };
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

                  {/* FORM USED TO CREATE A NEW LEVEL */}
                  <tr className="form-new-level">
                    <td></td>
                    <td>
                      <input className="form-control" type="text"
                        placeholder="Nom court de la modulation"
                        data-fieldname="newShortName"
                        value={this.state.newShortName}
                        onChange={this.handleChange}
                       />
                    </td>
                    <td>
                      <textarea className="form-control" rows="1"
                        placeholder="Expliquez en quelque mots la signification de cette modulation de compétence"
                        data-fieldname="newFreeComment"
                        value={this.state.newFreeComment}
                        onChange={this.handleChange}
                      />
                    </td>
                    <td>
                      <a href="#" onClick={this.handleSubmit}>
                        <span className="fa fa-plus-square fa-2x" title="Associer la compétence au profil"></span>
                      </a>
                    </td>
                  </tr>

                </tbody>
              </table>
              <input className="btn btn-primary btn-lg" type="submit" value="Enregistrer" />

            </div>
          </div>


        </div> // MODULATIONS DES COMPETENCES


    );
  },

  handleChange: function (event) {
    var newState = {};
    newState[event.target.getAttribute('data-fieldname')] = event.target.value;
    this.setState(newState);
  },


  handleSubmit: function (event) {
    if (this.state.newShortName) {
      this.props.model.addLevel(this.state.newShortName, this.state.newFreeComment);
      this.setState({ newShortName: '', newFreeComment: '' });
    }
  },

  handleNavigateTab: function (event) {
    this.props.onTabChange(event.target.getAttribute('href'));
  },

  componentDidMount () {

  },



});
