import React         from 'react';

import RefGpecIndex         from './refgpec-index.jsx';
import RefGpecProfilsSkills from './refgpec-profils-skills.jsx';
import RefGpecProfils       from './refgpec-profils.jsx';
import RefGpecSkills        from './refgpec-skills.jsx';
import RefGpecLevels        from './refgpec-levels.jsx';


module.exports = React.createClass({
  displayName: 'RefGpecHome',

  doTabChange: function (tabId) {
    tabId = tabId.replace('#', '');
    if (!tabId) tabId = 'index';

    // this is not optimal but it fix the bug when 
    // nav from the panels hypertexte links
    document.location.hash = tabId;

    // cleanup hidden tabs
    [ 'index', 'profils-skills', 'profils', 'skills', 'levels' ].forEach(function (tabName) {
      if (document.getElementById(tabName) && tabName != tabId) {
        document.getElementById(tabName).style.display = 'none';
        document.getElementById('tab-' + tabName).parentNode.classList.remove('active');
        document.getElementById('tab-' + tabName).parentNode.classList.remove('in');
      }
    });

    // show the selected tab
    document.getElementById('tab-' + tabId).parentNode.classList.add('active');
    document.getElementById('tab-' + tabId).parentNode.classList.add('in');
    document.getElementById(tabId).style.display = 'block';
  },

  handleTabChange: function (event) {
    document.location.hash = event.target.getAttribute('href');
  },

  render: function () {

    if (!this.props.skillsModel.initializing &&
        !this.props.profilsModel.initializing &&
        !this.props.orgaModel.initializing &&
        !this.props.levelsModel.initializing) {
      $('#loading-data').modal('hide');
    }

    const refgpecTabs = [];
    refgpecTabs.push(
      <RefGpecIndex
        key="1"
        onTabChange={this.doTabChange} />
    );

    refgpecTabs.push(
      <RefGpecProfilsSkills
        key="2"
        skillsModel={this.props.skillsModel}
        levelsModel={this.props.levelsModel}
        onTabChange={this.doTabChange} />
    );

    refgpecTabs.push(
      <RefGpecProfils
        key="3"
        orgaModel={this.props.orgaModel}
        profilsModel={this.props.profilsModel}
        onTabChange={this.doTabChange} />
    );

    refgpecTabs.push(
      <RefGpecSkills
        key="4"
        skillsModel={this.props.skillsModel}
        onTabChange={this.doTabChange} />
    );

    refgpecTabs.push(
      <RefGpecLevels
        key="5"
        levelsModel={this.props.levelsModel}
        onTabChange={this.doTabChange} />
    );

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
            <a className="gpec-title navbar-brand" id="tab-index" onClick={this.handleTabChange} href="#index" data-toggle="tab" title="Application de gestion d'un référentiel de profils/compétences pour une démarche GPEC">RefGPEC</a>
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

        {refgpecTabs}

        {/* LOADING DATA MODAL */}
        <div className="modal fade" id="loading-data" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h2 className="modal-title text-center">Initialisation de RefGPEC</h2>
              </div>
              <div className="modal-body">
                <ul className="list-group">
                  <li className="list-group-item">
                    <span className={this.getDataLoadedClassName('profilsSkillsModel')}></span>
                    Profils &amp; Compétences
                  </li>
                  <li className="list-group-item">
                    <span className={this.getDataLoadedClassName('profilsModel')}></span>
                    Profils de poste
                  </li>  
                  <li className="list-group-item">
                    <span className={this.getDataLoadedClassName('skillsModel')}></span>
                    Référentiel des compétences
                  </li>
                  <li className="list-group-item">
                    <span className={this.getDataLoadedClassName('levelsModel')}></span>
                    Modulations des compétences
                  </li>
                  <li className="list-group-item">
                    <span className={this.getDataLoadedClassName('orgaModel')}></span>
                    Organigramme
                  </li> 
                </ul>
              </div>
              <div className="modal-footer">
                <p className="text-center">
                  Chargement des données en cours.<br/>
                  Veuillez patienter.
                </p>
              </div>                
            </div>
          </div>
        </div>

      </div>

      <footer className="gpec-footer">
        <hr />
        <div className="col-lg-12">
          <p className="muted pull-right">
            <span className="fa fa-github"></span> &nbsp;
            <a href="https://github.com/Inist-CNRS/refgpec">RefGPEC</a> version 1.0.0
          </p>
        </div>
      </footer>

    </div>
    );
  },

  getDataLoadedClassName(modelType) {
    var self = this;

    if (modelType == 'skillsModel') {
      return self.props.skillsModel.initializing ?
        'pull-right fa fa-2x fa-square' :
        'pull-right fa fa-2x fa-check-square'
    } else if (modelType == 'profilsModel') {
      return self.props.profilsModel.initializing ?
        'pull-right fa fa-2x fa-square' :
        'pull-right fa fa-2x fa-check-square'
    } else if (modelType == 'levelsModel') {
      return self.props.levelsModel.initializing ?
        'pull-right fa fa-2x fa-square' :
        'pull-right fa fa-2x fa-check-square'
    } else if (modelType == 'orgaModel') {
      return self.props.orgaModel.initializing ?
        'pull-right fa fa-2x fa-square' :
        'pull-right fa fa-2x fa-check-square'
    } else {
      return 'pull-right fa fa-2x fa-check-square';
    }
  },

  componentDidMount () {
    var self = this;

    // to have tooltips cf http://getbootstrap.com/javascript/#tooltips-examples
    $(function () {
      $('#loading-data').modal('show');
      
      // init the popover stuff
      // see http://getbootstrap.com/javascript/#popovers
      $('[data-toggle="popover"]').popover();

      // activate the selected tab
      self.doTabChange(document.location.hash);
      $(window).on('hashchange', function() {
        //console.log('hashchange', document.location.hash);
        self.doTabChange(document.location.hash);
      });

    });
  },



});
