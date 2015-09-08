'use strict';

var should = require('should/as-function');
var tempConvert = require('../lib/helpers').tempConvert;
var speedConvert = require('../lib/helpers').speedConvert;

describe('helpers.tempConvert()', function() {
  describe('when no arguments are passed', function() {
    it('should throw', function() {
      should(function() {return tempConvert();}).throw('Temp must be specified and must be a number');
      should(function() {return tempConvert(0, 't', 'f');}).throw('Units must be c, f or k');
      should(function() {return tempConvert(0, 'f', 't');}).throw('Units must be c, f or k');
    });
  });

  describe('when all arguments are passed', function() {
    it('should be equal 10', function() {
      should(tempConvert(10, 'c', 'c')).be.eql(10);
      should(tempConvert(50, 'f', 'c')).be.eql(10);
      should(tempConvert(283.15, 'k', 'c')).be.eql(10);
    });

    it('should be equal 50', function() {
      should(tempConvert(10, 'c', 'f')).be.eql(50);
      should(tempConvert(50, 'f', 'f')).be.eql(50);
      should(tempConvert(283.15, 'k', 'f')).be.eql(50);
    });

    it('should be equal 283.15', function() {
      should(tempConvert(10, 'c', 'k')).be.eql(283.15);
      should(tempConvert(50, 'f', 'k')).be.eql(283.15);
      should(tempConvert(283.15, 'k', 'k')).be.eql(283.15);
    });
  });
});

describe('helpers.speedConvert()', function() {
  describe('when no arguments are passed', function() {
    it('should throw', function() {
      should(function() {return speedConvert();}).throw('Speed must be a number');
      should(function() {return speedConvert(0, 't', 'mps');}).throw('Units must be mps, mph or kph');
      should(function() {return speedConvert(0, 'mph', 't');}).throw('Units must be mps, mph or kph');
    });
  });

  describe('when all arguments are passed', function() {
    it('should be correct', function() {
      should(speedConvert(20, 'mps', 'mps')).be.eql(20);
      should(speedConvert(20, 'mps', 'mph')).be.approximately(44.73, 0.01);
      should(speedConvert(20, 'mps', 'kph')).be.eql(72);
    });

    it('should be correct', function() {
      should(speedConvert(40, 'mph', 'mps')).be.eql(17.8816);
      should(speedConvert(40, 'mph', 'mph')).be.eql(40);
      should(speedConvert(40, 'mph', 'kph')).be.eql(64.37376);
    });

    it('should be correct', function() {
      should(speedConvert(60, 'kph', 'mps')).be.approximately(16.66, 0.01);
      should(speedConvert(60, 'kph', 'mph')).be.approximately(37.28, 0.01);
      should(speedConvert(60, 'kph', 'kph')).be.eql(60);
    });
  });
});
