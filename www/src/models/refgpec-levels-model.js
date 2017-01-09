var RefGpecLevelsModel = function () {
  // fake data for debug
  this.levels = {
    "m-1": {
      levelShortName: "Notions",
      levelFreeComments: "Connaissances élémentaires et/ou incomplètes"
    },
    "m-2": {
      levelShortName: "Application",
      levelFreeComments: "Capacité à mettre en œuvre et/ou en pratique, une compétence, un savoir, une technique"
    },
    "m-3": {
      levelShortName: "Maîtrise",
      levelFreeComments: "Capacité d'user à son gré d'une compétence, d'un savoir, d'une technique"
    },
    "m-4": {
      levelShortName: "Expertise",
      levelFreeComments: "Fait d'avoir acquis une très grande maîtrise grâce à une longue expérience et d'être reconnu par ses pairs et sollicité"
    },
  };
  this.ajaxLoading = false;
  this.onChanges = [];
};

RefGpecLevelsModel.prototype.subscribe = function (onChange) {
  this.onChanges.push(onChange);
};

RefGpecLevelsModel.prototype.inform = function () {
  this.onChanges.forEach(function (cb) { cb(); });
};

RefGpecLevelsModel.prototype.doesLevelExists = function (levelId) {
  return this.levels[levelId] ? true : false;
};

RefGpecLevelsModel.prototype.addLevel = function (levelShortName, levelFreeComments, cb) {
  var self = this;
  self.ajaxLoading = true;

  var codes    = Object.keys(self.levels);
  var lastCode = codes[codes.length - 1];
  var newCode  = 'm-' + (parseInt(lastCode.split('-')[1], 10) + 1);
  self.levels[newCode] = { levelShortName, levelFreeComments };
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

RefGpecLevelsModel.prototype.save = function (levelId, level, cb) {
  var self = this;
  self.ajaxLoading = true;

  self.levels[levelId] = level;
  self.inform();

  setTimeout(function () { // simulate AJAX request
    self.ajaxLoading = false;
    self.inform();
    return cb && cb(null);
  }, 1000);  
};

module.exports = RefGpecLevelsModel;