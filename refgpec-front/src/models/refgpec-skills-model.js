import axios from "axios";
var RefGpecSkillsModel = function(options) {
  const self = this;

  self.skills = {};
  self.initializing = true;
  self.ajaxLoading = false;
  self.onChanges = [];
  self.feedback = "";
  self.listDomain = {};
    self.skillCSV=[];
  self.listprofils_skills_levels = {};
  var erreur = 2;
  axios
    .get("/api/list_skills_attached_profils")
    .then(response => {
      self.listprofils_skills_levels = {};
      var i = 0;
      response.data.forEach(item => {
        self.listprofils_skills_levels[i] = item;
        i++;
      });
      erreur -= 1;
      self.initializing = erreur !== 0;
      self.inform();
    })
    .catch(err => {
      console.log("RefGpecSkillsModel error loading data", err);
      erreur += 1;
    });

  axios
    .get("/api/skills?order=sd_code.asc,st_code.asc,skill_shortname.asc")
    .then(response => {
      self.skills = {};
      response.data.forEach(item => {
        self.skills[item.skill_code] = item;
      });
      erreur -= 1;
      self.initializing = erreur !== 0;
      self.inform();
    })
    .catch(err => {
      console.log("RefGpecSkillsModel error loading data", err);
      erreur += 1;
    });
self.getSkillsCSV();

  self.getdomain();
  self.initializing = erreur !== 0;
  self.inform();
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

RefGpecSkillsModel.prototype.getdomain = function() {
  var self = this;
  self.listDomain = {};
  axios
    .get("/api/view_list_domains_profil")
    .then(response => {
      response.data.forEach(item => {
        self.listDomain[item.sd_code] = item;
      });
      self.inform();
    })
    .catch(err => {
      console.log("RefGpecSkillsModel error loading data", err);
    });
};

RefGpecSkillsModel.prototype.updateVue = function() {
  var self = this;
  axios
    .get("/api/list_skills_attached_profils")
    .then(response => {
      self.listprofils_skills_levels = {};
      var i = 0;
      response.data.forEach(item => {
        self.listprofils_skills_levels[i] = item;
        i++;
      });
      self.inform();
    })
    .catch(err => {
      console.log("RefGpecSkillsModel error loading data", err);
    });
};

RefGpecSkillsModel.prototype.subscribe = function(onChange) {
  this.onChanges.push(onChange);
};

RefGpecSkillsModel.prototype.inform = function() {
  this.onChanges.forEach(function(cb) {
    cb();
  });
};
RefGpecSkillsModel.prototype.getmax = function (codes) {
    let max = 2;
    codes.forEach(function(key,i) {
        let number =parseInt(codes[i].split("-")[1],10);

        if(max<number){
            max = number;
        }
    });
    return max;
};
RefGpecSkillsModel.prototype.addSkill = function(
  st_code,
  sd_code,
  skill_shortname,
  skill_free_comments,
  cb
) {
  var self = this;
  self.ajaxLoading = true;
  self.feedback = "";
  // filter other skills family to have a correct numeric id
  var codes = Object.keys(self.skills).filter(function(elt) {
    return elt.indexOf("c-" + st_code + "-" + sd_code) === 0;
  });
  var skill_code = "c-" + st_code + "-" + sd_code + "-1";
  // add +1 to the id if more than one skill in this type/domain
  codes.sort();
  if (codes.length > 0) {
      let lastCodeSplitted = self.getmax(codes);
    skill_code =
      "c-" +
      st_code +
      "-" +
      sd_code +
      "-" +
      (parseInt(lastCodeSplitted + 1 ,10));
  }

  axios
    .post("/api/skills", {
      skill_code: skill_code,
      skill_shortname: skill_shortname,
      skill_free_comments: skill_free_comments,
      sd_code: sd_code,
      st_code: st_code
    })
    .then(function(response) {
      self.skills[skill_code] = {
        skill_code,
        skill_shortname,
        skill_free_comments,
        sd_code,
        st_code
      };
      self.ajaxLoading = false;
      self.getdomain();
      self.getSkillsCSV();
      self.inform();
      return cb && cb(null);
    })
    .catch(function(error) {
      self.feedback =
        "Une erreur a été rencontrée lors de l'ajout dans la base de donnée";
      self.ajaxLoading = false;
      self.inform();
      return cb && cb(error);
    });

  self.inform();
};

RefGpecSkillsModel.prototype.destroy = function(skillId, cb) {
  var self = this;
  self.ajaxLoading = true;
  self.feedback = "";
  axios
    .delete("/api/profils_skills_levels?skill_code=eq." + skillId)
    .then(function(response) {
      for (var key in self.listprofils_skills_levels) {
        if (self.listprofils_skills_levels[key].skill_code === skillId) {
          delete self.listprofils_skills_levels[key];
        }
      }
        self.getSkillsCSV();
      self.getdomain();
    })
    .catch(function(error) {
      self.feedback =
        "Une erreur a été rencontré lors de la suppression dans la base de donnée";
      self.ajaxLoading = false;
      return cb && cb(error);
    });
  axios
    .delete("/api/skills?skill_code=eq." + skillId)
    .then(function(response) {
      delete self.skills[skillId];
      self.ajaxLoading = false;
      return cb && cb(null);
    })
    .catch(function(error) {
      self.feedback =
        "Une erreur a été rencontrée lors de la suppression dans la base de donnée";
      self.ajaxLoading = false;
      return cb && cb(error);
    });
};

RefGpecSkillsModel.prototype.save = function(skillId, level, cb) {
  var self = this;
  self.ajaxLoading = true;
  self.feedback = "";
  axios
    .patch("/api/skills?skill_code=eq." + skillId, {
      skill_code: skillId,
      skill_shortname: level.skillShortName,
      skill_free_comments: level.skillFreeComments,
      sd_code: level.skillDomain,
      st_code: level.skillType
    })
    .then(function(response) {
      self.skills[skillId] = level;
      self.ajaxLoading = false;
      self.getSkillsCSV();
      self.inform();
      return cb && cb(null);
    })
    .catch(function(error) {
      self.feedback =
        "Une erreur a été rencontrée lors de la modification dans la base de donnée";
      self.ajaxLoading = false;
      self.inform();
      return cb && cb(error);
    });

  self.inform();
};

RefGpecSkillsModel.prototype.getListProfils = function(skillId) {
  var self = this;
  var list = [];
  for (var key in self.listprofils_skills_levels) {
    if (self.listprofils_skills_levels[key].skill_code === skillId) {
      list.push(self.listprofils_skills_levels[key]);
    }
  }
  return list;
};

RefGpecSkillsModel.prototype.getSkillsCSV = function() {
    var self = this;
    self.skillCSV = [];
    axios
        .get("/api/view_exportcsv_skills")
        .then(response => {
            response.data.forEach(item => {
                self.skillCSV.push(item);

            });
            self.inform();
        })
        .catch(err => {
            console.log("RefGpecSkillsModel error loading data", err);
            self.inform();
        });
};

export default RefGpecSkillsModel;
