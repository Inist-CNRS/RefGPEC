/**
 * Dedicated model for the skills domains list
 * in order to facilitate future updates
 */
import axios from "axios";
let RefGpecFamilyModel = function(options) {
  const self = this;

  self.family = {};
  this.initializing = true;
  this.ajaxLoading = false;
  this.onChanges = [];
  self.feedback = {
    code: "",
    message: ""
  };
  axios
    .get("/api/family_skills")
    .then(response => {
      self.family = {};
      response.data.forEach(item => {
        self.family[item.family_id] = item;
      });

      self.initializing = false;
      self.inform();
    })
    .catch(err => {
      console.log("RefGpecFamilySkills error loading data", err);
    });
};

RefGpecFamilyModel.prototype.subscribe = function(onChange) {
  this.onChanges.push(onChange);
};

RefGpecFamilyModel.prototype.getListSkills = function(family_id) {
  let list = {};
  return list;
};

RefGpecFamilyModel.prototype.inform = function() {
  this.onChanges.forEach(function(cb) {
    cb();
  });
};

RefGpecFamilyModel.prototype.addFamily = function(family_id, family_name, cb) {
  let self = this;
  self.ajaxLoading = true;
  self.feedback = "";

  axios
    .post("/api/family", {
      family_id: family_id,
      family_name: family_name
    })
    .then(function(response) {
      self.famille[family_id] = {
        family_id,
        family_name
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

export default RefGpecFamilyModel;
