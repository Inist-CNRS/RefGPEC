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
  self.feedback = {
    code: "",
    message: ""
  };
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

RefGpecSkillsDomainsModel.prototype.addDomains = function(
  sd_code,
  sd_shortname,
  cb
) {
  let self = this;
  self.ajaxLoading = true;
  self.feedback = "";

  axios
    .post("/api/skills_domains", {
      sd_code: sd_code,
      sd_shortname: sd_shortname
    })
    .then(function(response) {
      self.sd[sd_code] = {
        sd_code,
        sd_shortname
      };
      self.ajaxLoading = false;
      self.inform();
      return cb && cb(null);
    })
    .catch(function(error) {
      self.feedback.code = error.response.status;
      self.feedback.message = error.response.data.message;
      self.ajaxLoading = false;
      self.inform();
      return cb && cb(error);
    });
  self.inform();
};

export default RefGpecSkillsDomainsModel;
