'use strict';

module.exports.HI = (temp, humidity) =>
  16.923 + 0.185212 * temp + 5.37941 * humidity - 0.100254 * temp * humidity +
  9.41695 * Math.pow(10, -3) * Math.pow(temp, 2) + 7.28898 * Math.pow(10, -3) *
  Math.pow(humidity, 2) + 3.45372 * Math.pow(10, -4) * Math.pow(temp, 2) * humidity -
  8.14971 * Math.pow(10, -4) * temp * Math.pow(humidity, 2) + 1.02102 * Math.pow(10, -5) *
  Math.pow(temp, 2) * Math.pow(humidity, 2) - 3.8646 * Math.pow(10, -5) * Math.pow(temp, 3) +
  2.91583 * Math.pow(10, -5) * Math.pow(humidity, 3) + 1.42721 * Math.pow(10, -6) *
  Math.pow(temp, 3) * humidity + 1.97483 * Math.pow(10, -7) * temp * Math.pow(humidity, 3) -
  2.18429 * Math.pow(10, -8) * Math.pow(temp, 3) * Math.pow(humidity, 2) + 8.43296 *
  Math.pow(10, -10) * Math.pow(temp, 2) * Math.pow(humidity, 3) - 4.81975 * Math.pow(10, -11) *
  Math.pow(temp, 3) * Math.pow(humidity, 3);

module.exports.AWBGT = (temp, WVP) => 0.567 * temp + 0.393 * WVP + 3.94;

module.exports.HI_CA = (temp, WVP) => temp + 0.5555 * (WVP - 10.0);

module.exports.AAT = (temp, WVP, speed) => temp + 0.33 * WVP - 0.70 * speed - 4.00;

module.exports.WCI = (temp, speed) =>
  13.12 + 0.6215 * temp - 11.37 * Math.pow(speed, 0.16) + 0.3965 * temp * Math.pow(speed, 0.16);

module.exports.WVP = (temp, humidity) =>
  (humidity / 100) * 6.105 * Math.exp((17.27 * temp) / (237.7 + temp));

module.exports.WVPbyDP = temp =>
  6.11 * Math.exp(5417.7530 * (1 / 273.16 - 1 / (temp + 273.15)));

module.exports.ARH = (temp, dewPoint) => 100 - 5 * (temp - dewPoint);

module.exports.RH = (temp, WVP) =>
  (WVP / (6.105 * Math.exp((17.27 * temp) / (237.7 + temp)))) * 100;

module.exports.ADP = (temp, humidity) => temp - ((100 - humidity) / 5);

const getG = (temp, humidity, b, c, d) =>
  Math.log(humidity / 100 * Math.exp((b - temp / d) * (temp / (c + temp))));

module.exports.getT = (temp, humidity, b, c, d) =>
  (c * getG(temp, humidity, b, c, d)) / (b - getG(temp, humidity, b, c, d));
