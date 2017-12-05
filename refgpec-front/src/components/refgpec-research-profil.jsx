import React from "react";
import RefGpecTags from "./refgpec-tags.jsx";

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

        return (

            <tr className="form-research-profil">
                <td>

                        <i
                            className="fa fa-search fa-3"
                            style= {{fontSize: "2em"}}
                            disabled={true}
                            title="Rechercher un profil"/>
                </td>
                   <td colSpan="2">
                    <RefGpecTags
                        skillData={this.props.tagList}
                        ajaxLoading={this.props.profilsModel.ajaxLoading}
                        data-fieldname="SearchProfilTag"
                        onChange={this.handleTagChange}
                        onBlur={this.handleTagChange}
                        value={this.state.SearchProfilTag}
                    />

                </td>

                <td colSpan="4">
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
                </td>
            </tr>
        );
    },

    handleTagChange: function(event) {
        this.setState({ SearchProfilTag: event });
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

    componentWillMount() {
        this.timer = null;
    },
});
export default RefGpecResearchProfil;
