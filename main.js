'use strict';

const h = require('./lib/helpers');

const isCorrect = h.isCorrect;
const unitsFormat = h.unitsFormat;

const BaseFeels = require('./lib/base');

function apparentTemp(tempConvert, func) {
  if (isCorrect(this.temp) && (isCorrect(this.humidity) || isCorrect(this.dewPoint))) {
    const units = this.units.temp;
    const u = this._units.temp;
    const temp = tempConvert(this.temp, units, 'c');

    const index = (isCorrect(this.dewPoint) && !isCorrect(this.humidity)) ?
      func(temp, tempConvert(this.dewPoint, units, 'c'), true) :
      func(temp, this.humidity);

    return tempConvert(index, 'c', u);
  }
  throw new Error('One of the required arguments are not specified');
}

class Feels extends BaseFeels {
  constructor(opts) {
    super();
    this.setOptions(opts);
    this._methods = {
      HI: 'heatIndex',
      AWBGT: 'AWBGT',
      HI_CA: 'humidex',
      AAT: 'AAT',
      WCI: 'windChill'
    };
  }

  setOptions(opts) {
    opts = opts || {};
    this.units = unitsFormat(opts.units);
    this.temp = opts.temp;
    this.speed = opts.speed || 0;
    this.humidity = opts.humidity;
    this.dewPoint = opts.dewPoint;
    this.wvp = opts.wvp;
    this._units = {
      temp: this.units.temp,
      speed: this.units.speed
    };
    return this;
  }

  registerMethod(method) {
    if (this[method]) {
      this._methods[method.toUpperCase()] = method;
      return this;
    }
    throw new Error(`${method} doesn't exists`);
  }

  registerMethods(methods) {
    if (Array.isArray(methods)) {
      for (const method of methods) {
        this.registerMethod(method);
      }
      return this;
    }
    throw new TypeError('Methods must be an array');
  }

  addMethod(method, func) {
    if (typeof func === 'function') {
      this[method] = func.bind(this);
      this.registerMethod(method);
      return this;
    }
    throw new TypeError(`${method} must be a function`);
  }

  toCelsius() {
    this._units.temp = 'c';
    return this;
  }

  toFahrenheit() {
    this._units.temp = 'f';
    return this;
  }

  toKelvin() {
    this._units.temp = 'k';
    return this;
  }

  like(methods) {
    if (methods) {
      let count = methods.length;
      if (typeof methods === 'string') {
        const method = this._methods[methods.toUpperCase()];
        if (method) {
          return this[method]();
        }
        throw new RangeError(`Methods must be one of: ${Object.keys(this._methods).join(', ')}`);
      } else if (Array.isArray(methods)) {
        let like = 0;
        for (const m of methods) {
          const method = this._methods[m.toUpperCase()];
          if (method) {
            try {
              like += this[method]();
            } catch (e) {
              count--;
            }
          } else {
            // eslint-disable-next-line max-len
            throw new RangeError(`Methods must be one of: ${Object.keys(this._methods).join(', ')}`);
          }
        }

        if (!count) {
          throw new Error('No valid methods for these values');
        }
        return like / count;
      }
    }
    return this.like(['HI', 'HI_CA', 'AAT', 'WCI']);
  }

  heatIndex() { // HI
    return apparentTemp.call(this, Feels.tempConvert, Feels.heatIndex);
  }

  AWBGT() { // AWBGT
    return apparentTemp.call(this, Feels.tempConvert, Feels.AWBGT);
  }

  humidex() { // HI_CA
    return apparentTemp.call(this, Feels.tempConvert, Feels.humidex);
  }

  AAT() { // AAT
    if (
      isCorrect(this.temp) && isCorrect(this.speed) &&
      (isCorrect(this.humidity) || isCorrect(this.dewPoint))
    ) {
      const units = this.units;
      const u = this._units.temp;
      const temp = Feels.tempConvert(this.temp, units.temp, 'c');
      const speed = Feels.speedConvert(this.speed, units.speed, 'mps');

      const index = (isCorrect(this.dewPoint) && !isCorrect(this.humidity)) ?
        Feels.AAT(temp, speed, Feels.tempConvert(this.dewPoint, units.temp, 'c'), true) :
        Feels.AAT(temp, speed, this.humidity);

      return Feels.tempConvert(index, 'c', u);
    }
    throw new Error('One of the required arguments are not specified');
  }

