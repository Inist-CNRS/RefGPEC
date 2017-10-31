import React from 'react';
import RefGpecLevelList from "./refgpec-level-list.jsx";
var RefGpecLevelsList = React.createClass({
    displayName: 'RefGpecLevelsList',

    getInitialState: function () {
        return {
            error: '',
            level_code: this.props.skillData.level_code,
        };
    },

    render: function () {
        var self = this;
        let rgLevels = [];
        Object.keys(self.props.skillData.levels).forEach(function (key) {
            rgLevels.push(
                <RefGpecLevelList
                    key={key} level_code={key}
                    skillData={self.props.skillData.levels[key]}
                    ajaxLoading={self.props.skillData.ajaxLoading}

                />);
        });


        return (
            <select className="form-control"
                    value={self.props.value}
                    onChange={self.handleChange}
                    readOnly={self.props.readOnly}
                    disabled={this.props.disabled}
            >
                <option></option>
                {rgLevels}
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
export default RefGpecLevelsList;