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
                  <h1>Mener sa démarche GPEC<br/> avec RefGPEC</h1>
                  <p>
                  <img className="gpec-big-logo img-responsive pull-left" src="/img/gpec_256x256.png" alt="" />
                                  L'outil RefGPEC permet la mise en place numérique d'un <a data-toggle="tab" className="nav-link" href="#skills" onClick={this.handleNavigateTab}>référentiel des compétences</a> et d'un <a data-toggle="tab" className="nav-link" href="#profils" onClick={this.handleNavigateTab}>référentiel des profils de poste</a> de votre organisation.
                  </p>
                  <p>
                                  Ces <a data-toggle="tab" className="nav-link" href="#profils-skills" onClick={this.handleNavigateTab}>compétences peuvent ensuite être associées à chacuns des profils référencés</a> en précisant une <a data-toggle="tab" className="nav-link" href="#levels" onClick={this.handleNavigateTab}>modulation</a> afin d'obtenir un état des lieux précis des compétences nécessaires pour exercer de manière optimale les différents postes au sein de votre organisation.
                  </p>
                  <p>
                                  A noter que l'évaluation des compétences effectives des personnes exercant les postes en question n'entre pas dans le périmètre de RefGPEC.
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
