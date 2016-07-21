'use strict';

module.exports.isNil = function (variable) {
  return variable == null;
};

var isFinite = Number.isFinite;
module.exports.isFinite = isFinite;

module.exports.unitsFormat = function (_units) {
  var units = {
    temp: 'c',
    speed: 'mps'
  };

  if (_units) {
    if (_units.temp) {
      var temp = _units.temp.toLowerCase();
      if (temp === 'f' || temp === 'fahrenheit') {
        units.temp = 'f';
      } else if (temp === 'k' || temp === 'kelvin') {
        units.temp = 'k';
      } else {
        units.temp = 'c';
      }
    }

    if (_units.speed) {
      var speed = _units.speed.toLowerCase();
      if (speed === 'mph' || speed === 'mi/h') {
        units.speed = 'mph';
      } else if (speed === 'kmh' || speed === 'kph' || speed === 'kmph' || speed === 'km/h') {
        units.speed = 'kph';
      } else {
        units.speed = 'mps';
      }
    }
  }

  return units;
};

module.exports.tempConvert = function (temp, from, to) {
  if (!isFinite(temp)) {
    throw new TypeError('Temp must be specified and must be a number');
  } else if (from === to) {
    return temp;
  } else if (['c', 'f', 'k'].indexOf(to) === -1) {
    throw new RangeError('Units must be c, f or k');
  } else if (from === 'c') {
    return (to === 'f') ? (temp * 1000 * (9 / 5) + 32 * 1000) / 1000 : (temp * 1000 + 273.15 * 1000) / 1000;
  } else if (from === 'f') {
    return (to === 'c') ? ((temp - 32) * 1000 * (5 / 9)) / 1000 : ((temp + 459.67) * 1000 * (5 / 9)) / 1000;
  } else if (from === 'k') {
    return (to === 'c') ? (temp * 1000 - 273.15 * 1000) / 1000 : (temp * 1000 * (9 / 5) - 459.67 * 1000) / 1000;
  } else {
    throw new RangeError('Units must be c, f or k');
  }
};

module.exports.speedConvert = function (speed, from, to) {
  if (!isFinite(speed)) {
    throw new TypeError('Speed must be a number');
  } else if (from === to) {
    return speed;
  } else if (['mps', 'mph', 'kph'].indexOf(to) === -1) {
    throw new RangeError('Units must be mps, mph or kph');
  } else if (from === 'mps') {
    return (to === 'mph') ? speed / 0.44704 : speed * 3.6;
  } else if (from === 'mph') {
    return (to === 'mps') ? speed * 0.44704 : speed * 1.609344;
  } else if (from === 'kph') {
    return (to === 'mps') ? speed / 3.6 : speed / 1.609344;
  } else {
    throw new RangeError('Units must be mps, mph or kph');
  }
};

function getG(temp, humidity, b, c, d) {
  return Math.log(humidity / 100 * Math.exp((b - temp / d) * (temp / (c + temp))));
};

module.exports.getG = getG;

module.exports.getT = function (temp, humidity, b, c, d) {
  return (c * getG(temp, humidity, b, c, d)) / (b - getG(temp, humidity, b, c, d));
};

module.exports.methods = {
  HI: {
    f: 'heatIndex',
    h: 1
  },
  AWBGT: {
    f: 'AWBGT',
    h: 1
  },
  HI_CA: {
    f: 'humidex',
    h: 1
  },
  AAT: {
    f: 'AAT',
    h: -1
  },
  WCI: {
    f: 'windChill',
    h: 0
  }
};
