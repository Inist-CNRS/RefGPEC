import axios from 'axios';
var RefGpecProfilsSkillsModel = function (options) {
  const self = this;

  self.profilsSkillsLevels = {};
  self.initializing = true;
  self.ajaxLoading = false;
  self.onChanges = [];
  self.psl ={};
  self.profil='';
  self.feedback ='';

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

RefGpecProfilsSkillsModel.prototype.updateVue = function () {
    var self = this;
    self.psl ={};
    axios.get('/api/profils_skills_levels?profil_code=eq.'+self.profil)
        .then(response => {
            response.data.forEach(item => {
                self.psl[item.psl_code] = item;
            });
            self.ajaxLoading = false;
            self.inform();
        })
        .catch(err => {
            console.log('RefGpecProfilSkillsLevelModel error loading data', err);
            self.ajaxLoading = false;
        });
};

RefGpecProfilsSkillsModel.prototype.subscribe = function (onChange) {
  this.onChanges.push(onChange);
};

RefGpecProfilsSkillsModel.prototype.inform = function () {
  this.onChanges.forEach(function (cb) { cb(); });
};


RefGpecProfilsSkillsModel.prototype.addProfilSkill = function (profil_code, skill_code, level_code, psl_free_comments, cb) {
  var self = this;
  self.ajaxLoading = true;
  self.feedback='';
  // filter other skills family to have a correct numeric id
  var codes = Object.keys(self.profilsSkillsLevels);
  var psl_code = 'ps-1';
  // add +1 to the id
  codes.sort();
  if (codes.length > 0) {
    var lastCode = codes[codes.length - 1];
    var lastCodeSplitted = lastCode.split('-');
      psl_code  = 'ps-' + (parseInt(lastCodeSplitted[lastCodeSplitted.length - 1], 10) + 1);
  }
    axios.post('/api/profils_skills_levels', {
        psl_code : psl_code,
        profil_code: profil_code,
        skill_code: skill_code,
        level_code : level_code,
        psl_free_comments :psl_free_comments,
    })
        .then(function (response) {
            self.profilsSkillsLevels[psl_code] = { psl_code,psl_free_comments,level_code,skill_code,profil_code };
            self.getProfilSkillLevel(profil_code);
            self.ajaxLoading = false;
            self.inform();
            return cb && cb(null);
        })
        .catch(function (error) {
            self.feedback='Une erreur a été rencontrée lors de l\'ajout dans la base de donnée';
            self.ajaxLoading = false;
            self.inform();
            return cb && cb(error);
        });

    self.inform();
};

RefGpecProfilsSkillsModel.prototype.destroy = function (pslId,profil_code, cb) {
    var self = this;
    self.ajaxLoading = true;
    self.feedback='';
    axios.delete('/api/profils_skills_levels?psl_code=eq.'+pslId)
        .then(function (response) {
            delete self.profilsSkillsLevels[profil_code];
            self.getProfilSkillLevel(profil_code);
            self.ajaxLoading = false;
            self.inform();
            return cb && cb(null);
        })
        .catch(function (error) {
            self.feedback='Une erreur a été rencontrée lors de la suppression dans la base de donnée';
            self.ajaxLoading = false;
            self.inform();
            return cb && cb(error);
        });

    self.inform();
};

RefGpecProfilsSkillsModel.prototype.getProfilSkillLevel = function(profil_code,cb){

    var self = this;
    self.ajaxLoading = true;
    self.profil=profil_code;
    self.psl ={};
    axios.get('/api/profils_skills_levels?profil_code=eq.'+profil_code)
        .then(response => {
            response.data.forEach(item => {
                self.psl[item.psl_code] = item;
            });
            self.ajaxLoading = false;
            self.inform();
            return cb && cb(null);
        })
        .catch(err => {
            console.log('RefGpecProfilSkillsLevelModel error loading data', err);
            self.ajaxLoading = false;
            return cb && cb(err);
        });
    self.inform();
};


// save is useless ?
RefGpecProfilsSkillsModel.prototype.save = function (pslId, data, cb) {
    var self = this;
    self.ajaxLoading = true;
    self.feedback='';
    axios.patch('/api/profils_skills_levels?psl_code=eq.'+pslId,{
        psl_code: pslId,
        psl_free_comments:data.psFreeComments,
        level_code: data.psLevelId,
        skill_code :data.psSkillId,
        profil_code :data.psProfilId

    }).then(function (response) {
        self.profilsSkillsLevels[pslId] = data;
        self.ajaxLoading = false;
        self.inform();
        return cb && cb(null);
    })
        .catch(function (error) {
            self.feedback='Une erreur a été rencontré lors de la modification dans la base de donnée';
            self.ajaxLoading = false;
            self.inform();
            return cb && cb(error);
        });


    self.inform();

};

export default RefGpecProfilsSkillsModel;