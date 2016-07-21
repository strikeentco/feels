'use strict';

var should = require('should/as-function');
var Feels = require('../main');

describe('Feels()', function() {
  describe('when no arguments are passed', function() {
    describe('.heatIndex()', function() {
      it('should throw', function() {
        should(function() {return Feels().heatIndex();}).throw('One of the required arguments are not specified');
      });
    });

    describe('.AWBGT()', function() {
      it('should throw', function() {
        should(function() {return Feels().AWBGT();}).throw('One of the required arguments are not specified');
      });
    });

    describe('.humidex()', function() {
      it('should throw', function() {
        should(function() {return Feels().humidex();}).throw('One of the required arguments are not specified');
      });
    });

    describe('.AAT()', function() {
      it('should throw', function() {
        should(function() {return Feels().AAT();}).throw('One of the required arguments are not specified');
      });
    });

    describe('.windChill()', function() {
      it('should throw', function() {
        should(function() {return Feels().windChill();}).throw('One of the required arguments are not specified');
      });
    });

    describe('.getWVP()', function() {
      it('should throw', function() {
        should(function() {return Feels().getWVP();}).throw('One of the required arguments are not specified');
      });
    });

    describe('.getWVPbyDP()', function() {
      it('should throw', function() {
        should(function() {return Feels().getWVPbyDP();}).throw('Dew point is not specified');
      });
    });

    describe('.getARH()', function() {
      it('should throw', function() {
        should(function() {return Feels().getARH();}).throw('One of the required arguments are not specified');
      });
    });

    describe('.getRH()', function() {
      it('should throw', function() {
        should(function() {return Feels().getRH();}).throw('One of the required arguments are not specified');
      });
    });

    describe('.getADP()', function() {
      it('should throw', function() {
        should(function() {return Feels().getADP();}).throw('One of the required arguments are not specified');
      });
    });

    describe('.getDP()', function() {
      it('should throw', function() {
        should(function() {return Feels().getDP();}).throw('One of the required arguments are not specified');
      });
    });

    describe('.getFP()', function() {
      it('should throw', function() {
        should(function() {return Feels().getFP();}).throw('One of the required arguments are not specified');
      });
    });

    describe('.like()', function() {
      it('should throw', function() {
        should(function() {return Feels().like();}).throw('Temp must be specified and must be a number');
      });
    });
  });

  describe('when all arguments are passed', function() {
    var feels;
    beforeEach(function() {
      feels = Feels({temp: 20, humidity: 10, dewPoint: 18});
    });

    describe('.heatIndex()', function() {
      it('should be approximately 24.12', function() {
        feels = Feels({temp: 20, dewPoint: 18});
        should(feels.heatIndex()).be.approximately(24.12, 0.01);
      });

      it('should be approximately 19.03', function() {
        feels = Feels({temp: 20, humidity: 10});
        should(feels.heatIndex()).be.approximately(19.03, 0.01);
      });
    });

    describe('.AWBGT()', function() {
      it('should be approximately 23.45', function() {
        feels = Feels({temp: 20, dewPoint: 18});
        should(feels.AWBGT()).be.approximately(23.45, 0.01);
      });

      it('should be approximately 16.19', function() {
        feels = Feels({temp: 20, humidity: 10});
        should(feels.AWBGT()).be.approximately(16.19, 0.01);
      });
    });

    describe('.humidex()', function() {
      it('should be approximately 26', function() {
        feels = Feels({temp: 20, dewPoint: 18});
        should(feels.humidex()).be.approximately(26, 0.01);
      });

      it('should be approximately 15.74', function() {
        feels = Feels({temp: 20, humidity: 10});
        should(feels.humidex()).be.approximately(15.74, 0.01);
      });
    });

    describe('.AAT()', function() {
      it('should be approximately 22.86', function() {
        feels = Feels({temp: 20, dewPoint: 18});
        should(feels.AAT()).be.approximately(22.86, 0.01);
      });

      it('should be approximately 16.76', function() {
        feels = Feels({temp: 20, humidity: 10});
        should(feels.AAT()).be.approximately(16.76, 0.01);
      });
    });

    describe('.windChill()', function() {
      it('should throw', function() {
        should(function() {return feels.windChill();}).throw('Wind Chill temp must be <= (0C, 32F, 273.15K)');
      });

      it('should be approximately -33.55', function() {
        feels = Feels({temp: -20, speed: 10});
        should(feels.windChill()).be.approximately(-33.55, 0.01);
      });
    });

    describe('.getWVP()', function() {
      it('should be approximately 2.33', function() {
        should(feels.getWVP()).be.approximately(2.33, 0.01);
      });
    });

    describe('.getWVPbyDP()', function() {
      it('should be approximately 20.81', function() {
        should(feels.getWVPbyDP()).be.approximately(20.81, 0.01);
      });
    });

    describe('.getARH()', function() {
      it('should be equal 90', function() {
        should(feels.getARH()).be.eql(90);
      });
    });

    describe('.getRH()', function() {
      it('should be equal 10', function() {
        should(feels.getRH()).be.eql(10);
      });

      it('should be approximately 52.74', function() {
        feels = Feels({temp: 20, dewPoint: 10});
        should(feels.getRH()).be.approximately(52.74, 0.01);
      });
    });

    describe('.getADP()', function() {
      it('should be equal 2', function() {
        should(feels.getADP()).be.eql(2);
      });
    });

    describe('.getDP()', function() {
      it('should be equal 18', function() {
        should(feels.getDP()).be.eql(18);
      });

      it('should be approximately -12.57', function() {
        feels = Feels({temp: 20, humidity: 10});
        should(feels.getDP()).be.approximately(-12.57, 0.01);
      });
    });

    describe('.getFP()', function() {
      it('should throw', function() {
        should(function() {return feels.getFP();}).throw('Frost point temp must be in [-80, 0]');
      });

      it('should be approximately -42.14', function() {
        feels = Feels({temp: -40, humidity: 80});
        should(feels.getFP()).be.approximately(-42.14, 0.01);
      });
    });

    describe('.like()', function() {
      it('should be approximately 22.63', function() {
        should(feels.like()).be.approximately(22.63, 0.01);
      });

      it('should be approximately -41.97', function() {
        feels = Feels({temp: -40, humidity: 80});
        should(feels.like()).be.approximately(-41.97, 0.01);
      });

      it('should be approximately 20.51', function() {
        feels = Feels({temp: 18, humidity: 80});
        should(feels.like()).be.approximately(20.51, 0.01);
      });

      it('should be approximately 22.86', function() {
        should(feels.like('AAT')).be.approximately(22.86, 0.01);
      });

      it('should be approximately 22.51', function() {
        should(feels.like(['HI', 'HI_CA'])).be.approximately(22.51, 0.01);
      });

      it('should ignore invalid algorithm / value combinations', function() {
        should(feels.like(['AAT', 'WCI'])).be.equal(feels.like(['AAT']));
      });

      it('should throw if no valid method exists', function() {
        should(function() {return feels.like(['WCI']);}).throw('No valid methods for these values');
      });

      it('should throw', function() {
        should(function() {return feels.like('WCI');}).throw('Wind Chill temp must be <= (0C, 32F, 273.15K)');
      });

      it('should throw', function() {
        should(function() {return feels.like('WCI_CA');}).throw('Methods must be one of: HI, HI_CA, AAT, WCI');
      });

      it('should throw', function() {
        should(function() {return feels.like(['AAT_CA', 'WCI']);}).throw('Methods must be one of: HI, HI_CA, AAT, WCI');
      });
    });

    describe('.toC()', function() {
      it('should be approximately 19.03', function() {
        should(Feels({temp: 68, humidity: 10, units: {temp: 'f'}}).toC().heatIndex()).be.approximately(19.03, 0.01);
        should(Feels({temp: 293.15, humidity: 10, units: {temp: 'k'}}).toC().heatIndex()).be.approximately(19.03, 0.01);
        should(Feels({temp: 68, dewPoint: 9.372326, units: {temp: 'f'}}).toC().heatIndex()).be.approximately(19.03, 0.01);
        should(Feels({temp: 293.15, dewPoint: 260.57907, units: {temp: 'k'}}).toC().heatIndex()).be.approximately(19.03, 0.01); //во всех вычислениях с dew point тут и ниже, что-то не так
      });

      it('should be approximately 16.19', function() {
        should(Feels({temp: 68, humidity: 10, units: {temp: 'f'}}).toC().AWBGT()).be.approximately(16.19, 0.01);
        should(Feels({temp: 293.15, humidity: 10, units: {temp: 'k'}}).toC().AWBGT()).be.approximately(16.19, 0.01);
        should(Feels({temp: 68, dewPoint: 9.372326, units: {temp: 'f'}}).toC().AWBGT()).be.approximately(16.20, 0.01);
        should(Feels({temp: 293.15, dewPoint: 260.57907, units: {temp: 'k'}}).toC().AWBGT()).be.approximately(16.20, 0.01);
      });

      it('should be approximately 15.74', function() {
        should(Feels({temp: 68, humidity: 10, units: {temp: 'f'}}).toC().humidex()).be.approximately(15.74, 0.01);
        should(Feels({temp: 293.15, humidity: 10, units: {temp: 'k'}}).toC().humidex()).be.approximately(15.74, 0.01);
        should(Feels({temp: 68, dewPoint: 9.372326, units: {temp: 'f'}}).toC().humidex()).be.approximately(15.74, 0.01);
        should(Feels({temp: 293.15, dewPoint: 260.57907, units: {temp: 'k'}}).toC().humidex()).be.approximately(15.74, 0.01);
      });

      it('should be approximately 16.76', function() {
        should(Feels({temp: 68, humidity: 10, units: {temp: 'f'}}).toC().AAT()).be.approximately(16.76, 0.01);
        should(Feels({temp: 293.15, humidity: 10, units: {temp: 'k'}}).toC().AAT()).be.approximately(16.76, 0.01);
        should(Feels({temp: 68, dewPoint: 9.372326, units: {temp: 'f'}}).toC().AAT()).be.approximately(16.77, 0.01);
        should(Feels({temp: 293.15, dewPoint: 260.57907, units: {temp: 'k'}}).toC().AAT()).be.approximately(16.77, 0.01);
      });

      it('should be approximately -20.3', function() {
        should(Feels({temp: 14, speed: 10, units: {temp: 'f', speed: 'mps'}}).toC().windChill()).be.approximately(-20.3, 0.01);
        should(Feels({temp: 263.15, speed: 10, units: {temp: 'k', speed: 'mps'}}).toC().windChill()).be.approximately(-20.3, 0.01);
      });
    });

    describe('.toF()', function() {
      it('should be approximately 66.24', function() {
        should(Feels({temp: 20, humidity: 10, units: {temp: 'c'}}).toF().heatIndex()).be.approximately(66.24, 0.01);
        should(Feels({temp: 293.15, humidity: 10, units: {temp: 'k'}}).toF().heatIndex()).be.approximately(66.24, 0.01);
        should(Feels({temp: 20, dewPoint: -12.57093, units: {temp: 'c'}}).toF().heatIndex()).be.approximately(66.26, 0.01);
        should(Feels({temp: 293.15, dewPoint: 260.57907, units: {temp: 'k'}}).toF().heatIndex()).be.approximately(66.26, 0.01);
      });

      it('should be approximately 61.15', function() {
        should(Feels({temp: 20, humidity: 10, units: {temp: 'c'}}).toF().AWBGT()).be.approximately(61.15, 0.01);
        should(Feels({temp: 293.15, humidity: 10, units: {temp: 'k'}}).toF().AWBGT()).be.approximately(61.15, 0.01);
        should(Feels({temp: 20, dewPoint: -12.57093, units: {temp: 'c'}}).toF().AWBGT()).be.approximately(61.16, 0.01);
        should(Feels({temp: 293.15, dewPoint: 260.57907, units: {temp: 'k'}}).toF().AWBGT()).be.approximately(61.16, 0.01);
      });

      it('should be approximately 60.33', function() {
        should(Feels({temp: 20, humidity: 10, units: {temp: 'c'}}).toF().humidex()).be.approximately(60.33, 0.01);
        should(Feels({temp: 293.15, humidity: 10, units: {temp: 'k'}}).toF().humidex()).be.approximately(60.33, 0.01);
        should(Feels({temp: 20, dewPoint: -12.57093, units: {temp: 'c'}}).toF().humidex()).be.approximately(60.34, 0.01);
        should(Feels({temp: 293.15, dewPoint: 260.57907, units: {temp: 'k'}}).toF().humidex()).be.approximately(60.34, 0.01);
      });

      it('should be approximately 62.18', function() {
        should(Feels({temp: 20, humidity: 10, units: {temp: 'c'}}).toF().AAT()).be.approximately(62.18, 0.01);
        should(Feels({temp: 293.15, humidity: 10, units: {temp: 'k'}}).toF().AAT()).be.approximately(62.18, 0.01);
        should(Feels({temp: 20, dewPoint: -12.57093, units: {temp: 'c'}}).toF().AAT()).be.approximately(62.19, 0.01);
        should(Feels({temp: 293.15, dewPoint: 260.57907, units: {temp: 'k'}}).toF().AAT()).be.approximately(62.19, 0.01);
      });

      it('should be approximately -4.54', function() {
        should(Feels({temp: -10, speed: 10, units: {speed: 'mps'}}).toF().windChill()).be.approximately(-4.54, 0.01);
        should(Feels({temp: 263.15, speed: 36, units: {temp: 'k', speed: 'kph'}}).toF().windChill()).be.approximately(-4.54, 0.01);
      });
    });

    describe('.toK()', function() {
      it('should be approximately 292.17', function() {
        should(Feels({temp: 20, humidity: 10, units: {temp: 'c'}}).toK().heatIndex()).be.approximately(292.17, 0.01);
        should(Feels({temp: 68, humidity: 10, units: {temp: 'f'}}).toK().heatIndex()).be.approximately(292.17, 0.01);
        should(Feels({temp: 20, dewPoint: -12.57093, units: {temp: 'c'}}).toK().heatIndex()).be.approximately(292.18, 0.01);
        should(Feels({temp: 68, dewPoint: 9.372326, units: {temp: 'f'}}).toK().heatIndex()).be.approximately(292.18, 0.01);
      });

      it('should be approximately 289.34', function() {
        should(Feels({temp: 20, humidity: 10, units: {temp: 'c'}}).toK().AWBGT()).be.approximately(289.34, 0.01);
        should(Feels({temp: 68, humidity: 10, units: {temp: 'f'}}).toK().AWBGT()).be.approximately(289.34, 0.01);
        should(Feels({temp: 20, dewPoint: -12.57093, units: {temp: 'c'}}).toK().AWBGT()).be.approximately(289.35, 0.01);
        should(Feels({temp: 68, dewPoint: 9.372326, units: {temp: 'f'}}).toK().AWBGT()).be.approximately(289.35, 0.01);
      });

      it('should be approximately 288.89', function() {
        should(Feels({temp: 20, humidity: 10, units: {temp: 'c'}}).toK().humidex()).be.approximately(288.89, 0.01);
        should(Feels({temp: 68, humidity: 10, units: {temp: 'f'}}).toK().humidex()).be.approximately(288.89, 0.01);
        should(Feels({temp: 20, dewPoint: -12.57093, units: {temp: 'c'}}).toK().humidex()).be.approximately(288.89, 0.01);
        should(Feels({temp: 68, dewPoint: 9.372326, units: {temp: 'f'}}).toK().humidex()).be.approximately(288.89, 0.01);
      });

      it('should be approximately 289.91', function() {
        should(Feels({temp: 20, humidity: 10, units: {temp: 'c'}}).toK().AAT()).be.approximately(289.91, 0.01);
        should(Feels({temp: 68, humidity: 10, units: {temp: 'f'}}).toK().AAT()).be.approximately(289.91, 0.01);
        should(Feels({temp: 20, dewPoint: -12.57093, units: {temp: 'c'}}).toK().AAT()).be.approximately(289.92, 0.01);
        should(Feels({temp: 68, dewPoint: 9.372326, units: {temp: 'f'}}).toK().AAT()).be.approximately(289.92, 0.01);
      });

      it('should be approximately 252.84', function() {
        should(Feels({temp: -10, speed: 10, units: {temp: 'c', speed: 'mps'}}).toK().windChill()).be.approximately(252.84, 0.01);
        should(Feels({temp: 14, speed: 22.369, units: {temp: 'f', speed: 'mph'}}).toK().windChill()).be.approximately(252.84, 0.01);
      });
    });
  });
});
