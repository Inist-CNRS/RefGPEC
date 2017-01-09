import React from 'react';

module.exports = React.createClass({
  displayName: 'RefGpecSkill',

  getInitialState: function () {
    return {
      skillId:           this.props.skillId,
      skillType:         this.props.skillData.skillType,
      skillDomain:       this.props.skillData.skillDomain,
      skillShortName:    this.props.skillData.skillShortName,
      skillFreeComments: this.props.skillData.skillFreeComments,
      mustBeSaved: false,
      error: ''
    };
  },

  render: function () {

    return (
 
      <tr data-placement="top" data-toggle="popover" data-trigger="manual" title="Erreur de saisie" data-content={this.state.error} id={this.state.skillId}>

        {/* ACTION MENU */}
        <td>
          <div className="btn-group">
            <button type="button" className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span className="caret"></span></button>
            <ul className="dropdown-menu">
              <li className={(this.props.ajaxLoading ? 'disabled' : '')}>
                <a href=""
                   onClick={this.handleDestroy}>
                  <span className="glyphicon glyphicon-remove"></span> Supprimer la compétence
                </a>
              </li>
              <li className={(this.props.ajaxLoading ? 'disabled' : '')}>
                <a href=""
                   onClick={this.handleViewAssociatedProfils}>
                  <span className="glyphicon glyphicon-list"></span> Visualiser les profils ayant cette compétence
                </a>
              </li>
            </ul>
          </div>
        </td>


      {/* INPUT FORMS */}
        <td>
          <select className="form-control"
            value={this.state.skillType}
            data-fieldname="skillType"
            onChange={this.handleChange}
            onKeyUp={this.handleKeyUp}
            onBlur={this.handleSubmit}
            readOnly={this.props.ajaxLoading}
          >
            <option></option>
            <option value="sf">Savoir-faire</option>
            <option value="se">Savoir-être</option>
            <option value="s">Savoir</option>
          </select>
        </td>
        <td>
          <select className="form-control"
            value={this.state.skillDomain}
            data-fieldname="skillDomain"
            onChange={this.handleChange}
            onKeyUp={this.handleKeyUp}
            onBlur={this.handleSubmit}
            readOnly={this.props.ajaxLoading}
          >
            <option></option>
            <option value="gen">Général</option>
            <option value="comm">Communication</option>
            <option value="geadmin">Gestion administrative</option>
            <option value="info">Informatique</option>
            <option value="inist">Inist-CNRS</option>
            <option value="ist">IST</option>
            <option value="lang">Langues</option>
            <option value="manag">Management</option>
            <option value="outils">Outils</option>
          </select>
        </td>
        <td>
          <input className="form-control" type="text"
            placeholder="Nom de la compétence"
            value={this.state.skillShortName}
            data-fieldname="skillShortName"
            onChange={this.handleChange}
            onKeyUp={this.handleKeyUp}
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
            onKeyUp={this.handleKeyUp}
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
    }
  },

  handleChange: function (event) {
    console.log('skill.handleChange')

    var newState = {};
    newState[event.target.getAttribute('data-fieldname')] = event.target.value;
    this.setState(newState);
  },

  handleKeyUp: function (event) {
    console.log('skill.handleKeyUp')

    this.setState({ mustBeSaved: true });
    console.log('must be saved');
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
