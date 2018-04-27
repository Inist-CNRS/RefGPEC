import React from "react";
import ReactDOM from "react-dom";
import { Modal, DropdownButton, MenuItem } from "react-bootstrap";
import Select from "react-select";
import "react-select/dist/react-select.css";
import RefGpecPDF from "./refgpec-pdf";
import RefGpecGraph from "./refgpec-graph.jsx";
let createReactClass = require("create-react-class");
let RefGpecProfil = createReactClass({
  displayName: "RefGpecProfil",

  getInitialState: function() {
    return {
      profil_code: this.props.profilId,
      profil_tag: this.props.profilData.profil_tag,
      profil_shortname: this.props.profilData.profil_shortname,
      profil_free_comments: this.props.profilData.profil_free_comments,
      profil_pdf_path: this.props.profilData.profil_pdf_path,
      profilNbSkillsSF: this.props.profilData.profilnbskillssf,
      profilNbSkillsS: this.props.profilData.profilnbskillss,
      profilNbSkillsSE: this.props.profilData.profilnbskillsse,
      showModal: false,
      mustBeSaved: false,
      error: "",
      deleteModal: false,
      ajaxLoading: false
    };
  },
  closedeleteModal() {
    this.setState({ deleteModal: false });
  },

  opendeleteModal() {
    this.setState({ deleteModal: true });
  },

  close() {
    this.setState({ showModal: false });
  },

  open() {
    this.setState({ showModal: true });
  },

  render: function() {
    const self = this;
    // calculate the classname for skills stats associated to the specified profil
    let nbClassName = {};
    let rgFamilles = [];
    Object.keys(self.props.profilfamilys).forEach(function(key) {
      if (
        self.props.profilfamilys[key].profil_code === self.state.profil_code
      ) {
        rgFamilles.push({
          value: [self.props.profilfamilys[key].family_id],
          label: [self.props.profilfamilys[key].family_id],
          style: {
            fontSize: "12px",
            backgroundColor: "cyan",
            borderColor: "black",
            borderWidth: "2px"
          },
          title: self.props.profilfamilys[key].family_name
        });
      }
    });
    [
      "profilNbSkillsSF",
      "profilNbSkillsS",
      "profilNbSkillsSE"
    ].forEach(function(skillTypeNb) {
      nbClassName[skillTypeNb] = "label";
      if (self.state[skillTypeNb] === 0) {
        nbClassName[skillTypeNb] += " label-danger";
      } else if (self.state[skillTypeNb] === 1) {
        nbClassName[skillTypeNb] += " label-warning";
      } else {
        nbClassName[skillTypeNb] += " label-success";
      }
    });

    return (
      <tr
        id={this.state.profil_code}
        data-placement="top"
        data-toggle="popover"
        data-trigger="manual"
        data-title="Erreur de saisie"
        data-content={this.state.error}
        style={this.props.style}
      >
        {/* ACTION MENU */}
        <td style={{ textAlign: "center" }}>
          <div className="btn-group">
            <DropdownButton
              id="dropdown-profil"
              title=" "
              className="btn btn-default btn-sm dropdown-toggle"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <MenuItem
                href="#profils-skills"
                onClick={this.handleOpenProfilSkills}
              >
                {" "}
                <span className="glyphicon glyphicon-list" /> Associer des
                compétences à ce profil{" "}
              </MenuItem>
              {(() => {
                if (self.state.profil_pdf_path) {
                  return (
                    <MenuItem href="" onClick={this.open}>
                      {" "}
                      <span className="fa fa-file-pdf-o" /> Mettre à jour le PDF
                      du profil{" "}
                    </MenuItem>
                  );
                }
              })()}
              <MenuItem href="" onClick={this.opendeleteModal}>
                {" "}
                <span className="glyphicon glyphicon-remove" /> Supprimer le
                profil{" "}
              </MenuItem>
            </DropdownButton>
            <Modal
              show={this.state.deleteModal}
              onHide={this.closedeleteModal}
              id="profils-file-modal"
            >
              <Modal.Header closeButton>
                <h4 className="modal-title">
                  Voulez-vous vraiment supprimer le profil{" "}
                  <b>{this.state.profil_shortname}</b> ?
                </h4>
              </Modal.Header>
              <Modal.Body>
                {(() => {
                  if (this.props.skilllist.length !== 0) {
                    const list = this.props.skilllist.map(skill => (
                      <li key={this.state.profil_code + skill}>{skill}</li>
                    ));
                    return (
                      <div className="alert alert-info" role="alert">
                        Veuillez dissocier ces compétences du profil avant de
                        supprimer le profil :
                        <ul>{list}</ul>
                      </div>
                    );
                  }
                })()}
              </Modal.Body>
              <Modal.Footer>
                <button
                  onClick={this.closedeleteModal}
                  type="button"
                  className="btn btn-default"
                  data-dismiss="modal"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={this.handleDestroy}
                  disabled={Object.keys(self.props.skilllist).length !== 0}
                  className="btn btn-primary"
                >
                  Supprimer
                </button>
              </Modal.Footer>
            </Modal>
          </div>
        </td>

        {/* INPUT FORMS */}
        <td className="text-center">
          <RefGpecPDF
            skillData={this.state.profil_pdf_path}
            onClick={self.open}
          />
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
                  if (self.state.profil_pdf_path) {
                    return (
                      <p>
                        <input
                          id={"URL_PDF" + this.state.profil_code}
                          ref="formUrlPdf"
                          className="form-control"
                          type="url"
                          pattern="^(https?:\/\/)[a-zA-Z0-9-_\.]+(:\d{1,4}\/)?[a-zA-Z0-9-_.?!_~%!$&'()*+,;=:@\\/]+\.pdf$"
                          placeholder={this.state.profil_pdf_path}
                        />
                      </p>
                    );
                  } else {
                    return (
                      <p>
                        <input
                          id={"URL_PDF" + this.state.profil_code}
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
          <Select
            clearable={false}
            multi={true}
            disabled={true}
            value={rgFamilles}
            placeholder={"Aucune Famille associée"}
            removeSelected={true}
            onValueClick={this.OpenfamilySkills}
            valueRenderer={this.renderValue}
          />
          <RefGpecGraph
            id="profils_graph"
            profilsModel={this.props.profilsModel}
            familysModel={this.props.familysModel}
            profilValue={this.state.profil_code}
          />
        </td>
        <td>
          <input
            className="form-control"
            type="text"
            placeholder="Intitulé du profil"
            value={this.state.profil_shortname}
            data-fieldname="profil_shortname"
            onChange={this.handleChangeProfil}
            onBlur={this.handleSubmit}
            readOnly={this.state.ajaxLoading}
          />
        </td>
        <td>
          <p>
            <a href="#profils-skills" onClick={this.handleOpenProfilSkills}>
              <span
                className="glyphicon glyphicon-link"
                title="Associer des compétences à ce profil"
              />
            </a>&nbsp;
            <span className={nbClassName["profilNbSkillsSF"]}>
              {this.state.profilNbSkillsSF} savoir-faire
            </span>&nbsp;
            <span className={nbClassName["profilNbSkillsSE"]}>
              {this.state.profilNbSkillsSE} savoir-être
            </span>&nbsp;
            <span className={nbClassName["profilNbSkillsS"]}>
              {this.state.profilNbSkillsS} savoirs
            </span>
          </p>
        </td>
        <td>
          <textarea
            className="form-control"
            rows="1"
            placeholder="Commentaires libres"
            value={this.state.profil_free_comments || ""}
            data-fieldname="profil_free_comments"
            onChange={this.handleChangeFreeComm}
            onBlur={this.handleSubmit}
            readOnly={this.state.ajaxLoading}
          />
        </td>
      </tr>
    );
  },

  renderValue: function(option) {
    return <strong style={{ color: "Black" }}>{option.label}</strong>;
  },

  handleSubmit: function(event) {
    let self = this;
    if (self.state.mustBeSaved) {
      self.setState(
        { ajaxLoading: true },
        self.props.onSave(self.state.profil_code, self.state, function() {
          self.props.profilsSkillsModel.inform();
        })
      );
      self.setState({ ajaxLoading: false, mustBeSaved: false });
    }
  },

  handleChangeProfil: function(event) {
    // if it's a change in a select box,
    // tells the component to save data soon

    this.setState({ mustBeSaved: true });
    this.setState({ profil_shortname: event.target.value });
  },

  handleChangeFreeComm: function(event) {
    // if it's a change in a select box,
    // tells the component to save data soon
    this.setState({ mustBeSaved: true });
    this.setState({ profil_free_comments: event.target.value });
  },

  handleDestroy: function(event) {
    event.preventDefault(); // Let's stop this event.
    event.stopPropagation(); // Really this time.
    this.closedeleteModal();
    if (this.state.ajaxLoading) return;

    this.props.onDestroy(this.state.profil_code);
  },

  handleOpenProfilSkills: function(event) {
    this.props.profilsSkillsModel.getProfilSkillLevel(this.state.profil_code);
  },

  handleChangePDF: function(event) {
    let url = document.getElementById("URL_PDF" + this.state.profil_code);
    if (!url.validity.patternMismatch) {
      event.preventDefault();
      event.stopPropagation();
      this.close();
      this.setState({
        profil_pdf_path: ReactDOM.findDOMNode(this.refs.formUrlPdf).value
      });
      this.setState({ mustBeSaved: true }, this.handleSubmit);
    } else {
      url.oninvalid = function(event) {
        event.target.setCustomValidity(
          "L'URL doit commencer par http ou https et contenir un .pdf"
        );
      };
    }
  },
  componentDidMount() {},

  OpenfamilySkills: function(value, event) {
    this.props.onChangeFamily(value);
  },

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state !== nextState) {
      return true;
    }
    return false;
  }
});
export default RefGpecProfil;
