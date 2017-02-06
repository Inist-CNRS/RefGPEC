/**
 * Dedicated model for the skills domains list
 * in order to facilitate future updates
 */

var RefGpecSkillsDomainsModel = function (options) {
  const self = this;

  self.orga = {};
  this.initializing = true;
  this.ajaxLoading = false;
  this.onChanges = [];

  // simulate ajax request
  setTimeout(function () {
    // fake data for debug
    self.sd = {

      "gen":     { sdShortName: "Général" },
      "comm":    { sdShortName: "Communication" },
      "geadmin": { sdShortName: "Gestion administrative" },
      "info":    { sdShortName: "Informatique" },
      "inist":   { sdShortName: "Inist-CNRS" },
      "ist":     { sdShortName: "IST" },
      "lang":    { sdShortName: "Langues" },
      "manag":   { sdShortName: "Management" },
      "outils":  { sdShortName: "Outils" },

    };
    self.initializing = false;
    self.inform();
  }, Math.round(Math.random() * options.fakeLoadingMaxDelay));

};

RefGpecSkillsDomainsModel.prototype.subscribe = function (onChange) {
  this.onChanges.push(onChange);
};

RefGpecSkillsDomainsModel.prototype.inform = function () {
  this.onChanges.forEach(function (cb) { cb(); });
};

module.exports = RefGpecSkillsDomainsModel;