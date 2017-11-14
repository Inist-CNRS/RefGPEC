import React from 'react';
import {Modal,DropdownButton,MenuItem} from 'react-bootstrap';
import RefGpecTypes from "./refgpec-types.jsx";
import RefGpecDomains from './refgpec-domains';
var createReactClass = require('create-react-class');
var RefGpecSkill = createReactClass({
  displayName: 'RefGpecSkill',

  getInitialState: function () {
    return {
      skillId:           this.props.skillId,
      skillType:         this.props.skillData.st_code,
      skillDomain:       this.props.skillData.sd_code,
      skillShortName:    this.props.skillData.skill_shortname,
      skillFreeComments: this.props.skillData.skill_free_comments,
      mustBeSaved: false,
      error: '',
      deleteModal :false
    };
    },
    closedeleteModal() {
        this.setState({deleteModal: false});
    },

    opendeleteModal() {
        this.setState({deleteModal: true});
    },

  render: function () {
    return (
 
      <tr id={this.state.skillId}
        data-placement="top" data-toggle="popover" data-trigger="manual"
        data-title="Erreur de saisie" data-content={this.state.error}
      >

        {/* ACTION MENU */}
        <td>
          <div className="btn-group">
            <DropdownButton id="dropdown-skill" title=" " aria-expanded="false">
              <MenuItem  href="" onClick={this.opendeleteModal}> <span className="glyphicon glyphicon-remove"></span> Supprimer la compétence </MenuItem>
              <MenuItem href=""  onClick={this.handleViewAssociatedProfils}> <span className="glyphicon glyphicon-list"></span> Visualiser les profils ayant cette compétence</MenuItem>
            </DropdownButton>
              <Modal show={this.state.deleteModal} onHide={this.closedeleteModal} id="profils-file-modal">
                <Modal.Header closeButton>
                  <h4 className="modal-title">Voulez-vous vraiment supprimer la compétence <b>{this.state.skillShortName}</b> ?</h4>
                </Modal.Header>
                <Modal.Body>
                    {(() => {
                        if(this.props.profillist.length!==0){
                            const list = this.props.profillist.map((profil) =>
                                <li key={this.state.skillId + profil}>{profil}</li>
                            );
                            return (
                                <div className="alert alert-info" role="alert">
                                  En supprimant cette compétence, vous dissocierez des compétences de ces profils :
                                  <ul>{list}</ul>
                                </div>)
                        }

                    })()}

                </Modal.Body>
                <Modal.Footer>
                  <button onClick={this.closedeleteModal} type="button" className="btn btn-default"
                          data-dismiss="modal">Annuler
                  </button>
                  <button type="button" onClick={this.handleDestroy} className="btn btn-primary">Supprimer</button>
                </Modal.Footer>
              </Modal>


          {/*<div className="btn-group">*/}
            {/*<button type="button" className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span className="caret"></span></button>*/}
            {/*<ul className="dropdown-menu">*/}
              {/*<li className={(this.props.ajaxLoading ? 'disabled' : '')}>*/}
                {/*<a href=""*/}
                   {/*onClick={this.handleDestroy}>*/}
                  {/*<span className="glyphicon glyphicon-remove"></span> Supprimer la compétence*/}
                {/*</a>*/}
              {/*</li>*/}
              {/*<li className={(this.props.ajaxLoading ? 'disabled' : '')}>*/}
                {/*<a href=""*/}
                   {/*onClick={this.handleViewAssociatedProfils}>*/}
                  {/*<span className="glyphicon glyphicon-list"></span> Visualiser les profils ayant cette compétence*/}
                {/*</a>*/}
              {/*</li>*/}
            {/*</ul>*/}
          </div>
        </td>


      {/* INPUT FORMS */}
        <td>

          <RefGpecTypes
              skillData={this.props.skillsTypesModel}
              ajaxLoading={true}
              data-fieldname="SkillType"
              readOnly="readonly"
              value={this.state.skillType}
              onChange={this.handleChange}
              disabled="disabled"
          />

        </td>

        <td>
          <RefGpecDomains
              skillData={this.props.skillsDomainsModel}
              ajaxLoading={true}
              data-fieldname="SkillDomain"
              readOnly="readonly"
              value={this.state.skillDomain}
              onChange={this.handleChange}
              disabled="disabled"
          />
        </td>
        <td>
          <input className="form-control" type="text"
            placeholder="Nom de la compétence"
            value={this.state.skillShortName}
            data-fieldname="skillShortName"
            onChange={this.handleChangeSkill}
            onBlur={this.handleSubmit}
            readOnly={this.props.ajaxLoading}
          />
        </td>
        <td>
          <textarea className="form-control" rows="1"
            placeholder="Commentaires libres"
            value={this.state.skillFreeComments}
            data-fieldname="skillFreeComments"
            onChange={this.handleChangeComm}
            onBlur={this.handleSubmit}
            readOnly={this.props.ajaxLoading}
          />
        </td>
        <td>
          <input className="form-control" type="text" readOnly
            title={this.state.skillId}
            value={this.state.skillId}
          />
        </td>
      </tr>

    );
  },
    handleChange: function (event) {

    },

  handleSubmit: function (event) {
    if (this.state.mustBeSaved) {
      this.props.onSave(this.state.skillId, this.state);
      this.setState({ mustBeSaved: false });

    }
  },

    handleChangeSkill: function (event) {

        this.setState({skillShortName:event.target.value});
        this.setState({ mustBeSaved: true });
    },
    handleChangeComm: function (event) {
        this.setState({skillFreeComments:event.target.value});
        this.setState({ mustBeSaved: true });
    },


  handleDestroy: function (event) {
    event.preventDefault(); // Let's stop this event.
    event.stopPropagation(); // Really this time.

    if (this.props.ajaxLoading) return;

    this.props.onDestroy(this.state.skillId);
  },

  handleViewAssociatedProfils: function (event) {
    console.log('TODO: handleViewAssociatedProfils');
    event.preventDefault(); // Let's stop this event.
    event.stopPropagation(); // Really this time.
  },

  componentDidMount () {

  },



});
export default RefGpecSkill;