import axios from 'axios';
var RefGpecLevelsModel = function (options) {
    const self = this;
    self.levels = {};
    self.initializing = true;
    self.ajaxLoading = false;
    self.onChanges = [];
    self.feedback = '';
    self.test = {};
    self.listprofils_skills_levels = {};
    self.nb_skills={};

    axios.get('/api/view_nb_skills_by_levels')
        .then(response => {
            self.nb_skills = {};
            var i=0;
            response.data.forEach(item => {
                self.nb_skills[i] = item;
                i++;
            });
            self.initializing = false;
            self.inform();
        })
        .catch(err => {
            console.log('RefGpecLevelsModel error loading data', err);
        });
    axios.get('/api/list_levels_attached_profils')
        .then(response => {
            self.listprofils_skills_levels = {};
            var i=0;
            response.data.forEach(item => {
                self.listprofils_skills_levels[i] = item;
                i++;
            });
            self.initializing = false;
            self.inform();
        })
        .catch(err => {
            console.log('RefGpecLevelsModel error loading data', err);
        });

    axios.get('/api/levels?order=level_code.asc')
        .then(response => {

            self.levels = {};
            response.data.forEach(item => {
                self.levels[item.level_code] = item;

            });
            self.initializing = false;
            self.inform();
        })
        .catch(err => {
            console.log('RefGpecLevelsModel error loading data', err);
        });


};
RefGpecLevelsModel.prototype.updateVue = function () {
    var self = this;
    self.listprofils_skills_levels = {};
    self.nb_skills={};
    axios.get('/api/view_nb_skills_by_levels')
        .then(response => {
            self.nb_skills = {};
            var i=0;
            response.data.forEach(item => {
                self.nb_skills[i] = item;
                i++;
            });
            self.inform();
        })
        .catch(err => {
            console.log('RefGpecLevelsModel error loading data', err);
        });
    axios.get('/api/list_levels_attached_profils')
        .then(response => {
            self.listprofils_skills_levels = {};
            var i=0;
            response.data.forEach(item => {
                self.listprofils_skills_levels[i] = item;
                i++;
            });
            self.inform();
        })
        .catch(err => {
            console.log('RefGpecLevelsModel error loading data', err);
        });

};
RefGpecLevelsModel.prototype.subscribe = function (onChange) {
  this.onChanges.push(onChange);
};

RefGpecLevelsModel.prototype.inform = function () {
  this.onChanges.forEach(function (cb) { cb(); });
};

RefGpecLevelsModel.prototype.addLevel = function (level_shortname, level_free_comments, cb) {
  var self = this;
  self.ajaxLoading = true;
    self.feedback='';
  var codes    = Object.keys(self.levels);
  var lastCode = codes[codes.length - 1];
  var level_code  = 'm-' + (parseInt(lastCode.split('-')[1], 10) + 1);
  var level_number = level_code.substring(2);
    axios.post('/api/levels', {
        level_code: level_code,
        level_number : level_number,
        level_shortname: level_shortname,
        level_free_comments:level_free_comments
    })
        .then(function (response) {
            self.levels[level_code] = {level_code,level_number,level_shortname, level_free_comments };
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

RefGpecLevelsModel.prototype.destroy = function (levelId, cb) {
  var self = this;
  self.ajaxLoading = true;
    self.feedback='';

    axios.delete('/api/profils_skills_levels?level_code=eq.'+levelId)
        .then(function (response) {
            for (var key in self.listprofils_skills_levels) {
                if (self.listprofils_skills_levels[key].level_code === levelId) {
                    delete self.listprofils_skills_levels[key];
                }
            }
        })
        .catch(function (error) {
            self.feedback='Une erreur a été rencontré lors de la suppression dans la base de donnée psl';
            self.ajaxLoading = false;
            return cb && cb(error);
        });


  axios.delete('/api/levels?level_code=eq.'+levelId)
      .then(function (response) {
          delete self.levels[levelId];
          self.ajaxLoading = false;
          return cb && cb(null);
      })
      .catch(function (error) {
          self.feedback='Une erreur a été rencontré lors de la suppression dans la base de donnée';
          self.ajaxLoading = false;
          return cb && cb(error);
        });
};

RefGpecLevelsModel.prototype.save = function (levelId, data, cb) {
  var self = this;
  self.ajaxLoading = true;
    self.feedback='';
    axios.patch('/api/levels?level_code=eq.'+levelId,{
        level_code: data.levelId,
        level_number:data.levelNumber,
        level_shortname: data.levelShortName,
        level_free_comments : data.levelFreeComments,

    }).then(function (response) {
        self.levels[levelId] = data;
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

RefGpecLevelsModel.prototype.getlistprofils = function(level_code){
    var self = this;
   var list ={};
    for (var key in self.listprofils_skills_levels){
        if(self.listprofils_skills_levels[key].level_code === level_code){
            list[key]=self.listprofils_skills_levels[key];
        }
    }
   return list;
};
RefGpecLevelsModel.prototype.getnbSkill = function(level_code,profil_code){
    var self = this;
    var nb=0;
    for (var key in self.nb_skills){

        if(self.nb_skills[key].level_code === level_code && self.nb_skills[key].profil_code === profil_code){
            nb=self.nb_skills[key].count;
        }
    }
    return nb;
};


export default RefGpecLevelsModel;