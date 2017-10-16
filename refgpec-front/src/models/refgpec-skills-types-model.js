/**
 * Dedicated model for the skills types list
 * in order to facilitate future updates
 */
import axios from 'axios';
var RefGpecSkillsTypesModel = function (options) {
  const self = this;

  self.st = {};
  this.initializing = true;
  this.ajaxLoading = false;
  this.onChanges = [];
    axios.get('/api/skills_types')
        .then(response => {

            self.st = {};
            response.data.forEach(item => {
                self.st[item.st_code] = item;
            })

            self.initializing = false;
            self.inform();

        })
        .catch(err => {
            console.log('RefGpecSkillsTypesModel error loading data', err);
        });

/*
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
*/
};

RefGpecSkillsTypesModel.prototype.subscribe = function (onChange) {
  this.onChanges.push(onChange);
};

RefGpecSkillsTypesModel.prototype.inform = function () {
  this.onChanges.forEach(function (cb) { cb(); });
};

export default  RefGpecSkillsTypesModel;