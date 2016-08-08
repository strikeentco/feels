'use strict';

/* eslint-disable max-len */

const should = require('should/as-function');
const Feels = require('../main');

describe('Feels - standalone methods', () => {
  describe('.heatIndex()', () => {
    it('should be approximately 24.12', () => {
      should(Feels.heatIndex(20, 18, true)).be.approximately(24.12, 0.01);
    });

    it('should be approximately 19.03', () => {
      should(Feels.heatIndex(20, 10)).be.approximately(19.03, 0.01);
    });

    it('should throw when one of the required arguments are not specified', () => {
      should(() => Feels.heatIndex()).throw('One of the required arguments are not specified');
      should(() => Feels.heatIndex(20)).throw('One of the required arguments are not specified');
      should(() => Feels.heatIndex(null, 10)).throw('One of the required arguments are not specified');
      should(() => Feels.heatIndex(null, 18, true)).throw('One of the required arguments are not specified');
      should(() => Feels.heatIndex(null, null, true)).throw('One of the required arguments are not specified');
      should(() => Feels.heatIndex('20', '18', true)).throw('One of the required arguments are not specified');
    });

    it('should throw when temp < (20C, 68F, 293.15K)', () => {
      should(() => Feels.heatIndex(19, 10)).throw('Heat Index: temp must be >= (20C, 68F, 293.15K)');
    });

    it('should throw when humidity is out of range', () => {
      should(() => Feels.heatIndex(20, 101)).throw('Heat Index: humidity must be in (0, 100]');
    });
  });

  describe('.AWBGT()', () => {
    it('should be approximately 23.45', () => {
      should(Feels.AWBGT(20, 18, true)).be.approximately(23.45, 0.01);
    });

    it('should be approximately 16.19', () => {
      should(Feels.AWBGT(20, 10)).be.approximately(16.19, 0.01);
    });

    it('should throw when one of the required arguments are not specified', () => {
      should(() => Feels.AWBGT()).throw('One of the required arguments are not specified');
      should(() => Feels.AWBGT(20)).throw('One of the required arguments are not specified');
      should(() => Feels.AWBGT(null, 10)).throw('One of the required arguments are not specified');
      should(() => Feels.AWBGT(null, 18, true)).throw('One of the required arguments are not specified');
      should(() => Feels.AWBGT(null, null, true)).throw('One of the required arguments are not specified');
      should(() => Feels.AWBGT('20', '18', true)).throw('One of the required arguments are not specified');
    });

    it('should throw when temp < (15C, 59F, 288.15K)', () => {
      should(() => Feels.AWBGT(14, 10)).throw('AWBGT: temp must be >= (15C, 59F, 288.15K)');
    });

    it('should throw when humidity is out of range', () => {
      should(() => Feels.AWBGT(20, 101)).throw('AWBGT: humidity must be in (0, 100]');
    });
  });

  describe('.humidex()', () => {
    it('should be approximately 26', () => {
      should(Feels.humidex(20, 18, true)).be.approximately(26, 0.01);
    });

    it('should be approximately 15.74', () => {
      should(Feels.humidex(20, 10)).be.approximately(15.74, 0.01);
    });

    it('should throw when one of the required arguments are not specified', () => {
      should(() => Feels.humidex()).throw('One of the required arguments are not specified');
      should(() => Feels.humidex(20)).throw('One of the required arguments are not specified');
      should(() => Feels.humidex(null, 10)).throw('One of the required arguments are not specified');
      should(() => Feels.humidex(null, 18, true)).throw('One of the required arguments are not specified');
      should(() => Feels.humidex(null, null, true)).throw('One of the required arguments are not specified');
      should(() => Feels.humidex('20', '18', true)).throw('One of the required arguments are not specified');
    });

    it('should throw when temp < (0C, 32F, 273.15K)', () => {
      should(() => Feels.humidex(-1, 10)).throw('Humidex: temp must be > (0C, 32F, 273.15K)');
    });

    it('should throw when humidity is out of range', () => {
      should(() => Feels.humidex(20, 101)).throw('Humidex: humidity must be in (0, 100]');
    });
  });

  describe('.AAT()', () => {
    it('should be approximately 22.86', () => {
      should(Feels.AAT(20, 0, 18, true)).be.approximately(22.86, 0.01);
    });

    it('should be approximately 16.76', () => {
      should(Feels.AAT(20, 0, 10)).be.approximately(16.76, 0.01);
    });

    it('should be approximately 13.27', () => {
      should(Feels.AAT(20, 5, 10)).be.approximately(13.27, 0.01);
    });

    it('should throw when one of the required arguments are not specified', () => {
      should(() => Feels.AAT()).throw('One of the required arguments are not specified');
      should(() => Feels.AAT(20)).throw('One of the required arguments are not specified');
      should(() => Feels.AAT(null, null, 20)).throw('One of the required arguments are not specified');
      should(() => Feels.AAT(null, null, 18, true)).throw('One of the required arguments are not specified');
      should(() => Feels.AAT(null, 5)).throw('One of the required arguments are not specified');
      should(() => Feels.AAT(null, null, null, true)).throw('One of the required arguments are not specified');
      should(() => Feels.AAT('20', '0', '18', true)).throw('One of the required arguments are not specified');
    });

    it('should throw when speed < 0', () => {
      should(() => Feels.AAT(20, -10, 10)).throw('AAT: wind speed must be >= 0');
    });

    it('should throw when humidity is out of range', () => {
      should(() => Feels.AAT(20, 0, 101)).throw('AAT: humidity must be in (0, 100]');
    });
  });

  describe('.windChill()', () => {
    it('should be approximately -33.55', () => {
      should(Feels.windChill(-20, 10)).be.approximately(-33.55, 0.01);
    });

    it('should be approximately -15.54', () => {
      should(Feels.windChill(-10, 3)).be.approximately(-15.54, 0.01);
    });

    it('should throw when one of the required arguments are not specified', () => {
      should(() => Feels.windChill()).throw('One of the required arguments are not specified');
      should(() => Feels.windChill(-5)).throw('One of the required arguments are not specified');
      should(() => Feels.windChill(null, 5)).throw('One of the required arguments are not specified');
      should(() => Feels.windChill('-5', '18')).throw('One of the required arguments are not specified');
    });

    it('should throw when temp > (0C, 32F, 273.15K)', () => {
      should(() => Feels.windChill(1, 0)).throw('Wind Chill: temp must be <= (0C, 32F, 273.15K)');
    });

    it('should throw when speed < 0', () => {
      should(() => Feels.windChill(-5, -10)).throw('Wind Chill: wind speed must be >= 0');
    });
  });

  describe('.getWVP()', () => {
    it('should be approximately 2.33', () => {
      should(Feels.getWVP(20, 10)).be.approximately(2.33, 0.01);
    });

    it('should throw when one of the required arguments are not specified', () => {
      should(() => Feels.getWVP()).throw('One of the required arguments are not specified');
      should(() => Feels.getWVP(20)).throw('One of the required arguments are not specified');
      should(() => Feels.getWVP(null, 10)).throw('One of the required arguments are not specified');
      should(() => Feels.getWVP('20', '10')).throw('One of the required arguments are not specified');
    });

    it('should throw when humidity is out of range', () => {
      should(() => Feels.getWVP(20, 101)).throw('Water Vapour Pressure: humidity must be in (0, 100]');
    });
  });

  describe('.getWVPbyDP()', () => {
    it('should be approximately 20.81', () => {
      should(Feels.getWVPbyDP(18)).be.approximately(20.81, 0.01);
    });

    it('should throw when dew point is not specified', () => {
      should(() => Feels.getWVPbyDP()).throw('Dew point is not specified');
    });
  });

  describe('.getARH()', () => {
    it('should be equal 90', () => {
      should(Feels.getARH(20, 18)).be.eql(90);
    });

    it('should throw when one of the required arguments are not specified', () => {
      should(() => Feels.getARH()).throw('One of the required arguments are not specified');
      should(() => Feels.getARH(20)).throw('One of the required arguments are not specified');
      should(() => Feels.getARH(null, 18)).throw('One of the required arguments are not specified');
      should(() => Feels.getARH('20', '18')).throw('One of the required arguments are not specified');
    });
  });

  describe('.getRH()', () => {
    it('should be approximately 52.74', () => {
      should(Feels.getRH(20, 10, true)).be.approximately(52.74, 0.01);
    });

    it('should be approximately 89.23', () => {
      should(Feels.getRH(20, 20.81)).be.approximately(89.23, 0.01);
    });

    it('should throw when one of the required arguments are not specified', () => {
      should(() => Feels.getRH()).throw('One of the required arguments are not specified');
      should(() => Feels.getRH(20)).throw('One of the required arguments are not specified');
      should(() => Feels.getRH(null, 18, true)).throw('One of the required arguments are not specified');
      should(() => Feels.getRH(null, 20.81)).throw('One of the required arguments are not specified');
      should(() => Feels.getRH(null, null, true)).throw('One of the required arguments are not specified');
      should(() => Feels.getRH('20', '18')).throw('One of the required arguments are not specified');
    });
  });

  describe('.getADP()', () => {
    it('should be equal 2', () => {
      should(Feels.getADP(20, 10)).be.eql(2);
    });

    it('should throw when one of the required arguments are not specified', () => {
      should(() => Feels.getADP()).throw('One of the required arguments are not specified');
      should(() => Feels.getADP(20)).throw('One of the required arguments are not specified');
      should(() => Feels.getADP(null, 10)).throw('One of the required arguments are not specified');
      should(() => Feels.getADP('20', '10')).throw('One of the required arguments are not specified');
    });

    it('should throw when humidity is out of range', () => {
      should(() => Feels.getADP(20, 101)).throw('Aproximate Dew Point: humidity must be in (0, 100]');
    });
  });

  describe('.getDP()', () => {
    it('should be approximately -12.57', () => {
      should(Feels.getDP(20, 10)).be.approximately(-12.57, 0.01);
    });

    it('should throw when one of the required arguments are not specified', () => {
      should(() => Feels.getDP()).throw('One of the required arguments are not specified');
      should(() => Feels.getDP(20)).throw('One of the required arguments are not specified');
      should(() => Feels.getDP(null, 10)).throw('One of the required arguments are not specified');
      should(() => Feels.getDP('20', '10')).throw('One of the required arguments are not specified');
    });

    it('should throw when temp is out of range', () => {
      should(() => Feels.getDP(-60, 10)).throw('Dew Point: temp must be in [-40, 50]');
    });

    it('should throw when humidity is out of range', () => {
      should(() => Feels.getDP(20, 101)).throw('Dew Point: humidity must be in (0, 100]');
    });
  });

  describe('.getFP()', () => {
    it('should be approximately -42.14', () => {
      should(Feels.getFP(-40, 80)).be.approximately(-42.14, 0.01);
    });

    it('should throw when one of the required arguments are not specified', () => {
      should(() => Feels.getFP()).throw('One of the required arguments are not specified');
      should(() => Feels.getFP(20)).throw('One of the required arguments are not specified');
      should(() => Feels.getFP(null, 10)).throw('One of the required arguments are not specified');
      should(() => Feels.getFP('20', '10')).throw('One of the required arguments are not specified');
    });

    it('should throw when temp is out of range', () => {
      should(() => Feels.getFP(20, 10)).throw('Frost Point: temp must be in [-80, 0]');
    });

    it('should throw when humidity is out of range', () => {
      should(() => Feels.getFP(-10, 101)).throw('Frost Point: humidity must be in (0, 100]');
    });
  });

  describe('.tempConvert()', () => {
    it('should be equal 68', () => {
      should(Feels.tempConvert(68, 'f', 'f')).be.eql(68);
      should(Feels.tempConvert(20, 'c', 'f')).be.eql(68);
      should(Feels.tempConvert(293.15, 'k', 'f')).be.eql(68);
    });

    it('should be equal 293.15', () => {
      should(Feels.tempConvert(293.15, 'k', 'k')).be.eql(293.15);
      should(Feels.tempConvert(20, 'c', 'k')).be.eql(293.15);
      should(Feels.tempConvert(68, 'f', 'k')).be.approximately(293.15, 0.01);
    });

    it('should be equal 20', () => {
      should(Feels.tempConvert(20, 'c', 'c')).be.eql(20);
      should(Feels.tempConvert(68, 'f', 'c')).be.eql(20);
      should(Feels.tempConvert(293.15, 'k', 'c')).be.eql(20);
    });

    it('should throw when temp is not specified', () => {
      should(() => Feels.tempConvert()).throw('Temp must be specified and must be a number');
    });

    it('should throw when units are incorrect', () => {
      should(() => Feels.tempConvert(20, 'a', 'c')).throw('Units must be c, f or k');
      should(() => Feels.tempConvert(20, 'c', 'b')).throw('Units must be c, f or k');
    });
  });

  describe('.speedConvert()', () => {
    it('should be equal 18', () => {
      should(Feels.speedConvert(18, 'kph', 'kph')).be.eql(18);
      should(Feels.speedConvert(5, 'mps', 'kph')).be.eql(18);
      should(Feels.speedConvert(11.1847, 'mph', 'kph')).be.approximately(18, 0.01);
    });

    it('should be equal 11.1847', () => {
      should(Feels.speedConvert(11.1847, 'mph', 'mph')).be.approximately(11.1847, 0.01);
      should(Feels.speedConvert(5, 'mps', 'mph')).be.approximately(11.1847, 0.01);
      should(Feels.speedConvert(18, 'kph', 'mph')).be.approximately(11.1847, 0.01);
    });

    it('should be equal 5', () => {
      should(Feels.speedConvert(5, 'mps', 'mps')).be.eql(5);
      should(Feels.speedConvert(18, 'kph', 'mps')).be.eql(5);
      should(Feels.speedConvert(11.1847, 'mph', 'mps')).be.approximately(5, 0.01);
    });

    it('should throw when speed is not specified', () => {
      should(() => Feels.speedConvert()).throw('Speed must be specified and must be a number');
    });

    it('should throw when units are incorrect', () => {
      should(() => Feels.speedConvert(20, 'a', 'mps')).throw('Units must be mps, mph or kph');
      should(() => Feels.speedConvert(20, 'mps', 'b')).throw('Units must be mps, mph or kph');
    });
  });
});
