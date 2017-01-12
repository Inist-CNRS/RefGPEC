import React from 'react';

module.exports = React.createClass({
  displayName: 'RefGpecLevel',

  getInitialState: function () {
    return {
      levelId:           this.props.levelId,
      levelShortName:    this.props.levelData.levelShortName,
      levelFreeComments: this.props.levelData.levelFreeComments,
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
            <button type="button" className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span className="caret"></span></button>
            <ul className="dropdown-menu">
              <li className={(this.props.ajaxLoading ? 'disabled' : '')}>
                <a href=""
                   onClick={this.handleDestroy}>
                  <span className="glyphicon glyphicon-remove"></span> Supprimer la compétence
                </a>
              </li>
            </ul>
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
    if (event.target.value != this.state[event.target.getAttribute('data-fieldname')]) {
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

    this.props.onDestroy(this.state.levelId);
  },

  componentDidMount () {

  },



});
