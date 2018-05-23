import React from "react";
import logo from "../img/gpec_256x256.png";
let createReactClass = require("create-react-class");
let RefGpecIndex = createReactClass({
  displayName: "RefGpecIndex",

  getInitialState: function() {
    return {};
  },

  render() {
    let self = this;

    if (self.props.indexModel.initializing) {
      return null;
    }
    let title = self.props.indexModel.title;
    let description = self.props.indexModel.description;
    return (
      <div id="index">
        <div className="row">
          <div className="col-md-12">
            <div className="jumbotron">
              <div className="container">
                <h1 dangerouslySetInnerHTML={{ __html: title }} />
                <p>
                  <img
                    className="gpec-big-logo img-responsive pull-left"
                    src={logo}
                    alt=""
                  />
                  <span dangerouslySetInnerHTML={{ __html: description }} />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },

  handleNavigateTab: function(event) {
    window.scrollTo(0, 0);
    this.props.onTabChange(event.target.getAttribute("href"));
  },

  componentDidMount() {}
});
export default RefGpecIndex;
