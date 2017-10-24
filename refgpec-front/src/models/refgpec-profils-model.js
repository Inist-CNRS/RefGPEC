import axios from 'axios';
var RefGpecProfilsModel = function (options) {
  const self = this;

  self.profils = {};
  self.initializing = true;
  self.ajaxLoading = false;
  self.onChanges = [];
    axios.get('/api/profils')
        .then(response => {

            self.profils = {};
            response.data.forEach(item => {
                self.profils[item.profil_code] = item;
            })

            self.initializing = false;
            self.inform();
        })
        .catch(err => {
            console.log('RefGpecProfilModelError loading data', err);
        });
};

RefGpecProfilsModel.prototype.subscribe = function (onChange) {
  this.onChanges.push(onChange);
};

RefGpecProfilsModel.prototype.inform = function () {
  this.onChanges.forEach(function (cb) { cb(); });
};


RefGpecProfilsModel.prototype.addProfil = function (profilOrga, profilShortName, profilFreeComments, cb) {
  var self = this;
  self.ajaxLoading = true;

  // filter other skills family to have a correct numeric id
  var codes = Object.keys(self.profils).filter(function (elt) {
    return (elt.indexOf('p-' + profilOrga) === 0)
  });
  var newCode = 'p-' + profilOrga + '-1';
  // add +1 to the id if more than one profil in this orga
  if (codes.length > 0) {
    var lastCode = codes[codes.length - 1];
    var lastCodeSplitted = lastCode.split('-');
    newCode  = 'p-' + profilOrga + '-' + (parseInt(lastCodeSplitted[lastCodeSplitted.length - 1], 10) + 1);
  }
  self.profils[newCode] = { profilOrga, profilShortName, profilFreeComments,
    profilNbSkillsSF: 0,
    profilNbSkillsS: 0,
    profilNbSkillsSE: 0,
  };
  self.inform();

  setTimeout(function () { // simulate AJAX request
    self.ajaxLoading = false;
    self.inform();
    return cb && cb(null);
  }, 5000);
};

RefGpecProfilsModel.prototype.destroy = function (profilId, cb) {
  var self = this;
  self.ajaxLoading = true;

  delete self.profils[profilId];
  self.inform();

  setTimeout(function () { // simulate AJAX request
    self.ajaxLoading = false;
    self.inform();
    return cb && cb(null);
  }, 1000);  
};



RefGpecProfilsModel.prototype.save = function (profilId, data, cb) {

  var self = this;
  self.ajaxLoading = true;

  self.profils[profilId] = data; // TODO data ...
  self.inform();

  setTimeout(function () { // simulate AJAX request
    self.ajaxLoading = false;
    self.inform();
    return cb && cb(null);
  }, 1000);  
};

export default  RefGpecProfilsModel;