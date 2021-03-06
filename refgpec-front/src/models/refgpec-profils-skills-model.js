import axios from "axios";
let RefGpecProfilsSkillsModel = function(options) {
  const self = this;

  self.profilsSkillsLevels = {};
  self.initializing = true;
  self.ajaxLoading = false;
  self.onChanges = [];
  self.psl = {};
  self.profil = "";
  self.lastProfilSkillAdd = [];
  self.feedback = {
    code: "",
    message: ""
  };
  self.profilsSkillsCSV = [];
  axios
    .get(
      "/api/profils_skills_levels?order=psl_code.asc,profil_code.asc,level_code.asc"
    )
    .then(response => {
      self.profilsSkillsLevels = {};
      response.data.forEach(item => {
        self.profilsSkillsLevels[item.psl_code] = item;
      });
      self.initializing = false;
      self.inform();
    })
    .catch(err => {
      console.log("RefGpecProfilSkillsLevelModel error loading data", err);
    });
};

RefGpecProfilsSkillsModel.prototype.updateVue = function() {
  let self = this;
  self.psl = {};
  axios
    .get("/api/profils_skills_levels?profil_code=eq." + self.profil)
    .then(response => {
      response.data.forEach(item => {
        self.psl[item.psl_code] = item;
      });
      self.ajaxLoading = false;
      self.inform();
    })
    .catch(err => {
      console.log("RefGpecProfilSkillsLevelModel error loading data", err);
      self.ajaxLoading = false;
    });
};

RefGpecProfilsSkillsModel.prototype.subscribe = function(onChange) {
  this.onChanges.push(onChange);
};

RefGpecProfilsSkillsModel.prototype.inform = function() {
  this.onChanges.forEach(function(cb) {
    cb();
  });
};

RefGpecProfilsSkillsModel.prototype.getmax = function(codes) {
  let max = 2;
  codes.forEach(function(key, i) {
    let number = parseInt(codes[i].split("-")[1], 10);
    if (max < number) {
      max = number;
    }
  });
  return max;
};

RefGpecProfilsSkillsModel.prototype.addProfilSkill = function(
  profil_code,
  skill_code,
  level_code,
  psl_free_comments,
  cb
) {
  let self = this;
  self.ajaxLoading = true;
  self.feedback = {
    code: "",
    message: ""
  };
  axios
    .get("/api/profils_skills_levels?profil_code=eq." + self.profil)
    .then(response => {
      response.data.forEach(item => {
        self.psl[item.psl_code] = item;
      });
    })
    .catch(err => {
      console.log("RefGpecProfilSkillsLevelModel error loading data", err);
    });

  Object.keys(self.psl).forEach(function(key) {
    if (self.psl[key].skill_code === skill_code) {
      self.feedback.code = 999;
      self.feedback.message = "La compétence est déjà associée à ce profil !";
    }
  });
  if (!self.feedback.message) {
    // filter other skills family to have a correct numeric id
    let code_db = {};
    axios
      .get(
        "/api/profils_skills_levels?order=psl_code.asc,profil_code.asc,level_code.asc"
      )
      .then(response => {
        response.data.forEach(item => {
          code_db[item.psl_code] = item;
        });
        let codes = Object.keys(code_db);
        let psl_code = "ps-1";
        // add +1 to the id
        if (codes.length > 0) {
          let lastCodeSplitted = self.getmax(codes);
          psl_code = "ps-" + (lastCodeSplitted + 1);
        }
        axios
          .post("/api/profils_skills_levels", {
            psl_code: psl_code,
            profil_code: profil_code,
            skill_code: skill_code,
            level_code: level_code,
            psl_free_comments: psl_free_comments
          })
          .then(function(response) {
            self.profilsSkillsLevels[psl_code] = {
              psl_code,
              psl_free_comments,
              level_code,
              skill_code,
              profil_code
            };
            self.getProfilSkillLevel(profil_code);
            self.ajaxLoading = false;
            self.lastProfilSkillAdd.push(psl_code);
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
        console.log("RefGPECProfilsSkills error loading data", err);
      });
  } else {
    self.ajaxLoading = false;
    self.inform();
    return cb && cb(null);
  }

  self.inform();
};

RefGpecProfilsSkillsModel.prototype.destroy = function(pslId, profil_code, cb) {
  let self = this;
  self.ajaxLoading = true;
  self.feedback = {
    code: "",
    message: ""
  };
  axios
    .delete("/api/profils_skills_levels?psl_code=eq." + pslId)
    .then(function(response) {
      delete self.profilsSkillsLevels[profil_code];
      self.getProfilSkillLevel(profil_code);
      self.ajaxLoading = false;
      self.inform();
      return cb && cb(null);
    })
    .catch(function(error) {
      self.feedback.code = error.response.status;
      self.feedback.message = error.response.data.message;
      console.log(error.response.data);
      self.ajaxLoading = false;
      self.inform();
      return cb && cb(error);
    });

  self.inform();
};

RefGpecProfilsSkillsModel.prototype.getProfilSkillLevel = function(
  profil_code,
  cb
) {
  let self = this;
  self.ajaxLoading = true;
  self.profil = profil_code;
  self.psl = {};
  self.getprofilsSkillsCSV(profil_code);
  axios
    .get("/api/profils_skills_levels?profil_code=eq." + profil_code)
    .then(response => {
      response.data.forEach(item => {
        self.psl[item.psl_code] = item;
      });
      self.ajaxLoading = false;
      self.inform();
      return cb && cb(null);
    })
    .catch(err => {
      console.log("RefGpecProfilSkillsLevelModel error loading data", err);
      self.ajaxLoading = false;
      return cb && cb(err);
    });
  self.inform();
};

// save is useless ?
RefGpecProfilsSkillsModel.prototype.save = function(psl_code, data, cb) {
  let self = this;
  self.ajaxLoading = true;
  self.feedback = {
    code: "",
    message: ""
  };
  axios
    .patch("/api/profils_skills_levels?psl_code=eq." + psl_code, {
      psl_code: psl_code,
      psl_free_comments: data.psFreeComments,
      level_code: data.psLevelId,
      skill_code: data.psSkillId,
      profil_code: data.psProfilId
    })
    .then(function(response) {
      self.profilsSkillsLevels[psl_code] = {
        psl_code,
        psl_free_comments: data.psFreeComments,
        level_code: data.psLevelId,
        skill_code: data.psSkillId,
        profil_code: data.psProfilId
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
RefGpecProfilsSkillsModel.prototype.getprofilsSkillsCSV = function(
  profil_code
) {
  let self = this;
  let CSV = [];
  self.profilsSkillsCSV = [];
  axios
    .get(
      "/api/view_exportcsv_profilsskills?select=type,code,Intitulé_compétence,Modulation_profil,Modulation_individuelle,Commentaires&profil_code=eq." +
        profil_code +
        "&order=Modulation_profil.desc,type.asc"
    )
    .then(response => {
      response.data.forEach(item => {
        CSV = {
          Code: item.code,
          Type: item.type,
          "Intitulé compétence": item.Intitulé_compétence,
          "Modulation individuelle": item.Modulation_individuelle,
          "Modulation profil": item.Modulation_profil,
          Commentaires: item.Commentaires
        };
        self.profilsSkillsCSV.push(CSV);
      });
      self.inform();
    })
    .catch(err => {
      console.log("RefGpecSkillsModel error loading data", err);
      self.inform();
    });
};

export default RefGpecProfilsSkillsModel;
