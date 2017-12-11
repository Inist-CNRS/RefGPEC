/**
 * Dedicated model for the skills domains list
 * in order to facilitate future updates
 */
import axios from "axios";
var RefGpecSkillsDomainsModel = function(options) {
  const self = this;

  self.sd = {};
  this.initializing = true;
  this.ajaxLoading = false;
  this.onChanges = [];

  axios
    .get("/api/skills_domains")
    .then(response => {
      self.sd = {};
      response.data.forEach(item => {
        self.sd[item.sd_code] = item;
      });

      self.initializing = false;
      self.inform();
    })
    .catch(err => {
      console.log("RefGpecSkillsTypesModel error loading data", err);
    });

};

RefGpecSkillsDomainsModel.prototype.subscribe = function(onChange) {
  this.onChanges.push(onChange);
};

RefGpecSkillsDomainsModel.prototype.getListSkills = function(sd_code) {
    let self = this;
    let list = {};
    return list;
};

RefGpecSkillsDomainsModel.prototype.inform = function() {
  this.onChanges.forEach(function(cb) {
    cb();
  });
};

export default RefGpecSkillsDomainsModel;
