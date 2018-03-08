/**
 * Dedicated model for the skills types list
 * in order to facilitate future updates
 */
import axios from "axios";
let RefGpecSkillsTypesModel = function(options) {
  const self = this;

  self.st = {};
  this.initializing = true;
  this.ajaxLoading = false;
  this.onChanges = [];
  axios
    .get("/api/skills_types")
    .then(response => {
      self.st = {};
      response.data.forEach(item => {
        self.st[item.st_code] = item;
      });

      self.initializing = false;
      self.inform();
    })
    .catch(err => {
      console.log("RefGpecSkillsTypesModel error loading data", err);
    });
};

RefGpecSkillsTypesModel.prototype.subscribe = function(onChange) {
  this.onChanges.push(onChange);
};

RefGpecSkillsTypesModel.prototype.inform = function() {
  this.onChanges.forEach(function(cb) {
    cb();
  });
};

export default RefGpecSkillsTypesModel;
