import axios from "axios";
let RefGpecIndexModel = function(options) {
  const self = this;
  self.title = {};
  self.initializing = true;
  self.description = {};
  self.onChanges = [];
  axios
    .get("/refgpec.conf.json")
    .then(response => {
      self.title = response.data.REFGPEC_TXT_INDEX_TITLE;
      self.description = response.data.REFGPEC_TXT_INDEX_DESC;
      self.initializing = false;
      self.inform();
    })
    .catch(err => {
      console.log("RefGpecIndexModel error loading data", err);
    });
};

RefGpecIndexModel.prototype.subscribe = function(onChange) {
  this.onChanges.push(onChange);
};

RefGpecIndexModel.prototype.inform = function() {
  this.onChanges.forEach(function(cb) {
    cb();
  });
};

export default RefGpecIndexModel;
