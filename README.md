feels
==========
[![Build Status](https://travis-ci.org/strikeentco/feels.svg)](https://travis-ci.org/strikeentco/feels) [![License](https://img.shields.io/github/license/strikeentco/feels.svg?style=flat)](https://github.com/strikeentco/feels/blob/master/LICENSE)  [![npm](https://img.shields.io/npm/v/feels.svg?style=flat)](https://www.npmjs.com/package/feels) [![bitHound Score](https://www.bithound.io/github/strikeentco/feels/badges/score.svg)](https://www.bithound.io/github/strikeentco/feels)

`Feels` allow you to calculate [apparent temperature](https://en.wikipedia.org/wiki/Apparent_temperature) using [heat index](https://en.wikipedia.org/wiki/Heat_index), approximate [wet-bulb globe temperature](https://en.wikipedia.org/wiki/Wet-bulb_globe_temperature), [humidex](https://en.wikipedia.org/wiki/Humidex), [australian apparent temperature](https://en.wikipedia.org/wiki/Wind_chill#Australian_Apparent_Temperature) and [wind chill](https://en.wikipedia.org/wiki/Wind_chill).

Combinations of this methods also named as Feels like, Real feel etc.

You can also calculate relative humidity, dew point, frost point, water vapour pressure using [class](#class-methods) or [standalone](#standalone-methods) methods.

# Usage

```sh
npm install feels
```

```javascript
var Feels = require('feels');

var config = {
  temp: 20,
  humidity: 85,
  speed: 20,
  units: {
    temp: 'c',
    speed: 'mps'
  }
};
console.log(Feels(config).like());
```


# API

## Class methods

Most of the class methods also available as [standalone methods](#standalone-methods).

```javascript
var Feels = require('feels');

console.log(Feels({temp: 20, humidity: 80.9}).toF().humidex());
```

### Feels(options)

#### Params:
* **options** (*Object*) - Feels options:
  * **temp** (*Float*) - Temperature in Celsius, Fahrenheit or Kelvin, depends on units type.
  * **humidity** (*Float*) - Relative humidity in percent.
  * **speed** (*Float*) - Wind speed in meters per second, miles per hour or kilometers per hour, depends on units type.
  * **dewPoint** (*Float*) - Dew point in Celsius, Fahrenheit, Kelvin depends on units type.
  * **units** (*Object*) - Units type:
    * **temp** (*String*) - `c`, `f`, `k` (by default `c`).
    * **speed** (*String*) - `mps`, `mph`, `kph` (by default `mps`).

### Feels().like([options])

If options aren't provided returns an index is calculated with ['HI', 'HI_CA', 'AAT', 'WCI'].

#### Params:
* **options** (*String|Array*) - String or array with one of the apparent temperature [acronyms](#acronyms).

### Acronyms
* **HI** - Heat index ([Feels().heatIndex()](#feelsoptionsheatindex) or [heatIndex()](#heat-index)).
* **AWBGT** - Approximate wet-bulb globe temperature ([Feels().AWBGT()](#feelsoptionsawbgt) or [AWBGT()](#approximate-wbgt)).
* **HI_CA** - Humidex ([Feels().humidex()](#feelsoptionshumidex) or [humidex()](#humidex)).
* **AAT** - Australian apparent temperature ([Feels().AAT()](#feelsoptionsaat) or [AAT()](#australian-apparent-temperature)).
* **WCI** - Wind chill ([Feels().windChill()](#feelsoptionswindchill) or [windChill()](#wind-chill)).

If you want to convert temperature from one to other temperature scale, you can place `.toC()`, `.toF()` or `.toK()` before target method.

### Feels(options).heatIndex()
#### Params:
* **options** (*Object*) - Options:
  * **temp** (*Float*)
  * **humidity|dewPoint** (*Float*)

### Feels(options).AWBGT()
#### Params:
* **options** (*Object*) - Options:
  * **temp** (*Float*)
  * **humidity|dewPoint** (*Float*)

### Feels(options).humidex()
#### Params:
* **options** (*Object*) - Options:
  * **temp** (*Float*)
  * **humidity|dewPoint** (*Float*)

### Feels(options).AAT()
#### Params:
* **options** (*Object*) - Options:
  * **temp** (*Float*)
  * **speed** (*Float*)
  * **humidity|dewPoint** (*Float*)

### Feels(options).windChill()
#### Params:
* **options** (*Object*) - Options:
  * **temp** (*Float*)
  * **speed** (*Float*)

### Feels(options).getWVP()
#### Params:
* **options** (*Object*) - Options:
  * **humidity** (*Float*)
  * **temp** (*Float*)

### Feels(options).getWVPbyDP()
#### Params:
* **options** (*Object*) - Options:
  * **dewPoint** (*Float*)

### Feels(options).getARH()
#### Params:
* **options** (*Object*) - Options:
  * **temp** (*Float*)
  * **dewPoint** (*Float*)

### Feels(options).getRH()
#### Params:
* **options** (*Object*) - Options:
  * **temp** (*Float*)
  * **dewPoint** (*Float*)

### Feels(options).getADP()
#### Params:
* **options** (*Object*) - Options:
  * **temp** (*Float*)
  * **humidity** (*Float*)

### Feels(options).getDP()
#### Params:
* **options** (*Object*) - Options:
  * **temp** (*Float*)
  * **humidity** (*Float*)

### Feels(options).getFP()
#### Params:
* **options** (*Object*) - Options:
  * **temp** (*Float*)
  * **humidity** (*Float*)

### Aliases
* **toC()** - *toCelsius()*
* **toF()** - *toFahrenheit()*
* **toK()** - *toKelvin()*
* **getWVP()** - *getWaterVapourPressure()*
* **getWVPbyDP()** - *getWaterVapourPressureByDewPoint()*
* **getARH()** - *getAproximateRelativeHumidity()*
* **getRH()** - *getRelativeHumidity()*
* **getADP()** - *getAproximateDewPoint()*
* **getDP()** - *getDewPoint()*
* **getFP()** - *getFrostPoint()*

## Standalone methods

All standalone methods use temperature in Celsius, humidity in percent and wind speed in meters per second.

```javascript
var humidex = require('feels').humidex;

console.log(humidex(20, 80.9));
```

## Heat index

The heat index is an index that combines air temperature and relative humidity in an attempt to determine the human-perceived equivalent temperature. [Wiki](https://en.wikipedia.org/wiki/Heat_index)

**Note:** *The heat index is used for temperatures more than 20 Celsius.*

### heatIndex(temp, humidity)

#### Params:
* **temp** (*Float*) - Temperature in Celsius.
* **humidity** (*Integer*) - Humidity in percent (from 0 to 100).

### heatIndex(temp, dewPoint, true)

#### Params:
* **temp** (*Float*) - Temperature in Celsius.
* **dewPoint** (*Float*) - Dew point in Celsius.
* **true** (*True*) - Must be `true` for dew point usage.

## Approximate WBGT

The approximate wet-bulb globe temperature is a composite temperature used to estimate the effect of temperature, humidity, wind speed on humans. Unlike WBGT, AWBGT not take into account radiation effect. [Wiki](https://en.wikipedia.org/wiki/Wet-bulb_globe_temperature)

**Note:** *The AWBGT is used for temperatures more than 15 Celsius.*

### AWBGT(temp, humidity)

#### Params:
* **temp** (*Float*) - Temperature in Celsius.
* **humidity** (*Integer*) - Humidity in percent (from 0 to 100).

### AWBGT(temp, dewPoint, true)

#### Params:
* **temp** (*Float*) - Temperature in Celsius.
* **dewPoint** (*Float*) - Dew point in Celsius.
* **true** (*True*) - Must be `true` for dew point usage.

## Humidex

The humidex is an index number used by Canadian meteorologists to describe how hot the weather feels to the average person, by combining the effect of heat and humidity. [Wiki](https://en.wikipedia.org/wiki/Humidex)

**Note:** *The humidex is used for temperatures more than 0 Celsius.*

### humidex(temp, humidity)

#### Params:
* **temp** (*Float*) - Temperature in Celsius.
* **humidity** (*Integer*) - Humidity in percent (from 0 to 100).

### humidex(temp, dewPoint, true)

#### Params:
* **temp** (*Float*) - Temperature in Celsius.
* **dewPoint** (*Float*) - Dew point in Celsius.
* **true** (*True*) - Must be `true` for dew point usage.

## Australian Apparent Temperature

The AAT is an index number used by the Australian Bureau of Meteorology to describe heat balance in the human body. [Wiki](https://en.wikipedia.org/wiki/Wind_chill#Australian_Apparent_Temperature)

### AAT(temp, speed, humidity)

#### Params:
* **temp** (*Float*) - Temperature in Celsius.
* **speed** (*Float*) - Speed in meters per second.
* **humidity** (*Integer*) - Humidity in percent (from 0 to 100).

### AAT(temp, speed, dewPoint, true)

#### Params:
* **temp** (*Float*) - Temperature in Celsius.
* **speed** (*Float*) - Speed in meters per second.
* **dewPoint** (*Float*) - Dew point in Celsius.
* **true** (*True*) - Must be `true` for dew point usage.

## Wind chill

Wind chill is the perceived decrease in air temperature felt by the body on exposed skin due to the flow of air. [Wiki](https://en.wikipedia.org/wiki/Wind_chill)

**Note:** *The humidex is used for temperatures less than 0 Celsius.*

### windChill(temp, speed)

#### Params:
* **temp** (*Float*) - Temperature in Celsius.
* **speed** (*Float*) - Speed in meters per second.

## Water vapour pressure

### getWVP(humidity, temp)

#### Params:
* **humidity** (*Integer*) - Humidity in percent (from 0 to 100).
* **temp** (*Float*) - Temperature in Celsius.

### getWVPbyDP(dewPoint)

#### Params:
* **dewPoint** (*Float*) - Dew point in Celsius.

## Approximate relative humidity

### getARH(temp, dewPoint)

#### Params:
* **temp** (*Float*) - Temperature in Celsius.
* **dewPoint** (*Float*) - Dew point in Celsius.

## Relative humidity

### getRH(temp, WVP)

#### Params:
* **temp** (*Float*) - Temperature in Celsius.
* **WVP** (*Float*) - Water vapour pressure.

### getRH(temp, dewPoint, true)

#### Params:
* **temp** (*Float*) - Temperature in Celsius.
* **dewPoint** (*Float*) - Dew point in Celsius.
* **true** (*True*) - Must be `true` for dew point usage.

## Approximate dew point

### getADP(temp, humidity)

#### Params:
* **temp** (*Float*) - Temperature in Celsius.
* **humidity** (*Integer*) - Humidity in percent (from 0 to 100).

## Dew point

### getDP(temp, humidity)

#### Params:
* **temp** (*Float*) - Temperature in Celsius.
* **humidity** (*Integer*) - Humidity in percent (from 0 to 100, except 0).

## Frost point

### getFP(temp, humidity)

#### Params:
* **temp** (*Float*) - Temperature in Celsius.
* **humidity** (*Integer*) - Humidity in percent (from 0 to 100, except 0).

## License

The MIT License (MIT)<br/>
Copyright (c) 2015 Alexey Bystrov
