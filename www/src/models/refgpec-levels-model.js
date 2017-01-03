var RefGpecLevelsModel = function () {
  // fake data for debug
  this.levels = {
    m4: {
      shortName: "Expertise",
      freeComment: "Fait d'avoir acquis une très grande maîtrise grâce à une longue expérience et d'être reconnu par ses pairs et sollicité"
    },
    m3: {
      shortName: "Maîtrise",
      freeComment: "Capacité d'user à son gré d'une compétence, d'un savoir, d'une technique"
    },
    m2: {
      shortName: "Application",
      freeComment: "Capacité à mettre en œuvre et/ou en pratique, une compétence, un savoir, une technique"
    },
    m1: {
      shortName: "Notions",
      freeComment: "Connaissances élémentaires et/ou incomplètes"
    }
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

RefGpecLevelsModel.prototype.addLevel = function (levelId, level) {
  this.levels[levelId] = level;

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