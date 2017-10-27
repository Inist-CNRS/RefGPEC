import React from 'react';
import RefGpecProfilList from "./refgpec-profil-list.jsx";
var RefGpecProfilsList = React.createClass({
    displayName: 'RefGpecProfilsList',

    getInitialState: function () {
        return {
            mustBeSaved: false,
            error: '',
            profil_code: this.props.skillData.profil_code,

        };
    },

    render: function () {
        var self = this;
        let rgProfils = [];
        Object.keys(self.props.skillData.profils).forEach(function (key) {
            rgProfils.push(
                <RefGpecProfilList
                    key={key} profil_code={key}
                    skillData={self.props.skillData.profils[key]}
                    ajaxLoading={self.props.skillData.ajaxLoading}

                />);
        });


        return (
            <select className="form-control"
                    value={self.props.value}
                    onChange={this.handleChange}
                    readOnly={this.props.readOnly}
                    disabled={this.props.disabled}
            >
                <option></option>
                {rgProfils}
            </select>
        );
    },

    handleChange: function (event) {
        this.props.onChange(event.target.value);
    },

    handleDestroy: function (event) {
    },

    componentDidMount () {

    },



});
export default RefGpecProfilsList;