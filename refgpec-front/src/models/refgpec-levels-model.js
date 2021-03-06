import axios from "axios";
let RefGpecLevelsModel = function(options) {
  const self = this;
  self.levels = {};
  self.initializing = true;
  self.ajaxLoading = false;
  self.onChanges = [];
  self.feedback = {
    code: "",
    message: ""
  };
  self.test = {};
  self.max = 0;
  self.lastLevelAdd = [];
  self.listprofils_skills_levels = {};
  self.nb_skills = {};

  axios
    .get("/api/view_nb_skills_by_levels")
    .then(response => {
      self.nb_skills = {};
      let i = 0;
      response.data.forEach(item => {
        self.nb_skills[i] = item;
        i++;
      });
      self.initializing = false;
      self.inform();
    })
    .catch(err => {
      console.log("RefGpecLevelsModel error loading data", err);
    });
  axios
    .get("/api/list_levels_attached_profils")
    .then(response => {
      self.listprofils_skills_levels = {};
      let i = 0;
      response.data.forEach(item => {
        self.listprofils_skills_levels[i] = item;
        i++;
      });
      self.initializing = false;
      self.inform();
    })
    .catch(err => {
      console.log("RefGpecLevelsModel error loading data", err);
    });

  axios
    .get("/api/levels?order=level_number.asc")
    .then(response => {
      self.levels = {};
      response.data.forEach(item => {
        self.levels[item.level_code] = item;
      });
      self.setMax();
      self.initializing = false;
      self.inform();
    })
    .catch(err => {
      console.log("RefGpecLevelsModel error loading data", err);
    });
};

RefGpecLevelsModel.prototype.setMax = function() {
  let self = this;
  Object.keys(self.levels).forEach(function(key) {
    if (self.levels[key].level_number > self.max)
      self.max = self.levels[key].level_number;
  });
};
RefGpecLevelsModel.prototype.updateVue = function() {
  let self = this;
  self.listprofils_skills_levels = {};
  self.nb_skills = {};
  axios
    .get("/api/view_nb_skills_by_levels")
    .then(response => {
      self.nb_skills = {};
      let i = 0;
      response.data.forEach(item => {
        self.nb_skills[i] = item;
        i++;
      });
      self.inform();
    })
    .catch(err => {
      console.log("RefGpecLevelsModel error loading data", err);
    });
  axios
    .get("/api/list_levels_attached_profils")
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
      console.log("RefGpecLevelsModel error loading data", err);
    });
  Object.keys(self.levels).forEach(function(key) {
    if (self.levels[key].level_number > self.max)
      self.max = self.levels[key].level_number;
  });
};
RefGpecLevelsModel.prototype.subscribe = function(onChange) {
  this.onChanges.push(onChange);
};

RefGpecLevelsModel.prototype.inform = function() {
  this.onChanges.forEach(function(cb) {
    cb();
  });
};

RefGpecLevelsModel.prototype.getmax = function(codes) {
  let max = 2;
  codes.forEach(function(key, i) {
    let number = parseInt(codes[i].split("-")[1], 10);

    if (max < number) {
      max = number;
    }
  });
  return max;
};

RefGpecLevelsModel.prototype.addLevel = function(
  level_number,
  level_shortname,
  level_free_comments,
  cb
) {
  let self = this;
  self.ajaxLoading = true;
  self.feedback = "";
  let level_code = "m-" + 1;

  //get the levels from database to be sure to get the last code
  axios
    .get("/api/levels?order=level_number.asc")
    .then(response => {
      self.levels = {};
      response.data.forEach(item => {
        self.levels[item.level_code] = item;
      });
    })
    .catch(err => {
      console.log("RefGpecLevelsModel error loading data", err);
    });

  let codes = Object.keys(self.levels);
  if (codes.length > 0) {
    codes.sort();
    let lastCodeSplitted = self.getmax(codes);
    level_code = "m-" + (lastCodeSplitted + 1);
  }

  axios
    .post("/api/levels", {
      level_code: level_code,
      level_number: level_number,
      level_shortname: level_shortname,
      level_free_comments: level_free_comments
    })
    .then(function(response) {
      if (self.max < level_number) {
        self.max = parseInt(level_number, 10);
      }
      self.levels[level_code] = {
        level_code,
        level_number,
        level_shortname,
        level_free_comments
      };
      self.ajaxLoading = false;
      self.lastLevelAdd.push(level_code);
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

RefGpecLevelsModel.prototype.destroy = function(levelId, cb) {
  let self = this;
  self.ajaxLoading = true;
  self.feedback = "";
  axios
    .delete("/api/profils_skills_levels?level_code=eq." + levelId)
    .then(function(response) {
      for (let key in self.listprofils_skills_levels) {
        if (self.listprofils_skills_levels[key].level_code === levelId) {
          delete self.listprofils_skills_levels[key];
        }
      }
      axios
        .delete("/api/levels?level_code=eq." + levelId)
        .then(function(response) {
          if (self.max === self.levels[levelId].level_number) {
            for (let i in self.levels) {
              if (self.levels[i].level_number > self.max)
                self.max = parseInt(self.levels[i].level_number, 10);
            }
          }
          delete self.levels[levelId];
          self.ajaxLoading = false;
          return cb && cb(null);
        })
        .catch(function(error) {
          self.feedback =
            "Une erreur a été rencontrée lors de la suppression dans la base de données";
          self.ajaxLoading = false;
          return cb && cb(error);
        });
    })
    .catch(function(error) {
      self.feedback.code = error.response.status;
      self.feedback.message = error.response.data.message;
      self.ajaxLoading = false;
      return cb && cb(error);
    });
};

RefGpecLevelsModel.prototype.save = function(levelId, data, cb) {
  let self = this;
  self.ajaxLoading = true;
  self.feedback = "";
  axios
    .patch("/api/levels?level_code=eq." + levelId, {
      level_code: data.level_code,
      level_number: data.level_number,
      level_shortname: data.level_shortname,
      level_free_comments: data.level_free_comments
    })
    .then(function(response) {
      if (self.max < data.level_number) {
        self.max = parseInt(data.level_number, 10);
      }
      self.levels[levelId] = data;
      self.ajaxLoading = false;
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

RefGpecLevelsModel.prototype.getListProfils = function(level_code) {
  let self = this;
  let list = {};
  for (let key in self.listprofils_skills_levels) {
    if (self.listprofils_skills_levels[key].level_code === level_code) {
      list[key] = self.listprofils_skills_levels[key];
    }
  }
  return list;
};
RefGpecLevelsModel.prototype.getnbSkill = function(level_code, profil_code) {
  let self = this;
  let nb = 0;
  for (let key in self.nb_skills) {
    if (
      self.nb_skills[key].level_code === level_code &&
      self.nb_skills[key].profil_code === profil_code
    ) {
      nb = self.nb_skills[key].count;
    }
  }
  return nb;
};

export default RefGpecLevelsModel;
