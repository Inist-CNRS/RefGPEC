import axios from "axios";
import words from "talisman/tokenizers/words";
import unine from "talisman/stemmers/french/unine";
import stopwords from "stopwords-fr";
let RefGpecProfilsModel = function(options) {
  const self = this;

  self.profils = {};
  self.initializing = true;
  self.ajaxLoading = false;
  self.onChanges = [];
  self.feedback = {
    code: "",
    message: ""
  };
  self.profilCSV = [];
  self.graph = [];
  self.listFamillys = {};
  self.listprofils_skills_levels = {};
  self.lastProfilAdd = [];
  let erreur = 3;
  axios
    .get("/api/list_profils_attached_skills")
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
      console.log("RefGpecProfilModelError error loading data", err);
      erreur += 1;
    });

  axios
    .get("/api/view_profils_nb_skills")
    .then(response => {
      self.profils = {};
      response.data.forEach(item => {
        self.profils[item.profil_code] = item;
        //add a column to search by ignoring accents and tokenization
        let wordsList = self.profils[item.profil_code].profil_shortname;
        wordsList = words(wordsList.toLowerCase());
        wordsList = wordsList.filter(function(word) {
          return stopwords.indexOf(word) === -1;
        });
        wordsList = wordsList.map(unine.complex);
        self.profils[item.profil_code].tokens = wordsList;
      });
      erreur -= 1;
      self.initializing = erreur !== 0;
      self.inform();
    })
    .catch(err => {
      console.log("RefGpecProfilModelError loading data", err);
      erreur += 1;
    });

  axios
    .get("/api/count_profil_famille")
    .then(response => {
      response.data.forEach(item => {
        self.graph.push(item);
      });
      self.inform();
    })
    .catch(err => {
      console.log("RefGpecProfilModelError error loading data", err);
      self.inform();
    });

  axios
    .get("/api/list_profils_attached_familys")
    .then(response => {
      self.listFamillys = {};
      let i = 0;
      response.data.forEach(item => {
        self.listFamillys[i] = item;
        i++;
      });
      erreur -= 1;
      self.initializing = erreur !== 0;
      self.inform();
    })
    .catch(err => {
      console.log("RefGpecProfilModelError error loading data", err);
      erreur += 1;
    });

  self.getProfilsCSV();
  self.initializing = erreur !== 0;
  self.inform();
};

RefGpecProfilsModel.prototype.getProfilsFamilys = function() {
  let self = this;
  self.listFamillys = {};
  axios
    .get("/api/list_profils_attached_familys")
    .then(response => {
      self.listFamillys = {};
      let i = 0;
      response.data.forEach(item => {
        self.listFamillys[i] = item;
        i++;
      });
      self.inform();
    })
    .catch(err => {
      console.log("RefGpecProfilModelError error loading data", err);
    });
};

