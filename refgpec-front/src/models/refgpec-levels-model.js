import axios from 'axios';
var RefGpecLevelsModel = function (options) {
    const self = this;
    self.levels = {};
    self.initializing = true;
    self.ajaxLoading = false;
    self.onChanges = [];
    self.feedback = '';
    self.test = {};

    axios.get('/api/levels')
        .then(response => {

            self.levels = {};
            response.data.forEach(item => {
                self.levels[item.level_code] = item;
            })

            self.initializing = false;
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
            self.feedback='';
            self.levels[level_code] = {level_code,level_number,level_shortname, level_free_comments };
        })
        .catch(function (error) {
            self.feedback='Une erreur a été rencontrée lors de l\'ajout dans la base de donnée';
        });
  self.inform();

  setTimeout(function () { // simulate AJAX request
    self.ajaxLoading = false;
    self.inform();
    return cb && cb(null);
  }, 1000);
};

RefGpecLevelsModel.prototype.destroy = function (levelId, cb) {
  var self = this;
  self.ajaxLoading = true;

  axios.delete('/api/levels?level_code=eq.'+levelId)
      .then(function (response) {
          self.feedback='';
          delete self.levels[levelId];
      })
      .catch(function (error) {
          self.feedback='Une erreur a été rencontré lors de la suppression dans la base de donnée';
        });

  self.inform();
  setTimeout(function () { // simulate AJAX request
    self.ajaxLoading = false;
    self.inform();
    return cb && cb(null);
  }, 1000);
};

RefGpecLevelsModel.prototype.save = function (levelId, data, cb) {
  var self = this;
  self.ajaxLoading = true;
    axios.patch('/api/levels?level_code=eq.'+levelId,{
        level_code: data.levelId,
        level_number:data.levelNumber,
        level_shortname: data.levelShortName,
        level_free_comments : data.levelFreeComments,

    })  .then(function (response) {
        self.feedback='';
        self.levels[levelId] = data;
    })
        .catch(function (error) {
            self.feedback='Une erreur a été rencontré lors de la modification dans la base de donnée';
        });


  self.inform();
  setTimeout(function () { // simulate AJAX request
        self.ajaxLoading = false;
        self.inform();
        return cb && cb(null);
    }, 1000);
};

export default RefGpecLevelsModel;