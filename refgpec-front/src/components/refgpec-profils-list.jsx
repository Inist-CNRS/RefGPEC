import React from "react";
import RefGpecProfilList from "./refgpec-profil-list.jsx";
var createReactClass = require("create-react-class");
var RefGpecProfilsList = createReactClass({
  displayName: "RefGpecProfilsList",

  getInitialState: function() {
    return {
      mustBeSaved: false,
      error: "",
      profil_code: this.props.skillData.profil_code
    };
  },

  render: function() {
      let self = this;
    let label ="";
    let rgProfils = [];
    let rgTag = this.props.skillData.listTag;

      Object.keys(rgTag).forEach(function(tag) {

        if(tag==='null'){
           label= "Non Classé";
        }else{
            label= rgTag[tag].tag_shortname;
        }
          let listoption = [];
          rgProfils.push(
              <optgroup key={label} label={label}>
                  {(() => {
                      Object.keys(self.props.skillData.profils).forEach(function(key) {
                          if (self.props.skillData.profils[key].tag_code === tag) {
                              listoption.push(
                                  <RefGpecProfilList
                                      key={key}
                                      profil_code={key}
                                      skillData={self.props.skillData.profils[key]}
                                      ajaxLoading={self.props.skillData.ajaxLoading}
                                  />
                              );
                          }
                          if (!self.props.skillData.profils[key].tag_code  && label=== "Non Classé" ){
                              listoption.push(
                                  <RefGpecProfilList
                                      key={key}
                                      profil_code={key}
                                      skillData={self.props.skillData.profils[key]}
                                      ajaxLoading={self.props.skillData.ajaxLoading}
                                  />
                              );
                          }
                      });
                      return listoption;
                  })()}
        </optgroup>
      );
    });

    return (
      <select
        className="form-control"
        value={self.props.value}
        onChange={this.handleChange}
        readOnly={this.props.readOnly}
        disabled={this.props.disabled}
      >
        <option />
        {rgProfils}
      </select>
    );
  },

  handleChange: function(event) {
    this.props.onChange(event.target.value);
  },

  handleDestroy: function(event) {},

  componentDidMount() {}
});
export default RefGpecProfilsList;
