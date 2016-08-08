'use strict';

const h = require('./helpers');
const f = require('./formulas');

const HI = f.HI;
const AWBGT = f.AWBGT;
const HI_CA = f.HI_CA;
const AAT = f.AAT;
const WCI = f.WCI;
const WVP = f.WVP;
const WVPbyDP = f.WVPbyDP;
const ARH = f.ARH;
const RH = f.RH;
const ADP = f.ADP;
const getT = f.getT;

const isNumber = h.isNumber;
const isCorrect = h.isCorrect;

class BaseFeels {
  static tempConvert(temp, from, to) {
    if (!isNumber(temp)) {
      throw new TypeError('Temp must be specified and must be a number');
    } else if (from === to) {
      return temp;
    } else if (['c', 'f', 'k'].indexOf(from) === -1 || ['c', 'f', 'k'].indexOf(to) === -1) {
      throw new RangeError('Units must be c, f or k');
    } else if (from === 'c') {
      return (to === 'f') ?
        (temp * 1000 * (9 / 5) + 32 * 1000) / 1000 :
        (temp * 1000 + 273.15 * 1000) / 1000;
    } else if (from === 'f') {
      return (to === 'c') ?
        ((temp - 32) * 1000 * (5 / 9)) / 1000 :
        ((temp + 459.67) * 1000 * (5 / 9)) / 1000;
    }
    return (to === 'c') ? // k
      (temp * 1000 - 273.15 * 1000) / 1000 :
      (temp * 1000 * (9 / 5) - 459.67 * 1000) / 1000;
  }

  static speedConvert(speed, from, to) {
    if (!isNumber(speed)) {
      throw new TypeError('Speed must be specified and must be a number');
    } else if (from === to) {
      return speed;
    } else if (
      ['mps', 'mph', 'kph'].indexOf(from) === -1 || ['mps', 'mph', 'kph'].indexOf(to) === -1
    ) {
      throw new RangeError('Units must be mps, mph or kph');
    } else if (from === 'mps') {
      return (to === 'mph') ? speed / 0.44704 : speed * 3.6;
    } else if (from === 'mph') {
      return (to === 'mps') ? speed * 0.44704 : speed * 1.609344;
    }
    return (to === 'mps') ? speed / 3.6 : speed / 1.609344; // kph
  }

  static heatIndex(temp, humidity, dewPoint) { // HI
    if (isCorrect(temp) && isCorrect(humidity)) {
      const t = BaseFeels.tempConvert(temp, 'c', 'f');

      if (t < 68) {
        throw new RangeError('Heat Index: temp must be >= (20C, 68F, 293.15K)');
      }

      if (dewPoint) {
        humidity = BaseFeels.getRH(temp, humidity, true);
      } else {
        if (humidity <= 0 || humidity > 100) {
          throw new RangeError('Heat Index: humidity must be in (0, 100]');
        }
      }

      return BaseFeels.tempConvert(HI(t, humidity), 'f', 'c');
    }
    throw new Error('One of the required arguments are not specified');
  }

  static AWBGT(temp, humidity, dewPoint) { // AWBGT
    if (isCorrect(temp) && isCorrect(humidity)) {
      if (temp < 15) {
        throw new RangeError('AWBGT: temp must be >= (15C, 59F, 288.15K)');
      }

      if (!dewPoint) {
        if (humidity <= 0 || humidity > 100) {
          throw new RangeError('AWBGT: humidity must be in (0, 100]');
        }
      }

      const wvp = dewPoint ? BaseFeels.getWVPbyDP(humidity) : BaseFeels.getWVP(temp, humidity);
      return AWBGT(temp, wvp);
    }
    throw new Error('One of the required arguments are not specified');
  }

  static humidex(temp, humidity, dewPoint) { // HI_CA
    if (isCorrect(temp) && isCorrect(humidity)) {
      if (temp <= 0) {
        throw new RangeError('Humidex: temp must be > (0C, 32F, 273.15K)');
      }

      if (!dewPoint) {
        if (humidity <= 0 || humidity > 100) {
          throw new RangeError('Humidex: humidity must be in (0, 100]');
        }
      }

      const wvp = dewPoint ? BaseFeels.getWVPbyDP(humidity) : BaseFeels.getWVP(temp, humidity);
      return HI_CA(temp, wvp);
    }
    throw new Error('One of the required arguments are not specified');
  }

