import React from 'react';
import {DropdownButton,MenuItem} from 'react-bootstrap';
var RefGpecLevel = React.createClass({
  displayName: 'RefGpecLevel',

  getInitialState: function () {
    return {
      levelId:           this.props.levelData.level_code,
      levelShortName:    this.props.levelData.level_shortname,
      levelFreeComments: this.props.levelData.level_free_comments,
      mustBeSaved: false,
      error: ''
    };
  },

  render: function () {

    return (
 
      <tr id={this.state.levelId}
          data-placement="top" data-toggle="popover" data-trigger="manual"
          data-title="Erreur de saisie" data-content={this.state.error}
      >

        {/* ACTION MENU */}
        <td>
          <div className="btn-group">
            <DropdownButton title=" " aria-expanded="false">
              <MenuItem  href="" onClick={this.handleDestroy}>  <span className="glyphicon glyphicon-remove"></span> Supprimer la modulation de compétence
              </MenuItem>
            </DropdownButton>
          </div>
        </td>

        <td>
          <input className="form-control" type="text"
            placeholder="Nom court de la modulation"
            data-fieldname="levelShortName"
            value={this.state.levelShortName}
            onChange={this.handleChange}
            onBlur={this.handleSubmit}
            readOnly={this.props.ajaxLoading}
           />
        </td>
        <td>
          <textarea className="form-control" rows="2"
            placeholder="Expliquez en quelque mots la signification de cette modulation de compétence"
            data-fieldname="levelFreeComments"
            value={this.state.levelFreeComments}
            onChange={this.handleChange}
            onBlur={this.handleSubmit}
            readOnly={this.props.ajaxLoading}
          />
        </td>
        <td>
          <input className="form-control" type="string"
            placeholder="Code unique identifiant la modulation"
            data-fieldname="levelId"
            readOnly
            title={this.state.levelId}
            value={this.state.levelId}
          />
        </td>
      </tr>

    );
  },

  handleSubmit: function (event) {
    if (this.state.mustBeSaved) {
      this.props.onSave(this.state.levelId, this.state);
      this.setState({ mustBeSaved: false });
    }
  },

  handleChange: function (event) {
    // tells the data must be saved when possible
    if (event.target.value !== this.state[event.target.getAttribute('data-fieldname')]) {
     // console.log('mustBeSaved', event.target.getAttribute('data-fieldname'));
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


    this.props.onDestroy(this.state.levelId);
  },

  componentDidMount () {

  },



});
export default RefGpecLevel;