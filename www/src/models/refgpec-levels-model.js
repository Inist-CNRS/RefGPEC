var RefGpecLevelsModel = function () {
  // fake data for debug
  this.levels = {
    "m-1": {
      shortName: "Notions",
      freeComment: "Connaissances élémentaires et/ou incomplètes"
    },
    "m-2": {
      shortName: "Application",
      freeComment: "Capacité à mettre en œuvre et/ou en pratique, une compétence, un savoir, une technique"
    },
    "m-3": {
      shortName: "Maîtrise",
      freeComment: "Capacité d'user à son gré d'une compétence, d'un savoir, d'une technique"
    },
    "m-4": {
      shortName: "Expertise",
      freeComment: "Fait d'avoir acquis une très grande maîtrise grâce à une longue expérience et d'être reconnu par ses pairs et sollicité"
    },
  };
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

RefGpecLevelsModel.prototype.addLevel = function (shortName, freeComment) {
  var codes    = Object.keys(this.levels);
  var lastCode = codes[codes.length - 1];
  var newCode  = 'm-' + (parseInt(lastCode.split('-')[1], 10) + 1);
  this.levels[newCode] = { shortName, freeComment };

  this.inform();
};

RefGpecLevelsModel.prototype.destroy = function (levelId) {
  delete this.levels[levelId];

  this.inform();
};

RefGpecLevelsModel.prototype.save = function (levelId, level) {
  console.log('SAVED!', this.levels, levelId, level);
  this.levels[levelId] = level;
  this.inform();
};

module.exports = RefGpecLevelsModel;