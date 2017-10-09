import React from 'react';

module.exports = React.createClass({
  displayName: 'RefGpecProfilsSkills',

  getInitialState: function () {
    return {
      'layout': 'vertical',
      'selectedProfil': 'dpi-spproj-1'
    };
  },

  render: function () {
    var self = this;


    // layout stuff
    let layoutBtnClasses = 'btn btn-default pull-right fa fa-2x ';
    layoutBtnClasses += (self.state.layout === 'horizontal') ? 'fa-arrows-h' : 'fa-arrows-v';
    let layoutColClasses = 'col-lg-6 ';
    layoutColClasses += (self.state.layout === 'horizontal') ? '' : 'profils-skills-vertical';

    return (
 
        <div id="profils-skills">

          <div className="row">
            <div className="col-md-12">

              <div className="panel panel-default">
                <div className="panel-heading">Profils &amp; Compétences</div>
                <div className="panel-body">

                  <button type="button"
                    className={layoutBtnClasses}
                    title="Basculer l'affichage profil/compétences horizontalement et verticalement"
                    onClick={this.handleSwitchLayout}
                  />

                  <p>
                  Depuis cet onglet il est possible d'associer à chaque profils
                  des <a data-toggle="tab" className="nav-link" href="#skills" onClick={this.handleNavigateTab}>compétences issues du référentiel</a> puis
                  d'associer une <a data-toggle="tab" href="#levels" onClick={this.handleNavigateTab}>modulation</a> à chacunes de ces compétences.
                  </p>

                  {/* FORMULAIRE DE BASCULE D'UN PROFIL A L'AUTRE */}
                  <p>
                    Vous êtes en train de modifier les associations de compétences sur le profil suivant :
                    <select className="form-control"
                      id="profils-datalist-switcher"
                      value={this.state.selectedProfil}
                    >
                      <optgroup label="DPI/SPPROJ">
                        <option value="dpi-spproj-1">Responsable du Service « Pilotage des projets »</option>
                      </optgroup>
                      <optgroup label="DOS/SPUB/EQVALOBBD">
                        <option value="dos-spub-eqvalobbd-1">Chargé de valorisation des bases documentaires</option>
                      </optgroup>                    
                    </select>
                  </p>

                </div>
              </div>


              <div className="row">

                {/* PROFILS ET COMPETENCES : ZONE FORMULAIRE */}
                <div className={layoutColClasses}>
                  <div className="panel panel-default">
                    <div className="panel-heading">Savoirs, savoir-faire et savoir-être nécessaires pour occuper le poste de manière optimale</div>
                    <div className="panel-body">

                      <table id="profils-skills-list" className="table table-striped table-bordered">
                        <thead>
                          <tr>
                            <th className="profils-skills-col-action"></th>
                            <th className="profils-skills-col-name">Types &amp; Domaines</th>
                            <th className="profils-skills-col-name">Compétences</th>
                            <th className="profils-skills-col-name">Modulations</th>
                            <th className="profils-skills-col-commentary">Commentaires libres</th>
                          </tr>
                        </thead>
                        <tbody>
                          

                          <tr>
                            <td>
                              <div className="btn-group">
                                <button type="button" className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span className="caret"></span></button>
                                <ul className="dropdown-menu">
                                  <li><a href="#"><span className="glyphicon glyphicon-remove"></span> Dissocier la compétence du profil</a></li>
                                </ul>
                              </div>
                            </td>
                            <td>
                              <span className="label label-warning">Savoir</span>
                              <span className="label label-primary">Langues</span>
                            </td>
                            <td>
                              <span className="btn active" title="Anglais, écrit, oral, tout confondu">Anglais</span>
                            </td>
                            <td>
                              <span className="btn active" title="Capacité d'user à son gré d'une compétence, d'un savoir, d'une technique">Maîtrise <span className="badge">3</span></span>
                            </td>
                            <td><textarea className="form-control" rows="1" placeholder="Commentaires libres"></textarea></td>
                          </tr>

                          <tr>
                            <td>
                              <div className="btn-group">
                                <button type="button" className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span className="caret"></span></button>
                                <ul className="dropdown-menu">
                                  <li><a href="#"><span className="glyphicon glyphicon-remove"></span> Dissocier la compétence du profil</a></li>
                                </ul>
                              </div>
                            </td>
                            <td>
                              <span className="label label-warning">Savoir-faire</span>
                              <span className="label label-primary">Gestion administrative</span>
                            </td>
                            <td>
                              <span className="btn active" title="">Elaboration et suivi budgétaire</span>
                            </td>
                            <td>
                              <span className="btn active" title="Connaissances élémentaires et/ou incomplètes">Notions <span className="badge">1</span></span>
                            </td>
                            <td><textarea className="form-control" rows="1" placeholder="Commentaires libres"></textarea></td>
                          </tr>

                          <tr>
                            <td>
                              <a href="#">
                                <span className="fa fa-plus-square fa-2x" title="Associer la compétence au profil"></span>
                              </a>
                            </td>
                            <td colSpan="2">
                              <select className="form-control" id="skills-datalist">
                                <option></option>
                                <optgroup label="Général">
                                  <option value="tse-gen-1">Participation à des instances/groupes de travail</option>
                                </optgroup>
                                <optgroup label="Langues">
                                  <option value="ts-lang-1">Anglais</option>
                                </optgroup>
                                <optgroup label="Informatique">
                                  <option value="tsf-info-1">Langage de programmation</option>
                                  <option value="tsf-info-2">Elasticsearch</option>
                                </optgroup>
                                <optgroup label="Gestion administrative">
                                  <option value="tsf-gadm-1">Elaboration et suivi budgétaire</option>
                                </optgroup>
                              </select>
                            </td>
                            <td>
                              <select className="form-control" id="levels-datalist">
                                <option></option>
                                <option value="4" title="Fait d'avoir acquis une très grande maîtrise grâce à une longue expérience et d'être reconnu par ses pairs et sollicité">Expertise</option>
                                <option value="3" title="Capacité d'user à son gré d'une compétence, d'un savoir, d'une technique">Maîtrise</option>
                                <option value="2" title="Capacité à mettre en œuvre et/ou en pratique, une compétence, un savoir, une technique">Application</option>
                                <option value="1" title="Connaissances élémentaires et/ou incomplètes">Notions</option>
                              </select>
                            </td>
                            <td><textarea className="form-control" rows="1" placeholder="Commentaires libres"></textarea></td>
                          </tr>

                        </tbody>
                      </table>

                    </div>
                  </div>


                </div>


                {/* PROFILS ET COMPETENCES : ZONE PDF PREVIEW */}
                <div className={layoutColClasses}>
                  <div className="embed-responsive embed-responsive-4by3" style={{ height: "1200px" }}>
                    <iframe className="embed-responsive-item" src="/profils/dpi-spproj-1.pdf"></iframe>
                  </div>
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

  handleSwitchLayout: function (event) {
    if (this.state.layout == 'vertical') {
      this.setState({ layout: 'horizontal' });
    } else {
      this.setState({ layout: 'vertical' });
    }
  },

  componentDidMount () {

  },



});
