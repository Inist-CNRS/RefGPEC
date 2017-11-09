import React from 'react';
import RefGpecLevelList from "./refgpec-level-list.jsx";
var createReactClass = require('create-react-class');
var RefGpecLevelsList = createReactClass({
    displayName: 'RefGpecLevelsList',

    getInitialState: function () {
        return {
            error: '',
            updating: false,
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
            <div>
            {(() => {
                if(this.props.value){
                    if(!this.state.updating ) {
                        return <span onClick={this.handleModifiy} className="btn active"
                                     title={this.props.skillData.levels[this.props.value].level_free_comments}>
                                 {self.props.skillData.levels[this.props.value].level_shortname}&nbsp;
                            <span
                                className="badge">{this.props.skillData.levels[this.props.value].level_number}</span>
                              </span>
                    }else{
                        return   <select className="form-control"
                                         value={self.props.value}
                                         onChange={self.handleChange}
                                         readOnly={self.props.readOnly}
                                         disabled={this.props.disabled}>
                            <option></option>
                            {rgLevels}
                        </select>}
                }else{
                    return   <select className="form-control"
                                     onChange={self.handleChange}
                                     readOnly={self.props.readOnly}
                                     disabled={this.props.disabled}>
                        <option></option>
                        {rgLevels}
                    </select>
                }
            })()}
        </div>
        )
    },

    handleModifiy: function () {
        this.setState({updating:!this.state.updating});
    },

    handleChange: function (event) {
        this.props.onChange(event.target.value);
        this.setState({updating:false});
    },

    handleDestroy: function (event) {

    },


    componentDidMount () {

    },



});
export default RefGpecLevelsList;