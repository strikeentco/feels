'use strict';

/* eslint-disable max-len */

const should = require('should/as-function');
const Feels = require('../main');

describe('Feels() - class methods', () => {
  describe('.heatIndex()', () => {
    it('should be approximately 24.12', () => {
      should(new Feels({ temp: 20, dewPoint: 18 }).heatIndex()).be.approximately(24.12, 0.01);
    });

    it('should be approximately 19.03', () => {
      should(new Feels({ temp: 20, humidity: 10 }).heatIndex()).be.approximately(19.03, 0.01);
    });

    it('should throw when one of the required arguments are not specified', () => {
      should(() => new Feels().heatIndex()).throw('One of the required arguments are not specified');
      should(() => new Feels({ temp: 20 }).heatIndex()).throw('One of the required arguments are not specified');
      should(() => new Feels({ humidity: 10 }).heatIndex()).throw('One of the required arguments are not specified');
      should(() => new Feels({ dewPoint: 18 }).heatIndex()).throw('One of the required arguments are not specified');
      should(() => new Feels({ dewPoint: 18, humidity: 10 }).heatIndex()).throw('One of the required arguments are not specified');
      should(() => new Feels({ temp: '20', dewPoint: '18' }).heatIndex()).throw('One of the required arguments are not specified');
    });

    it('should throw when temp < (20C, 68F, 293.15K)', () => {
      should(() => new Feels({ temp: 19, humidity: 10 }).heatIndex()).throw('Heat Index: temp must be >= (20C, 68F, 293.15K)');
    });

    it('should throw when humidity is out of range', () => {
      should(() => new Feels({ temp: 20, humidity: 101 }).heatIndex()).throw('Heat Index: humidity must be in (0, 100]');
    });
  });

  describe('.AWBGT()', () => {
    it('should be approximately 23.45', () => {
      should(new Feels({ temp: 20, dewPoint: 18 }).AWBGT()).be.approximately(23.45, 0.01);
    });

    it('should be approximately 16.19', () => {
      should(new Feels({ temp: 20, humidity: 10 }).AWBGT()).be.approximately(16.19, 0.01);
    });

    it('should throw when one of the required arguments are not specified', () => {
      should(() => new Feels().AWBGT()).throw('One of the required arguments are not specified');
      should(() => new Feels({ temp: 20 }).AWBGT()).throw('One of the required arguments are not specified');
      should(() => new Feels({ humidity: 10 }).AWBGT()).throw('One of the required arguments are not specified');
      should(() => new Feels({ dewPoint: 18 }).AWBGT()).throw('One of the required arguments are not specified');
      should(() => new Feels({ dewPoint: 18, humidity: 10 }).AWBGT()).throw('One of the required arguments are not specified');
      should(() => new Feels({ temp: '20', dewPoint: '18' }).AWBGT()).throw('One of the required arguments are not specified');
    });

    it('should throw when temp < (15C, 59F, 288.15K)', () => {
      should(() => new Feels({ temp: 14, humidity: 10 }).AWBGT()).throw('AWBGT: temp must be >= (15C, 59F, 288.15K)');
    });

    it('should throw when humidity is out of range', () => {
      should(() => new Feels({ temp: 20, humidity: 101 }).AWBGT()).throw('AWBGT: humidity must be in (0, 100]');
    });
  });

  describe('.humidex()', () => {
    it('should be approximately 26', () => {
      should(new Feels({ temp: 20, dewPoint: 18 }).humidex()).be.approximately(26, 0.01);
    });

    it('should be approximately 15.74', () => {
      should(new Feels({ temp: 20, humidity: 10 }).humidex()).be.approximately(15.74, 0.01);
    });

    it('should throw when one of the required arguments are not specified', () => {
      should(() => new Feels().humidex()).throw('One of the required arguments are not specified');
      should(() => new Feels({ temp: 20 }).humidex()).throw('One of the required arguments are not specified');
      should(() => new Feels({ humidity: 10 }).humidex()).throw('One of the required arguments are not specified');
      should(() => new Feels({ dewPoint: 18 }).humidex()).throw('One of the required arguments are not specified');
      should(() => new Feels({ dewPoint: 18, humidity: 10 }).humidex()).throw('One of the required arguments are not specified');
      should(() => new Feels({ temp: '20', dewPoint: '18' }).humidex()).throw('One of the required arguments are not specified');
    });

    it('should throw when temp < (0C, 32F, 273.15K)', () => {
      should(() => new Feels({ temp: -1, humidity: 10 }).humidex()).throw('Humidex: temp must be > (0C, 32F, 273.15K)');
    });

    it('should throw when humidity is out of range', () => {
      should(() => new Feels({ temp: 20, humidity: 101 }).humidex()).throw('Humidex: humidity must be in (0, 100]');
    });
  });

  describe('.AAT()', () => {
    it('should be approximately 22.86', () => {
      should(new Feels({ temp: 20, dewPoint: 18 }).AAT()).be.approximately(22.86, 0.01);
    });

    it('should be approximately 16.76', () => {
      should(new Feels({ temp: 20, humidity: 10 }).AAT()).be.approximately(16.76, 0.01);
    });

    it('should be approximately 13.27', () => {
      should(new Feels({ temp: 20, speed: 5, humidity: 10 }).AAT()).be.approximately(13.27, 0.01);
      should(new Feels({ temp: 20, speed: 18, humidity: 10, units: { speed: 'kph' } }).AAT()).be.approximately(13.27, 0.01);
      should(new Feels({ temp: 20, speed: 11.1847, humidity: 10, units: { speed: 'mph' } }).AAT()).be.approximately(13.27, 0.01);
    });

    it('should throw when one of the required arguments are not specified', () => {
      should(() => new Feels().AAT()).throw('One of the required arguments are not specified');
      should(() => new Feels({ temp: 20 }).AAT()).throw('One of the required arguments are not specified');
      should(() => new Feels({ humidity: 10 }).AAT()).throw('One of the required arguments are not specified');
      should(() => new Feels({ dewPoint: 18 }).AAT()).throw('One of the required arguments are not specified');
      should(() => new Feels({ speed: 5 }).AAT()).throw('One of the required arguments are not specified');
      should(() => new Feels({ speed: 5, dewPoint: 18, humidity: 10 }).AAT()).throw('One of the required arguments are not specified');
      should(() => new Feels({ temp: '20', dewPoint: '18' }).AAT()).throw('One of the required arguments are not specified');
    });

    it('should throw when speed < 0', () => {
      should(() => new Feels({ temp: 20, humidity: 10, speed: -10 }).AAT()).throw('AAT: wind speed must be >= 0');
    });

    it('should throw when humidity is out of range', () => {
      should(() => new Feels({ temp: 20, humidity: 101 }).AAT()).throw('AAT: humidity must be in (0, 100]');
    });
  });

  describe('.windChill()', () => {
    it('should be approximately -33.55', () => {
      should(new Feels({ temp: -20, speed: 10 }).windChill()).be.approximately(-33.55, 0.01);
    });

    it('should be approximately -15.54', () => {
      should(new Feels({ temp: -10, speed: 3 }).windChill()).be.approximately(-15.54, 0.01);
      should(new Feels({ temp: -10, speed: 10.8, units: { speed: 'kph' } }).windChill()).be.approximately(-15.54, 0.01);
      should(new Feels({ temp: -10, speed: 6.71081, units: { speed: 'mph' } }).windChill()).be.approximately(-15.54, 0.01);
    });

    it('should be approximately -22.57', () => {
      should(new Feels({ temp: -20, speed: 3, units: { speed: 'kph' } }).windChill()).be.approximately(-22.57, 0.01);
    });

    it('should throw when one of the required arguments are not specified', () => {
      should(() => new Feels().windChill()).throw('One of the required arguments are not specified');
      should(() => new Feels({ speed: 5 }).windChill()).throw('One of the required arguments are not specified');
      should(() => new Feels({ temp: '-5', speed: '18' }).windChill()).throw('One of the required arguments are not specified');
    });

    it('should throw when temp > (0C, 32F, 273.15K)', () => {
      should(() => new Feels({ temp: 1 }).windChill()).throw('Wind Chill: temp must be <= (0C, 32F, 273.15K)');
    });

    it('should throw when speed < 0', () => {
      should(() => new Feels({ temp: -5, speed: -10 }).windChill()).throw('Wind Chill: wind speed must be >= 0');
    });
  });

  describe('.getWVP()', () => {
    it('should be approximately 2.33', () => {
      should(new Feels({ temp: 20, humidity: 10 }).getWVP()).be.approximately(2.33, 0.01);
      should(new Feels({ wvp: 2.33 }).getWVP()).be.approximately(2.33, 0.01);
    });

    it('should throw when one of the required arguments are not specified', () => {
      should(() => new Feels().getWVP()).throw('One of the required arguments are not specified');
      should(() => new Feels({ temp: 20 }).getWVP()).throw('One of the required arguments are not specified');
      should(() => new Feels({ humidity: 10 }).getWVP()).throw('One of the required arguments are not specified');
      should(() => new Feels({ temp: '20', humidity: '10' }).getWVP()).throw('One of the required arguments are not specified');
    });

    it('should throw when humidity is out of range', () => {
      should(() => new Feels({ temp: 20, humidity: 101 }).getWVP()).throw('Water Vapour Pressure: humidity must be in (0, 100]');
    });
  });

  describe('.getWVPbyDP()', () => {
    it('should be approximately 20.81', () => {
      should(new Feels({ dewPoint: 18 }).getWVPbyDP()).be.approximately(20.81, 0.01);
      should(new Feels({ wvp: 20.81 }).getWVPbyDP()).be.approximately(20.81, 0.01);
    });

    it('should throw when dew point is not specified', () => {
      should(() => new Feels().getWVPbyDP()).throw('Dew point is not specified');
    });
  });

  describe('.getARH()', () => {
    it('should be equal 10', () => {
      should(new Feels({ temp: 20, humidity: 10, dewPoint: 18 }).getARH()).be.eql(10);
    });

    it('should be equal 90', () => {
      should(new Feels({ temp: 20, dewPoint: 18 }).getARH()).be.eql(90);
    });

    it('should throw when one of the required arguments are not specified', () => {
      should(() => new Feels().getARH()).throw('One of the required arguments are not specified');
      should(() => new Feels({ temp: 20 }).getARH()).throw('One of the required arguments are not specified');
      should(() => new Feels({ dewPoint: 18 }).getARH()).throw('One of the required arguments are not specified');
      should(() => new Feels({ temp: '20', dewPoint: '18' }).getARH()).throw('One of the required arguments are not specified');
    });
  });

  describe('.getRH()', () => {
    it('should be equal 10', () => {
      should(new Feels({ temp: 20, humidity: 10, dewPoint: 18 }).getRH()).be.eql(10);
    });

    it('should be approximately 52.74', () => {
      should(new Feels({ temp: 20, dewPoint: 10 }).getRH()).be.approximately(52.74, 0.01);
    });

    it('should be approximately 89.23', () => {
      should(new Feels({ temp: 20, wvp: 20.81 }).getRH()).be.approximately(89.23, 0.01);
    });

    it('should throw when one of the required arguments are not specified', () => {
      should(() => new Feels().getRH()).throw('One of the required arguments are not specified');
      should(() => new Feels({ temp: 20 }).getRH()).throw('One of the required arguments are not specified');
      should(() => new Feels({ dewPoint: 18 }).getRH()).throw('One of the required arguments are not specified');
      should(() => new Feels({ wvp: 20.81 }).getRH()).throw('One of the required arguments are not specified');
      should(() => new Feels({ dewPoint: 18, wvp: 20.81 }).getRH()).throw('One of the required arguments are not specified');
      should(() => new Feels({ temp: '20', dewPoint: '18', wvp: '20.81' }).getRH()).throw('One of the required arguments are not specified');
    });
  });

  describe('.getADP()', () => {
    it('should be equal 2', () => {
      should(new Feels({ temp: 20, humidity: 10 }).getADP()).be.eql(2);
    });

    it('should be equal 18', () => {
      should(new Feels({ temp: 20, humidity: 10, dewPoint: 18 }).getADP()).be.eql(18);
    });

    it('should throw when one of the required arguments are not specified', () => {
      should(() => new Feels().getADP()).throw('One of the required arguments are not specified');
      should(() => new Feels({ temp: 20 }).getADP()).throw('One of the required arguments are not specified');
      should(() => new Feels({ humidity: 10 }).getADP()).throw('One of the required arguments are not specified');
      should(() => new Feels({ temp: '20', humidity: '10' }).getADP()).throw('One of the required arguments are not specified');
    });

    it('should throw when humidity is out of range', () => {
      should(() => new Feels({ temp: 20, humidity: 101 }).getADP()).throw('Aproximate Dew Point: humidity must be in (0, 100]');
    });
  });

  describe('.getDP()', () => {
    it('should be equal 18', () => {
      should(new Feels({ temp: 20, humidity: 10, dewPoint: 18 }).getDP()).be.eql(18);
    });

    it('should be approximately -12.57', () => {
      should(new Feels({ temp: 20, humidity: 10 }).getDP()).be.approximately(-12.57, 0.01);
    });

    it('should throw when one of the required arguments are not specified', () => {
      should(() => new Feels().getDP()).throw('One of the required arguments are not specified');
      should(() => new Feels({ temp: 20 }).getDP()).throw('One of the required arguments are not specified');
      should(() => new Feels({ humidity: 18 }).getDP()).throw('One of the required arguments are not specified');
      should(() => new Feels({ temp: '20', humidity: '18' }).getDP()).throw('One of the required arguments are not specified');
    });

    it('should throw when temp is out of range', () => {
      should(() => new Feels({ temp: -60, humidity: 10 }).getDP()).throw('Dew Point: temp must be in [-40, 50]');
    });

    it('should throw when humidity is out of range', () => {
      should(() => new Feels({ temp: 20, humidity: 101 }).getDP()).throw('Dew Point: humidity must be in (0, 100]');
    });
  });

  describe('.getFP()', () => {
    it('should be approximately -42.14', () => {
      should(new Feels({ temp: -40, humidity: 80 }).getFP()).be.approximately(-42.14, 0.01);
    });

    it('should throw when one of the required arguments are not specified', () => {
      should(() => new Feels().getFP()).throw('One of the required arguments are not specified');
      should(() => new Feels({ temp: 20 }).getFP()).throw('One of the required arguments are not specified');
      should(() => new Feels({ humidity: 18 }).getFP()).throw('One of the required arguments are not specified');
      should(() => new Feels({ temp: '20', humidity: '18' }).getFP()).throw('One of the required arguments are not specified');
    });

    it('should throw when temp is out of range', () => {
      should(() => new Feels({ temp: 20, humidity: 10 }).getFP()).throw('Frost Point: temp must be in [-80, 0]');
    });

    it('should throw when humidity is out of range', () => {
      should(() => new Feels({ temp: -10, humidity: 101 }).getFP()).throw('Frost Point: humidity must be in (0, 100]');
    });
  });

  describe('.toC()', () => {
    it('should be approximately 19.03', () => {
      should(new Feels({ temp: 68, humidity: 10, units: { temp: 'f' } }).toC().heatIndex()).be.approximately(19.03, 0.01);
      should(new Feels({ temp: 293.15, humidity: 10, units: { temp: 'k' } }).toC().heatIndex()).be.approximately(19.03, 0.01);
    });

    it('should be approximately 24.12', () => {
      should(new Feels({ temp: 68, dewPoint: 64.4, units: { temp: 'f' } }).toC().heatIndex()).be.approximately(24.12, 0.01);
      should(new Feels({ temp: 293.15, dewPoint: 291.15, units: { temp: 'k' } }).toC().heatIndex()).be.approximately(24.12, 0.01);
    });

    it('should be approximately 16.19', () => {
      should(new Feels({ temp: 68, humidity: 10, units: { temp: 'f' } }).toC().AWBGT()).be.approximately(16.19, 0.01);
      should(new Feels({ temp: 293.15, humidity: 10, units: { temp: 'k' } }).toC().AWBGT()).be.approximately(16.19, 0.01);
    });

    it('should be approximately 23.45', () => {
      should(new Feels({ temp: 68, dewPoint: 64.4, units: { temp: 'f' } }).toC().AWBGT()).be.approximately(23.45, 0.01);
      should(new Feels({ temp: 293.15, dewPoint: 291.15, units: { temp: 'k' } }).toC().AWBGT()).be.approximately(23.45, 0.01);
    });

    it('should be approximately 15.74', () => {
      should(new Feels({ temp: 68, humidity: 10, units: { temp: 'f' } }).toC().humidex()).be.approximately(15.74, 0.01);
      should(new Feels({ temp: 293.15, humidity: 10, units: { temp: 'k' } }).toC().humidex()).be.approximately(15.74, 0.01);
    });

    it('should be approximately 26', () => {
      should(new Feels({ temp: 68, dewPoint: 64.4, units: { temp: 'f' } }).toC().humidex()).be.approximately(26, 0.01);
      should(new Feels({ temp: 293.15, dewPoint: 291.15, units: { temp: 'k' } }).toC().humidex()).be.approximately(26, 0.01);
    });

    it('should be approximately 16.76', () => {
      should(new Feels({ temp: 68, humidity: 10, units: { temp: 'f' } }).toC().AAT()).be.approximately(16.76, 0.01);
      should(new Feels({ temp: 293.15, humidity: 10, units: { temp: 'k' } }).toC().AAT()).be.approximately(16.76, 0.01);
    });

    it('should be approximately 22.86', () => {
      should(new Feels({ temp: 68, dewPoint: 64.4, units: { temp: 'f' } }).toC().AAT()).be.approximately(22.86, 0.01);
      should(new Feels({ temp: 293.15, dewPoint: 291.15, units: { temp: 'k' } }).toC().AAT()).be.approximately(22.86, 0.01);
    });

    it('should be approximately -33.55', () => {
      should(new Feels({ temp: -4, speed: 10, units: { temp: 'f' } }).toC().windChill()).be.approximately(-33.55, 0.01);
      should(new Feels({ temp: 253.15, speed: 10, units: { temp: 'k' } }).toC().windChill()).be.approximately(-33.55, 0.01);
    });
  });

  describe('.toF()', () => {
    it('should be approximately 66.254', () => {
      should(new Feels({ temp: 20, humidity: 10, units: { temp: 'c' } }).toF().heatIndex()).be.approximately(66.254, 0.02);
      should(new Feels({ temp: 293.15, humidity: 10, units: { temp: 'k' } }).toF().heatIndex()).be.approximately(66.254, 0.02);
    });

    it('should be approximately 75.416', () => {
      should(new Feels({ temp: 20, dewPoint: 18, units: { temp: 'c' } }).toF().heatIndex()).be.approximately(75.416, 0.02);
      should(new Feels({ temp: 293.15, dewPoint: 291.15, units: { temp: 'k' } }).toF().heatIndex()).be.approximately(75.416, 0.02);
    });

    it('should be approximately 61.142', () => {
      should(new Feels({ temp: 20, humidity: 10, units: { temp: 'c' } }).toF().AWBGT()).be.approximately(61.142, 0.02);
      should(new Feels({ temp: 293.15, humidity: 10, units: { temp: 'k' } }).toF().AWBGT()).be.approximately(61.142, 0.02);
    });

    it('should be approximately 74.21', () => {
      should(new Feels({ temp: 20, dewPoint: 18, units: { temp: 'c' } }).toF().AWBGT()).be.approximately(74.21, 0.02);
      should(new Feels({ temp: 293.15, dewPoint: 291.15, units: { temp: 'k' } }).toF().AWBGT()).be.approximately(74.21, 0.02);
    });

    it('should be approximately 60.332', () => {
      should(new Feels({ temp: 20, humidity: 10, units: { temp: 'c' } }).toF().humidex()).be.approximately(60.332, 0.02);
      should(new Feels({ temp: 293.15, humidity: 10, units: { temp: 'k' } }).toF().humidex()).be.approximately(60.332, 0.02);
    });

    it('should be approximately 78.8', () => {
      should(new Feels({ temp: 20, dewPoint: 18, units: { temp: 'c' } }).toF().humidex()).be.approximately(78.8, 0.02);
      should(new Feels({ temp: 293.15, dewPoint: 291.15, units: { temp: 'k' } }).toF().humidex()).be.approximately(78.8, 0.02);
    });

    it('should be approximately 62.168', () => {
      should(new Feels({ temp: 20, humidity: 10, units: { temp: 'c' } }).toF().AAT()).be.approximately(62.168, 0.02);
      should(new Feels({ temp: 293.15, humidity: 10, units: { temp: 'k' } }).toF().AAT()).be.approximately(62.168, 0.02);
    });

    it('should be approximately 73.148', () => {
      should(new Feels({ temp: 20, dewPoint: 18, units: { temp: 'c' } }).toF().AAT()).be.approximately(73.148, 0.02);
      should(new Feels({ temp: 293.15, dewPoint: 291.15, units: { temp: 'k' } }).toF().AAT()).be.approximately(73.148, 0.02);
    });

    it('should be approximately -28.39', () => {
      should(new Feels({ temp: -20, speed: 10, units: { temp: 'c' } }).toF().windChill()).be.approximately(-28.39, 0.02);
      should(new Feels({ temp: 253.15, speed: 10, units: { temp: 'k' } }).toF().windChill()).be.approximately(-28.39, 0.02);
    });
  });

  describe('.toK()', () => {
    it('should be approximately 292.18', () => {
      should(new Feels({ temp: 68, humidity: 10, units: { temp: 'f' } }).toK().heatIndex()).be.approximately(292.18, 0.01);
      should(new Feels({ temp: 20, humidity: 10, units: { temp: 'c' } }).toK().heatIndex()).be.approximately(292.18, 0.01);
    });

    it('should be approximately 297.27', () => {
      should(new Feels({ temp: 68, dewPoint: 64.4, units: { temp: 'f' } }).toK().heatIndex()).be.approximately(297.27, 0.01);
      should(new Feels({ temp: 20, dewPoint: 18, units: { temp: 'c' } }).toK().heatIndex()).be.approximately(297.27, 0.01);
    });

    it('should be approximately 289.34', () => {
      should(new Feels({ temp: 68, humidity: 10, units: { temp: 'f' } }).toK().AWBGT()).be.approximately(289.34, 0.01);
      should(new Feels({ temp: 20, humidity: 10, units: { temp: 'c' } }).toK().AWBGT()).be.approximately(289.34, 0.01);
    });

    it('should be approximately 296.6', () => {
      should(new Feels({ temp: 68, dewPoint: 64.4, units: { temp: 'f' } }).toK().AWBGT()).be.approximately(296.6, 0.01);
      should(new Feels({ temp: 20, dewPoint: 18, units: { temp: 'c' } }).toK().AWBGT()).be.approximately(296.6, 0.01);
    });

    it('should be approximately 288.89', () => {
      should(new Feels({ temp: 68, humidity: 10, units: { temp: 'f' } }).toK().humidex()).be.approximately(288.89, 0.01);
      should(new Feels({ temp: 20, humidity: 10, units: { temp: 'c' } }).toK().humidex()).be.approximately(288.89, 0.01);
    });

    it('should be approximately 299.15', () => {
      should(new Feels({ temp: 68, dewPoint: 64.4, units: { temp: 'f' } }).toK().humidex()).be.approximately(299.15, 0.01);
      should(new Feels({ temp: 20, dewPoint: 18, units: { temp: 'c' } }).toK().humidex()).be.approximately(299.15, 0.01);
    });

    it('should be approximately 289.91', () => {
      should(new Feels({ temp: 68, humidity: 10, units: { temp: 'f' } }).toK().AAT()).be.approximately(289.91, 0.01);
      should(new Feels({ temp: 20, humidity: 10, units: { temp: 'c' } }).toK().AAT()).be.approximately(289.91, 0.01);
    });

    it('should be approximately 296.01', () => {
      should(new Feels({ temp: 68, dewPoint: 64.4, units: { temp: 'f' } }).toK().AAT()).be.approximately(296.01, 0.01);
      should(new Feels({ temp: 20, dewPoint: 18, units: { temp: 'c' } }).toK().AAT()).be.approximately(296.01, 0.01);
    });

    it('should be approximately 239.6', () => {
      should(new Feels({ temp: -4, speed: 10, units: { temp: 'f' } }).toK().windChill()).be.approximately(239.6, 0.01);
      should(new Feels({ temp: -20, speed: 10, units: { temp: 'c' } }).toK().windChill()).be.approximately(239.6, 0.01);
    });
  });

  describe('.addMethod()', () => {
    it('should be Ok', () => {
      const feels = new Feels();
      feels.addMethod('newbie', () => (feels.heatIndex() + feels.humidex()) / 2);
      feels.addMethod('newbie2', function () {
        return (this.heatIndex() + this.humidex()) / 2;
      });
      feels.setOptions({ temp: 20, dewPoint: 18 });

      should(feels.newbie()).be.eql((feels.heatIndex() + feels.humidex()) / 2);
      should(feels.newbie2()).be.eql((feels.heatIndex() + feels.humidex()) / 2);
      should(feels.newbie()).be.eql(feels.newbie2());
    });

    it('should throw when method is not a function', () => {
      should(() => new Feels().addMethod('newbie', 'newbie')).throw('newbie must be a function');
    });
  });

  describe('.registerMethods()', () => {
    it('should be Ok', () => {
      class NewFeels extends Feels {
        newbie() {
          return (this.heatIndex() + this.humidex()) / 2;
        }
        newbie2() {
          return (this.heatIndex() + this.humidex()) / 2;
        }
      }
      const feels = new Feels({ temp: 20, dewPoint: 18 });
      const newFeels = new NewFeels({ temp: 20, dewPoint: 18 });
      should(newFeels.newbie()).be.eql((feels.heatIndex() + feels.humidex()) / 2);
      should(newFeels.newbie2()).be.eql((feels.heatIndex() + feels.humidex()) / 2);
      should(newFeels.newbie()).be.eql((newFeels.heatIndex() + newFeels.humidex()) / 2);
      should(newFeels.newbie2()).be.eql((newFeels.heatIndex() + newFeels.humidex()) / 2);
      should(newFeels.newbie()).be.eql(newFeels.newbie2());
    });

    it('should throw when the methods are not an array', () => {
      class NewFeels extends Feels {
        constructor(opts) {
          super(opts);
          this.registerMethods('newbie + newbie2');
        }
        newbie() {
          return (this.heatIndex() + this.humidex()) / 2;
        }
        newbie2() {
          return (this.heatIndex() + this.humidex()) / 2;
        }
      }
      should(() => new NewFeels({ temp: 20, dewPoint: 18 }).newbie()).throw('Methods must be an array');
    });

    it('should throw when one of the methods are does not exists', () => {
      class NewFeels extends Feels {
        constructor(opts) {
          super(opts);
          this.registerMethods(['newbie', 'newbie3']);
        }
        newbie() {
          return (this.heatIndex() + this.humidex()) / 2;
        }
        newbie2() {
          return (this.heatIndex() + this.humidex()) / 2;
        }
      }
      should(() => new NewFeels({ temp: 20, dewPoint: 18 }).newbie()).throw("newbie3 doesn't exists");
    });
  });

  describe('.like()', () => {
    class NewFeels extends Feels {
      constructor(opts) {
        super(opts);
        this.registerMethods(['newbie', 'newbie2']);
      }
      newbie() {
        return (this.heatIndex() + this.humidex()) / 2;
      }
      newbie2() {
        return (this.windChill() + this.AAT()) / 2;
      }
    }

    it('should be approximately 24.12', () => {
      should(new Feels({ temp: 20, dewPoint: 18 }).like('HI')).be.approximately(24.12, 0.01);
      should(new Feels({ temp: 20, dewPoint: 18 }).like(['HI'])).be.approximately(24.12, 0.01);
      should(new Feels({ temp: 20, dewPoint: 18 }).like(['HI', 'WCI'])).be.approximately(24.12, 0.01);
    });

    it('should be approximately 23.45', () => {
      should(new Feels({ temp: 20, dewPoint: 18 }).like('AWBGT')).be.approximately(23.45, 0.01);
      should(new Feels({ temp: 20, dewPoint: 18 }).like(['AWBGT'])).be.approximately(23.45, 0.01);
      should(new Feels({ temp: 20, dewPoint: 18 }).like(['AWBGT', 'WCI'])).be.approximately(23.45, 0.01);
    });

    it('should be approximately 26', () => {
      should(new Feels({ temp: 20, dewPoint: 18 }).like('HI_CA')).be.approximately(26, 0.01);
      should(new Feels({ temp: 20, dewPoint: 18 }).like(['HI_CA'])).be.approximately(26, 0.01);
      should(new Feels({ temp: 20, dewPoint: 18 }).like(['HI_CA', 'WCI'])).be.approximately(26, 0.01);
    });

    it('should be approximately 22.86', () => {
      should(new Feels({ temp: 20, dewPoint: 18 }).like('AAT')).be.approximately(22.86, 0.01);
      should(new Feels({ temp: 20, dewPoint: 18 }).like(['AAT'])).be.approximately(22.86, 0.01);
    });

    it('should be approximately -33.55', () => {
      should(new Feels({ temp: -20, speed: 10 }).like('WCI')).be.approximately(-33.55, 0.01);
      should(new Feels({ temp: -20, speed: 10 }).like(['WCI'])).be.approximately(-33.55, 0.01);
    });

    it('should be approximately 24.33', () => {
      should(new Feels({ temp: 20, humidity: 89.23, dewPoint: 18 }).like()).be.approximately(24.33, 0.01);
      should(new Feels({ temp: 20, humidity: 89.23 }).like()).be.approximately(24.33, 0.01);
      should(new Feels({ temp: 20, dewPoint: 18 }).like()).be.approximately(24.33, 0.01);
      should(new Feels({ temp: 20, humidity: 89.23, dewPoint: 18 }).like({})).be.approximately(24.33, 0.01);
      should(new Feels({ temp: 20, humidity: 89.23, dewPoint: 18 }).like(['HI', 'HI_CA', 'AAT', 'WCI'])).be.approximately(24.33, 0.01);
    });

    it('should be approximately 24.02', () => {
      const feels = new Feels({ temp: 20, humidity: 89.23, dewPoint: 18 });
      const like = (((feels.heatIndex() + feels.humidex()) / 2) + feels.heatIndex() + feels.AAT()) / 3;
      should(new NewFeels({ temp: 20, humidity: 89.23, dewPoint: 18 }).like(['HI', 'newbie', 'AAT'])).be.approximately(24.02, 0.01);
      should(new NewFeels({ temp: 20, humidity: 89.23, dewPoint: 18 }).like(['HI', 'newbie', 'AAT', 'newbie2'])).be.approximately(24.02, 0.01);
      should(new NewFeels({ temp: 20, humidity: 89.23, dewPoint: 18 }).like(['HI', 'newbie', 'AAT'])).be.eql(like);
      should(new NewFeels({ temp: 20, humidity: 89.23, dewPoint: 18 }).like(['HI', 'newbie', 'AAT', 'newbie2'])).be.eql(like);
    });

    it('should throw when the methods are out of range', () => {
      should(() => new Feels({ temp: 20, dewPoint: 18 }).like('something')).throw('Methods must be one of: HI, AWBGT, HI_CA, AAT, WCI');
      should(() => new Feels({ temp: 20, dewPoint: 18 }).like(['something'])).throw('Methods must be one of: HI, AWBGT, HI_CA, AAT, WCI');
      should(() => new Feels({ temp: 20, dewPoint: 18 }).like(['AAT', 'something'])).throw('Methods must be one of: HI, AWBGT, HI_CA, AAT, WCI');
    });

    it('should throw when no valid methods exists', () => {
      should(() => new Feels({ temp: 20, dewPoint: 18 }).like(['WCI'])).throw('No valid methods for these values');
    });
  });
});
