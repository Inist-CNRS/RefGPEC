import React from 'react';

module.exports = React.createClass({
  displayName: 'RefGpecLevelsItem',

  propTypes: {
    shortName:   React.PropTypes.string,  // shortname of the skill level
    freeComment: React.PropTypes.string,  // free comment about the skill level
    code:        React.PropTypes.string, // numeric value associated to the skill level
  },

  // ne semble pas fonctionner
  // defaultProps: {
  //   shortName:   '',
  //   freeComment: '',
  //   code:        '0',
  // },


  getInitialState: function () {
    return {
      shortName: this.props.shortName,
      freeComment: this.props.freeComment,
      code: this.props.code,
    };
  },

  render: function () {

    let actions = null;
    console.log(this.state.shortName)
    if (this.state.shortName) {
      actions = <div className="btn-group">
          <button type="button" className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span className="caret"></span></button>
          <ul className="dropdown-menu">
            <li><a href="#"><span className="glyphicon glyphicon-remove"></span> Supprimer la compétence</a></li>
          </ul>
        </div>
    }

    return (
 
      <tr>
        <td>
          {actions}
        </td>
        <td>
          <input className="form-control" type="text"
            placeholder="Nom court de la modulation"
            value={this.state.shortName}
            onChange={this.handleChange}
           />
        </td>
        <td><textarea className="form-control" rows="1" placeholder="Expliquez en quelque mots la signification de cette modulation de compétence">{this.state.freeComment}</textarea></td>
        <td><input className="form-control" type="number" placeholder="" value={this.state.code} /></td>
      </tr>

    );
  },


  handleChange: function (event) {
    this.setState({shortName: event.target.value});
  },

  componentDidMount () {

  },



});
