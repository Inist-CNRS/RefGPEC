/**
 * Dedicated model for the organizational chart list
 * in order to facilitate future updates
 */
import axios from "axios";
var RefGpecOrgaModel = function(options) {
  const self = this;

  self.orga = {};
  this.initializing = true;
  this.ajaxLoading = false;
  this.onChanges = [];
  axios
    .get("/api/organigramme")
    .then(response => {
      self.orga = {};
      response.data.forEach(item => {
        self.orga[item.orga_code] = item;
      });

      self.initializing = false;
      self.inform();
    })
    .catch(err => {
      console.log("RefGpecOrgaModelerror loading data", err);
    });
};

RefGpecOrgaModel.prototype.subscribe = function(onChange) {
  this.onChanges.push(onChange);
};

RefGpecOrgaModel.prototype.inform = function() {
  this.onChanges.forEach(function(cb) {
    cb();
  });
};

export default RefGpecOrgaModel;
