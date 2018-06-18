import React from "react";
import { Modal, DropdownButton, MenuItem } from "react-bootstrap";
import RefGpecTypes from "./refgpec-types.jsx";
import Select from "react-select";
import "react-select/dist/react-select.css";
let createReactClass = require("create-react-class");
let RefGpecSkill = createReactClass({
  displayName: "RefGpecSkill",

  getInitialState: function() {
    return {
      skill_code: this.props.skillId,
      st_code: this.props.skillData.st_code,
      family_id: this.props.skillData.family_id,
      skill_shortname: this.props.skillData.skill_shortname,
      skill_free_comments: this.props.skillData.skill_free_comments,
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
    let rgFamilles = [];
    Object.keys(self.props.skillfamilys).forEach(function(key) {
      if (self.props.skillfamilys[key].skill_code === self.state.skill_code) {
        rgFamilles.push({
          value: [self.props.skillfamilys[key].family_id],
          label: [self.props.skillfamilys[key].family_id],
          style: {
            fontSize: "12px",
            backgroundColor: "cyan",
            borderColor: "black",
            borderWidth: "2px"
          },
          title: self.props.skillfamilys[key].family_name
        });
      }
    });

    return (
      <tr
        id={this.state.skill_code}
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
            <DropdownButton id="dropdown-skill" title=" " aria-expanded="false">
              <MenuItem href="" onClick={this.opendeleteModal}>
                {" "}
                <span className="glyphicon glyphicon-remove" /> Supprimer la
                compétence{" "}
              </MenuItem>
            </DropdownButton>
            <Modal
              show={this.state.deleteModal}
              onHide={this.closedeleteModal}
              id="profils-file-modal"
            >
              <Modal.Header closeButton>
                <h4 className="modal-title">
                  Voulez-vous vraiment supprimer la compétence{" "}
                  <b>{this.state.skill_shortname}</b> ?
                </h4>
              </Modal.Header>
              <Modal.Body>
                {(() => {
                  let listc = [];
                  let listf = [];
                  if (Object.keys(self.props.profilList).length !== 0) {
                    Object.keys(self.props.profilList).forEach(function(
                      profil
                    ) {
                      listc.push(
                        <li key={self.state.skill_code + profil}>
                          <a
                            href="#profils-skills"
                            id={self.props.profilList[profil].profil_code}
                            onClick={self.handleOpenProfilSkills}
                          >
                            {self.props.profilList[profil].profil_shortname +
                              ". "}
                          </a>
                          <b>
                            {" Modulation : " +
                              self.props.profilList[profil].level_number}
                          </b>
                        </li>
                      );
                    });
                  }
                  if (rgFamilles.length !== 0) {
                    Object.keys(rgFamilles).forEach(function(famille) {
                      listf.push(
                        <li key={self.state.skill_code + famille}>
                          <a
                            href="#familys-skills"
                            id={rgFamilles[famille].label}
                            onClick={self.OpenfamilySkills}
                          >
                            {rgFamilles[famille].title + ". "}
                          </a>
                        </li>
                      );
                    });
                    return (
                      <div className="alert alert-info" role="alert">
                        Veuillez dissocier cette compétence des profils suivants
                        :
                        <ul>{listc}</ul>
                        Veuillez dissocier cette compétence des familles
                        suivantes :
                        <ul>{listf}</ul>
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
                  disabled={
                    Object.keys(self.props.profilList).length !== 0 &&
                    rgFamilles.length !== 0
                  }
                  className="btn btn-primary"
                >
                  Supprimer
                </button>
              </Modal.Footer>
            </Modal>
          </div>
        </td>

        {/* INPUT FORMS */}
        <td>
          <RefGpecTypes
            skillData={this.props.skillsTypesModel}
            data-fieldname="st_code"
            readOnly="readonly"
            value={this.state.st_code}
            onChange={this.handleChange}
            disabled="disabled"
          />
        </td>

        <td>
          <Select
            clearable={false}
            multi={true}
            disabled={true}
            value={rgFamilles}
            placeholder={"Aucune Famille associée"}
            removeSelected={true}
            valueRenderer={this.renderValue}
            onValueClick={this.OpenfamilySkills}
          />
        </td>
        <td>
          <input
            className="form-control"
            type="text"
            placeholder="Nom de la compétence"
            value={this.state.skill_shortname}
            data-fieldname="skill_shortname"
            onChange={this.handleChangeSkill}
            onBlur={this.handleSubmit}
            readOnly={this.props.ajaxLoading || this.state.ajaxLoading}
          />
        </td>
        <td>
          <textarea
            className="form-control"
            rows="1"
            placeholder="Commentaires libres"
            value={this.state.skill_free_comments || ""}
            data-fieldname="skill_free_comments"
            onChange={this.handleChangeComm}
            onBlur={this.handleSubmit}
            readOnly={this.state.ajaxLoading}
          />
        </td>
        <td>
          <input
            className="form-control"
            type="text"
            readOnly
            title={this.state.skill_code}
            value={this.state.skill_code}
          />
        </td>
      </tr>
    );
  },
  handleChange: function(event) {},

  handleSubmit: function(event) {
    let self = this;
    if (self.state.mustBeSaved) {
      self.setState(
        { ajaxLoading: true },
        self.props.onSave(self.state.skill_code, self.state)
      );
      setTimeout(() => {
        this.setState({
          mustBeSaved: false,
          ajaxLoading: false
        });
      }, 500);
    }
  },

  handleChangeSkill: function(event) {
    this.setState({ skill_shortname: event.target.value });
    this.setState({ mustBeSaved: true });
  },
  handleChangeComm: function(event) {
    this.setState({ skill_free_comments: event.target.value });
    this.setState({ mustBeSaved: true });
  },

  handleDestroy: function(event) {
    event.preventDefault(); // Let's stop this event.
    event.stopPropagation(); // Really this time.

    if (this.props.ajaxLoading) return;

    this.props.onDestroy(this.state.skill_code);
  },

  handleOpenProfilSkills: function(event) {
    this.closedeleteModal();
    window.scrollTo(0, 0);
    this.props.onProfil(event);
  },
  OpenfamilySkills: function(value, event) {
    this.closedeleteModal();
    this.props.onChangeFamily(value);
  },
  renderValue: function(option) {
    return <strong style={{ color: "Black" }}>{option.label}</strong>;
  },
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state !== nextState) {
      return true;
    }
    return false;
  }
});
export default RefGpecSkill;
