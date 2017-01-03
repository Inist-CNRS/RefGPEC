import React         from 'react';
import RefGpecLevels from './refgpec-levels.jsx';


module.exports = React.createClass({
  displayName: 'Home',

  propTypes: {
    model:   React.PropTypes.object,
  },

  render: function () {

    return (
 
    <div id="content">

      {/* ONGLETS POUR LA NAVIGATION */}
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <img className="gpec-logo" src="/img/gpec_40x40.png" alt="" />
            <a className="gpec-title navbar-brand" href="#" data-toggle="tab" title="Application de gestion d'un référentiel de profils/compétences pour une démarche GPEC">RefGPEC</a>
          </div>
          <div className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li className="nav-item active">
                <a data-toggle="tab" className="nav-link" href="#profils-skills">Profils &amp; Compétences</a>
              </li>
              <li className="nav-item">
                <a data-toggle="tab" className="nav-link" href="#profils">Profils de poste</a>
              </li>
              <li className="nav-item">
                <a data-toggle="tab" className="nav-link" href="#skills">Référentiel des compétences</a>
              </li>
              <li className="nav-item">
                <a data-toggle="tab" className="nav-link" href="#levels">Modulations des compétences</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="gpec-content tab-content">

        <RefGpecLevels model={this.props.model} />
        {/* TODO 4 components: one for each tab */}

      </div>

      <footer className="gpec-footer">
        <hr />
        <div className="col-lg-12">
          <p className="muted pull-left">
            <a href="https://github.com/Inist-CNRS/refgpec">RefGPEC</a> version 1.0.0
          </p>
        </div>
      </footer>

    </div>
    );
  },

  componentDidMount () {
    // to have tooltips cf http://getbootstrap.com/javascript/#tooltips-examples
    $(function () {
      $().modal();
      
      // init the popover stuff
      // see http://getbootstrap.com/javascript/#popovers
      $('[data-toggle="popover"]').popover();
    });
  },



});
