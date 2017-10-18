import React from 'react';
import {DropdownButton,MenuItem} from 'react-bootstrap';
import RefGpecTypes from "./refgpec-types.jsx";
import RefGpecDomains from './refgpec-domains';
var RefGpecSkill = React.createClass({
  displayName: 'RefGpecSkill',

  getInitialState: function () {
    return {
      skillId:           this.props.skillId,
      skillType:         this.props.skillData.st_code,
      skillDomain:       this.props.skillData.sd_code,
      skillShortName:    this.props.skillData.skill_shortname,
      skillFreeComments: this.props.skillData.skill_free_comments,
      mustBeSaved: false,
      error: ''
    };
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
            <DropdownButton title=" " className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <MenuItem  href="" onClick={this.handleDestroy}> <span className="glyphicon glyphicon-remove"></span> Supprimer la compétence </MenuItem>
              <MenuItem href=""  onClick={this.handleViewAssociatedProfils}> <span className="glyphicon glyphicon-list"></span> Visualiser les profils ayant cette compétence</MenuItem>
            </DropdownButton>

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
              ajaxLoading={this.props.skillsTypesModel.ajaxLoading}
              data-fieldname="SkillType"
              onChange={this.handleTypeChange}
              value={this.state.skillType}

          />

        </td>

        <td>
          <RefGpecDomains
              skillData={this.props.skillsDomainsModel}
              ajaxLoading={this.props.skillsDomainsModel.ajaxLoading}
              data-fieldname="SkillDomain"
              onChange={this.handleDomainChange}
              value={this.state.skillDomain}
          />
        </td>
        <td>
          <input className="form-control" type="text"
            placeholder="Nom de la compétence"
            value={this.state.skillShortName}
            data-fieldname="skillShortName"
            onChange={this.handleChange}
            onBlur={this.handleSubmit}
            readOnly={this.props.ajaxLoading}
          />
        </td>
        <td>
          <textarea className="form-control" rows="1"
            placeholder="Commentaires libres"
            value={this.state.skillFreeComments}
            data-fieldname="skillFreeComments"
            onChange={this.handleChange}
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

  handleSubmit: function (event) {
    if (this.state.mustBeSaved) {
      this.props.onSave(this.state.skillId, this.state.item);
      this.setState({ mustBeSaved: false });
    
      // // display or hide a nice popover to show the error
      // const self = this;
      // self.setState({ error: 'saving... demo error msg' });
      // setTimeout(function () {
      //   $('#' + self.state.skillId).popover(self.state.error ? 'show' : 'hide');
      // }, 100);
    }
  },

    handleTypeChange: function (event) {
        this.setState({skillType:event});
    },
    handleDomainChange: function (event) {
        this.setState({skillDomain:event});
    },
    handleChange: function (event) {
        var newState = {};
        newState[event.target.getAttribute('data-fieldname')] = event.target.value;
        this.setState(newState);
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