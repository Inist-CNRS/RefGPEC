import React from "react";
import { Modal, DropdownButton, MenuItem } from "react-bootstrap";
let createReactClass = require("create-react-class");
let RefGpecFamily = createReactClass({
  displayName: "RefGpecFamily",

  getInitialState: function() {
    return {
      family_id: this.props.familleData.family_id,
      family_name: this.props.familleData.family_name,
      family_free_comments: this.props.familleData.family_free_comments,
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

  render: function() {
    let self = this;
    return (
      <tr
        id={this.state.family_id}
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
              id="dropdown-family"
              title=" "
              aria-expanded="false"
            >
              <MenuItem href="" onClick={this.opendeleteModal}>
                {" "}
                <span className="glyphicon glyphicon-remove" /> Supprimer la
                famille de compétence
              </MenuItem>
            </DropdownButton>
            <Modal
              show={this.state.deleteModal}
              onHide={this.closedeleteModal}
              id="profils-file-modal"
            >
              <Modal.Header closeButton>
                <h4 className="modal-title">
                  Voulez-vous vraiment supprimer la famille{" "}
                  <b>{this.state.family_name}</b> ?
                </h4>
              </Modal.Header>
              <Modal.Body>
                {(() => {
                  let list = [];
                  if (Object.keys(self.props.liste_skill).length !== 0) {
                    Object.keys(this.props.liste_skill).forEach(function(
                      skill
                    ) {
                      list.push(
                        <li key={self.state.skill_code + skill}>
                          <a
                            href="#familys-skills"
                            id={self.state.family_id}
                            onClick={self.handleOpenFamilysSkills}
                          >
                            {self.props.liste_skill[skill].skill_shortname}{" "}
                          </a>
                        </li>
                      );
                    });
                    return (
                      <div className="alert alert-info" role="alert">
                        Veuillez dissocier ces compétences avant de supprimer la
                        famille :
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
                  disabled={Object.keys(self.props.liste_skill).length !== 0}
                  className="btn btn-primary"
                >
                  Supprimer
                </button>
              </Modal.Footer>
            </Modal>
          </div>
        </td>
        <td>
          <input
            className="form-control"
            type="text"
            placeholder="Identifiant de la famille"
            data-fieldname="family_id"
            value={this.state.family_id}
            onChange={this.handleChange}
            onBlur={this.handleSubmit}
            readOnly={true}
          />
        </td>
        <td>
          <input
            className="form-control"
            type="text"
            placeholder="Nom court de la famille"
            data-fieldname="family_name"
            value={this.state.family_name}
            onChange={this.handleChange}
            onBlur={this.handleSubmit}
            readOnly={this.state.ajaxLoading}
          />
        </td>

        <td>
          <textarea
            className="form-control"
            rows="1"
            placeholder="Commentaires libres"
            data-fieldname="family_free_comments"
            value={this.state.family_free_comments || ""}
            onChange={this.handleChange}
            onBlur={this.handleSubmit}
            readOnly={this.state.ajaxLoading}
          />
        </td>
      </tr>
    );
  },

  handleSubmit: function(event) {
    let self = this;
    if (this.state.mustBeSaved) {
      self.setState(
        { ajaxLoading: true },
        this.props.onSave(this.state.family_id, this.state)
      );
      setTimeout(() => {
        this.setState({
          mustBeSaved: false,
          ajaxLoading: false
        });
      }, 800);
    }
  },

  handleChange: function(event) {
    let newState = {};
    // tells the data must be saved when possible
    if (
      event.target.value !==
      this.state[event.target.getAttribute("data-fieldname")]
    ) {
      newState[event.target.getAttribute("data-fieldname")] =
        event.target.value;
    }

    // console.log('mustBeSaved', event.target.getAttribute('data-fieldname'));
    this.setState({ mustBeSaved: true });
    this.setState(newState);
  },

  handleDestroy: function(event) {
    event.preventDefault(); // Let's stop this event.
    event.stopPropagation(); // Really this time.

    if (this.props.ajaxLoading) return;

    this.props.onDestroy(this.state.family_id);
  },

  handleOpenFamilysSkills: function(event) {
    this.closedeleteModal();
    this.props.onSkill(event);
  },

  shouldComponentUpdate(nextProps, nextState) {
    return this.state !== nextState;
  }
});

export default RefGpecFamily;
