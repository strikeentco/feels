'use strict';

var should = require('should/as-function');
var Feels = require('../main');

var heatIndex = Feels.heatIndex;
var AWBGT = Feels.AWBGT;
var humidex = Feels.humidex;
var AAT = Feels.AAT;
var windChill = Feels.windChill;
var getWVP = Feels.getWVP;
var getWVPbyDP = Feels.getWVPbyDP;
var getARH = Feels.getARH;
var getRH = Feels.getRH;
var getADP = Feels.getADP;
var getDP = Feels.getDP;
var getFP = Feels.getFP;

describe('heatIndex()', function() {
  describe('when no arguments are passed', function() {
    it('should throw', function() {
      should(function() {return heatIndex();}).throw('One of the required arguments are not specified');
    });
  });

  describe('when temp is incorrect', function() {
    it('should throw', function() {
      should(function() {return heatIndex(0, 10);}).throw('Heat Index temp must be >= (20C, 68F, 293.15K)');
      should(function() {return heatIndex([], 10);}).throw('Temp must be specified and must be a number');
    });
  });

  describe('when humidity is incorrect', function() {
    it('should throw', function() {
      should(function() {return heatIndex(20, -1);}).throw('Humidity must be in [0, 100]');
    });
  });

  describe('when all arguments are correct', function() {
    it('should be approximately 19.03', function() {
      should(heatIndex(20, 10)).be.approximately(19.03, 0.01);
    });

    it('should be approximately 24.39', function() {
      should(heatIndex(20, 10, true)).be.approximately(24.39, 0.01);
    });
  });
});

describe('AWBGT()', function() {
  describe('when no arguments are passed', function() {
    it('should throw', function() {
      should(function() {return AWBGT();}).throw('One of the required arguments are not specified');
    });
  });

  describe('when temp is incorrect', function() {
    it('should throw', function() {
      should(function() {return AWBGT(0, 10);}).throw('Heat Index temp must be >= (15C, 59F, 288.15K)');
      should(function() {return AWBGT([], 10);}).throw('Temp must be specified and must be a number');
    });
  });

  describe('when humidity is incorrect', function() {
    it('should throw', function() {
      should(function() {return AWBGT(20, -1);}).throw('Humidity must be in [0, 100]');
    });
  });

  describe('when all arguments are correct', function() {
    it('should be approximately 16.19', function() {
      should(AWBGT(20, 10)).be.approximately(16.19, 0.01);
    });

    it('should be approximately 20.11', function() {
      should(AWBGT(20, 10, true)).be.approximately(20.11, 0.01);
    });
  });
});

describe('humidex()', function() {
  describe('when no arguments are passed', function() {
    it('should throw', function() {
      should(function() {return humidex();}).throw('One of the required arguments are not specified');
    });
  });

  describe('when temp is incorrect', function() {
    it('should throw', function() {
      should(function() {return humidex(0, 10);}).throw('Humidex temp must be > (0C, 32F, 273.15K)');
      should(function() {return humidex([], 10);}).throw('Temp must be specified and must be a number');
    });
  });

  describe('when humidity is incorrect', function() {
    it('should throw', function() {
      should(function() {return humidex(20, -1);}).throw('Humidity must be in [0, 100]');
    });
  });

  describe('when all arguments are correct', function() {
    it('should be approximately 15.74', function() {
      should(humidex(20, 10)).be.approximately(15.74, 0.01);
    });

    it('should be approximately 21.27', function() {
      should(humidex(20, 10, true)).be.approximately(21.27, 0.01);
    });
  });
});

describe('AAT()', function() {
  describe('when no arguments are passed', function() {
    it('should throw', function() {
      should(function() {return AAT();}).throw('One of the required arguments are not specified');
    });
  });

  describe('when temp is incorrect', function() {
    it('should throw', function() {
      should(function() {return AAT([], 10, 0);}).throw('Temp must be specified and must be a number');
    });
  });

  describe('when wind speed is incorrect', function() {
    it('should throw', function() {
      should(function() {return AAT(20, -1, 0);}).throw('Wind speed must be >= 0');
    });
  });

  describe('when humidity is incorrect', function() {
    it('should throw', function() {
      should(function() {return AAT(20, 0, -1);}).throw('Humidity must be in [0, 100]');
    });
  });

  describe('when all arguments are correct', function() {
    it('should be approximately 16.76', function() {
      should(AAT(20, 0, 10)).be.approximately(16.76, 0.01);
    });

    it('should be approximately 20.05', function() {
      should(AAT(20, 0, 10, true)).be.approximately(20.05, 0.01);
    });
  });
});

describe('windChill()', function() {
  describe('when no arguments are passed', function() {
    it('should throw', function() {
      should(function() {return windChill();}).throw('One of the required arguments are not specified');
    });
  });

  describe('when temp is incorrect', function() {
    it('should throw', function() {
      should(function() {return windChill(1, 10);}).throw('Wind Chill temp must be <= (0C, 32F, 273.15K)');
      should(function() {return windChill([], 10);}).throw('Temp must be specified and must be a number');
    });
  });

  describe('when wind speed is incorrect', function() {
    it('should throw', function() {
      should(function() {return windChill(0, -1);}).throw('Wind speed must be >= 0');
    });
  });

  describe('when all arguments are correct', function() {
    it('should be equal -20', function() {
      should(windChill(-20, 0)).be.eql(-20);
    });

    it('should be approximately -33.55', function() {
      should(windChill(-20, 10)).be.approximately(-33.55, 0.01);
    });
  });
});

