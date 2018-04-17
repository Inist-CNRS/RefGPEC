import axios from "axios";
let RefGpecFamilysSkillsModel = function(options) {
  const self = this;

  self.familysSkillsLevels = {};
  self.initializing = true;
  self.ajaxLoading = false;
  self.onChanges = [];
  self.fsl = {};
  self.family = "";
  self.lastFamilySkillAdd = [];
  self.feedback = {
    code: "",
    message: ""
  };
  self.familysSkillsCSV = [];
  axios
    .get(
      "/api/family_skills_levels?order=fsl_code.asc,family_id.asc,level_code.asc"
    )
    .then(response => {
      self.familysSkillsLevels = {};
      response.data.forEach(item => {
        self.familysSkillsLevels[item.fsl_code] = item;
      });
      self.initializing = false;
      self.inform();
    })
    .catch(err => {
      console.log("RefGpecFamilySkillsLevelModel error loading data", err);
    });
};

RefGpecFamilysSkillsModel.prototype.updateVue = function() {
  let self = this;
  self.fsl = {};
  axios
    .get("/api/family_skills_levels?family_id=eq." + self.family)
    .then(response => {
      response.data.forEach(item => {
        self.fsl[item.fsl_code] = item;
      });
      self.ajaxLoading = false;
      self.inform();
    })
    .catch(err => {
      console.log("RefGpecFamilySkillsLevelModel error loading data", err);
      self.ajaxLoading = false;
    });
};

RefGpecFamilysSkillsModel.prototype.subscribe = function(onChange) {
  this.onChanges.push(onChange);
};

RefGpecFamilysSkillsModel.prototype.inform = function() {
  this.onChanges.forEach(function(cb) {
    cb();
  });
};

RefGpecFamilysSkillsModel.prototype.getmax = function(codes) {
  let max = 2;
  codes.forEach(function(key, i) {
    let number = parseInt(codes[i].split("-")[1], 10);
    if (max < number) {
      max = number;
    }
  });
  return max;
};
RefGpecFamilysSkillsModel.prototype.updateVue = function() {
  let self = this;
  self.fsl = {};
  axios
    .get("/api/family_skills_levels?family_id=eq." + self.family)
    .then(response => {
      response.data.forEach(item => {
        self.fsl[item.pfsl_code] = item;
      });
      self.ajaxLoading = false;
      self.inform();
    })
    .catch(err => {
      console.log("RefGpecProfilSkillsLevelModel error loading data", err);
      self.ajaxLoading = false;
    });
};

RefGpecFamilysSkillsModel.prototype.addFamilySkill = function(
  family_id,
  skill_code,
  level_code,
  fsl_free_comments,
  cb
) {
  let self = this;
  self.ajaxLoading = true;
  self.feedback = {
    code: "",
    message: ""
  };
  axios
    .get("/api/family_skills_levels?family_id=eq." + self.family)
    .then(response => {
      response.data.forEach(item => {
        self.fsl[item.fsl_code] = item;
      });
    })
    .catch(err => {
      console.log("RefGpecFamilySkillsLevelModel error loading data", err);
    });

  Object.keys(self.fsl).forEach(function(key) {
    if (self.fsl[key].skill_code === skill_code) {
      self.feedback.code = 999;
      self.feedback.message =
        "La compétence est déjà associée à cette famille !";
    }
  });
  if (!self.feedback.message) {
    // filter other skills family to have a correct numeric id
    let code_db = {};
    axios
      .get(
        "/api/family_skills_levels?order=fsl_code.asc,family_id.asc,level_code.asc"
      )
      .then(response => {
        response.data.forEach(item => {
          code_db[item.fsl_code] = item;
        });
        let codes = Object.keys(code_db);
        let fsl_code = "ps-1";
        // add +1 to the id
        if (codes.length > 0) {
          let lastCodeSplitted = self.getmax(codes);
          fsl_code = "ps-" + (lastCodeSplitted + 1);
        }
        axios
          .post("/api/family_skills_levels", {
            fsl_code: fsl_code,
            family_id: family_id,
            skill_code: skill_code,
            level_code: level_code,
            fsl_free_comments: fsl_free_comments
          })
          .then(function(response) {
            self.familysSkillsLevels[fsl_code] = {
              fsl_code,
              fsl_free_comments,
              level_code,
              skill_code,
              family_id
            };
            self.getFamilySkillLevel(family_id);
            self.ajaxLoading = false;
            self.lastFamilySkillAdd.push(fsl_code);
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
      })
      .catch(err => {
        console.log("RefGPECFamilysSkills error loading data", err);
      });
  } else {
    self.ajaxLoading = false;
    self.inform();
    return cb && cb(null);
  }

  self.inform();
};

RefGpecFamilysSkillsModel.prototype.destroy = function(fslId, family_id, cb) {
  let self = this;
  self.ajaxLoading = true;
  self.feedback = {
    code: "",
    message: ""
  };
  axios
    .delete("/api/family_skills_levels?fsl_code=eq." + fslId)
    .then(function(response) {
      delete self.familysSkillsLevels[family_id];
      self.getFamilySkillLevel(family_id);
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

RefGpecFamilysSkillsModel.prototype.getFamilySkillLevel = function(
  family_id,
  cb
) {
  let self = this;
  self.ajaxLoading = true;
  self.family = family_id;
  self.fsl = {};
  axios
    .get("/api/family_skills_levels?family_id=eq." + family_id)
    .then(response => {
      response.data.forEach(item => {
        self.fsl[item.fsl_code] = item;
      });
      self.ajaxLoading = false;
      self.inform();
      return cb && cb(null);
    })
    .catch(err => {
      console.log("RefGpecFamilySkillsLevelModel error loading data", err);
      self.ajaxLoading = false;
      return cb && cb(err);
    });
  self.inform();
};

// save is useless ?
RefGpecFamilysSkillsModel.prototype.save = function(fsl_code, data, cb) {
  let self = this;
  self.ajaxLoading = true;
  self.feedback = {
    code: "",
    message: ""
  };
  axios
    .patch("/api/family_skills_levels?fsl_code=eq." + fsl_code, {
      fsl_code: fsl_code,
      fsl_free_comments: data.psFreeComments,
      level_code: data.psLevelId,
      skill_code: data.psSkillId,
      family_id: data.psFamilyId
    })
    .then(function(response) {
      self.familysSkillsLevels[fsl_code] = {
        fsl_code,
        fsl_free_comments: data.psFreeComments,
        level_code: data.psLevelId,
        skill_code: data.psSkillId,
        family_id: data.psFamilyId
      };
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

export default RefGpecFamilysSkillsModel;
