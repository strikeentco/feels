'use strict';

var helpers = require('./lib/helpers');
var isNil = helpers.isNil;
var unitsFormat = helpers.unitsFormat;
var tempConvert = helpers.tempConvert;
var speedConvert = helpers.speedConvert;
var getT = helpers.getT;
var _methods = helpers.methods;

function feelsLike(opts) {
  opts || (opts = {});
  opts.units = unitsFormat(opts.units);
  return new Feels(opts);
}

module.exports = feelsLike;

function Feels(opts) {
  this.units = opts.units;
  this.temp = opts.temp;
  this.speed = opts.speed || 0;
  this.humidity = opts.humidity;
  this.dewPoint = opts.dewPoint;
  this._units = {
    temp: opts.units.temp,
    speed: opts.units.speed
  };
}

Feels.prototype.like = function (methods) {
  var temp = tempConvert(this.temp, this.units.temp, 'c');
  if ((Array.isArray(methods) || typeof methods === 'string') && methods.length) {
    if (typeof methods === 'string') {
      if (_methods[methods.toUpperCase()]) {
        return this[_methods[methods.toUpperCase()].f]();
      } else {
        throw new RangeError('Methods must be one of: HI, HI_CA, AAT, WCI');
      }
    } else {
      var like = 0;
      var count = 0;

      methods.forEach(function(n) {
        if (_methods[n.toUpperCase()]) {
          try {
            like += this[_methods[n.toUpperCase()].f]();
            count++;
          } catch (e) { }
        } else {
          throw new RangeError('Methods must be one of: HI, HI_CA, AAT, WCI');
        }
      }.bind(this));

      if (count === 0) throw new Error('No valid methods for these values');
      return like / count;
    }
  } else {
    if (temp <= 0) {
      return (this.windChill() + this.AAT()) / 2;
    } else if (temp >= 20) {
      return (this.heatIndex() + this.humidex() + this.AAT()) / 3;
    } else {
      return (this.humidex() + this.AAT()) / 2;
    }
  }
};

Feels.prototype.toCelsius = function () {
  this._units.temp = 'c';
  return this;
};

Feels.prototype.toC = Feels.prototype.toCelsius;

Feels.prototype.toFahrenheit = function () {
  this._units.temp = 'f';
  return this;
};

Feels.prototype.toF = Feels.prototype.toFahrenheit;

Feels.prototype.toKelvin = function () {
  this._units.temp = 'k';
  return this;
};

Feels.prototype.toK = Feels.prototype.toKelvin;

Feels.prototype.heatIndex = function (temp, humidity, dewPoint) { //HI
  if (
    (!isNil(temp) || !isNil(this.temp)) &&
    (!isNil(humidity) || !isNil(this.humidity) || !isNil(this.dewPoint))
  ) {
    !isNil(temp) || (temp = this.temp);
    var units = this.units || { temp: 'c' };
    var _units = this._units || { temp: 'c' };
    var _temp = tempConvert(temp, units.temp, 'f');

    if (_temp < 68) {
      throw new RangeError('Heat Index temp must be >= (20C, 68F, 293.15K)');
    }

    if (dewPoint || !isNil(this.dewPoint)) {
      !isNil(humidity) || (humidity = this.dewPoint);
      humidity = this.getRH(temp, humidity, true);
    } else {
      !isNil(humidity) || (humidity = this.humidity);
      if (humidity < 0 || humidity > 100) {
        throw new RangeError('Humidity must be in [0, 100]');
      }
    }

    var HI = 16.923 + 0.185212 * _temp + 5.37941 * humidity - 0.100254 * _temp * humidity + 9.41695 * Math.pow(10, -3) *  Math.pow(_temp, 2) + 7.28898 * Math.pow(10, -3) *
      Math.pow(humidity, 2) + 3.45372 * Math.pow(10, -4) * Math.pow(_temp, 2) * humidity - 8.14971 * Math.pow(10, -4) * _temp * Math.pow(humidity, 2) + 1.02102 * Math.pow(10, -5) *
      Math.pow(_temp, 2) * Math.pow(humidity, 2) - 3.8646 * Math.pow(10, -5) * Math.pow(_temp, 3) + 2.91583 * Math.pow(10, -5) * Math.pow(humidity, 3) + 1.42721 * Math.pow(10, -6) *
      Math.pow(_temp, 3) * humidity + 1.97483 * Math.pow(10, -7) * _temp * Math.pow(humidity, 3) - 2.18429 * Math.pow(10, -8) * Math.pow(_temp, 3) * Math.pow(humidity, 2) +
      8.43296 * Math.pow(10, -10) * Math.pow(_temp, 2) * Math.pow(humidity, 3) - 4.81975 * Math.pow(10, -11) * Math.pow(_temp, 3) * Math.pow(humidity, 3);

    return tempConvert(HI, 'f', _units.temp);
  } else {
    throw new Error('One of the required arguments are not specified');
  }
};