RefGpecProfilsModel.prototype.updateVue = function() {
  let self = this;
  self.listprofils_skills_levels = {};
  axios
    .get("/api/list_profils_attached_skills")
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
      console.log("RefGpecProfilModelError error loading data", err);
    });

  axios
    .get("/api/view_profils_nb_skills")
    .then(response => {
      response.data.forEach(item => {
        self.profils[item.profil_code] = item;
        //add a column to search by ignoring accents and tokenization
        let wordsList = self.profils[item.profil_code].profil_shortname;
        wordsList = words(wordsList.toLowerCase());
        wordsList = wordsList.filter(function(word) {
          return stopwords.indexOf(word) === -1;
        });
        wordsList = wordsList.map(unine.complex);
        self.profils[item.profil_code].tokens = wordsList;
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

RefGpecProfilsModel.prototype.getmax = function(codes) {
  let max = 2;
  codes.forEach(function(key, i) {
    let number = parseInt(codes[i].split("-")[1], 10);

    if (max < number) {
      max = number;
    }
  });
  return max;
};
RefGpecProfilsModel.prototype.addProfil = function(
  profil_shortname,
  profil_free_comments,
  profil_pdf_path,
  cb
) {
  let self = this;
  self.ajaxLoading = true;
  self.feedback = "";
  //get the profils from database to be sure to get the last code
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
    });

  // filter other skills family to have a correct numeric id
  let codes = Object.keys(self.profils).filter(function(elt) {
    return elt.indexOf("p-") === 0;
  });
  let profil_code = "p-1";
  // add +1 to the id if more than one profil in this tag
  codes.sort();
  if (codes.length > 0) {
    let lastCodeSplitted = self.getmax(codes);
    profil_code = "p-" + (lastCodeSplitted + 1);
  }

  profil_shortname = profil_shortname.trim();
  axios
    .post("/api/profils", {
      profil_code: profil_code,
      profil_shortname: profil_shortname,
      profil_free_comments: profil_free_comments,
      profil_pdf_path: profil_pdf_path
    })
    .then(function(response) {
      self.ajaxLoading = false;
      let nomchamp = [];
      for (let key in self.profils) {
        let i = 0;
        for (let key2 in self.profils[key]) {
          i += 1;
          if (i > 4) {
            nomchamp.push(key2);
          }
        }
        break;
      }
      self.profils[profil_code] = {
        profil_code,
        profil_shortname,
        profil_pdf_path,
        profil_free_comments
      };
      //add column to search by ignoring accents and tokenization
      let wordsList = profil_shortname;
      wordsList = words(wordsList.toLowerCase());
      wordsList = wordsList.filter(function(word) {
        return stopwords.indexOf(word) === -1;
      });
      wordsList = wordsList.map(unine.complex);
      self.profils[profil_code].tokens = wordsList;
      for (let k = 0; k < nomchamp.length; k++) {
        self.profils[profil_code][nomchamp[k]] = 0;
      }
      self.getProfilsCSV();
      self.lastProfilAdd.push(profil_code);
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

RefGpecProfilsModel.prototype.destroy = function(profilId, cb) {
  let self = this;
  self.ajaxLoading = true;
  self.feedback = "";
  axios
    .delete("/api/profils_skills_levels?profil_code=eq." + profilId)
    .then(function(response) {
      for (let key in self.listprofils_skills_levels) {
        if (self.listprofils_skills_levels[key].profil_code === profilId) {
          delete self.listprofils_skills_levels[key];
          self.inform();
        }
      }
      axios
        .delete("/api/profils?profil_code=eq." + profilId)
        .then(function(response) {
          delete self.profils[profilId];
          self.ajaxLoading = false;
          self.getProfilsCSV();
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
    .catch(function(error) {
      self.feedback.code = error.response.status;
      self.feedback.message = error.response.data.message;
      self.ajaxLoading = false;
      self.inform();
      return cb && cb(error);
    });

  self.inform();
};

RefGpecProfilsModel.prototype.save = function(profilId, data, cb) {
  let self = this;
  self.ajaxLoading = true;
  self.feedback = "";
  data.profil_shortname = data.profil_shortname.trim();
  axios
    .patch("/api/profils?profil_code=eq." + profilId, {
      profil_code: data.profil_code,
      profil_shortname: data.profil_shortname,
      profil_free_comments: data.profil_free_comments,
      profil_pdf_path: data.profil_pdf_path
    })
    .then(function(response) {
      self.profils[profilId] = data;
      //update the column to search by ignoring accents and tokenization
      let wordsList = self.profils[profilId].profil_shortname;
      wordsList = words(wordsList.toLowerCase());
      wordsList = wordsList.filter(function(word) {
        return stopwords.indexOf(word) === -1;
      });
      wordsList = wordsList.map(unine.complex);
      self.profils[profilId].tokens = wordsList;
      self.ajaxLoading = false;
      self.getProfilsCSV();
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

RefGpecProfilsModel.prototype.getlistskills = function(profil_code) {
  let self = this;
  let list = [];
  for (let key in self.listprofils_skills_levels) {
    if (self.listprofils_skills_levels[key].profil_code === profil_code) {
      list.push(self.listprofils_skills_levels[key].skill_shortname);
    }
  }
  return list;
};

RefGpecProfilsModel.prototype.getProfilsCSV = function() {
  let self = this;
  self.profilCSV = [];
  axios
    .get("/api/view_exportcsv_profils")
    .then(response => {
      response.data.forEach(item => {
        self.profilCSV.push(item);
      });
      self.inform();
    })
    .catch(err => {
      console.log("RefGpecProfilModelError error loading data", err);
      self.inform();
    });
};

RefGpecProfilsModel.prototype.getProfilsGraph = function(
  profil_code,
  family_code
) {
  let self = this;
  self.graph = [];
  // pas de profil et pas de famille
  if (!profil_code && (!family_code || family_code === "Aucune")) {
    axios
      .get("/api/count_profil_famille")
      .then(response => {
        response.data.forEach(item => {
          self.graph.push(item);
        });
        self.inform();
      })
      .catch(err => {
        console.log("RefGpecProfilModelError error loading data", err);
        self.inform();
      });
  } else {
    // profil et famille
    if (profil_code && family_code && family_code !== "Aucune") {
      axios
        .get(
          "/api/list_skills_profils_familys_levels?profil_code=eq." +
            profil_code +
            "&family_id=eq." +
            family_code
        )
        .then(response => {
          response.data.forEach(item => {
            self.graph.push(item);
          });
          self.inform();
        })
        .catch(err => {
          console.log("RefGpecProfilModelError error loading data", err);
          self.inform();
        });
    } else {
      //profil mais pas de famille
      if (profil_code && (!family_code || family_code === "Aucune")) {
        axios
          .get("/api/comparatif_profil_famille?profil_code=eq." + profil_code)
          .then(response => {
            response.data.forEach(item => {
              self.graph.push(item);
            });
            self.inform();
          })
          .catch(err => {
            console.log("RefGpecProfilModelError error loading data", err);
            self.inform();
          });
      } else {
        //famille mais pas de profil
        axios
          .get("/api/comparatif_profil_famille?family_id=eq." + family_code)
          .then(response => {
            response.data.forEach(item => {
              self.graph.push(item);
            });
            self.inform();
          })
          .catch(err => {
            console.log("RefGpecProfilModelError error loading data", err);
            self.inform();
          });
      }
    }
  }
};

export default RefGpecProfilsModel;
