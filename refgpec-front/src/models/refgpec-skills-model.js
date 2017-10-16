import axios from 'axios';
var RefGpecSkillsModel = function (options) {
  const self = this;

  self.skills = {};
  self.initializing = true;
  self.ajaxLoading = false;
  self.onChanges = [];




      axios.get('/api/skills')
          .then(response => {

              self.skills = {};
              response.data.forEach(item => {
                  self.skills[item.skill_code] = item;
              })
              self.initializing = false;
              self.inform();
          })
          .catch(err => {
              console.log('RefGpecSkillsModel error loading data', err);
          });


/*

      // fake data for debug
    self.skills = {
      "c-s-lang-1": {
        skillType:      "s",
        skillDomain:    "lang",
        skillShortName: "Anglais",
        skillFreeComments: "Anglais, écrit, oral, tout confondu"
      },
      "c-sf-info-1": {
        skillType:      "sf",
        skillDomain:    "info",
        skillShortName: "Langage de programmation",
        skillFreeComments: ""
      },
      "c-sf-info-2": {
        skillType:      "sf",
        skillDomain:    "info",
        skillShortName: "Elasticsearch",
        skillFreeComments: ""
      },
      "c-sf-geadmin-1": {
        skillType:      "sf",
        skillDomain:    "geadmin",
        skillShortName: "Elaboration et suivi budgétaire",
        skillFreeComments: ""
      },
    };
    self.initializing = false;
    self.inform();
  }, Math.round(Math.random() * options.fakeLoadingMaxDelay));
*/
};

RefGpecSkillsModel.prototype.subscribe = function (onChange) {
  this.onChanges.push(onChange);
};

RefGpecSkillsModel.prototype.inform = function () {
  this.onChanges.forEach(function (cb) { cb(); });
};


RefGpecSkillsModel.prototype.addSkill = function (skillType, skillDomain, skillShortName, skillFreeComments, cb) {
  var self = this;
  self.ajaxLoading = true;

  // filter other skills family to have a correct numeric id
  var codes = Object.keys(self.skills).filter(function (elt) {
    return (elt.indexOf('c-' + skillType + '-' + skillDomain) === 0)
  });
  var newCode = 'c-' + skillType + '-' + skillDomain + '-1';
  // add +1 to the id if more than one skill in this type/domain
  if (codes.length > 0) {
    var lastCode = codes[codes.length - 1];
    var lastCodeSplitted = lastCode.split('-');
    newCode  = 'c-' + skillType + '-' + skillDomain + '-' + (parseInt(lastCodeSplitted[lastCodeSplitted.length - 1], 10) + 1);
  }
  self.skills[newCode] = { skillType, skillDomain, skillShortName, skillFreeComments };
  self.inform();

  setTimeout(function () { // simulate AJAX request
    self.ajaxLoading = false;
    self.inform();
    return cb && cb(null);
  }, 5000);
};

RefGpecSkillsModel.prototype.destroy = function (skillId, cb) {
  var self = this;
  self.ajaxLoading = true;

  delete self.skills[skillId];
  self.inform();

  setTimeout(function () { // simulate AJAX request
    self.ajaxLoading = false;
    self.inform();
    return cb && cb(null);
  }, 1000);  
};

RefGpecSkillsModel.prototype.save = function (skillId, level, cb) {
  var self = this;
  self.ajaxLoading = true;

  self.skills[skillId] = level;
  self.inform();

  setTimeout(function () { // simulate AJAX request
    self.ajaxLoading = false;
    self.inform();
    return cb && cb(null);
  }, 1000);  
};

export default RefGpecSkillsModel;