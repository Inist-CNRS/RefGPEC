import axios from "axios";
var RefGpecProfilsModel = function(options) {
  const self = this;

  self.profils = {};
  self.initializing = true;
  self.ajaxLoading = false;
  self.onChanges = [];
  self.feedback = "";
  self.listTag = {};
  self.listprofils_skills_levels = {};
  var erreur = false;
  axios
    .get("/api/list_profils_attached_skills")
    .then(response => {
      self.listprofils_skills_levels = {};
      var i = 0;
      response.data.forEach(item => {
        self.listprofils_skills_levels[i] = item;
        i++;
      });
    })
    .catch(err => {
      console.log("RefGpecProfilModelError error loading data", err);
      erreur += 1;
    });

  axios
    .get("/api/view_profils_nb_skills")
    .then(response => {
      self.profils = {};
      response.data.forEach(item => {
        self.profils[item.profil_code] = item;
      });
    })
    .catch(err => {
      console.log("RefGpecProfilModelError loading data", err);
      erreur += 1;
    });

  self.gettag();
  self.initializing = erreur;
  self.inform();
};

RefGpecProfilsModel.prototype.gettag = function() {
  var self = this;
  self.listTag = {};
  axios
    .get("/api/view_list_tag_profils")
    .then(response => {
      response.data.forEach(item => {
        self.listTag[item.tag_code] = item;
      });
      self.inform();
    })
    .catch(err => {
      console.log("RefGpecProfilModelError loading data", err);
    });
};

RefGpecProfilsModel.prototype.updateVue = function() {
  var self = this;
  self.profils = {};
  self.listprofils_skills_levels = {};
    self.gettag();
  axios
    .get("/api/list_profils_attached_skills")
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
      console.log("RefGpecProfilModelError error loading data", err);
    });

  axios
    .get("/api/view_profils_nb_skills")
    .then(response => {
      self.profils = {};
      response.data.forEach(item => {
        self.profils[item.profil_code] = item;
      });
      self.inform();
    })
    .catch(err => {
      console.log("RefGpecProfilModelError loading data", err);
    });
};

RefGpecProfilsModel.prototype.subscribe = function(onChange) {
  this.onChanges.push(onChange);
};

RefGpecProfilsModel.prototype.inform = function() {
  this.onChanges.forEach(function(cb) {
    cb();
  });
};

RefGpecProfilsModel.prototype.addProfil = function(
  tag_code,
  profil_shortname,
  profil_free_comments,
  profil_pdf_path,
  cb
) {
  var self = this;
  self.ajaxLoading = true;
  self.feedback = "";
  // filter other skills family to have a correct numeric id
  var codes = Object.keys(self.profils).filter(function(elt) {
    return elt.indexOf("p-") === 0;
  });
  var profil_code = "p-1";
  // add +1 to the id if more than one profil in this tag
  codes.sort();
  if (codes.length > 0) {
    var lastCode = codes[codes.length - 1];
    var lastCodeSplitted = lastCode.split("-");
    profil_code =
      "p-" +
      (parseInt(lastCodeSplitted[lastCodeSplitted.length - 1], 10) + 1);
  }
  if(!tag_code){
      tag_code = null;
  }
  axios
    .post("/api/profils", {
      profil_code: profil_code,
      profil_shortname: profil_shortname,
      profil_free_comments: profil_free_comments,
      profil_pdf_path: profil_pdf_path,
      tag_code: tag_code
    })
    .then(function(response) {
      self.ajaxLoading = false;
      var nomchamp = [];
      for (var key in self.profils) {
        var i = 0;
        for (var key2 in self.profils[key]) {
          i += 1;
          if (i > 5) {
            nomchamp.push(key2);
          }
        }
        break;
      }
      self.profils[profil_code] = {
        profil_code,
        profil_shortname,
        profil_pdf_path,
        profil_free_comments,
        tag_code
      };
      self.gettag();
      for (var k = 0; k < nomchamp.length; k++) {
        self.profils[profil_code][nomchamp[k]] = 0;
      }

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

RefGpecProfilsModel.prototype.destroy = function(profilId, cb) {
  var self = this;
  self.ajaxLoading = true;
  self.feedback = "";
  axios
    .delete("/api/profils_skills_levels?profil_code=eq." + profilId)
    .then(function(response) {
      for (var key in self.listprofils_skills_levels) {
        if (self.listprofils_skills_levels[key].profil_code === profilId) {
          delete self.listprofils_skills_levels[key];
          self.gettag();
          self.inform();
        }
      }
            axios
                .delete("/api/profils?profil_code=eq." + profilId)
                .then(function(response) {
                    delete self.profils[profilId];
                    self.ajaxLoading = false;
                    self.inform();
                    return cb && cb(null);
                })
                .catch(function(error) {
                    self.feedback =
                        "Une erreur a été rencontrée lors de la suppression dans la base de donnée";
                    self.ajaxLoading = false;
                    self.inform();
                    return cb && cb(error);
                });
    }
    )
    .catch(function(error) {
      self.feedback =
        "Une erreur a été rencontré lors de la suppression dans la base de donnée";
      self.ajaxLoading = false;
      self.inform();
      return cb && cb(error);
    });



  self.inform();
};

RefGpecProfilsModel.prototype.save = function(profilId, data, cb) {
  var self = this;
  self.ajaxLoading = true;
  self.feedback = "";
    if(!data.tag_code){
        data.tag_code = null;
    }
  axios
    .patch("/api/profils?profil_code=eq." + profilId, {
      profil_code: data.profil_code,
      profil_shortname: data.profil_shortname,
      profil_free_comments: data.profil_free_comments,
      profil_pdf_path: data.profil_pdf_path,
      tag_code: data.tag_code
    })
    .then(function(response) {
      self.profils[profilId] = data;
      self.ajaxLoading = false;
      self.inform();
      return cb && cb(null);
    })
    .catch(function(error) {
      self.feedback =
        "Une erreur a été rencontré lors de la modification dans la base de donnée";
      self.ajaxLoading = false;
      self.inform();
      return cb && cb(error);
    });

  self.inform();
};

RefGpecProfilsModel.prototype.getlistskills = function(profil_code) {
  var self = this;
  var list = [];
  for (var key in self.listprofils_skills_levels) {
    if (self.listprofils_skills_levels[key].profil_code === profil_code) {
      list.push(self.listprofils_skills_levels[key].skill_shortname);
    }
  }
  return list;
};

export default RefGpecProfilsModel;
