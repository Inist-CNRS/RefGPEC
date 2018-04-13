import React from "react";
import ReactDOM from "react-dom";
import { Modal, OverlayTrigger, Popover } from "react-bootstrap";
import Select from "react-select";
import "react-select/dist/react-select.css";
import RefGpecPDF from "./refgpec-pdf";
let createReactClass = require("create-react-class");
let RefGpecNewProfil = createReactClass({
  displayName: "RefGpecNewProfil",

  getInitialState: function() {
    return {
      showModal: false,
      newProfilShortName: "",
      newProfilFreeComments: "",
      newProfilPdfPath: "",
      error: ""
    };
  },
  close() {
    this.setState({ showModal: false });
  },

  open() {
    this.setState({ showModal: true });
  },

  render: function() {
    let self = this;

    // model is not ready ? then do not render anything
    if (self.props.profilsModel.initializing) {
      return null;
    }

    return (
      <tr className="form-new-profil">
        <td style={{ textAlign: "center" }}>
          <OverlayTrigger
            trigger="focus"
            data-title="Erreur nouveau profil"
            placement="top"
            overlay={
              <Popover id="popover-positioned-top">{this.state.error}</Popover>
            }
          >
            <a
              href=""
              className="fa fa-plus-square fa-2x"
              role="button"
              onClick={this.handleSubmit}
              disabled={this.props.profilsModel.ajaxLoading}
              title="Ajouter ce profil au référentiel"
            />
          </OverlayTrigger>
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
                          pattern="^(https?:\/\/)[a-zA-Z0-9-_\.]+(:\d{1,4}\/)?[a-zA-Z0-9-_.?!_~%!$&'()*+,;=:@\\/]+\.pdf$"
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
                          pattern="^(https?:\/\/)[a-zA-Z0-9-_\.]+(:\d{1,4}\/)?[a-zA-Z0-9-_.?!_~%!$&'()*+,;=:@\\/]+\.pdf$"
                          placeholder="Lien du PDF du profil"
                        />
                      </p>
                    );
                  }
                })()}
                <div className="alert alert-info" role="alert">
                  {" "}
                  <p>
                    Pour supprimer le PDF existant, laissez le champ vide et
                    validez.
                  </p>{" "}
                </div>
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
          <select className="form-control" readOnly={true} disabled={true} />
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
      </tr>
    );
  },

  handleChange: function(event) {
    let newState = {};
    newState[event.target.getAttribute("data-fieldname")] = event.target.value;
    this.setState(newState);
  },

  handleSubmit: function(event) {
    const self = this;
    if (self.props.profilsModel.ajaxLoading) return;
    if (self.state.newProfilShortName) {
      self.props.onSubmit(
        self.state.newProfilTag.value,
        self.state.newProfilShortName,
        self.state.newProfilFreeComments,
        self.state.newProfilPdfPath
      );

      self.setState({
        newProfilTag: "",
        newProfilShortName: "",
        newProfilFreeComments: "",
        newProfilPdfPath: ""
      });
    } else {
      let missingFields = [];
      if (!self.state.newProfilShortName) missingFields.push("Nom du profil");
      self.setState({
        error:
          "Il manque des champs avant de pouvoir ajouter le profil :\n" +
          missingFields.join(", ")
      });
    }

    event.preventDefault(); // Let's stop this event.
    event.stopPropagation(); // Really this time.
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
export default RefGpecNewProfil;
