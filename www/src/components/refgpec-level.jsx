import React from 'react';

module.exports = React.createClass({
  displayName: 'RefGpecLevel',

  // propTypes: {
  //   levelId:     React.PropTypes.string,
  //   levelData:   React.PropTypes.object,
  //   onSave:      React.PropTypes.object,
  // },

  getInitialState: function () {
//    console.log(this.props.levelData, this.props.levelId)
    if (this.props.levelId && this.props.levelData) {
      return {
        levelId: this.props.levelId,
        item: this.props.levelData,
        mustBeSaved: false,
        error: ''
      };
    } else {
      return {
        levelId: '',
        item: {
          shortName:   '',
          freeComment: '',          
        },
        mustBeSaved: false,
        error: ''
      };
    }
  },

  render: function () {

    let actions = null;
    if (this.state.levelId) {
      actions = <div className="btn-group">
          <button type="button" className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span className="caret"></span></button>
          <ul className="dropdown-menu">
            <li><a href="#" onClick={this.handleDestroy}><span className="glyphicon glyphicon-remove"></span> Supprimer la compétence</a></li>
          </ul>
        </div>
    }

    return (
 
      <tr data-placement="top" data-toggle="popover" data-trigger="manual" title="Erreur de saisie" data-content={this.state.error} id={this.state.levelId}>
        <td>
          {actions}
        </td>
        <td>
          <input className="form-control" type="text"
            placeholder="Nom court de la modulation"
            data-fieldname="shortName"
            value={this.state.item.shortName}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            onBlur={this.handleSubmit}
           />
        </td>
        <td>
          <textarea className="form-control" rows="1"
            placeholder="Expliquez en quelque mots la signification de cette modulation de compétence"
            data-fieldname="freeComment"
            value={this.state.item.freeComment}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            onBlur={this.handleSubmit}
          />
        </td>
        <td>
          <input className="form-control" type="string"
            placeholder="Code unique identifiant la modulation"
            data-fieldname="levelId"
            value={this.state.levelId}
            onChange={this.handleLevelIdChange}
            onKeyDown={this.handleKeyDown}
            onBlur={this.handleSubmit}
          />
        </td>
      </tr>

    );
  },

  handleSubmit: function (event) {
    console.log('submit');
    if (this.state.mustBeSaved) {
      this.props.onSave(this.state.levelId, this.state.item);
      this.setState({ mustBeSaved: false });
    }
  },

  handleLevelIdChange: function (event) {
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
    var newState = { item: {} };
    newState.item[event.target.getAttribute('data-fieldname')] = event.target.value;
    this.setState(newState);
  },

  handleKeyDown: function (event) {
    this.setState({ mustBeSaved: true });
    console.log('must be saved');
  },

  handleDestroy: function (event) {
    this.props.onDestroy(this.state.levelId);
  },

  componentDidMount () {

  },



});
