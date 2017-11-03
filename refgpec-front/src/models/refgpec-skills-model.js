import axios from 'axios';
var RefGpecSkillsModel = function (options) {
  const self = this;

  self.skills = {};
  self.initializing = true;
  self.ajaxLoading = false;
  self.onChanges = [];
  self.feedback = '';
    self.listDomain = {};
    self.listprofils_skills_levels = {};

    axios.get('/api/list_skills_attached_profils')
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
            console.log('RefGpecSkillsModel error loading data', err);
        });

      axios.get('/api/skills?order=sd_code.asc,st_code.asc,skill_shortname.asc')
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

    axios.get('/api/view_list_domains_profil')
        .then(response => {
            response.data.forEach(item => {
                self.listDomain[item.sd_code] = item;
            });
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


RefGpecSkillsModel.prototype.addSkill = function (st_code, sd_code, skill_shortname, skill_free_comments, cb) {
  var self = this;
  self.ajaxLoading = true;
    self.feedback='';
  // filter other skills family to have a correct numeric id
  var codes = Object.keys(self.skills).filter(function (elt) {
    return (elt.indexOf('c-' + st_code + '-' + sd_code) === 0)
  });
  var skill_code = 'c-' + st_code + '-' + sd_code + '-1';
  // add +1 to the id if more than one skill in this type/domain
  codes.sort();
  if (codes.length > 0) {
    var lastCode = codes[codes.length - 1];
    var lastCodeSplitted = lastCode.split('-');
      skill_code  = 'c-' + st_code + '-' + sd_code + '-' + (parseInt(lastCodeSplitted[lastCodeSplitted.length - 1], 10) + 1);
  }

    axios.post('/api/skills', {
        skill_code: skill_code,
        skill_shortname: skill_shortname,
        skill_free_comments : skill_free_comments,
        sd_code :sd_code,
        st_code : st_code
    })
        .then(function (response) {
            self.skills[skill_code] = { skill_code,skill_shortname,skill_free_comments,sd_code,st_code};
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



RefGpecSkillsModel.prototype.destroy = function (skillId, cb) {
  var self = this;
  self.ajaxLoading = true;
    self.feedback='';
    axios.delete('/api/profils_skills_levels?skill_code=eq.'+skillId)
        .then(function (response) {
            for (var key in self.listprofils_skills_levels) {
                if (self.listprofils_skills_levels[key].skill_code === skillId) {
                    delete self.listprofils_skills_levels[key];
                }
            }
        })
        .catch(function (error) {
            self.feedback='Une erreur a été rencontré lors de la suppression dans la base de donnée';
            self.ajaxLoading = false;
            self.inform();
            return cb && cb(error);
        });
  axios.delete('/api/skills?skill_code=eq.'+skillId)
        .then(function (response) {
            delete self.skills[skillId];
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

RefGpecSkillsModel.prototype.save = function (skillId, level, cb) {
  var self = this;
  self.ajaxLoading = true;
    self.feedback='';
    axios.patch('/api/skills?skill_code=eq.'+skillId,{
            skill_code: skillId,
            skill_shortname: level.skillShortName,
            skill_free_comments : level.skillFreeComments,
            sd_code :level.skillDomain,
            st_code : level.skillType
        }).then(function (response) {
           self.skills[skillId] = level;
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

RefGpecSkillsModel.prototype.getlistprofils = function(skillId){
    var self = this;
    var list =[];
    for (var key in self.listprofils_skills_levels){
        if(self.listprofils_skills_levels[key].skill_code === skillId){
            list.push(self.listprofils_skills_levels[key].profil_shortname);
        }
    }
    return list;
};
export default RefGpecSkillsModel;