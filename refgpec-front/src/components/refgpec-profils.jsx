import React from "react";
import ReactDOM from "react-dom";
import RefGpecProfil from "./refgpec-profil.jsx";
import {
  DropdownButton,
  MenuItem,
  Modal,
  OverlayTrigger,
  Popover
} from "react-bootstrap";
import RefGpecTags from "./refgpec-tags";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import RefGpecPDF from "./refgpec-pdf";
var createReactClass = require("create-react-class");
var RefGpecProfils = createReactClass({
  displayName: "RefGpecProfils",

  getInitialState: function() {
    return {
      showModal: false,
      newProfilTag:"",
      newProfilShortName: "",
      newProfilFreeComments: "",
      newProfilPdfPath: "",
      error: "",
      champtri: "profil_code",
      type_sort: true,
        filter:"",
    };
  },
  close() {
    this.setState({ showModal: false });
  },

  open() {
    this.setState({ showModal: true });
  },

    filterList: function(event){
        this.setState({filter: event.target.value.toLowerCase()});
    },

  Sort(event) {
    if (this.state.champtri === event.target.id) {
      this.setState({
        champtri: event.target.id,
        type_sort: !this.state.type_sort
      });
    } else {
      this.setState({ champtri: event.target.id, type_sort: true });
    }
  },

  render: function() {
    var self = this;

    // model is not ready ? then do not render anything
    if (
      self.props.profilsModel.initializing
    ) {
      return null;
    }
    let rgTagList = this.props.profilsModel.listTag;
    let rgProfils = [];
    Object.keys(self.props.profilsModel.profils).forEach(function(key) {
        if(self.props.profilsModel.profils[key].profil_shortname.toLowerCase().search(self.state.filter.toLowerCase()) !== -1) {
            rgProfils.push(
                <RefGpecProfil
                    key={key}
                    profilId={key}
                    tagList={rgTagList}
                    profilsSkillsModel={self.props.profilsSkillsModel}
                    profilData={self.props.profilsModel.profils[key]}
                    skilllist={self.props.profilsModel.getlistskills(key)}
                    onSave={self.handleSave}
                    onDestroy={self.handleDestroy}
                    ajaxLoading={self.props.profilsModel.ajaxLoading}
                />
            );
        }
    });



    if (self.state.type_sort) {
      rgProfils.sort(function(a, b) {
        return a.props.profilData[self.state.champtri] >
          b.props.profilData[self.state.champtri]
          ? 1
          : b.props.profilData[self.state.champtri] >
            a.props.profilData[self.state.champtri]
            ? -1
            : 0;
      });
    } else {
      rgProfils.sort(function(a, b) {
        return a.props.profilData[self.state.champtri] <
          b.props.profilData[self.state.champtri]
          ? 1
          : b.props.profilData[self.state.champtri] <
            a.props.profilData[self.state.champtri]
            ? -1
            : 0;
      });
    }
    return (

      <div id="profils">
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-default">
              <div className="panel-heading">Profils de poste</div>
              <div className="panel-body">
                <p>
                  Depuis cet onglet il est possible d'ajouter et de supprimer
                  des profils de poste. Ces mêmes profils seront ensuite
                  disponibles dans l'onglet{" "}
                  <a
                    data-toggle="tab"
                    href="#profils-skills"
                    onClick={this.handleNavigateTab}
                  >
                    Profils &amp; Compétences
                  </a>{" "}
                  pour pouvoir leur associer des{" "}
                  <a
                    data-toggle="tab"
                    href="#skills"
                    onClick={this.handleNavigateTab}
                  >
                    compétences{" "}
                  </a>
                  <a
                    data-toggle="tab"
                    href="#levels"
                    onClick={this.handleNavigateTab}
                  >
                    modulées
                  </a>.
                </p>
              </div>
            </div>

            <div   style={{float: "right", marginBottom: "20px"}}>
              <i className="fa fa-search fa-3" aria-hidden="true"/>
              <input style={{width :"230px",fontSize:"larger"}} type="text" placeholder="Rechercher un Profil" onChange={this.filterList}/>
            </div>

            <table
              id="profils-list"
              className="table table-striped table-bordered"
            >
              <thead>
                <tr>
                  <th className="profils-col-action" />
                  <th className="profils-col-file">PDF du profil</th>
                  <th
                    title="Cliquez pour trier par tag"
                    role="button"
                    id="profil_tag"
                    onClick={this.Sort}
                    className="profils-col-tag"
                  >
                    {" "}
                    Tag{" "}
                    <i className="fa fa-sort" aria-hidden="true" />
                  </th>
                  <th
                    title="Cliquez pour trier par Nom court"
                    role="button"
                    id="profil_shortname"
                    onClick={this.Sort}
                    className="profils-col-title"
                  >
                    Intitulé du profil{" "}
                    <i className="fa fa-sort" aria-hidden="true" />
                  </th>
                  <th className="profils-col-stats">
                    Nombre de compétences associées
                  </th>
                  <th
                    title="Cliquez pour trier par Commentaire"
                    role="button"
                    id="profil_free_comments"
                    onClick={this.Sort}
                    className="profils-col-commentary"
                  >
                    Commentaires libres{" "}
                    <i className="fa fa-sort" aria-hidden="true" />
                  </th>
                  <th
                    title="Cliquez pour trier par Code"
                    role="button"
                    id="profil_code"
                    onClick={this.Sort}
                    className="profils-col-code"
                  >
                    Code <i className="fa fa-sort" aria-hidden="true" />
                  </th>
                </tr>
              </thead>
              <tbody>

              {/* FORM USED TO CREATE A NEW PROFIL */}
              <tr className="form-new-profil">
                <td>
                  <DropdownButton
                      id="dropdown-profil"
                      title=" "
                      className="btn btn-default btn-sm dropdown-toggle"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                  >
                    <MenuItem href="" onClick={this.open}>
                        {" "}
                      <span className="fa fa-file-pdf-o" /> Mettre à jour le
                      PDF du profil{" "}
                    </MenuItem>
                  </DropdownButton>
                </td>

                <td className="text-center">
                  <RefGpecPDF
                      skillData={this.state.newProfilPdfPath}
                      onClick={this.open}
                  />
                    {/* Modal d'upload du fichier PDF du profil de poste */}
                  <Modal
                      show={this.state.showModal}
                      onHide={this.close}
                      id="profils-file-modal"
                  >
                    <form>
                      <Modal.Header closeButton>
                        <h4 className="modal-title">
                          Indiquez l'URL du PDF du profil de poste
                        </h4>
                      </Modal.Header>
                      <Modal.Body>
                          {(() => {
                              if (this.state.newProfilPdfPath) {
                                  return (
                                      <p>
                                        <input
                                            id="URL_PDF_NEW"
                                            ref="formUrlPdf"
                                            className="form-control"
                                            pattern="^(https?:\/\/)[a-zA-Z0-9-_\.]+(:\d{1,4}\/)?[a-zA-Z0-9-_?!_~%!$&'()*+,;=:@\\/]+\.pdf$"
                                            type="url"
                                            placeholder={this.state.newProfilPdfPath}
                                        />
                                      </p>
                                  );
                              } else {
                                  return (
                                      <p>
                                        <input
                                            id="URL_PDF_NEW"
                                            ref="formUrlPdf"
                                            className="form-control"
                                            type="url"
                                            pattern="^(https?:\/\/)[a-zA-Z0-9-_\.]+(:\d{1,4}\/)?[a-zA-Z0-9-_?!_~%!$&'()*+,;=:@\\/]+\.pdf$"
                                            placeholder="Lien du PDF du profil"
                                        />
                                      </p>
                                  );
                              }
                          })()}
                        <div className="alert alert-info" role="alert" />
                      </Modal.Body>
                      <Modal.Footer>
                        <button
                            onClick={this.close}
                            type="button"
                            className="btn btn-default"
                            data-dismiss="modal"
                        >
                          Fermer
                        </button>
                        <button
                            type="submit"
                            onClick={this.handleChangePDF}
                            className="btn btn-primary"
                        >
                          Valider
                        </button>
                      </Modal.Footer>
                    </form>
                  </Modal>
                </td>

                <td>
                  <RefGpecTags
                      skillData={rgTagList}
                      ajaxLoading={self.props.profilsModel.ajaxLoading}
                      data-fieldname="newProfilTag"
                      onChange={this.handleTagChange}
                      onBlur={this.handleTagChange}
                      value={this.state.newProfilTag}
                  />
                </td>
                <td colSpan="2">
                  <input
                      className="form-control"
                      type="text"
                      placeholder="Intitulé du profil"
                      value={this.state.newProfilShortName}
                      data-fieldname="newProfilShortName"
                      onChange={this.handleChange}
                      onKeyPress={this.handleKeyPress}
                      disabled={this.props.profilsModel.ajaxLoading}
                  />
                </td>

                <td>
                    <textarea
                        className="form-control"
                        rows="1"
                        placeholder="Commentaires libres"
                        value={this.state.newProfilFreeComments}
                        data-fieldname="newProfilFreeComments"
                        onChange={this.handleChange}
                        disabled={this.props.profilsModel.ajaxLoading}
                    />
                </td>
                <td>
                  <OverlayTrigger
                      trigger="focus"
                      data-title="Erreur nouveau profil"
                      placement="top"
                      overlay={
                        <Popover id="popover-positioned-top">
                            {this.state.error}
                        </Popover>
                      }
                  >
                    <a
                        href=""
                        className="fa fa-plus-square fa-2x"
                        role="button"
                        onClick={this.handleSubmit}
                        title="Ajouter ce profil au référentiel"
                    />
                  </OverlayTrigger>
                </td>

                  {/*<td id="profils-new-profil"*/}
                  {/*data-placement="top" data-toggle="popover"*/}
                  {/*data-trigger="manual" data-title="Erreur nouveau profil"*/}
                  {/*data-content={this.state.error}*/}
                  {/*>*/}
                  {/*<a href="" className="btn fa fa-plus-square fa-2x" role="button"*/}
                  {/*onClick={this.handleSubmit}*/}
                  {/*disabled={self.props.profilsModel.ajaxLoading}*/}
                  {/*title="Ajouter ce profil au référentiel" />*/}
                  {/*</td>*/}
              </tr>
              <tr><td colSpan="6" style={{height:"25px"}}></td></tr>
                {rgProfils}

              </tbody>
            </table>

            <div
              className="progress"
              style={{
                display: self.props.profilsModel.ajaxLoading ? "block" : "none"
              }}
            >
              <div
                className="progress-bar progress-bar-striped active"
                role="progressbar"
                style={{ width: "100%" }}
              />
            </div>
          </div>
        </div>
        <NotificationContainer />
      </div>
    );
  },

  handleSave: function(profilId, profilState) {
    let self = this;
    this.props.profilsModel.save(profilId, profilState, function() {
      if (!self.props.profilsModel.feedback) {
          self.props.profilsModel.updateVue();
          self.props.profilsSkillsModel.updateVue();
        NotificationManager.success(
          "",
          "Le Profil " + profilId + " a été modifié"
        );
      } else {
        NotificationManager.error("", self.props.profilsModel.feedback);
      }
    });
  },

  handleTagChange: function(event) {
    this.setState({ newProfilTag: event });
  },
  handleNavigateTab: function(event) {
      window.scrollTo(0, 0);
    this.props.onTabChange(event.target.getAttribute("href"));
  },

  handleKeyPress: function(event) {
    if (event.charCode === 13) {
      this.handleSubmit(event);
    }
  },

  handleChange: function(event) {
    var newState = {};
    newState[event.target.getAttribute("data-fieldname")] = event.target.value;
    this.setState(newState);
  },

  handleSubmit: function(event) {
    const self = this;
    if (self.props.profilsModel.ajaxLoading) return;
    if (self.state.newProfilShortName) {
      self.props.profilsModel.addProfil(
        self.state.newProfilTag,
        self.state.newProfilShortName,
        self.state.newProfilFreeComments,
        self.state.newProfilPdfPath,
        function() {
          if (!self.props.profilsModel.feedback) {
              self.props.profilsModel.updateVue();
              self.props.profilsSkillsModel.updateVue();
            NotificationManager.success(
              "",
              "le profil " + self.state.newProfilShortName + " a été ajouté"
            );
          } else {
            NotificationManager.error("", self.props.profilsModel.feedback);
          }
        }
      );
      self.setState({
        newProfilTag: "",
        newProfilShortName: "",
        newProfilFreeComments: "",
        newProfilPdfPath: "",
        error: ""
      });
    } else {
      var missingFields = [];
      if (!self.state.newProfilShortName) missingFields.push("Nom du profil");
      self.setState({
        error:
          "Il manque des champs avant de pouvoir ajouter le profil :\n" +
          missingFields.join(", ")
      });
      // setTimeout(function () {
      //   $('#profils-new-profil').popover(self.state.error ? 'show' : 'hide');
      //   setTimeout(function () {
      //     $('#profils-new-profil').popover('hide');
      //   }, 5000);
      // }, 100);
    }

    event.preventDefault(); // Let's stop this event.
    event.stopPropagation(); // Really this time.
  },

  handleDestroy: function(profilId) {
    let self = this;
    this.props.profilsModel.destroy(profilId, function() {
      if (!self.props.profilsModel.feedback) {
          self.props.profilsSkillsModel.updateVue();
          self.props.profilsModel.inform();
        NotificationManager.success(
          "",
          "le profil " + profilId + " a été supprimé"
        );

      } else {
        NotificationManager.error("", self.props.profilsModel.feedback);
      }
    });
  },

  handleChangePDF: function(event) {
    let url = document.getElementById("URL_PDF_NEW");
    if (!url.validity.patternMismatch) {
      event.preventDefault();
      event.stopPropagation();
      this.close();
      this.setState({
        newProfilPdfPath: ReactDOM.findDOMNode(this.refs.formUrlPdf).value
      });
    } else {
      url.oninvalid = function(event) {
        event.target.setCustomValidity(
          "L'URL doit commencer par http ou https et contenir un .pdf"
        );
      };
    }
  },

  componentDidMount() {},

  missingField() {
    return !this.state.newProfilShortName || !this.state.newProfilTag;
  }
});
export default RefGpecProfils;