describe('getWVP()', function() {
  describe('when no arguments are passed', function() {
    it('should throw', function() {
      should(function() {return getWVP();}).throw('One of the required arguments are not specified');
    });
  });

  describe('when humidity is incorrect', function() {
    it('should be equal 0', function() {
      should(getWVP(-20, 0)).be.eql(0);
    });

    it('should throw', function() {
      should(function() {return getWVP([]);}).throw('One of the required arguments are not specified');
    });
  });

  describe('when temp is incorrect', function() {
    it('should throw', function() {
      should(function() {return getWVP(0, []);}).throw('Temp must be specified and must be a number');
    });
  });

  describe('when all arguments are correct', function() {
    it('should be approximately 4.66', function() {
      should(getWVP(20, 20)).be.approximately(4.66, 0.01);
    });

    it('should be approximately 0.56', function() {
      should(getWVP(45, -20)).be.approximately(0.56, 0.01);
    });
  });
});

describe('getWVPbyDP()', function() {
  describe('when no arguments are passed', function() {
    it('should throw', function() {
      should(function() {return getWVPbyDP();}).throw('Dew point is not specified');
    });
  });

  describe('when dew point is incorrect', function() {
    it('should throw', function() {
      should(function() {return getWVPbyDP([]);}).throw('Temp must be specified and must be a number');
    });
  });

  describe('when all arguments are correct', function() {
    it('should be approximately 9.15', function() {
      should(getWVPbyDP(5.7)).be.approximately(9.15, 0.01);
    });

    it('should be approximately 20.81', function() {
      should(getWVPbyDP(18)).be.approximately(20.81, 0.01);
    });
  });
});

describe('getARH()', function() {
  describe('when no arguments are passed', function() {
    it('should throw', function() {
      should(function() {return getARH();}).throw('One of the required arguments are not specified');
    });
  });

  describe('when temp is incorrect', function() {
    it('should throw', function() {
      should(function() {return getARH([], 10);}).throw('Temp must be specified and must be a number');
    });
  });

  describe('when dew point is incorrect', function() {
    it('should throw', function() {
      should(function() {return getARH(0, []);}).throw('Temp must be specified and must be a number');
    });
  });

  describe('when all arguments are correct', function() {
    it('should be equal 50', function() {
      should(getARH(20, 10)).be.eql(50);
    });
  });
});

describe('getRH()', function() {
  describe('when no arguments are passed', function() {
    it('should throw', function() {
      should(function() {return getRH();}).throw('One of the required arguments are not specified');
    });
  });

  describe('when temp is incorrect', function() {
    it('should throw', function() {
      should(function() {return getRH([], 1);}).throw('Temp must be specified and must be a number');
    });
  });

  describe('when WVP is incorrect', function() {
    it('should throw', function() {
      should(function() {return getRH(0, []);}).throw('WVP must be a number');
    });
  });

  describe('when dew point is incorrect', function() {
    it('should throw', function() {
      should(function() {return getRH(0, [], true);}).throw('Temp must be specified and must be a number');
    });
  });

  describe('when all arguments are correct', function() {
    it('should be approximately 42.87', function() {
      should(getRH(20, 10)).be.approximately(42.87, 0.01);
    });

    it('should be approximately 52.74', function() {
      should(getRH(20, 10, true)).be.approximately(52.74, 0.01);
    });
  });
});

describe('getADP()', function() {
  describe('when no arguments are passed', function() {
    it('should throw', function() {
      should(function() {return getADP();}).throw('One of the required arguments are not specified');
    });
  });

  describe('when temp is incorrect', function() {
    it('should throw', function() {
      should(function() {return getADP([], 10);}).throw('Temp must be specified and must be a number');
    });
  });

  describe('when humidity is incorrect', function() {
    it('should be equal 0', function() {
      should(getADP(20, [])).be.eql(0);
    });

    it('should be equal 20', function() {
      should(getADP(20, 120)).be.eql(20);
    });
  });

  describe('when all arguments are correct', function() {
    it('should be equal 18', function() {
      should(getADP(20, 90)).be.eql(18);
    });
  });
});

describe('getDP()', function() {
  describe('when no arguments are passed', function() {
    it('should throw', function() {
      should(function() {return getDP();}).throw('One of the required arguments are not specified');
    });
  });

  describe('when temp is incorrect', function() {
    it('should throw', function() {
      should(function() {return getDP([], 10);}).throw('Temp must be specified and must be a number');
      should(function() {return getDP(-41, 10);}).throw('Dew point temp must be in [-40, 50]');
    });
  });

  describe('when humidity is incorrect', function() {
    it('should throw', function() {
      should(function() {return getDP(1, 0);}).throw('Humidity must be in (0, 100]');
    });
  });

  describe('when all arguments are correct', function() {
    it('should be approximately 18.24', function() {
      should(getDP(20, 90)).be.approximately(18.24, 0.01);
    });
  });
});

describe('getFP()', function() {
  describe('when no arguments are passed', function() {
    it('should throw', function() {
      should(function() {return getFP();}).throw('One of the required arguments are not specified');
    });
  });

  describe('when temp is incorrect', function() {
    it('should throw', function() {
      should(function() {return getFP([], 10);}).throw('Temp must be specified and must be a number');
      should(function() {return getFP(1, 10);}).throw('Frost point temp must be in [-80, 0]');
    });
  });

  describe('when humidity is incorrect', function() {
    it('should throw', function() {
      should(function() {return getFP(-1, 0);}).throw('Humidity must be in (0, 100]');
    });
  });

  describe('when all arguments are correct', function() {
    it('should be approximately -42.14', function() {
      should(getFP(-40, 80)).be.approximately(-42.14, 0.01);
    });
  });
});
