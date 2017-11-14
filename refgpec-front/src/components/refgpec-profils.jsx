import React from "react";
import ReactDOM from 'react-dom';
import RefGpecProfil from "./refgpec-profil.jsx";
import {DropdownButton,MenuItem,Modal, OverlayTrigger, Popover} from "react-bootstrap";
import RefGpecOrganigrammes from "./refgpec-organigrammes"
import {NotificationContainer,NotificationManager} from "react-notifications"
import RefGpecPDF from './refgpec-pdf';
var createReactClass = require('create-react-class');
var RefGpecProfils = createReactClass({
    displayName: 'RefGpecProfils',


    getInitialState: function () {
        return {
            showModal: false,
            newProfilOrga: '',
            newProfilShortName: '',
            newProfilFreeComments: '',
            newProfilPdfPath :'',
            error: '',
            champtri :'profil_code',
            type_tri : true,
        };
    },
    close() {
        this.setState({showModal: false});
    },

    open() {
        this.setState({showModal: true});
    },
    trieprofil(event){
        if(this.state.champtri===event.target.id){
            this.setState({champtri: event.target.id,type_tri : !this.state.type_tri});
        }else{
            this.setState({champtri: event.target.id,type_tri:true});
        }

    },

    render: function () {
        var self = this;

        // model is not ready ? then do not render anything
        if (self.props.profilsModel.initializing ||
            self.props.orgaModel.initializing) {
            return null;
        }

        let rgProfils = [];
        Object.keys(self.props.profilsModel.profils).forEach(function (key) {
            rgProfils.push(
                <RefGpecProfil
                    key={key} profilId={key}
                    orgaModel={self.props.orgaModel}
                    profilsSkillsModel={self.props.profilsSkillsModel}
                    profilData={self.props.profilsModel.profils[key]}
                    skilllist={self.props.profilsModel.getlistskills(key)}
                    onSave={self.handleSave}
                    onDestroy={self.handleDestroy}
                    ajaxLoading={self.props.profilsModel.ajaxLoading}
                />);
        });

        let rgOrgaList = [];
        Object.keys(self.props.orgaModel.orga).forEach(function (key) {
            rgOrgaList.push(<option value={key} key={key}>{self.props.orgaModel.orga[key].orga_shortname}</option>);
        });
        if(self.state.type_tri){
            rgProfils.sort(function(a,b){return (a.props.profilData[self.state.champtri] > b.props.profilData[self.state.champtri]) ? 1 : ((b.props.profilData[self.state.champtri] > a.props.profilData[self.state.champtri]) ? -1 : 0);} );
        }else{
            rgProfils.sort(function(a,b){return (a.props.profilData[self.state.champtri] < b.props.profilData[self.state.champtri]) ? 1 : ((b.props.profilData[self.state.champtri] < a.props.profilData[self.state.champtri]) ? -1 : 0);} );

        }
    return (

            <div id="profils">

                <div className="row">
                    <div className="col-md-12">

                        <div className="panel panel-default">
                            <div className="panel-heading">Profils de poste</div>
                            <div className="panel-body">
                                <p>
                                    Depuis cet onglet il est possible d'ajouter et de supprimer des profils de poste.
                                    Ces mêmes profils seront ensuite disponibles dans l'onglet <a data-toggle="tab"
                                                                                                  href="#profils-skills"
                                                                                                  onClick={this.handleNavigateTab}>Profils &amp;
                                    Compétences</a> pour pouvoir leur associer des <a data-toggle="tab" href="#skills"
                                                                                      onClick={this.handleNavigateTab}>compétences </a>
                                    <a data-toggle="tab" href="#levels" onClick={this.handleNavigateTab}>modulées</a>.
                                </p>
                            </div>
                        </div>


                        <table id="profils-list" className="table table-striped table-bordered">
                            <thead>
                            <tr>
                                <th className="profils-col-action"></th>
                                <th className="profils-col-file">PDF du profil</th>
                                <th title="Cliquez pour trier par organigramme" role="button" id="orga_code" onClick={this.trieprofil} className="profils-col-orga"> Position dans l'organigramme <i className="fa fa-sort" aria-hidden="true"></i>
                                </th>
                                <th title="Cliquez pour trier par Nom court" role="button" id="profil_shortname" onClick={this.trieprofil}  className="profils-col-title">Intitulé du profil <i className="fa fa-sort" aria-hidden="true"></i></th>
                                <th className="profils-col-stats">Nombre de compétences associées</th>
                                <th title="Cliquez pour trier par Commentaire" role="button" id="profil_free_comments"  onClick={this.trieprofil} className="profils-col-commentary">Commentaires libres <i className="fa fa-sort" aria-hidden="true"></i></th>
                                <th title="Cliquez pour trier par Code" role="button" id="profil_code" onClick={this.trieprofil} className="profils-col-code">Code <i className="fa fa-sort" aria-hidden="true"></i></th>
                            </tr>
                            </thead>
                            <tbody>
                                {rgProfils}
                            {/* FORM USED TO CREATE A NEW PROFIL */}
                            <tr className="form-new-profil">

                                <td>
                                      <DropdownButton id="dropdown-profil" title=" " className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <MenuItem href=""  onClick={this.open }> <span className="fa fa-file-pdf-o"></span> Mettre à jour le PDF du profil </MenuItem></DropdownButton>
                                </td>

                                <td className="text-center">
                                    <RefGpecPDF
                                        skillData={this.state.newProfilPdfPath}
                                        onClick={this.open}
                                    />
                                    {/* Modal d'upload du fichier PDF du profil de poste */}
                                    <Modal show={this.state.showModal} onHide={this.close} id="profils-file-modal">
                                        <Modal.Header closeButton>
                                            <h4 className="modal-title">Uploader le PDF du profil de poste</h4>
                                        </Modal.Header>
                                        <Modal.Body>
                                            {(() => {
                                                if(this.state.newProfilPdfPath){ return <p><input ref="formUrlPdf" className="form-control" type="url" placeholder={this.state.newProfilPdfPath} /></p> }
                                                else{ return <p><input ref="formUrlPdf" className="form-control" type="url" placeholder="Lien du PDF du profil"/></p> }
                                            })()}

                                            <div className="alert alert-info" role="alert">
                                            </div>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <button onClick={this.close} type="button" className="btn btn-default"
                                                    data-dismiss="modal">Fermer
                                            </button>
                                            <button type="button" onClick={this.handleChangePDF} className="btn btn-primary">Uploader</button>
                                        </Modal.Footer>
                                    </Modal>
                                </td>

                                <td>
                                    <RefGpecOrganigrammes

                                        skillData={self.props.orgaModel}
                                        ajaxLoading={self.props.orgaModel.ajaxLoading}
                                        data-fieldname="newProfilOrga"
                                        onChange={this.handleOrgaChange}
                                        value={this.state.newProfilOrga}
                                    />
                                </td>

                                <td colSpan="2">
                                    <input className="form-control" type="text"
                                           placeholder="Intitulé du profil"
                                           value={this.state.newProfilShortName}
                                           data-fieldname="newProfilShortName"
                                           onChange={this.handleChange}
                                           onKeyPress={this.handleKeyPress}
                                           disabled={this.props.profilsModel.ajaxLoading}
                                    />
                                </td>

                                <td>
                      <textarea className="form-control" rows="1"
                                placeholder="Commentaires libres"
                                value={this.state.newProfilFreeComments}
                                data-fieldname="newProfilFreeComments"
                                onChange={this.handleChange}
                                disabled={this.props.profilsModel.ajaxLoading}
                      />
                                </td>
                                <td>
                                    <OverlayTrigger trigger="focus"
                                                    data-title="Erreur nouveau profil" placement="top"
                                                    overlay={
                                                        <Popover id="popover-positioned-top">
                                                            {this.state.error }
                                                        </Popover>}
                                    >
                                        <a href="" className="fa fa-plus-square fa-2x" role="button"
                                           onClick={this.handleSubmit}
                                           title="Ajouter ce profil au référentiel"/>
                                    </OverlayTrigger>
                                </td>

                                {/*<td id="profils-new-profil"*/}
                                {/*data-placement="top" data-toggle="popover"*/}
                                {/*data-trigger="manual" data-title="Erreur nouveau profil"*/}
                                {/*data-content={this.state.error}*/}
                                {/*>*/}
                                {/*<a href="" className="btn fa fa-plus-square fa-2x" role="button"*/}
                                {/*onClick={this.handleSubmit}*/}
                                {/*disabled={self.props.profilsModel.ajaxLoading}*/}
                                {/*title="Ajouter ce profil au référentiel" />*/}
                                {/*</td>*/}
                            </tr>


                            </tbody>
                        </table>

                        <div className="progress"
                             style={{display: self.props.profilsModel.ajaxLoading ? 'block' : 'none'}}>
                            <div className="progress-bar progress-bar-striped active" role="progressbar"
                                 style={{width: '100%'}}>
                            </div>
                        </div>


                    </div>
                </div>
                <NotificationContainer/>
            </div>




        );
    },


    handleSave: function (profilId,profilState){
        let self = this;
        this.props.profilsModel.save(profilId, profilState,function(){
            if(! (self.props.profilsModel.feedback)){
                NotificationManager.success('', 'Le Profil '+ profilId + ' a été modifié');
            }else
            {NotificationManager.error('',self.props.profilsModel.feedback ); }
        });


    },

    handleOrgaChange: function (event) {
        this.setState({newProfilOrga:event});
    },
    handleNavigateTab: function (event) {
        this.props.onTabChange(event.target.getAttribute('href'));
    },


    handleKeyPress: function (event) {
        if (event.charCode === 13) {
            this.handleSubmit(event);
        }
    },

    handleChange: function (event) {
        var newState = {};
        newState[event.target.getAttribute('data-fieldname')] = event.target.value;
        this.setState(newState);
    },


    handleSubmit: function (event) {
        const self = this;
        if (self.props.profilsModel.ajaxLoading) return;
        if (self.state.newProfilShortName && self.state.newProfilOrga ) {
            self.props.profilsModel.addProfil(self.state.newProfilOrga, self.state.newProfilShortName, self.state.newProfilFreeComments, self.state.newProfilPdfPath,function(){
                if(! (self.props.profilsModel.feedback)){
                    NotificationManager.success('', 'le profil '+ self.state.newProfilShortName + ' a été ajouté');
                }else
                {NotificationManager.error('',self.props.profilsModel.feedback ); }
            });
            self.setState({
                newProfilOrga: '',
                newProfilShortName: '',
                newProfilFreeComments: '',
                newProfilPdfPath: '',
                error: ''
            });
        } else {
            var missingFields = [];
            if (!self.state.newProfilShortName) missingFields.push('Nom du profil');
            if (!self.state.newProfilOrga) missingFields.push('Organisastion');
            self.setState({error: 'Il manque des champs avant de pouvoir ajouter le profil :\n' + missingFields.join(', ')});
            // setTimeout(function () {
            //   $('#profils-new-profil').popover(self.state.error ? 'show' : 'hide');
            //   setTimeout(function () {
            //     $('#profils-new-profil').popover('hide');
            //   }, 5000);
            // }, 100);
        }

        event.preventDefault(); // Let's stop this event.
        event.stopPropagation(); // Really this time.
    },

    handleDestroy: function (profilId){
        let self = this;
        this.props.profilsModel.destroy(profilId,function(){
            if(! (self.props.profilsModel.feedback)){
                NotificationManager.success('', 'le profil '+ profilId + ' a été supprimé');
            }else
            {NotificationManager.error('',self.props.profilsModel.feedback ); }
        });
    },

    handleChangePDF : function (event) {
        this.close();
        this.setState({newProfilPdfPath:ReactDOM.findDOMNode(this.refs.formUrlPdf).value});

    },

    componentDidMount () {

    },

    missingField() {
        return (!this.state.newProfilShortName) || (!this.state.newProfilOrga);
    }

});
export default RefGpecProfils;