module.exports.heatIndex = Feels.prototype.heatIndex.bind(module.exports);

Feels.prototype.AWBGT = function (temp, humidity, dewPoint) { //AWBGT
  if (
    (!isNil(temp) || !isNil(this.temp)) &&
    (!isNil(humidity) || !isNil(this.humidity) || !isNil(this.dewPoint))
  ) {
    !isNil(temp) || (temp = this.temp);
    var units = this.units || { temp: 'c' };
    var _units = this._units || { temp: 'c' };
    var _temp = tempConvert(temp, units.temp, 'c');

    if (_temp < 15) {
      throw new RangeError('Heat Index temp must be >= (15C, 59F, 288.15K)');
    }

    if (dewPoint || !isNil(this.dewPoint)) {
      !isNil(humidity) || (humidity = this.dewPoint);
      dewPoint = true;
    } else {
      !isNil(humidity) || (humidity = this.humidity);
      if (humidity < 0 || humidity > 100) {
        throw new RangeError('Humidity must be in [0, 100]');
      }
    }

    return tempConvert(0.567 * _temp + 0.393 * ((dewPoint) ? this.getWVPbyDP(humidity) : this.getWVP(humidity, temp)) + 3.94, 'c', _units.temp);
  } else {
    throw new Error('One of the required arguments are not specified');
  }
};

module.exports.AWBGT = Feels.prototype.AWBGT.bind(module.exports);

Feels.prototype.humidex = function (temp, humidity, dewPoint) { //HI_CA
  if (
    (!isNil(temp) || !isNil(this.temp)) &&
    (!isNil(humidity) || !isNil(this.humidity) || !isNil(this.dewPoint))
  ) {
    !isNil(temp) || (temp = this.temp);
    var units = this.units || { temp: 'c' };
    var _units = this._units || { temp: 'c' };
    var _temp = tempConvert(temp, units.temp, 'c');

    if (_temp <= 0) {
      throw new RangeError('Humidex temp must be > (0C, 32F, 273.15K)');
    }

    if (dewPoint || !isNil(this.dewPoint)) {
      !isNil(humidity) || (humidity = this.dewPoint);
      dewPoint = true;
    } else {
      !isNil(humidity) || (humidity = this.humidity);
      if (humidity < 0 || humidity > 100) {
        throw new RangeError('Humidity must be in [0, 100]');
      }
    }

    return tempConvert(_temp + 0.5555 * (((dewPoint) ? this.getWVPbyDP(humidity) : this.getWVP(humidity, temp)) - 10.0), 'c', _units.temp);
  } else {
    throw new Error('One of the required arguments are not specified');
  }
};

module.exports.humidex = Feels.prototype.humidex.bind(module.exports);

Feels.prototype.AAT = function (temp, speed, humidity, dewPoint) { //AAT
  if (
    ((!isNil(temp) && !isNil(speed)) || (!isNil(this.temp) && !isNil(this.speed))) &&
    (!isNil(humidity) || !isNil(this.humidity) || !isNil(this.dewPoint))
  ) {
    var units = this.units || { temp: 'c', speed: 'mps' };
    var _units = this._units || { temp: 'c' };

    if (isNil(temp) && isNil(speed)) {
      temp = this.temp;
      speed = this.speed;
    }

    var _temp = tempConvert(temp, units.temp, 'c');
    speed = speedConvert(speed, units.speed, 'mps');

    if (speed < 0) {
      throw new RangeError('Wind speed must be >= 0');
    }

    if (dewPoint || !isNil(this.dewPoint)) {
      !isNil(humidity) || (humidity = this.dewPoint);
      dewPoint = true;
    } else {
      !isNil(humidity) || (humidity = this.humidity);
      if (humidity < 0 || humidity > 100) {
        throw new RangeError('Humidity must be in [0, 100]');
      }
    }

    return tempConvert(_temp + 0.33 * ((dewPoint) ? this.getWVPbyDP(humidity) : this.getWVP(humidity, temp)) - 0.70 * speed - 4.00, 'c', _units.temp);
  } else {
    throw new Error('One of the required arguments are not specified');
  }
};

