import React from "react";
var createReactClass = require("create-react-class");
var RefGpecPDF = createReactClass({
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
          <a onClick={this.openPDF} href={null}>
            <span className="fa fa-file-pdf-o fa-2x" />
          </a>
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
