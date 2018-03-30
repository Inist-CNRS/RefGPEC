/**
 * Dedicated model for the skills domains list
 * in order to facilitate future updates
 */
import axios from "axios";
let RefGpecFamilyModel = function(options) {
  const self = this;

  this.family = {};
  this.initializing = true;
  this.ajaxLoading = false;
  this.onChanges = [];
  this.lastFamilleAdd = [];
  self.listfamily_skills = {};
  self.nb_skills = {};

  this.feedback = {
    code: "",
    message: ""
  };
  axios
    .get("/api/family")
    .then(response => {
      self.family = {};
      response.data.forEach(item => {
        self.family[item.family_id] = item;
      });

      self.initializing = false;
      self.inform();
    })
    .catch(err => {
      console.log("RefGpecFamily error loading data", err);
    });

  axios
    .get("/api/list_familys_attached_skills")
    .then(response => {
      self.listfamily_skills = {};
      let i = 0;
      response.data.forEach(item => {
        self.listfamily_skills[i] = item;
        i++;
      });
      self.initializing = false;
      self.inform();
    })
    .catch(err => {
      console.log("RefGpecFamilysModel error loading data", err);
    });
};

RefGpecFamilyModel.prototype.subscribe = function(onChange) {
  this.onChanges.push(onChange);
};

RefGpecFamilyModel.prototype.updateVue = function() {
  let self = this;
  self.listfamily_skills = {};
  axios
    .get("/api/list_familys_attached_skills")
    .then(response => {
      self.listfamily_skills = {};
      let i = 0;
      response.data.forEach(item => {
        self.listfamily_skills[i] = item;
        i++;
      });
      self.inform();
    })
    .catch(err => {
      console.log("RefGpecProfilModelError error loading data", err);
    });
};

RefGpecFamilyModel.prototype.getListSkills = function(family_id) {
  let self = this;
  let list = {};
  for (let key in self.listfamily_skills) {
    if (self.listfamily_skills[key].family_id === family_id) {
      list[key] = self.listfamily_skills[key];
    }
  }
  return list;
};

RefGpecFamilyModel.prototype.inform = function() {
  this.onChanges.forEach(function(cb) {
    cb();
  });
};

RefGpecFamilyModel.prototype.addFamily = function(
  family_id,
  family_name,
  family_free_comments,
  cb
) {
  let self = this;
  self.ajaxLoading = true;
  self.feedback.code = "";
  family_id = family_id.toUpperCase();
  axios
    .post("/api/family", {
      family_id: family_id,
      family_name: family_name,
      family_free_comments: family_free_comments
    })
    .then(function(response) {
      self.family[family_id] = {
        family_id,
        family_name,
        family_free_comments
      };
      self.lastFamilleAdd.push(family_id);
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

RefGpecFamilyModel.prototype.destroy = function(familyId, cb) {
  let self = this;
  self.ajaxLoading = true;
  self.feedback.code = "";
  axios
    .delete("/api/family?family_id=eq." + familyId)
    .then(function(response) {
      delete self.family[familyId];
      self.ajaxLoading = false;
      return cb && cb(null);
    })
    .catch(function(error) {
      self.feedback.code = error.response.status;
      self.feedback.message = error.response.data.message;
      self.ajaxLoading = false;
      return cb && cb(error);
    });
};

RefGpecFamilyModel.prototype.save = function(familyId, data, cb) {
  let self = this;
  self.ajaxLoading = true;
  self.feedback.code = "";
  axios
    .patch("/api/family?family_id=eq." + familyId, {
      family_id: data.familyId,
      family_name: data.family_name,
      family_free_comments: data.family_free_comments
    })
    .then(function(response) {
      self.family[familyId] = data;
      self.ajaxLoading = false;
      self.inform();
      return cb && cb(null);
    })
    .catch(function(error) {
      self.feedback.code = error.response;
      self.feedback.message = error.response.data;
      self.ajaxLoading = false;
      self.inform();
      return cb && cb(error);
    });

  self.inform();
};

export default RefGpecFamilyModel;
