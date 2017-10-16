var RefGpecProfilsSkillsModel = function (options) {
  const self = this;

  self.profilsSkills = {};
  self.initializing = true;
  self.ajaxLoading = false;
  self.onChanges = [];
    
  // simulate ajax request
  setTimeout(function () {
    // fake data for debug
    self.profilsSkills = {
      "ps-1": {
        psProfilId:     "p-dpi_spproj-1",
        psSkillId:      "c-sf-info-1",
        psLevelId:      "m-2",
        psFreeComments: "",
      },
      "ps-2": {
        psProfilId:     "p-dpi_spproj-1",
        psSkillId:      "c-sf-info-2",
        psLevelId:      "m-3",
        psFreeComments: "",
      },
      "ps-3": {
        psProfilId:     "p-dos_spub_eqvalobbd-1",
        psSkillId:      "c-s-lang-1",
        psLevelId:      "m-3",
        psFreeComments: "",
      },
      "ps-4": {
        psProfilId:     "p-dos_spub_eqvalobbd-1",
        psSkillId:      "c-sf-geadmin-1",
        psLevelId:      "m-1",
        psFreeComments: "",
      },
    };
    self.initializing = false;
    self.inform();
  }, Math.round(Math.random() * options.fakeLoadingMaxDelay));

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
  var codes = Object.keys(self.profilsSkills);
  var newCode = 'ps-1';
  // add +1 to the id
  if (codes.length > 0) {
    var lastCode = codes[codes.length - 1];
    var lastCodeSplitted = lastCode.split('-');
    newCode  = 'ps-' + (parseInt(lastCodeSplitted[lastCodeSplitted.length - 1], 10) + 1);
  }
  self.profilsSkills[newCode] = { psProfilId, psSkillId, psLevelId, psFreeComments };
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

  delete self.profilsSkills[psId];
  self.inform();

  setTimeout(function () { // simulate AJAX request
    self.ajaxLoading = false;
    self.inform();
    return cb && cb(null);
  }, 1000);  
};


// save is useless ?
RefGpecProfilsSkillsModel.prototype.save = function (profilId, data, cb) {
  var self = this;
  self.ajaxLoading = true;

  self.profilsSkills[profilId] = data; // TODO data ...
  self.inform();

  setTimeout(function () { // simulate AJAX request
    self.ajaxLoading = false;
    self.inform();
    return cb && cb(null);
  }, 1000);  
};

module.exports = RefGpecProfilsSkillsModel;