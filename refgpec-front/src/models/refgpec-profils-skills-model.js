import axios from 'axios';
var RefGpecProfilsSkillsModel = function (options) {
  const self = this;

  self.profilsSkillsLevels = {};
  self.initializing = true;
  self.ajaxLoading = false;
  self.onChanges = [];

    axios.get('/api/profils_skills_levels?order=psl_code.asc,profil_code.asc,level_code.asc')
        .then(response => {

            self.profilsSkillsLevels = {};
            response.data.forEach(item => {
                self.profilsSkillsLevels[item.psl_code] = item;
            });
            self.initializing = false;
            self.inform();
        })
        .catch(err => {
            console.log('RefGpecProfilSkillsLevelModel error loading data', err);
        });
};

RefGpecProfilsSkillsModel.prototype.subscribe = function (onChange) {
  this.onChanges.push(onChange);
};

RefGpecProfilsSkillsModel.prototype.inform = function () {
  this.onChanges.forEach(function (cb) { cb(); });
};


RefGpecProfilsSkillsModel.prototype.addProfilSkill = function (psProfilId, psSkillId, psLevelId, psFreeComments, cb) {
  var self = this;
  self.ajaxLoading = true;

  // filter other skills family to have a correct numeric id
  var codes = Object.keys(self.profilsSkillsLevels);
  var newCode = 'ps-1';
  // add +1 to the id
  if (codes.length > 0) {
    var lastCode = codes[codes.length - 1];
    var lastCodeSplitted = lastCode.split('-');
    newCode  = 'ps-' + (parseInt(lastCodeSplitted[lastCodeSplitted.length - 1], 10) + 1);
  }
  self.profilsSkillsLevels[newCode] = { psProfilId, psSkillId, psLevelId, psFreeComments };
  self.inform();

  setTimeout(function () { // simulate AJAX request
    self.ajaxLoading = false;
    self.inform();
    return cb && cb(null);
  }, 5000);
};

RefGpecProfilsSkillsModel.prototype.destroy = function (psId, cb) {
  var self = this;
  self.ajaxLoading = true;

  delete self.profilsSkillsLevels[psId];
  self.inform();

  setTimeout(function () { // simulate AJAX request
    self.ajaxLoading = false;
    self.inform();
    return cb && cb(null);
  }, 1000);  
};

RefGpecProfilsSkillsModel.prototype.getProfilSkillLevel = function(profil_code){
  var psl = {};
    var self = this;
    axios.get('/api/profils_skills_levels?profil_code=eq.'+profil_code)
        .then(response => {
            response.data.forEach(item => {
                psl[item.psl_code] = item;
            });
            self.initializing = false;
            self.inform();
        })
        .catch(err => {
            console.log('RefGpecProfilSkillsLevelModel error loading data', err);
        });
    return psl;
};


// save is useless ?
RefGpecProfilsSkillsModel.prototype.save = function (profilId, data, cb) {
  var self = this;
  self.ajaxLoading = true;
  self.profilsSkillsLevels[profilId] = data;
  self.inform();

  setTimeout(function () { // simulate AJAX request
    self.ajaxLoading = false;
    self.inform();
    return cb && cb(null);
  }, 1000);  
};

export default RefGpecProfilsSkillsModel;