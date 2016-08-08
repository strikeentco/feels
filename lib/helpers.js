'use strict';

const isNumber = module.exports.isNumber = Number.isFinite;

module.exports.isCorrect = data => !(data == null) && isNumber(data);

const tempFormat = temp => {
  if (temp === 'f' || temp === 'fahrenheit') {
    return 'f';
  } else if (temp === 'k' || temp === 'kelvin') {
    return 'k';
  }
  return 'c';
};

const speedFormat = speed => {
  if (speed === 'mph' || speed === 'mi/h') {
    return 'mph';
  } else if (['kmh', 'kph', 'kmph', 'km/h'].indexOf(speed) !== -1) {
    return 'kph';
  }
  return 'mps';
};

module.exports.unitsFormat = units => {
  if (!units) {
    return {
      temp: 'c',
      speed: 'mps'
    };
  }

  const temp = (units.temp) ? units.temp.toLowerCase() : 'c';
  const speed = (units.speed) ? units.speed.toLowerCase() : 'mps';

  return { temp: tempFormat(temp), speed: speedFormat(speed) };
};
