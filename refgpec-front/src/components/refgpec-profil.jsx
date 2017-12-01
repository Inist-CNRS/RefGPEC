import React from "react";
import ReactDOM from "react-dom";
import { Modal, DropdownButton, MenuItem } from "react-bootstrap";
import RefGpecTags from "./refgpec-tags";
import RefGpecPDF from "./refgpec-pdf";
var createReactClass = require("create-react-class");
var RefGpecProfil = createReactClass({
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
      >
        {/* ACTION MENU */}
        <td>
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
                        Veuillez dissocier ces compétences du profil avant de supprimer le
                        profil  :
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
            {/*<button type="button" className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span className="caret"></span></button>*/}
            {/*<ul className="dropdown-menu">*/}
            {/*<li className={(this.props.ajaxLoading ? 'disabled' : '')}>*/}
            {/*<a href=""*/}
            {/*onClick={this.handleOpenProfilSkills}>*/}
            {/*<span className="glyphicon glyphicon-list"></span> Associer des compétences à ce profil*/}
            {/*</a>*/}
            {/*</li>*/}
            {/*<li className={(this.props.ajaxLoading ? 'disabled' : '')}>*/}
            {/*<a href=""*/}
            {/*onClick={this.handleUpdatePDF}>*/}
            {/*<span className="fa fa-file-pdf-o"></span> Mettre à jour le PDF du profil*/}
            {/*</a>*/}
            {/*</li>*/}
            {/*<li className={(this.props.ajaxLoading ? 'disabled' : '')}>*/}
            {/*<a href=""*/}
            {/*onClick={this.handleDestroy}>*/}
            {/*<span className="glyphicon glyphicon-remove"></span> Supprimer le profil*/}
            {/*</a>*/}
            {/*</li>*/}
            {/*</ul>*/}
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
                          pattern="^(https?:\/\/)[a-zA-Z0-9-_\.]+(:\d{1,4}\/)?[a-zA-Z0-9-_?!_~%!$&'()*+,;=:@\\/]+\.pdf$"
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
            skillData={this.props.tagList}
            ajaxLoading={this.props.ajaxLoading}
            data-fieldname="tag_code"
            value={this.state.profil_tag}
            readOnly={this.props.ajaxLoading || this.state.ajaxLoading}
            onChange={this.handleChangeTag}
            onBlur={this.handleSubmit}
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
            readOnly={this.props.ajaxLoading || this.state.ajaxLoading}
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
            readOnly={this.props.ajaxLoading || this.state.ajaxLoading}
          />
        </td>
        <td>
          <input
            className="form-control"
            type="text"
            readOnly
            title={this.state.profil_code}
            value={this.state.profil_code}
          />
        </td>
      </tr>
    );
  },

  handleSubmit: function(event) {
    var self = this;
    if (self.state.mustBeSaved) {
      self.setState(
        { ajaxLoading: true },
        self.props.onSave(self.state.profil_code, self.state, function() {
          self.props.profilsSkillsModel.inform();
        })
      );
      setTimeout(() => {
        this.setState({
          mustBeSaved: false,
          ajaxLoading: false
        });
      }, 500);

      // // display or hide a nice popover to show the error
      // const self = this;
      // self.setState({ error: 'saving... demo error msg' });
      // setTimeout(function () {
      //   $('#' + self.state.profil_code).popover(self.state.error ? 'show' : 'hide');
      // }, 100);
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

    handleChangeTag: function(event) {
        this.setState({ profil_tag: event, mustBeSaved: true }, function() {
            this.handleSubmit();
        });
    },

  handleDestroy: function(event) {
    event.preventDefault(); // Let's stop this event.
    event.stopPropagation(); // Really this time.
      this.closedeleteModal();
    if (this.props.ajaxLoading) return;

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

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state !== nextState) {
      return true;
    }
    return false;
  }
});
export default RefGpecProfil;
