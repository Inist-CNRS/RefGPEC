import React from "react";
import RefGpecTypes from "./refgpec-types.jsx";
import RefGpecDomains from "./refgpec-domains";
import { OverlayTrigger, Popover } from "react-bootstrap";

const WAIT_INTERVAL = 500;
const ENTER_KEY = 13;
var createReactClass = require("create-react-class");
var RefGpecResearchSkill = createReactClass({
    displayName: "RefGpecResearchSkill",

    getInitialState: function() {
        return {
            SearchSkillType: "",
            SearchSkillDomain: "",
            SearchSkillShortName: "",

    };
    },

    render: function() {
        var self = this;

        // model is not ready ? then do not render anything
        if (
            self.props.skillsModel.initializing ||
            this.props.skillsDomainsModel.initializing ||
            this.props.skillsTypesModel.initializing
        ) {
            return null;
        }

        return (

            <tr className="form-new-skill">
                <td>
                    <OverlayTrigger
                        trigger="focus"
                        placement="top"
                        overlay={
                            <Popover id="popover-positioned-top">
                                {this.state.error}
                            </Popover>
                        }
                    >
                        <i
                            className="fa fa-search fa-3"
                            style= {{fontSize: "2em"}}
                            disabled={true}
                            title="Rechercher dans le référentiel"/>
                    </OverlayTrigger>
                </td>
                <td>
                    <RefGpecTypes
                        skillData={self.props.skillsTypesModel}
                        ajaxLoading={self.props.skillsTypesModel.ajaxLoading}
                        data-fieldname="SearchSkillType"
                        onChange={this.handleTypeChange}
                        value={this.state.SearchSkillType}
                    />
                </td>
                <td>
                    <RefGpecDomains
                        skillData={self.props.skillsDomainsModel}
                        ajaxLoading={self.props.skillsDomainsModel.ajaxLoading}
                        data-fieldname="SearchSkillDomain"
                        onChange={this.handleDomainChange}
                        value={this.state.SearchSkillDomain}
                    />
                </td>
                <td>
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Nom de la compétence à rechercher"
                        value={this.state.SearchSkillShortName}
                        data-fieldname="SearchSkillShortName"
                        onChange={this.handleChange}
                        onKeyDown={this.handleKeyDown}
                        disabled={this.props.skillsModel.ajaxLoading}
                    />
                </td>
            </tr>
        );
    },

    handleTypeChange: function(event) {
        this.setState({ SearchSkillType: event })
        this.timer = setTimeout(this.triggerChange, WAIT_INTERVAL);
    },
    handleDomainChange: function(event) {
        this.setState({ SearchSkillDomain: event });
        this.timer = setTimeout(this.triggerChange, WAIT_INTERVAL);
    },
    handleChange: function(event) {
        clearTimeout(this.timer);
        this.setState({SearchSkillShortName: event.target.value });
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
export default RefGpecResearchSkill;
