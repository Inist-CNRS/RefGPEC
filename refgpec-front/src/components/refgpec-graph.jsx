import React from "react";
import { Radar, Line, Bar } from "react-chartjs-2";
import {
  Modal,
  ButtonToolbar,
  ToggleButton,
  ToggleButtonGroup
} from "react-bootstrap";
import RefGPECProfilsList from "./refgpec-profils-list";
import RefGpecFamilys from "./refgpec-list-familys";
const WAIT_INTERVAL = 250;
let createReactClass = require("create-react-class");

let RefGpecGraph = createReactClass({
  displayName: "RefGpecGraph",

  getInitialState: function() {
    return {
      familyValue: "",
      profilValue: this.props.profilValue,
      showModal: false,
      typegraph: "Line",
      datagraph: []
    };
  },
  closegraphModal() {
    this.setState({
      showModal: false,
      familyValue: "",
      profilValue: this.props.profilValue
    });
    this.props.profilsModel.getProfilsGraph(this.state.profilValue);
  },

  getRandomColor() {
    var letters = "0123456789ABCDEF".split("");
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  },

  opengraphModal() {
    this.setState({ showModal: true });
    this.timer = setTimeout(this.triggerChange, WAIT_INTERVAL);
  },
  render: function() {
    if (!this.state.datagraph) {
      return null;
    }
    let self = this;
    let labels = [];
    let graphe;
    let dataprofil = [];
    let datafamily = [];
    let nomprofil = "";
    let nomfamille = "";
    let data = [];
    let options = {
      scales: { xAxes: [{ display: false }], yAxes: [{ display: true }] }
    };
    //Si Pas Famille et PasProfil
    if (
      (!this.state.familyValue || this.state.familyValue === "Aucune") &&
      !this.state.profilValue
    ) {
      Object.keys(self.state.datagraph).forEach(function(key) {
        labels.push(self.state.datagraph[key].family_id);
        nomfamille = self.state.datagraph[key].family_id;
        dataprofil.push(self.state.datagraph[key].nb_profil);
      });
      let borderColor = this.getRandomColor();
      let BackgroundColor = this.getRandomColor();
      data = {
        labels: labels,
        datasets: [
          {
            label: "Nombre de profils dans chaque famille",
            backgroundColor: BackgroundColor,
            borderColor: borderColor,
            pointBackgroundColor: borderColor,
            pointBorderColor: BackgroundColor,
            fill: false,
            pointHoverBackgroundColor: BackgroundColor,
            pointHoverBorderColor: "rgba(255,0,0,1)",
            data: dataprofil
          }
        ]
      };
    }

    //Si Famille et PasProfil
    if (
      this.state.familyValue &&
      this.state.familyValue !== "Aucune" &&
      !this.state.profilValue
    ) {
      let nomFamille = this.state.familyValue ? this.state.familyValue : "";
      if (
        this.state.profilValue &&
        self.props.profilsModel.profils[this.state.profilValue]
      ) {
        nomprofil =
          self.props.profilsModel.profils[this.state.profilValue]
            .profil_shortname;
      }
      Object.keys(self.state.datagraph).forEach(function(key) {
        if (
          self.props.profilsModel.profils[self.state.datagraph[key].profil_code]
        ) {
          labels.push(
            self.props.profilsModel.profils[
              self.state.datagraph[key].profil_code
            ].profil_shortname
          );
        } else {
          labels.push(self.state.datagraph[key].profil_code);
        }

        dataprofil.push(self.state.datagraph[key].nb_competence);
        datafamily.push(self.state.datagraph[key].nb_comp_necessaire);
      });
      let borderColor = this.getRandomColor();
      let BackgroundColor = this.getRandomColor();
      let borderColor2 = this.getRandomColor();
      let BackgroundColor2 = this.getRandomColor();
      data = {
        labels: labels,
        datasets: [
          {
            label: "Nombre de compétence détenues par le Profil " + nomprofil,
            backgroundColor: BackgroundColor,
            borderColor: borderColor,
            pointBackgroundColor: borderColor,
            pointBorderColor: BackgroundColor,
            fill: false,
            pointHoverBackgroundColor: BackgroundColor,
            pointHoverBorderColor: "rgba(255,0,0,1)",
            data: dataprofil
          },
          {
            label:
              "Nombre de compétences nécessaire pour la Famille " + nomFamille,
            backgroundColor: BackgroundColor2,
            borderColor: borderColor2,
            pointBackgroundColor: borderColor,
            pointBorderColor: BackgroundColor2,
            fill: false,
            pointHoverBackgroundColor: BackgroundColor2,
            pointHoverBorderColor: "rgba(255,0,0,1)",
            data: datafamily
          }
        ]
      };
    }
    //Si PasFamille et Profil
    if (
      (!this.state.familyValue || this.state.familyValue === "Aucune") &&
      this.state.profilValue
    ) {
      if (
        this.state.profilValue &&
        self.props.profilsModel.profils[this.state.profilValue]
      ) {
        nomprofil =
          self.props.profilsModel.profils[this.state.profilValue]
            .profil_shortname;
      }
      Object.keys(self.state.datagraph).forEach(function(key) {
        labels.push(self.state.datagraph[key].family_id);
        dataprofil.push(self.state.datagraph[key].nb_competence);
        datafamily.push(self.state.datagraph[key].nb_comp_necessaire);
      });
      let borderColor = this.getRandomColor();
      let BackgroundColor = this.getRandomColor();
      let borderColor2 = this.getRandomColor();
      let BackgroundColor2 = this.getRandomColor();
      data = {
        labels: labels,
        datasets: [
          {
            label: "Nombre de compétence détenues par le Profil " + nomprofil,
            backgroundColor: BackgroundColor,
            borderColor: borderColor,
            pointBackgroundColor: borderColor,
            pointBorderColor: BackgroundColor,
            fill: false,
            pointHoverBackgroundColor: BackgroundColor,
            pointHoverBorderColor: "rgba(255,0,0,1)",
            data: dataprofil
          },
          {
            label: "Nombre de compétences nécessaire pour une Famille ",
            backgroundColor: BackgroundColor2,
            borderColor: borderColor2,
            pointBackgroundColor: borderColor,
            pointBorderColor: BackgroundColor2,
            fill: false,
            pointHoverBackgroundColor: BackgroundColor2,
            pointHoverBorderColor: "rgba(255,0,0,1)",
            data: datafamily
          }
        ]
      };
    }
    //Si Famille et Profil
    if (
      this.state.familyValue &&
      this.state.profilValue &&
      this.state.familyValue !== "Aucune"
    ) {
      let nomFamille = this.state.familyValue ? this.state.familyValue : "";
      if (
        this.state.profilValue &&
        self.props.profilsModel.profils[this.state.profilValue]
      ) {
        nomprofil =
          self.props.profilsModel.profils[this.state.profilValue]
            .profil_shortname;
      }
      Object.keys(self.state.datagraph).forEach(function(key) {
        labels.push(self.state.datagraph[key].skill_shortname);
        dataprofil.push(self.state.datagraph[key].modulation_profil);
        datafamily.push(self.state.datagraph[key].modulation_famille);
      });
      let borderColor = this.getRandomColor();
      let BackgroundColor = this.getRandomColor();
      let borderColor2 = this.getRandomColor();
      let BackgroundColor2 = this.getRandomColor();
      data = {
        labels: labels,
        datasets: [
          {
            label: "Profil " + nomprofil,
            backgroundColor: BackgroundColor,
            borderColor: borderColor,
            pointBackgroundColor: borderColor,
            pointBorderColor: BackgroundColor,
            fill: false,
            pointHoverBackgroundColor: BackgroundColor,
            pointHoverBorderColor: "rgba(255,0,0,1)",
            data: dataprofil
          },
          {
            label: "Famille " + nomFamille,
            backgroundColor: BackgroundColor2,
            borderColor: borderColor2,
            pointBackgroundColor: borderColor,
            pointBorderColor: BackgroundColor2,
            fill: false,
            pointHoverBackgroundColor: BackgroundColor2,
            pointHoverBorderColor: "rgba(255,0,0,1)",
            data: datafamily
          }
        ]
      };
    }

    switch (this.state.typegraph) {
      case "Line":
        graphe = <Line data={data} options={options} />;
        break;
      case "Bar":
        graphe = <Bar data={data} options={options} />;
        break;
      case "Radar":
        graphe = <Radar data={data} />;
        break;
      default:
        graphe = <Line data={data} options={options} />;
        break;
    }

    return (
      <div
        style={{ textAlign: "right", cursor: "pointer" }}
        onClick={this.opengraphModal}
      >
        <i
          title="Cliquez pour afficher le graphe des associations des familles de compétences"
          aria-hidden="true"
          className="fa fa-signal fa-lg"
        />
        <Modal
          bsSize="large"
          show={this.state.showModal}
          onHide={this.closegraphModal}
          id="profils-graph-modal"
        >
          <Modal.Header>
            <h4 className="modal-title">
              <b>Graphique des Familles-Profils-Compétences</b>
            </h4>
          </Modal.Header>
          <Modal.Body className="modal-body">
            <div>
              <div>
                Choissisez la représentation que vous souhaitez :<br />
                <ButtonToolbar
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <ToggleButtonGroup
                    onChange={this.handleChangeType}
                    type="radio"
                    name="typeGraph"
                    defaultValue={"Line"}
                  >
                    <ToggleButton value={"Line"}>Ligne</ToggleButton>
                    <ToggleButton value={"Radar"}>Radar</ToggleButton>
                    <ToggleButton value={"Bar"}>Barre</ToggleButton>
                  </ToggleButtonGroup>
                </ButtonToolbar>
              </div>
              Choissisez un profil :
              <RefGPECProfilsList
                skillData={self.props.profilsModel}
                ajaxLoading={self.props.profilsModel.ajaxLoading}
                data-fieldname="ProfilSelect"
                placeholder="Profil à analyser"
                onChange={this.handleChangeProfil}
                value={self.state.profilValue}
                clear={true}
                profil_code={self.state.profilValue}
              />
              Choissisez une Famille :
              <RefGpecFamilys
                skillData={this.props.familysModel}
                ajaxLoading={self.props.profilsModel.ajaxLoading}
                data-fieldname="StatsProfilFamily"
                placeholder="Famille à analyser"
                onChange={this.handleChangeFamily}
                multi={false}
              />
            </div>
            <div>{graphe}</div>
          </Modal.Body>
          <Modal.Footer>
            <button
              onClick={this.closegraphModal}
              type="button"
              className="btn btn-default"
              data-dismiss="modal"
            >
              Fermer
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  },

  handleChangeFamily: function(value) {
    if (value) {
      clearTimeout(this.timer);
      this.setState({ familyValue: value.value });
      this.props.profilsModel.getProfilsGraph(
        this.state.profilValue,
        this.state.familyValue
      );
      this.timer = setTimeout(this.triggerChange, WAIT_INTERVAL);
    }
  },
  handleChangeProfil: function(value) {
    clearTimeout(this.timer);
    this.setState({ profilValue: value });
    this.props.profilsModel.getProfilsGraph(
      this.state.profilValue,
      this.state.familyValue
    );

    this.timer = setTimeout(this.triggerChange, WAIT_INTERVAL);
  },
  handleChangeType: function(value) {
    clearTimeout(this.timer);
    this.setState({ typegraph: value });
    this.timer = setTimeout(this.triggerChange, WAIT_INTERVAL);
  },
  triggerChange() {
    this.setState({ datagraph: this.props.profilsModel.graph });
  },
  componentWillMount() {
    this.timer = null;
  },
  componentDidMount() {
    this.setState({ typegraph: this.props.profilsModel.graph });
  },

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.datagraph !== this.props.profilsModel.graph ||
      this.state !== nextState
    );
  }
});
export default RefGpecGraph;
