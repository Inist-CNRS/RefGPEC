import axios from "axios";
import words from "talisman/tokenizers/words";
import unine from "talisman/stemmers/french/unine";
import stopwords from "stopwords-fr";
let RefGpecSkillsModel = function(options) {
  const self = this;

  self.skills = {};
  self.initializing = true;
  self.ajaxLoading = false;
  self.onChanges = [];
  self.feedback = {
    code: "",
    message: ""
  };
  self.listFamillys = {};
  self.listType = {};
  self.skillCSV = [];
  self.lastSkillAdd = [];
  self.skills_familys = {};
  self.listprofils_skills_levels = {};
  let erreur = 2;
  axios
    .get("/api/list_skills_attached_profils")
    .then(response => {
      self.listprofils_skills_levels = {};
      let i = 0;
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
    .get("/api/skills?order=st_code.asc,skill_shortname.asc")
    .then(response => {
      self.skills = {};
      response.data.forEach(item => {
        self.skills[item.skill_code] = item;
        //add a column to search by ignoring accents and tokenization
        let wordsList = self.skills[item.skill_code].skill_shortname;
        wordsList = words(wordsList.toLowerCase());
        wordsList = wordsList.filter(function(word) {
          return stopwords.indexOf(word) === -1;
        });
        wordsList = wordsList.map(unine.complex);
        self.skills[item.skill_code].tokens = wordsList;
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
  self.getSkillsFamilys();
  self.getfamillys();
  self.gettype();
  self.initializing = erreur !== 0;
  self.inform();
};

RefGpecSkillsModel.prototype.getfamillys = function() {
  let self = this;
  self.listFamillys = {};
  axios
    .get("/api/view_list_family_profil")
    .then(response => {
      response.data.forEach(item => {
        self.listFamillys[item.family_id] = item;
      });
      self.inform();
    })
    .catch(err => {
      console.log("RefGpecSkillsModel error loading data", err);
    });
};

RefGpecSkillsModel.prototype.getSkillsFamilys = function() {
  let self = this;
  self.skills_familys = {};
  axios
    .get("/api/list_skills_attached_familys")
    .then(response => {
      self.skills_familys = {};
      let i = 0;
      response.data.forEach(item => {
        self.skills_familys[i] = item;
        i++;
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
  let self = this;
  axios
    .get("/api/list_skills_attached_profils")
    .then(response => {
      self.listprofils_skills_levels = {};
      let i = 0;
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
    let number = parseInt(codes[i].split("-")[2], 10);
    if (max < number) {
      max = number;
    }
  });
  return max;
};
RefGpecSkillsModel.prototype.addSkill = function(
  st_code,
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
    .get("/api/history_skills?order=st_code.asc,sh_shortname.asc")
    .then(response => {
      response.data.forEach(item => {
        history[item.sh_code] = item;
      });
      // filter other skills family to have a correct numeric id
      let codes = Object.keys(history).filter(function(elt) {
        return elt.indexOf("c-" + st_code.toLowerCase() + "-") === 0;
      });
      let skill_code = "c-" + st_code.toLowerCase() + "-1";
      // add +1 to the id if more than one skill in this type/domain
      codes.sort();
      if (codes.length > 0) {
        let lastCodeSplitted = self.getmax(codes) + 1;
        if (parseInt(lastCodeSplitted, 10) < 10) {
          lastCodeSplitted = "0" + lastCodeSplitted;
        }
        skill_code = "c-" + st_code.toLowerCase() + "-" + lastCodeSplitted;
      }

      skill_shortname = skill_shortname.trim();
      axios
        .post("/api/skills", {
          skill_code: skill_code,
          skill_shortname: skill_shortname,
          skill_free_comments: skill_free_comments,
          st_code: st_code
        })
        .then(function(response) {
          self.skills[skill_code] = {
            skill_code,
            skill_shortname,
            skill_free_comments,
            st_code
          };
          //add column to search by ignoring accents and tokenization
          let wordsList = skill_shortname;
          wordsList = words(wordsList.toLowerCase());
          wordsList = wordsList.filter(function(word) {
            return stopwords.indexOf(word) === -1;
          });
          wordsList = wordsList.map(unine.complex);
          self.skills[skill_code].tokens = wordsList;
          self.ajaxLoading = false;
          self.getfamillys();
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
  let self = this;
  self.ajaxLoading = true;
  self.feedback = {
    code: "",
    message: ""
  };
  axios
    .delete("/api/profils_skills_levels?skill_code=eq." + skillId)
    .then(function(response) {
      for (let key in self.listprofils_skills_levels) {
        if (self.listprofils_skills_levels[key].skill_code === skillId) {
          delete self.listprofils_skills_levels[key];
        }
      }
      self.getSkillsCSV();
      self.getfamillys();
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
  let self = this;
  self.ajaxLoading = true;
  self.feedback = {
    code: "",
    message: ""
  };
  skillstate.skill_shortname = skillstate.skill_shortname.trim();
  axios
    .patch("/api/skills?skill_code=eq." + skillId, {
      skill_code: skillId,
      skill_shortname: skillstate.skill_shortname,
      skill_free_comments: skillstate.skill_free_comments,
      st_code: skillstate.st_code
    })
    .then(function(response) {
      self.skills[skillId] = skillstate;
      //update the column to search by ignoring accents and tokenization
      let wordsList = self.skills[skillId].skill_shortname;
      wordsList = words(wordsList.toLowerCase());
      wordsList = wordsList.filter(function(word) {
        return stopwords.indexOf(word) === -1;
      });
      wordsList = wordsList.map(unine.complex);
      self.skills[skillId].tokens = wordsList;
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
  let self = this;
  let list = [];
  for (let key in self.listprofils_skills_levels) {
    if (self.listprofils_skills_levels[key].skill_code === skillId) {
      list.push(self.listprofils_skills_levels[key]);
    }
  }
  return list;
};

RefGpecSkillsModel.prototype.getSkillsCSV = function() {
  let self = this;
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
