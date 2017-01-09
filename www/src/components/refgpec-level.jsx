import React from 'react';

module.exports = React.createClass({
  displayName: 'RefGpecLevel',

  getInitialState: function () {
    return {
      levelId: this.props.levelId,
      item: this.props.levelData,
      mustBeSaved: false,
      error: ''
    };
  },

  render: function () {

    return (
 
      <tr data-placement="top" data-toggle="popover" data-trigger="manual" title="Erreur de saisie" data-content={this.state.error} id={this.state.levelId}>

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
            data-fieldname="shortName"
            value={this.state.item.shortName}
            onChange={this.handleChange}
            onKeyUp={this.handleKeyUp}
            onBlur={this.handleSubmit}
            readOnly={this.props.ajaxLoading}
           />
        </td>
        <td>
          <textarea className="form-control" rows="2"
            placeholder="Expliquez en quelque mots la signification de cette modulation de compétence"
            data-fieldname="freeComment"
            value={this.state.item.freeComment}
            onChange={this.handleChange}
            onKeyUp={this.handleKeyUp}
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
      this.props.onSave(this.state.levelId, this.state.item);
      this.setState({ mustBeSaved: false });
    }
  },

  handleLevelIdChange: function (event) {
    console.log('level.handleLevelIdChange')
    var self = this;

    if (this.props.onAskLevelIdExists(event.target.value)) {
      this.setState({ error: 'Le code ' + event.target.value + ' existe déja' });
      event.preventDefault();
      event.stopPropagation();  
    } else {
      console.log('TODO call renameLevelId', this.state.levelId, event.target.value);
      this.setState({ levelId: event.target.value, error: '' });
    }

    // display or hide a nice popover to show the error
    setTimeout(function () {
      $('#' + self.state.levelId).popover(self.state.error ? 'show' : 'hide');
    }, 100);
  },

  handleChange: function (event) {
    console.log('level.handleChange')

    var newState = { item: {} };
    newState.item[event.target.getAttribute('data-fieldname')] = event.target.value;
    this.setState(newState);
  },

  handleKeyUp: function (event) {
    console.log('level.handleKeyUp')

    this.setState({ mustBeSaved: true });
    console.log('must be saved');
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
