import React from 'react';

module.exports = React.createClass({
  displayName: 'RefGpecIndex',

  getInitialState: function () {
    return {};
  },

  render: function () {
    var self = this;

    return (
 
        <div id="index">

          <div className="row">
            <div className="col-md-12">


              <div className="jumbotron">
                <div className="container">
                  <h1>Une démarche GPEC avec RefGPEC</h1>
                  <p>
                                  L'outil RefGPEC permet la mise en place d'un <a data-toggle="tab" className="nav-link" href="#skills" onClick={this.handleNavigateTab}>référentiel de compétences</a> et d'un <a data-toggle="tab" className="nav-link" href="#profils" onClick={this.handleNavigateTab}>référentiel des profils de poste</a> de votre organisation.
                  </p>
                  <p>
                                  Ces <a data-toggle="tab" className="nav-link" href="#profils-skills" onClick={this.handleNavigateTab}>compétences peuvent ensuite être associées à chacuns des profils référencés</a> en précisant une <a data-toggle="tab" className="nav-link" href="#levels" onClick={this.handleNavigateTab}>modulation</a> afin d'obtenir un état des lieux précis des compétences nécessaires pour exercer les différents postes de manière optimale.
                  </p>
                  <p>
                                  A noter que le recensement des compétences effectives des personnes exercant les postes en question n'entre pas dans le périmètre de RefGPEC.
                  </p>
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
