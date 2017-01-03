import React         from 'react';
import RefGpecSkills from './refgpec-skills.jsx';
import RefGpecLevels from './refgpec-levels.jsx';


module.exports = React.createClass({
  displayName: 'Home',

  // propTypes: {
  //   model:   React.PropTypes.object,
  // },

  doTabChange: function (tabId) {
    tabId = tabId.replace('#', '');

    // cleanup
    [ 'profils-skills', 'profils', 'skills', 'levels' ].forEach(function (tabName) {
      document.getElementById('tab-' + tabName).parentNode.classList.remove('active');
      document.getElementById('tab-' + tabName).parentNode.classList.remove('in');
      document.getElementById('tab-' + tabName).parentNode.classList.remove('active');
    });

    var tab        = document.getElementById('tab-' + tabId);
    tab.parentNode.classList.add('active');

    var tabContent = document.getElementById(tabId);
    tabContent.classList.add('active');
    tabContent.classList.add('in');
  },

  handleTabChange: function (event) {
    document.location.hash = event.target.getAttribute('href');
  },

  render: function () {

    return (
 
    <div id="content">

      {/* ONGLETS POUR LA NAVIGATION */}
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            {/*<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>*/}
            <img className="gpec-logo" src="/img/gpec_40x40.png" alt="" />
            <a className="gpec-title navbar-brand" href="#" data-toggle="tab" title="Application de gestion d'un référentiel de profils/compétences pour une démarche GPEC">RefGPEC</a>
          </div>
          <div className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li className="nav-item">
                <a data-toggle="tab" className="nav-link"
                   id="tab-profils-skills"
                   href="#profils-skills"
                   onClick={this.handleTabChange}>
                   Profils &amp; Compétences
                </a>
              </li>
              <li className="nav-item">
                <a data-toggle="tab" className="nav-link"
                   id="tab-profils"
                   href="#profils"
                   onClick={this.handleTabChange}>
                   Profils de poste
                </a>
              </li>
              <li className="nav-item">
                <a data-toggle="tab" className="nav-link"
                   id="tab-skills"
                   href="#skills"
                   onClick={this.handleTabChange}>
                   Référentiel des compétences
                </a>
              </li>
              <li className="nav-item">
                <a data-toggle="tab" className="nav-link"
                   id="tab-levels"
                   href="#levels"
                   onClick={this.handleTabChange}>
                   Modulations des compétences
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="gpec-content tab-content">


        <RefGpecSkills
          model={this.props.model}
          onTabChange={this.doTabChange} />

        <RefGpecLevels
          model={this.props.model}
          onTabChange={this.doTabChange} />

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
    var self = this;

    // to have tooltips cf http://getbootstrap.com/javascript/#tooltips-examples
    $(function () {
      $().modal();
      
      // init the popover stuff
      // see http://getbootstrap.com/javascript/#popovers
      $('[data-toggle="popover"]').popover();

      // activate the selected tab
      self.doTabChange(document.location.hash);

    });
  },



});