module.exports.AAT = Feels.prototype.AAT.bind(module.exports);

Feels.prototype.windChill = function (temp, speed) { //WCI
  if ((!isNil(temp) && !isNil(speed)) || (!isNil(this.temp) && !isNil(this.speed))) {
    var units = this.units || { temp: 'c', speed: 'mps' };
    var _units = this._units || { temp: 'c' };
    if (isNil(temp) && isNil(speed)) {
      temp = this.temp;
      speed = this.speed;
    }

    var _temp = tempConvert(temp, units.temp, 'c');

    if (_temp > 0) {
      throw new RangeError('Wind Chill temp must be <= (0C, 32F, 273.15K)');
    } else if (speed < 0) {
      throw new RangeError('Wind speed must be >= 0');
    }

    speed = speedConvert(speed, units.speed, 'kph');
    if (speed >= 5) {
      return tempConvert(13.12 + 0.6215 * _temp - 11.37 * Math.pow(speed, 0.16) + 0.3965 * _temp * Math.pow(speed, 0.16), 'c', _units.temp);
    } else {
      return tempConvert(_temp + ((-1.59 + 0.1345 * _temp) / 5) * speed, 'c', _units.temp);
    }
  } else {
    throw new Error('One of the required arguments are not specified');
  }
};

module.exports.windChill = Feels.prototype.windChill.bind(module.exports);

Feels.prototype.getWaterVapourPressure = function (humidity, temp) {
  if ((!isNil(humidity) && !isNil(temp)) || (!isNil(this.humidity) && !isNil(this.temp))) {
    var units = this.units || { temp: 'c' };
    if (isNil(temp) && isNil(humidity)) {
      temp = this.temp;
      humidity = this.humidity;
    }

    var _temp = tempConvert(temp, units.temp, 'c');

    return (humidity < 0 || humidity > 100) ? 0 : (humidity / 100) * 6.105 * Math.exp((17.27 * _temp) / (237.7 + _temp));
  } else {
    throw new Error('One of the required arguments are not specified');
  }
};

Feels.prototype.getWVP = Feels.prototype.getWaterVapourPressure;
module.exports.getWVP = Feels.prototype.getWVP.bind(module.exports);

Feels.prototype.getWaterVapourPressureByDewPoint = function (dewPoint) {
  if (!isNil(dewPoint) || !isNil(this.dewPoint)) {
    !isNil(dewPoint) || (dewPoint = this.dewPoint);

    return 6.11 * Math.exp(5417.7530 * (1 / 273.16 - 1 / (tempConvert(dewPoint, (this.units) ? this.units.temp : 'c', 'c') + 273.15)));
  } else {
    throw new Error('Dew point is not specified');
  }
};

Feels.prototype.getWVPbyDP = Feels.prototype.getWaterVapourPressureByDewPoint;
module.exports.getWVPbyDP = Feels.prototype.getWVPbyDP.bind(module.exports);

Feels.prototype.getAproximateRelativeHumidity = function (temp, dewPoint) {
  if ((!isNil(temp) && !isNil(dewPoint)) || (!isNil(this.temp) && !isNil(this.dewPoint))) {
    var units = this.units || { temp: 'c' };
    if (isNil(temp) && isNil(dewPoint)) {
      temp = this.temp;
      dewPoint = this.dewPoint;
    }

    return 100 - 5 * (tempConvert(temp, units.temp, 'c') - tempConvert(dewPoint, units.temp, 'c'));
  } else {
    throw new Error('One of the required arguments are not specified');
  }
};

Feels.prototype.getARH = Feels.prototype.getAproximateRelativeHumidity;
module.exports.getARH = Feels.prototype.getARH.bind(module.exports);

