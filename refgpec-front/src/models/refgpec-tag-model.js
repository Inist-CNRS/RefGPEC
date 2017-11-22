/**
 * Dedicated model for the tagnizational chart list
 * in order to facilitate future updates
 */
import axios from "axios";
var RefGpecTagModel = function(options) {
  const self = this;

  self.tag = {};
  this.initializing = true;
  this.ajaxLoading = false;
  this.onChanges = [];
  axios
    .get("/api/tags")
    .then(response => {
      self.tag = {};
      response.data.forEach(item => {
        self.tag[item.tag_code] = item;
      });

      self.initializing = false;
      self.inform();
    })
    .catch(err => {
      console.log("RefGpecTagModelerror loading data", err);
    });
};

RefGpecTagModel.prototype.subscribe = function(onChange) {
  this.onChanges.push(onChange);
};

RefGpecTagModel.prototype.inform = function() {
  this.onChanges.forEach(function(cb) {
    cb();
  });
};

export default RefGpecTagModel;
