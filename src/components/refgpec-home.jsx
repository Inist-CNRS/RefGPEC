import React         from 'react';
import $ from 'jquery';
import { Modal, Button } from 'react-bootstrap';
import RefGpecIndex         from './refgpec-index.jsx';
import RefGpecProfilsSkills from './refgpec-profils-skills.jsx';
import RefGpecProfils       from './refgpec-profils.jsx';
import RefGpecSkills        from './refgpec-skills.jsx';
import RefGpecLevels        from './refgpec-levels.jsx';
import logo from '../img/gpec_40x40.png';


var RefGpecHome = React.createClass({
  displayName: 'RefGpecHome',

  doTabChange: function (tabId) {
    tabId = tabId.replace('#', '');
    if (!tabId) tabId = 'index';

    // this is not optimal but it fix the bug when 
    // nav from the panels hypertexte links
    document.location.hash = tabId;

    // cleanup hidden tabs
    [ 'index', 'profils-skills', 'profils', 'skills', 'levels' ].forEach(function (tabName) {
      if (document.getElementById(tabName) && tabName !== tabId) {
        document.getElementById(tabName).style.display = 'none';
        document.getElementById('tab-' + tabName).parentNode.classList.remove('active');
        document.getElementById('tab-' + tabName).parentNode.classList.remove('in');
      }
    });

    // show the selected tab
    document.getElementById('tab-' + tabId).parentNode.classList.add('active');
    document.getElementById('tab-' + tabId).parentNode.classList.add('in');
    if (document.getElementById(tabId)) {
      document.getElementById(tabId).style.display = 'block';
    }
  },

  handleTabChange: function (event) {
    document.location.hash = event.target.getAttribute('href');
  },

  render: function () {
    const loadingModalShow = this.props.skillsModel.initializing ||
        this.props.profilsModel.initializing ||
        this.props.orgaModel.initializing ||
        this.props.levelsModel.initializing;

/*
    if (!this.props.skillsModel.initializing &&
        !this.props.profilsModel.initializing &&
        !this.props.orgaModel.initializing &&
        !this.props.levelsModel.initializing) {
        $('#loading-data').modal && $('#loading-data').modal('hide');
    }
*/

    const refgpecTabs = [];
    refgpecTabs.push(
      <RefGpecIndex
        key="1"
        onTabChange={this.doTabChange} />
    );

    refgpecTabs.push(
      <RefGpecProfilsSkills
        key="2"
        profilsSkillsModel={this.props.profilsSkillsModel}
        skillsModel={this.props.skillsModel}
        skillsTypesModel={this.props.skillsTypesModel}
        skillsDomainsModel={this.props.skillsDomainsModel}
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
            <img className="gpec-logo" src={logo} alt="" />
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
        <Modal show={loadingModalShow}>
          <Modal.Header closeButton>
            <Modal.Title>
              <h2 className="modal-title text-center">Initialisation de RefGPEC</h2>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
          </Modal.Body>
          <Modal.Footer>
            <p className="text-center">
              Chargement des données en cours.<br/>
              Veuillez patienter.
            </p>
          </Modal.Footer>
        </Modal>

      </div>

      <footer className="gpec-footer">
        <hr />
        <div className="col-lg-12">
          <p className="muted pull-right">
            <span className="fa fa-github"></span> &nbsp;
            <a href="https://github.com/Inist-CNRS/refgpec">RefGPEC</a> version 1.0.5
          </p>
        </div>
      </footer>

    </div>
    );
  },

  getDataLoadedClassName(modelType) {
    var self = this;

    if (modelType === 'skillsModel') {
      return self.props.skillsModel.initializing ?
        'pull-right fa fa-2x fa-square' :
        'pull-right fa fa-2x fa-check-square'
    } else if (modelType === 'profilsModel') {
      return self.props.profilsModel.initializing ?
        'pull-right fa fa-2x fa-square' :
        'pull-right fa fa-2x fa-check-square'
    } else if (modelType === 'levelsModel') {
      return self.props.levelsModel.initializing ?
        'pull-right fa fa-2x fa-square' :
        'pull-right fa fa-2x fa-check-square'
    } else if (modelType === 'orgaModel') {
      return self.props.orgaModel.initializing ?
        'pull-right fa fa-2x fa-square' :
        'pull-right fa fa-2x fa-check-square'
    } else {
      return 'pull-right fa fa-2x fa-check-square';
    }
  },

  componentDidMount () {
    var self = this;

    $(function () {
      // activate the selected tab when clicking on a tab
      $(window).on('hashchange', function() {
        self.doTabChange(document.location.hash);
      });
    });
  },

  componentDidUpdate () {
    var self = this;

    // need this when initializing the first DOM rendering
    // it certenlay could be optimized because this call is useless
    // once the DOM is fully loaded  
    self.doTabChange(document.location.hash);
  },



});
export default RefGpecHome;