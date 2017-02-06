/**
 * Dedicated model for the skills types list
 * in order to facilitate future updates
 */

var RefGpecSkillsTypesModel = function (options) {
  const self = this;

  self.orga = {};
  this.initializing = true;
  this.ajaxLoading = false;
  this.onChanges = [];

  // simulate ajax request
  setTimeout(function () {
    // fake data for debug
    self.st = {

      "s":  { stShortName: "Savoir" },
      "sf": { stShortName: "Savoir-faire" },
      "se": { stShortName: "Savoir-être" },

    };
    self.initializing = false;
    self.inform();
  }, Math.round(Math.random() * options.fakeLoadingMaxDelay));

};

RefGpecSkillsTypesModel.prototype.subscribe = function (onChange) {
  this.onChanges.push(onChange);
};

RefGpecSkillsTypesModel.prototype.inform = function () {
  this.onChanges.forEach(function (cb) { cb(); });
};

module.exports = RefGpecSkillsTypesModel;