  static AAT(temp, speed, humidity, dewPoint) { // AAT
    if (isCorrect(temp) && isCorrect(speed) && isCorrect(humidity)) {
      if (speed < 0) {
        throw new RangeError('AAT: wind speed must be >= 0');
      }

      if (!dewPoint) {
        if (humidity <= 0 || humidity > 100) {
          throw new RangeError('AAT: humidity must be in (0, 100]');
        }
      }

      const wvp = dewPoint ? BaseFeels.getWVPbyDP(humidity) : BaseFeels.getWVP(temp, humidity);
      return AAT(temp, wvp, speed);
    }
    throw new Error('One of the required arguments are not specified');
  }

  static windChill(temp, speed) { // WCI
    if (isCorrect(temp) && isCorrect(speed)) {
      if (temp > 0) {
        throw new RangeError('Wind Chill: temp must be <= (0C, 32F, 273.15K)');
      } else if (speed < 0) {
        throw new RangeError('Wind Chill: wind speed must be >= 0');
      }

      const s = BaseFeels.speedConvert(speed, 'mps', 'kph');
      if (s >= 5) {
        return WCI(temp, s);
      }
      return temp + ((-1.59 + 0.1345 * temp) / 5) * s;
    }
    throw new Error('One of the required arguments are not specified');
  }

  static getWVP(temp, humidity) {
    if (isCorrect(humidity) && isCorrect(temp)) {
      if (humidity <= 0 || humidity > 100) {
        throw new RangeError('Water Vapour Pressure: humidity must be in (0, 100]');
      }
      return WVP(temp, humidity);
    }
    throw new Error('One of the required arguments are not specified');
  }

  static getWVPbyDP(dewPoint) {
    if (isCorrect(dewPoint)) {
      return WVPbyDP(dewPoint);
    }
    throw new Error('Dew point is not specified');
  }

  static getARH(temp, dewPoint) {
    if (isCorrect(temp) && isCorrect(dewPoint)) {
      return ARH(temp, dewPoint);
    }
    throw new Error('One of the required arguments are not specified');
  }

  static getRH(temp, wvp, dewPoint) {
    if (isCorrect(temp) && isCorrect(wvp)) {
      return RH(temp, (dewPoint) ? BaseFeels.getWVPbyDP(wvp) : wvp);
    }
    throw new Error('One of the required arguments are not specified');
  }

  static getADP(temp, humidity) {
    if (isCorrect(temp) && isCorrect(humidity)) {
      if (humidity <= 0 || humidity > 100) {
        throw new RangeError('Aproximate Dew Point: humidity must be in (0, 100]');
      }
      return ADP(temp, humidity);
    }
    throw new Error('One of the required arguments are not specified');
  }

  static getDP(temp, humidity) {
    if (isCorrect(temp) && isCorrect(humidity)) {
      if (temp < -40 || temp > 50) {
        throw new RangeError('Dew Point: temp must be in [-40, 50]');
      } else if (humidity <= 0 || humidity > 100) {
        throw new RangeError('Dew Point: humidity must be in (0, 100]');
      }

      const b = 18.729;
      const c = 257.87;
      const d = 273.3;
      return getT(temp, humidity, b, c, d);
    }
    throw new Error('One of the required arguments are not specified');
  }

  static getFP(temp, humidity) {
    if (isCorrect(temp) && isCorrect(humidity)) {
      if (temp < -80 || temp > 0) {
        throw new RangeError('Frost Point: temp must be in [-80, 0]');
      } else if (humidity <= 0 || humidity > 100) {
        throw new RangeError('Frost Point: humidity must be in (0, 100]');
      }

      const b = 23.036;
      const c = 279.82;
      const d = 333.7;
      return getT(temp, humidity, b, c, d);
    }
    throw new Error('One of the required arguments are not specified');
  }
}

module.exports = BaseFeels;
