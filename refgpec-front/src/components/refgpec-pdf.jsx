import React from "react";

var RefGpecPDF = React.createClass({
    displayName: 'RefGpecPDF',

    getInitialState: function () {
        return {
            profil_pdf_path: this.props.skillData,
        };
    },

    render: function () {

        return (
        <div>
            {this.state.profil_pdf_path ?  <a href={this.state.profil_pdf_path}>
                <span className="fa fa-file-pdf-o fa-2x"></span>
            </a> :  <a onClick={this.OpenModal}> <span className="fa fa-upload fa-2x"></span>
            </a> }
        </div>
        );
            },

    getImagePDF: function(){
            if(this.state.profil_pdf_path){
            return ;
        }else{
            return "fa fa-upload fa-2x";
        }
        },

    OpenModal: function(){
           this.props.onClick();
    },

    handleChange: function (event) {
    },

    handleDestroy: function (event) {

    }

});




export default RefGpecPDF;