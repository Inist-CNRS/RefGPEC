import React from "react";
let createReactClass = require("create-react-class");
let RefGpecPDF = createReactClass({
  displayName: "RefGpecPDF",

  getInitialState: function() {
    return {
      profil_pdf_path: this.props.skillData
    };
  },

  render: function() {
    return (
      <div>
        {this.state.profil_pdf_path ? (
          <div>
            <a onClick={this.openPDF} href={null}>
              <span className="fa fa-file-pdf-o fa-2x" />
            </a>

            <span className="icon-modify">
              {" "}
              <i
                onClick={this.OpenModal}
                title="Cliquez pour modifier la PDF"
                className="fa fa-pencil"
                aria-hidden="true"
              />
            </span>
          </div>
        ) : (
          <a onClick={this.OpenModal}>
            {" "}
            <span className="fa fa-upload fa-2x" />
          </a>
        )}
      </div>
    );
  },

  OpenModal: function() {
    this.props.onClick();
  },
  openPDF: function() {
    window.open(this.state.profil_pdf_path, "_blank");
  },
  handleChange: function(event) {},

  componentWillReceiveProps: function(nextProps) {
    this.setState({ profil_pdf_path: nextProps.skillData });
  }
});

export default RefGpecPDF;