  windChill() { // WCI
    if (isCorrect(this.temp) && isCorrect(this.speed)) {
      const units = this.units;
      const u = this._units.temp;
      const temp = Feels.tempConvert(this.temp, units.temp, 'c');
      const speed = Feels.speedConvert(this.speed, units.speed, 'mps');

      return Feels.tempConvert(Feels.windChill(temp, speed), 'c', u);
    }
    throw new Error('One of the required arguments are not specified');
  }

  getWaterVapourPressure() {
    if (isCorrect(this.wvp)) {
      return this.wvp;
    } else if (isCorrect(this.humidity) && isCorrect(this.temp)) {
      const units = this.units.temp;
      const temp = Feels.tempConvert(this.temp, units, 'c');

      return Feels.getWVP(temp, this.humidity);
    }
    throw new Error('One of the required arguments are not specified');
  }

  getWaterVapourPressureByDewPoint() {
    if (isCorrect(this.wvp)) {
      return this.wvp;
    } else if (isCorrect(this.dewPoint)) {
      const units = this.units.temp;
      const dewPoint = Feels.tempConvert(this.dewPoint, units, 'c');

      return Feels.getWVPbyDP(dewPoint);
    }
    throw new Error('Dew point is not specified');
  }

  getAproximateRelativeHumidity() {
    if (isCorrect(this.humidity)) {
      return this.humidity;
    } else if (isCorrect(this.temp) && isCorrect(this.dewPoint)) {
      const units = this.units.temp;
      const temp = Feels.tempConvert(this.temp, units, 'c');
      const dewPoint = Feels.tempConvert(this.dewPoint, units, 'c');

      return Feels.getARH(temp, dewPoint);
    }
    throw new Error('One of the required arguments are not specified');
  }

  getRelativeHumidity() {
    if (isCorrect(this.humidity)) {
      return this.humidity;
    } else if (isCorrect(this.temp) && (isCorrect(this.wvp) || isCorrect(this.dewPoint))) {
      const units = this.units.temp;
      const temp = Feels.tempConvert(this.temp, units, 'c');

      return (isCorrect(this.dewPoint) && !isCorrect(this.wvp)) ?
        Feels.getRH(temp, Feels.tempConvert(this.dewPoint, units, 'c'), true) :
        Feels.getRH(temp, this.wvp);
    }
    throw new Error('One of the required arguments are not specified');
  }

  getAproximateDewPoint() {
    if (isCorrect(this.dewPoint)) {
      return this.dewPoint;
    } else if (isCorrect(this.temp) && isCorrect(this.humidity)) {
      const units = this.units.temp;
      const u = this._units.temp;
      const temp = Feels.tempConvert(this.temp, units, 'c');

      return Feels.tempConvert(Feels.getADP(temp, this.humidity), 'c', u);
    }
    throw new Error('One of the required arguments are not specified');
  }

  getDewPoint() { // dew point for [-40, 50], humidity must be in (0, 100]
    if (isCorrect(this.dewPoint)) {
      return this.dewPoint;
    } else if (isCorrect(this.temp) && isCorrect(this.humidity)) {
      const units = this.units.temp;
      const u = this._units.temp;
      const temp = Feels.tempConvert(this.temp, units, 'c');

      return Feels.tempConvert(Feels.getDP(temp, this.humidity), 'c', u);
    }
    throw new Error('One of the required arguments are not specified');
  }

  getFrostPoint() { // frost point for [-80, 0], humidity must be in (0, 100]
    if (isCorrect(this.temp) && isCorrect(this.humidity)) {
      const units = this.units.temp;
      const u = this._units.temp;
      const temp = Feels.tempConvert(this.temp, units, 'c');

      return Feels.tempConvert(Feels.getFP(temp, this.humidity), 'c', u);
    }
    throw new Error('One of the required arguments are not specified');
  }
}

Feels.prototype.toC = Feels.prototype.toCelsius;
Feels.prototype.toF = Feels.prototype.toFahrenheit;
Feels.prototype.toK = Feels.prototype.toKelvin;

Feels.prototype.getWVP = Feels.prototype.getWaterVapourPressure;
Feels.prototype.getWVPbyDP = Feels.prototype.getWaterVapourPressureByDewPoint;
Feels.prototype.getARH = Feels.prototype.getAproximateRelativeHumidity;
Feels.prototype.getRH = Feels.prototype.getRelativeHumidity;
Feels.prototype.getADP = Feels.prototype.getAproximateDewPoint;
Feels.prototype.getDP = Feels.prototype.getDewPoint;
Feels.prototype.getFP = Feels.prototype.getFrostPoint;

module.exports = Feels;
