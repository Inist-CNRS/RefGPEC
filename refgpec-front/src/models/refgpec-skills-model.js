import axios from "axios";
var RefGpecSkillsModel = function(options) {
  const self = this;

  self.skills = {};
  self.initializing = true;
  self.ajaxLoading = false;
  self.onChanges = [];
  self.feedback = {
    code: "",
    message: ""
  };
  self.listDomain = {};
  self.listType = {};
  self.skillCSV = [];
  self.lastSkillAdd = [];
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
  self.gettype();
  self.initializing = erreur !== 0;
  self.inform();
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

RefGpecSkillsModel.prototype.gettype = function() {
  let self = this;
  self.listType = {};
  axios
    .get("/api/skills_types")
    .then(response => {
      response.data.forEach(item => {
        self.listType[item.st_code] = item;
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
RefGpecSkillsModel.prototype.getmax = function(codes) {
  let max = 2;
  codes.forEach(function(key, i) {
    let number = parseInt(codes[i].split("-")[3], 10);
    if (max < number) {
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
  let self = this;
  self.ajaxLoading = true;
  let history = {};
  self.feedback = {
    code: "",
    message: ""
  };
  //get the skills from history database to be sure to get the last code
  axios
    .get("/api/history_skills?order=sd_code.asc,st_code.asc,sh_shortname.asc")
    .then(response => {
      response.data.forEach(item => {
        history[item.sh_code] = item;
      });
      // filter other skills family to have a correct numeric id
      let codes = Object.keys(history).filter(function(elt) {
        return (
          elt.indexOf(
            "c-" + st_code.toLowerCase() + "-" + sd_code.toLowerCase()
          ) === 0
        );
      });
      let skill_code =
        "c-" + st_code.toLowerCase() + "-" + sd_code.toLowerCase() + "-1";
      // add +1 to the id if more than one skill in this type/domain
      codes.sort();
      if (codes.length > 0) {
        let lastCodeSplitted = self.getmax(codes);
        skill_code =
          "c-" +
          st_code.toLowerCase() +
          "-" +
          sd_code.toLowerCase() +
          "-" +
          parseInt(lastCodeSplitted + 1, 10);
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
          self.lastSkillAdd.push(skill_code);
          self.inform();
          return cb && cb(null);
        })
        .catch(function(error) {
          self.feedback.code = error.response.status;
          self.feedback.message = error.response.data.message;
          self.ajaxLoading = false;
          self.inform();
          return cb && cb(error);
        });
    })
    .catch(err => {
      console.log("RefGPECHistory_Skills error loading data", err);
    });

  self.inform();
};

RefGpecSkillsModel.prototype.destroy = function(skillId, cb) {
  var self = this;
  self.ajaxLoading = true;
  self.feedback = {
    code: "",
    message: ""
  };
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
      self.feedback.code = error.response.status;
      self.feedback.message = error.response.data.message;
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
      self.feedback.code = error.response.status;
      self.feedback.message = error.response.data.message;
      self.ajaxLoading = false;
      return cb && cb(error);
    });
};

RefGpecSkillsModel.prototype.save = function(skillId, skillstate, cb) {
  var self = this;
  self.ajaxLoading = true;
  self.feedback = {
    code: "",
    message: ""
  };
  axios
    .patch("/api/skills?skill_code=eq." + skillId, {
      skill_code: skillId,
      skill_shortname: skillstate.skill_shortname,
      skill_free_comments: skillstate.skill_free_comments,
      sd_code: skillstate.sd_code,
      st_code: skillstate.st_code
    })
    .then(function(response) {
      self.skills[skillId] = skillstate;
      self.ajaxLoading = false;
      self.getSkillsCSV();
      self.inform();
      return cb && cb(null);
    })
    .catch(function(error) {
      self.feedback.code = error.response.status;
      self.feedback.message = error.response.data.message;
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
