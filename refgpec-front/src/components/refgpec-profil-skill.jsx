import React from "react";
import { DropdownButton, MenuItem } from "react-bootstrap";
import RefGpecLevelslist from "./refgpec-levels-list";
var createReactClass = require("create-react-class");
var RefGpecProfilSkill = createReactClass({
  displayName: "RefGpecProfilSkill",

  getInitialState: function() {
    //console.log('HELLO', this.props.skillsModel.skills[this.props.psData.psSkillId])
    return {
      psId: this.props.psId,
      psProfilId: this.props.psData.profil_code,
      psSkillId: this.props.psData.skill_code,
      psSkillShortName: this.props.skillsModel.skills[
        this.props.psData.skill_code
      ],
      psLevelId: this.props.psData.level_code,
      psFreeComments: this.props.psData.psl_free_comments,
      mustBeSaved: false,
      error: "",
      ajaxLoading: false
    };
  },

  render: function() {
    // model is not ready ? then do not render anything
    if (
      this.props.skillsModel.initializing ||
      this.props.skillsTypesModel.initializing ||
      this.props.levelsModel.initializing ||
      this.props.skillsDomainsModel.initializing
    ) {
      return null;
    }
    console.log(this.state.psSkillId);
    console.log(this.props.skillsModel.skills[this.state.psSkillId]);
    let color = [];
    Object.keys(this.props.skillsTypesModel.st).forEach(function(key, i) {
      if (i === 0) {
        color[key] = "rgb(204,153, 102)";
      } else if (i === 1) {
        color[key] = "rgb(204, 51, 255)";
      } else {
        color[key] = "rgb(255, 153, 153)";
      }
    });

    return (
      <tr
        id={this.state.psId}
        data-placement="top"
        data-toggle="popover"
        data-trigger="manual"
        data-title="Erreur de saisie"
        data-content={this.state.error}
      >
        {/* ACTION MENU */}
        <td>
          <div className="btn-group">
            <DropdownButton
              id="dropdown-profil_skill"
              title=" "
              className="btn btn-default btn-sm dropdown-toggle"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <MenuItem href="" onClick={this.handleDestroy}>
                {" "}
                <span className="glyphicon glyphicon-remove" /> Dissocier la
                compétence du profil{" "}
              </MenuItem>
            </DropdownButton>

            {/*<button type="button" className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span className="caret"></span></button>*/}
            {/*<ul className="dropdown-menu">*/}
            {/*<li className={(this.props.ajaxLoading ? 'disabled' : '')}>*/}
            {/*<a href=""*/}
            {/*onClick={this.handleDestroy}>*/}
            {/*<span className="glyphicon glyphicon-remove"></span> Dissocier la compétence du profil*/}
            {/*</a>*/}
            {/*</li>*/}
            {/*</ul>*/}
          </div>
        </td>

        {/* INPUT FORMS */}
        <td>
          <span
            className="label label-warning"
            style={{
              backgroundColor:
                color[
                  this.props.skillsModel.skills[this.state.psSkillId].st_code
                ]
            }}
          >
            {
              this.props.skillsTypesModel.st[
                this.props.skillsModel.skills[this.state.psSkillId].st_code
              ].st_shortname
            }
          </span>
          &nbsp;
          <span
            style={{ backgroundColor: "#808080" }}
            className="label label-primary"
          >
            {
              this.props.skillsDomainsModel.sd[
                this.props.skillsModel.skills[this.state.psSkillId].sd_code
              ].sd_shortname
            }
          </span>
        </td>
        <td>
          <span
            className="btn active"
            title={
              this.props.skillsModel.skills[this.state.psSkillId]
                .skillFreeComments
            }
          >
            {
              this.props.skillsModel.skills[this.state.psSkillId]
                .skill_shortname
            }
          </span>
        </td>
        <td>
          <RefGpecLevelslist
            skillData={this.props.levelsModel}
            ajaxLoading={this.props.levelsModel.ajaxLoading}
            data-fieldname="psLevel"
            onChange={this.handleLevelChange}
            onBlur={this.handleSubmit}
            readOnly={this.props.ajaxLoading || this.state.ajaxLoading}
            value={this.state.psLevelId}
          />
        </td>
        <td>
          <textarea
            className="form-control"
            rows="1"
            placeholder="Commentaires libres"
            value={this.state.psFreeComments || ""}
            data-fieldname="psFreeComments"
            onChange={this.handleChangeComm}
            onBlur={this.handleSubmit}
            readOnly={this.props.ajaxLoading || this.state.ajaxLoading}
          />
        </td>
      </tr>
    );
  },

  handleSubmit: function(event) {
    let self = this;
    if (this.state.mustBeSaved) {
      self.setState(
        { ajaxLoading: true },
        this.props.onSave(this.state.psId, this.state)
      );
      setTimeout(() => {
        this.setState({
          mustBeSaved: false,
          ajaxLoading: false
        });
      }, 500);

      // // display or hide a nice popover to show the error
      // const self = this;
      // self.setState({ error: 'saving... demo error msg' });
      // setTimeout(function () {
      //   $('#' + self.state.psId).popover(self.state.error ? 'show' : 'hide');
      // }, 100);
    }
  },

  handleChange: function(event) {
    var newState = {};
    newState[event.target.getAttribute("data-fieldname")] = event.target.value;
    this.setState(newState);
  },

  handleChangeComm: function(event) {
    this.setState({ psFreeComments: event.target.value });
    this.setState({ mustBeSaved: true });
  },

  handleLevelChange: function(event) {
    if (event) {
      this.setState({ psLevelId: event, mustBeSaved: true }, function() {
        this.handleSubmit();
      });
    }
  },

  handleDestroy: function(event) {
    event.preventDefault(); // Let's stop this event.
    event.stopPropagation(); // Really this time.

    if (this.props.ajaxLoading) return;

    this.props.onDestroy(this.state.psId);
  },

  componentDidMount() {},

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state !== nextState) {
      return true;
    }
    return false;
  }
});
export default RefGpecProfilSkill;
