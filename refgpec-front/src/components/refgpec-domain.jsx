import React from "react";
import { Modal, DropdownButton, MenuItem } from "react-bootstrap";
import RefGpecTypes from "./refgpec-types.jsx";
import RefGpecDomains from "./refgpec-list-domains";
var createReactClass = require("create-react-class");
var RefGpecDomain = createReactClass({
    displayName: "RefGpecDomain",

    getInitialState: function() {
        return {
            sd_code: this.props.DomainId,
            sd_shortname: this.props.DomainData.sd_shortname,
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
                id={this.state.sd_code}
                data-placement="top"
                data-toggle="popover"
                data-trigger="manual"
                data-title="Erreur de saisie"
                data-content={this.state.error}
            >
                {/* ACTION MENU */}
                <td>
                    <div className="btn-group">
                        <DropdownButton id="dropdown-skill" title=" " aria-expanded="false">
                            <MenuItem href="" onClick={this.opendeleteModal}>
                                {" "}
                                <span className="glyphicon glyphicon-remove" /> Supprimer le Domaine{" "}
                            </MenuItem>
                        </DropdownButton>
                        <Modal
                            show={this.state.deleteModal}
                            onHide={this.closedeleteModal}
                            id="profils-file-modal"
                        >
                            <Modal.Header closeButton>
                                <h4 className="modal-title">
                                    Voulez-vous vraiment supprimer le domaine{" "}
                                    <b>{this.state.sd_shortname}</b> ?
                                </h4>
                            </Modal.Header>
                            <Modal.Body>
                                {(() => {
                                    let list = [];
                                    if (Object.keys(self.props.skillList).length !== 0) {
                                        Object.keys(self.props.skillList).forEach(function(
                                            skill
                                        ) {
                                            list.push(
                                                <li key={self.state.sd_code + skill}><a
                                                    href="#profils-skills"
                                                    id={self.props.skillList[skill].skill_code}
                                                    onClick={self.handleOpenProfilSkills}
                                                >
                                                    { self.props.skillList[skill].skill_shortname
                                                    }{" "}
                                                </a></li>
                                            );
                                        });
                                        return (
                                            <div className="alert alert-info" role="alert">
                                                Veuillez dissocier ce Domaine des compétences suivantes :
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
                                    disabled
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
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Nom court du domaine"
                        data-fieldname="sd_shortname"
                        value={this.state.sd_shortname}
                        onChange={this.handleChange}
                        onBlur={this.handleSubmit}
                        readOnly
                        title={this.GetTitle()}
                        />
                </td>
                <td>
                    <input
                        className="form-control"
                        type="text"
                        readOnly
                        title={this.state.sd_code}
                        value={this.state.sd_code}
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
                self.props.onSave(self.state.sd_code, self.state)
            );
            setTimeout(() => {
                this.setState({
                    mustBeSaved: false,
                    ajaxLoading: false
                });
            }, 500);
        }
    },

    handleDestroy: function(event) {
        event.preventDefault(); // Let's stop this event.
        event.stopPropagation(); // Really this time.

        if (this.props.ajaxLoading) return;

        this.props.onDestroy(this.state.sd_code);
    },
    
    
    shouldComponentUpdate(nextProps, nextState) {
        if (this.state !== nextState) {
            return true;
        }
        return false;
    },
    GetTitle() {
        let title = "";
        if (Object.keys(this.props.skillList).length !== 0) {
            title = "Veuillez dissocier les compétences associées avant de modifier ";
        }
        return title;
    }
});
export default RefGpecDomain;
