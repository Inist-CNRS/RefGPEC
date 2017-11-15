import React from 'react';
import {Modal,DropdownButton,MenuItem} from 'react-bootstrap';
var createReactClass = require('create-react-class');
var RefGpecLevel = createReactClass({
  displayName: 'RefGpecLevel',

  getInitialState: function () {
    return {
      level_code:           this.props.levelData.level_code,
      level_number:           this.props.levelData.level_number,
      level_shortname:    this.props.levelData.level_shortname,
      level_free_comments: this.props.levelData.level_free_comments,
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
var self= this;
    return (

      <tr id={this.state.level_code}
          data-placement="top" data-toggle="popover" data-trigger="manual"
          data-title="Erreur de saisie" data-content={this.state.error}
      >

        {/* ACTION MENU */}
        <td>
          <div className="btn-group">
            <DropdownButton id="dropdown-level" title=" " aria-expanded="false">
              <MenuItem  href="" onClick={this.opendeleteModal}>  <span className="glyphicon glyphicon-remove"></span> Supprimer la modulation de compétence
              </MenuItem>
            </DropdownButton>
            <Modal show={this.state.deleteModal} onHide={this.closedeleteModal} id="profils-file-modal">
              <Modal.Header closeButton>
                <h4 className="modal-title">Voulez-vous vraiment supprimer la modulation <b>{this.state.level_shortname}</b> ?</h4>
              </Modal.Header>
              <Modal.Body>

                  {(() => {
                      let list =[];
                     if(Object.keys(self.props.profillist).length!==0){
                        Object.keys(this.props.profillist).forEach(function (profil) {
                            list.push(<li key={self.state.level_code + profil}>{self.props.profillist[profil].profil_shortname} :
                              <strong style={{color: 'red'}}> {(self.props.nbSkill[self.props.profillist[profil].profil_code])} </strong> compétences seront
                             dissociées)</li>)
                         });
                         return (
                             <div   className="alert alert-info" role="alert">
                               En supprimant cette modulation, vous dissocierez des compétences de ces profils :
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
          </div>
        </td>


        <td>
          <input className="form-control" type="text"
            placeholder="Nom court de la modulation"
            data-fieldname="level_shortname"
            value={this.state.level_shortname}
            onChange={this.handleChange}
            onBlur={this.handleSubmit}
            readOnly={this.props.ajaxLoading}
           />
        </td>
        <td>
          <input className="form-control" type="number"
                 min="1" max ={this.props.max+1}
                 data-fieldname="level_number"
                 value={this.state.level_number}
                 onKeyPress={this.handleKeyPress}
                 onChange={this.handleChange}
                 onBlur={this.handleSubmit}
                 disabled={this.props.ajaxLoading}
          />
        </td>
        <td>
          <textarea className="form-control" rows="2"
            placeholder="Expliquez en quelque mots la signification de cette modulation de compétence"
            data-fieldname="level_free_comments"
            value={this.state.level_free_comments}
            onChange={this.handleChange}
            onBlur={this.handleSubmit}
            readOnly={this.props.ajaxLoading}
          />
        </td>
        <td>
          <input className="form-control" type="string"
            placeholder="Code unique identifiant la modulation"
            data-fieldname="level_code"
            readOnly
            title={this.state.level_code}
            value={this.state.level_code}
          />
        </td>
      </tr>

    );
  },

  handleSubmit: function (event) {
    if (this.state.mustBeSaved) {
      this.props.onSave(this.state.level_code, this.state);
      this.setState({ mustBeSaved: false });
    }
  },

  handleChange: function (event) {
    // tells the data must be saved when possible
    if (event.target.value !== this.state[event.target.getAttribute('data-fieldname')]) {
        var newState = {};
        if(event.target.getAttribute('data-fieldname')==="level_number"){
            newState[event.target.getAttribute('data-fieldname')] = event.target.value;

            if(parseInt(event.target.value,10 )> (this.props.max+2)){
                newState[event.target.getAttribute('data-fieldname')] = this.props.max+1;
            }

            if(parseInt(event.target.value,10 ) < 1){
                newState[event.target.getAttribute('data-fieldname')] = 1;
            }

        }else{
            newState[event.target.getAttribute('data-fieldname')] = event.target.value;
        }


     // console.log('mustBeSaved', event.target.getAttribute('data-fieldname'));
      this.setState({ mustBeSaved: true });
    }
    this.setState(newState);
  },

  handleDestroy: function (event) {
    event.preventDefault(); // Let's stop this event.
    event.stopPropagation(); // Really this time.

    if (this.props.ajaxLoading) return;


    this.props.onDestroy(this.state.level_code);
  },

  componentDidMount () {

  },



});
export default RefGpecLevel;