import axios from 'axios';
var RefGpecLevelsModel = function (options) {
    const self = this;
    self.levels = {};
    self.initializing = true;
    self.ajaxLoading = false;
    self.onChanges = [];
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
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
  self.levels[level_code] = {level_code,level_number,level_shortname, level_free_comments };
  self.inform();

  setTimeout(function () { // simulate AJAX request
    self.ajaxLoading = false;
    self.inform();
    return cb && cb(null);
  }, 14000);
};

RefGpecLevelsModel.prototype.destroy = function (levelId, cb) {
  var self = this;
  self.ajaxLoading = true;

  delete self.levels[levelId];
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
console.log(data);
    axios.patch('/api/levels?level_code=eq.'+levelId,{
        level_code: data.levelId,
        level_number:data.levelNumber,
        level_shortname: data.levelShortName,
        level_free_comments : data.levelFreeComments,

    }) .then(function (response) {
        console.log(response);
    })
        .catch(function (error) {
            console.log(error);
        });

  self.levels[levelId] = data;
  self.inform();

  setTimeout(function () { // simulate AJAX request
    self.ajaxLoading = false;
    self.inform();
    return cb && cb(null);
  }, 1000);
};

export default RefGpecLevelsModel;