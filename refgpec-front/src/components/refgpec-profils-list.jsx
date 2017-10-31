import React from 'react';
import RefGpecProfilList from "./refgpec-profil-list.jsx";
var createReactClass = require('create-react-class');
var RefGpecProfilsList = createReactClass({
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
        let rgOrga = this.props.skillData.listOrga;

        Object.keys(rgOrga).forEach(function (orga){
            var listoption = [];
            rgProfils.push(
            <optgroup key={orga} label ={orga}>
                {(() => {
                    Object.keys(self.props.skillData.profils).forEach(function (key) {
                    if (self.props.skillData.profils[key].orga_code === orga) {
                        listoption.push(
                        <RefGpecProfilList
                            key={key} profil_code={key}
                            skillData={self.props.skillData.profils[key]}
                            ajaxLoading={self.props.skillData.ajaxLoading}
                            />);
                    }
                });
                return (  listoption)
                })()}

               </optgroup>

            )
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