Feels.prototype.getRelativeHumidity = function (temp, WVP, dewPoint) {
  if (this.humidity) {
    return this.humidity;
  } else if ((!isNil(temp) || !isNil(this.temp)) && (!isNil(WVP) || !isNil(this.dewPoint))) {
    var units = this.units || { temp: 'c' };
    !isNil(temp) || (temp = this.temp);
    var _temp = tempConvert(temp, units.temp, 'c');

    if (dewPoint || !isNil(this.dewPoint)) {
      !isNil(WVP) || (WVP = this.dewPoint);
      dewPoint = true;
    } else if (typeof WVP !== 'number') {
      throw new TypeError('WVP must be a number');
    }

    return (((dewPoint) ? this.getWVPbyDP(WVP) : WVP) / (6.105 * Math.exp((17.27 * _temp) / (237.7 + _temp)))) * 100;
  } else {
    throw new Error('One of the required arguments are not specified');
  }
};

Feels.prototype.getRH = Feels.prototype.getRelativeHumidity;
module.exports.getRH = Feels.prototype.getRH.bind(module.exports);

Feels.prototype.getAproximateDewPoint = function (temp, humidity) {
  if ((!isNil(temp) && !isNil(humidity)) || (!isNil(this.temp) && !isNil(this.humidity))) {
    var units = this.units || { temp: 'c' };
    if (isNil(temp) && isNil(humidity)) {
      temp = this.temp;
      humidity = this.humidity;
    }

    return (humidity >= 100 || humidity < 0) ? tempConvert(temp, units.temp, 'c') : tempConvert(temp, units.temp, 'c') - ((100 - humidity) / 5);
  } else {
    throw new Error('One of the required arguments are not specified');
  }
};

Feels.prototype.getADP = Feels.prototype.getAproximateDewPoint;
module.exports.getADP = Feels.prototype.getADP.bind(module.exports);

Feels.prototype.getDewPoint = function (temp, humidity) { //dew point for [-40, 50], humidity must be in (0, 100]
  if (this.dewPoint) {
    return this.dewPoint;
  } else if ((!isNil(temp) && !isNil(humidity)) || (!isNil(this.temp) && !isNil(this.humidity))) {
    var units = this.units || { temp: 'c' };
    var _units = this._units || { temp: 'c' };
    if (isNil(temp) && isNil(humidity)) {
      temp = this.temp;
      humidity = this.humidity;
    }

    var _temp = tempConvert(temp, units.temp, 'c');

    if (_temp < -40 || _temp > 50) {
      throw new RangeError('Dew point temp must be in [-40, 50]');
    } else if (humidity <= 0 || humidity > 100) {
      throw new RangeError('Humidity must be in (0, 100]');
    }

    var b = 18.729;
    var c = 257.87;
    var d = 273.3;
    return tempConvert(getT(_temp, humidity, b, c, d), 'c', _units.temp);
  } else {
    throw new Error('One of the required arguments are not specified');
  }
};

Feels.prototype.getDP = Feels.prototype.getDewPoint;
module.exports.getDP = Feels.prototype.getDP.bind(module.exports);

Feels.prototype.getFrostPoint = function (temp, humidity) { //frost point for [-80, 0], humidity must be in (0, 100]
  if ((!isNil(temp) && !isNil(humidity)) || (!isNil(this.temp) && !isNil(this.humidity))) {
    var units = this.units || { temp: 'c' };
    var _units = this._units || { temp: 'c' };
    if (isNil(temp) && isNil(humidity)) {
      temp = this.temp;
      humidity = this.humidity;
    }

    var _temp = tempConvert(temp, units.temp, 'c');

    if (_temp < -80 || _temp > 0) {
      throw new RangeError('Frost point temp must be in [-80, 0]');
    } else if (humidity <= 0 || humidity > 100) {
      throw new RangeError('Humidity must be in (0, 100]');
    }

    var b = 23.036;
    var c = 279.82;
    var d = 333.7;
    return tempConvert(getT(_temp, humidity, b, c, d), 'c', _units.temp);
  } else {
    throw new Error('One of the required arguments are not specified');
  }
};

Feels.prototype.getFP = Feels.prototype.getFrostPoint;
module.exports.getFP = Feels.prototype.getFP.bind(module.exports);
