import React from "react";
import RefGpecTags from "./refgpec-tags.jsx";
import Select from 'react-select';
import 'react-select/dist/react-select.css';
const WAIT_INTERVAL = 500;
const ENTER_KEY = 13;
var createReactClass = require("create-react-class");
var RefGpecResearchProfil = createReactClass({
    displayName: "RefGpecResearchProfil",

    getInitialState: function() {
        return {
            SearchProfilTag: "",
            SearchProfilShortName: "",

        };
    },

    render: function() {
        var self = this;

        // model is not ready ? then do not render anything
        if (
            self.props.profilsModel.initializing
        ) {
            return null;
        }
        let rgTags = [];

            Object.keys(self.props.tagList).forEach(function(key) {
              rgTags.push({value:self.props.tagList[key].profil_tag,label:self.props.tagList[key].profil_tag}
              );
            });

        return (

            <tr className="form-research-profil">
                <td  style= {{width: "93px",textAlign:"center"}}>

                        <i
                            className="fa fa-search fa-3"
                            style= {{fontSize: "2em"}}
                            disabled={true}
                            title="Rechercher un profil"/>
                </td>
                   <td colSpan="2">
                   <Select
                           clearable={true}
                           multi={false}
                           simpleValue
                           options={rgTags}
                           onChange={this.handleTagChange}
                           data-fieldname="SearchProfilTag"
                           value={this.state.SearchProfilTag}
                           promptTextCreator={(label) => "Créer le Tag "+label}
                            clearable ={true}
                       />
                </td>

                <td colSpan="4" width="300px">
                <div className="input-group">
                                        <span style={{ cursor: "pointer"}} onClick={this.resetSearch} className="input-group-addon"><i className="fa fa-times fa-fw"></i></span>
                                        <input
                        className="form-control"
                        type="text"
                        placeholder="Nom du profil à rechercher"
                        value={this.state.SearchProfilShortName}
                        data-fieldname="SearchProfilShortName"
                        onChange={this.handleChange}
                        onKeyDown={this.handleKeyDown}
                        disabled={this.props.profilsModel.ajaxLoading}
                    />
                                      </div>
                                  </td>
                              </tr>
        );
    },

    handleTagChange: function(event) {
    if(event){
      this.setState({ SearchProfilTag: event });
    }else {
          this.setState({ SearchProfilTag: "" });
    }
        this.timer = setTimeout(this.triggerChange, WAIT_INTERVAL);
    },

    handleChange: function(event) {
        clearTimeout(this.timer);
        this.setState({SearchProfilShortName: event.target.value });
        this.timer = setTimeout(this.triggerChange, WAIT_INTERVAL);
    },

    handleKeyDown(e) {
        if (e.keyCode === ENTER_KEY) {
            this.triggerChange();
        }
    },

    triggerChange() {
        this.props.onChange(this.state);
    },
    resetSearch() {
        this.setState({SearchProfilShortName: ""});
        this.timer = setTimeout(this.triggerChange, WAIT_INTERVAL);
    },
    componentWillMount() {
        this.timer = null;
    },


});
export default RefGpecResearchProfil;
