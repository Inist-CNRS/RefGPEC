import React from 'react';
import {DropdownButton,MenuItem} from 'react-bootstrap';
var RefGpecProfil = React.createClass({
  displayName: 'RefGpecProfil',

  getInitialState: function () {
    return {
      profilId:           this.props.profilId,
      profilOrga:         this.props.profilData.profilOrga,
      profilShortName:    this.props.profilData.profilShortName,
      profilFreeComments: this.props.profilData.profilFreeComments,
      profilNbSkillsSF:   this.props.profilData.profilNbSkillsSF,
      profilNbSkillsS:    this.props.profilData.profilNbSkillsS,
      profilNbSkillsSE:   this.props.profilData.profilNbSkillsSE,

      mustBeSaved: false,
      error: ''
    };
  },

  render: function () {
    const self = this;

    // model is not ready ? then do not render anything
    if (self.props.orgaModel.initializing) {
      return null;
    }

    // calculate the classname for skills stats associated to the specified profil
    let nbClassName = {};
    [ 'profilNbSkillsSF', 'profilNbSkillsS', 'profilNbSkillsSE' ].forEach(function (skillTypeNb) {
      nbClassName[skillTypeNb] = 'label';
      if (self.state[skillTypeNb] === 0) {
        nbClassName[skillTypeNb] += ' label-danger';
      } else if (self.state[skillTypeNb] === 1) {
        nbClassName[skillTypeNb] += ' label-warning';
      } else {
        nbClassName[skillTypeNb] += ' label-success';
      }
    })

    let rgOrgaList = [];
    Object.keys(self.props.orgaModel.orga).forEach(function (key) {
      rgOrgaList.push(<option value={key} key={key}>{self.props.orgaModel.orga[key].orgaShortName}</option>);
    }); 

    return (
 
      <tr id={this.state.profilId}
          data-placement="top" data-toggle="popover" data-trigger="manual"
          data-title="Erreur de saisie" data-content={this.state.error}
      >
       
        {/* ACTION MENU */}
        <td>
          <div className="btn-group">
          <DropdownButton title=" " className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <MenuItem  href="" onClick={this.handleOpenProfilSkills}>   <span className="glyphicon glyphicon-list"></span> Associer des compétences à ce profil </MenuItem>
            <MenuItem href=""  onClick={this.handleUpdatePDF}> <span className="fa fa-file-pdf-o"></span> Mettre à jour le PDF du profil </MenuItem>
            <MenuItem  href="" onClick={this.handleDestroy}> <span className="glyphicon glyphicon-remove"></span> Supprimer le profil </MenuItem>
          </DropdownButton>

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
          <a href={'/profils/' + this.state.profilId + '.pdf'}>
            <span className="fa fa-file-pdf-o fa-2x"></span>
          </a>
        </td>
        <td>
          <select className="form-control"
            value={this.state.profilOrga}
            data-fieldname="profilOrga"
            onChange={this.handleChange}
            onBlur={this.handleSubmit}
            readOnly={this.props.ajaxLoading}
          >
            {rgOrgaList}
          </select>                    
        </td>
        <td>
          <input className="form-control" type="text"
            placeholder="Intitulé du profil"
            value={this.state.profilShortName}
            data-fieldname="profilShortName"
            onChange={this.handleChange}
            onBlur={this.handleSubmit}
            readOnly={this.props.ajaxLoading}
          />
        </td>
        <td>
          <p>
            <a href="#" onClick={this.handleOpenProfilSkills}>
              <span className="glyphicon glyphicon-link" title="Associer des compétences à ce profil"></span>
            </a>&nbsp;
            <span className={nbClassName['profilNbSkillsSF']}>{this.state.profilNbSkillsSF} savoir-faire</span>&nbsp;
            <span className={nbClassName['profilNbSkillsSE']}>{this.state.profilNbSkillsSE} savoir-être</span>&nbsp;
            <span className={nbClassName['profilNbSkillsS']}>{this.state.profilNbSkillsS} savoirs</span>
          </p>
        </td>
        <td>
          <textarea className="form-control" rows="1"
            placeholder="Commentaires libres"
            value={this.state.profilFreeComments}
            data-fieldname="profilFreeComments"
            onChange={this.handleChange}
            onBlur={this.handleSubmit}
            readOnly={this.props.ajaxLoading}
          />
        </td>
        <td>
          <input className="form-control" type="text" readOnly
            title={this.state.profilId}
            value={this.state.profilId}
          />
        </td>
      </tr>

    );
  },

  handleSubmit: function (event) {
    if (this.state.mustBeSaved) {
      this.props.onSave(this.state.profilId, this.state.item);
      this.setState({ mustBeSaved: false });
    
      // // display or hide a nice popover to show the error
      // const self = this;
      // self.setState({ error: 'saving... demo error msg' });
      // setTimeout(function () {
      //   $('#' + self.state.profilId).popover(self.state.error ? 'show' : 'hide');
      // }, 100);
    }
  },

  handleChange: function (event) {
    console.log('profil.handleChange')

    // if it's a change in a select box,
    // tells the component to save data soon
    if (event.target.tagName === 'SELECT') {
      this.setState({ mustBeSaved: true });
    } else if (event.target.value !== this.state[event.target.getAttribute('data-fieldname')]) {
      console.log('mustBeSaved', event.target.getAttribute('data-fieldname'));
      this.setState({ mustBeSaved: true });
    }

    var newState = {};
    newState[event.target.getAttribute('data-fieldname')] = event.target.value;
    this.setState(newState);
  },

  handleDestroy: function (event) {
    event.preventDefault(); // Let's stop this event.
    event.stopPropagation(); // Really this time.

    if (this.props.ajaxLoading) return;

    this.props.onDestroy(this.state.profilId);
  },

  handleOpenProfilSkills: function (event) {
    console.log('TODO: handleOpenProfilSkills ' + this.state.profilId);
    event.preventDefault(); // Let's stop this event.
    event.stopPropagation(); // Really this time.
  },

  componentDidMount () {

  },



});
export default RefGpecProfil;