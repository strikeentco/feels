feels [![License](https://img.shields.io/npm/l/feels.svg)](https://github.com/strikeentco/feels/blob/master/LICENSE)  [![npm](https://img.shields.io/npm/v/feels.svg)](https://www.npmjs.com/package/feels)
==========
[![Build Status](https://travis-ci.org/strikeentco/feels.svg)](https://travis-ci.org/strikeentco/feels)  [![node](https://img.shields.io/node/v/feels.svg)](https://www.npmjs.com/package/feels) [![Test Coverage](https://codeclimate.com/github/strikeentco/feels/badges/coverage.svg)](https://codeclimate.com/github/strikeentco/feels/coverage) [![bitHound Score](https://www.bithound.io/github/strikeentco/feels/badges/score.svg)](https://www.bithound.io/github/strikeentco/feels)

`Feels` allow you to calculate [apparent temperature](https://en.wikipedia.org/wiki/Apparent_temperature) using [heat index](https://en.wikipedia.org/wiki/Heat_index), approximate [wet-bulb globe temperature](https://en.wikipedia.org/wiki/Wet-bulb_globe_temperature), [humidex](https://en.wikipedia.org/wiki/Humidex), [australian apparent temperature](https://en.wikipedia.org/wiki/Wind_chill#Australian_Apparent_Temperature) and [wind chill](https://en.wikipedia.org/wiki/Wind_chill).

Combinations of this methods also named as `Feels like`, `Real feel` etc.

You can also convert temperature, speed and calculate `relative humidity`, `dew point`, `frost point`, `water vapour pressure` using [class](#class-methods) or [standalone](#standalone-methods) methods.

# Usage

```sh
$ npm install feels --save
```

```javascript
const Feels = require('feels');

const config = {
  temp: 20,
  humidity: 85,
  speed: 20,
  units: {
    temp: 'c',
    speed: 'mps'
  }
};

new Feels(config).like();
```

## Quick navigation
* [Class methods](#class-methods)
  * [.setOptions(options)](#setoptionsoptions)
  * [.like([methods])](#likemethods)
  * [.addMethod(name, method)](#addmethodname-method)
  * [.registerMethod(method)](#registermethodmethod)
  * [.registerMethods(methods)](#registermethodsmethods)
  * [.heatIndex()](#heatindex)
  * [.AWBGT()](#awbgt)
  * [.humidex()](#humidex)
  * [.AAT()](#aat)
  * [.windChill()](#windchill)
  * [.getWVP()](#getwvp)
  * [.getWVPbyDP()](#getwvpbydp)
  * [.getARH()](#getarh)
  * [.getRH()](#getrh)
  * [.getADP()](#getadp)
  * [.getDP()](#getdp)
  * [.getFP()](#getfp)
* [Standalone methods](#standalone-methods)
  * [Temperature convert](#temperature-convert)
  * [Speed convert](#speed-convert)
  * [Heat index](#heat-index)
  * [Approximate WBGT](#approximate-wbgt)
  * [Humidex](#humidex-1)
  * [Australian Apparent Temperature](#australian-apparent-temperature)
  * [Wind chill](#wind-chill)
  * [Water vapour pressure](#water-vapour-pressure)
  * [Approximate relative humidity](#approximate-relative-humidity)
  * [Relative humidity](#relative-humidity)
  * [Approximate dew point](#approximate-dew-point)
  * [Dew point](#dew-point)
  * [Frost point](#frost-point)

# API

# Class methods

Most of the class methods also available as [standalone methods](#standalone-methods).

### new Feels(options)

Constructor.

#### Params:
* **options** (*Object*) - Feels options:
  * **temp** (*Float*) - Temperature in `Celsius`, `Fahrenheit` or `Kelvin`, depends on units type.
  * **humidity** (*Float*) - Relative humidity in percent.
  * **speed** (*Float*) - Wind speed in meters per second, miles per hour or kilometers per hour, depends on units type.
  * **dewPoint** (*Float*) - Dew point in `Celsius`, `Fahrenheit`, `Kelvin` depends on units type.
  * **wvp** (*Float*) - Water vapour pressure in `hPa`.
  * **units** (*Object*) - Units type:
    * **temp** (*String*) - `c`, `f`, `k` (by default `c`).
    * **speed** (*String*) - `mps`, `mph`, `kph` (by default `mps`).

```javascript
const Feels = require('feels');

new Feels({ temp: 20, humidity: 80.9 }).toF().humidex();
```

### .setOptions(options)

Sets the options.

#### Params:
* **options** (*Object*) - Feels options:
  * **temp** (*Float*) - Temperature in `Celsius`, `Fahrenheit` or `Kelvin`, depends on units type.
  * **humidity** (*Float*) - Relative humidity in percent.
  * **speed** (*Float*) - Wind speed in meters per second, miles per hour or kilometers per hour, depends on units type.
  * **dewPoint** (*Float*) - Dew point in `Celsius`, `Fahrenheit`, `Kelvin` depends on units type.
  * **wvp** (*Float*) - Water vapour pressure in `hPa`.
  * **units** (*Object*) - Units type:
    * **temp** (*String*) - `c`, `f`, `k` (by default `c`).
    * **speed** (*String*) - `mps`, `mph`, `kph` (by default `mps`).

```javascript
const Feels = require('feels');
const feels = new Feels();
const config = {
  temp: 20,
  humidity: 85,
  speed: 20,
  units: {
    temp: 'c',
    speed: 'mps'
  }
};

feels.setOptions(config);
feels.AAT();
```

### .like([methods])

Calculates apparent temperature using specified methods.

If methods aren't provided returns an index which is calculated with `['HI', 'HI_CA', 'AAT', 'WCI']`.

#### Params:
* **[methods]** (*String|Array*) - String or array with one of the apparent temperature [acronyms](#acronyms).

### Acronyms
* **HI** - Heat index ([Feels().heatIndex()](#heatindex) or [heatIndex()](#heat-index)).
* **AWBGT** - Approximate wet-bulb globe temperature ([Feels().AWBGT()](#awbgt) or [AWBGT()](#approximate-wbgt)).
* **HI_CA** - Humidex ([Feels().humidex()](#humidex) or [humidex()](#humidex-1)).
* **AAT** - Australian apparent temperature ([Feels().AAT()](#aat) or [AAT()](#australian-apparent-temperature)).
* **WCI** - Wind chill ([Feels().windChill()](#windchill) or [windChill()](#wind-chill)).

If you want to convert temperature from one to other temperature scale, you can place `.toC()`, `.toF()` or `.toK()` before target method.

```javascript
new Feels(config).toF().like(['AAT', 'HI_CA']);
```

### .addMethod(name, method)

Adds new method, which can be used by itself or in [`.like()`](#likemethods).

#### Params:
* **name** (*String*) - Method name.
* **method** (*Function*) - The method itself.

```javascript
const feels = new Feels();
feels.addMethod('newbie', () => (feels.heatIndex() + feels.humidex()) / 2);
feels.addMethod('newbie2', function () {
  return (this.heatIndex() + this.humidex()) / 2;
});

feels.setOptions({ temp: 20, dewPoint: 18 });
feels.newbie();
feels.like(['AAT', 'newbie2']);
```

### .registerMethod(method)
#### Params:
* **method** (*String*) - Method name.

### .registerMethods(methods)

Allows you to create your own methods which can be used in [`.like()`](#likemethods), by inheriting the base class.

#### Params:
* **methods** (*Array*) - Method names.

```javascript
class NewFeels extends Feels {
  constructor(opts) {
    super(opts);
    this.registerMethods(['newbie', 'newbie2']);
  }
  newbie() {
    return (this.heatIndex() + this.humidex()) / 2;
  }
  newbie2() {
    return (this.heatIndex() + this.humidex()) / 2;
  }
}

const feels = new NewFeels({ temp: 20, dewPoint: 18 });

feels.newbie();
feels.like(['AAT', 'newbie2']);
```

### .heatIndex()
#### Params:
* **options** (*Object*) - Constructor options:
  * **temp** (*Float*)
  * **humidity|dewPoint** (*Float*)

### .AWBGT()
#### Params:
* **options** (*Object*) - Constructor options:
  * **temp** (*Float*)
  * **humidity|dewPoint** (*Float*)

### .humidex()
#### Params:
* **options** (*Object*) - Constructor options:
  * **temp** (*Float*)
  * **humidity|dewPoint** (*Float*)

### .AAT()
#### Params:
* **options** (*Object*) - Constructor options:
  * **temp** (*Float*)
  * **speed** (*Float*)
  * **humidity|dewPoint** (*Float*)

### .windChill()
#### Params:
* **options** (*Object*) - Constructor options:
  * **temp** (*Float*)
  * **speed** (*Float*)

### .getWVP()
#### Params:
* **options** (*Object*) - Constructor options:
  * **humidity** (*Float*)
  * **temp** (*Float*)

### .getWVPbyDP()
#### Params:
* **options** (*Object*) - Constructor options:
  * **dewPoint** (*Float*)

### .getARH()
#### Params:
* **options** (*Object*) - Constructor options:
  * **temp** (*Float*)
  * **dewPoint** (*Float*)

### .getRH()
#### Params:
* **options** (*Object*) - Constructor options:
  * **temp** (*Float*)
  * **wvp|dewPoint** (*Float*)

### .getADP()
#### Params:
* **options** (*Object*) - Constructor options:
  * **temp** (*Float*)
  * **humidity** (*Float*)

### .getDP()
#### Params:
* **options** (*Object*) - Constructor options:
  * **temp** (*Float*)
  * **humidity** (*Float*)

### .getFP()
#### Params:
* **options** (*Object*) - Constructor options:
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
const Feels = require('feels');

Feels.humidex(20, 80.9);
```

## Temperature convert

### Feels.tempConvert(temp, from, to)

#### Params:
* **temp** (*Float*) - Temperature.
* **from** (*String*) - `c` - Celsius, `f` - Fahrenheit, `k` - Kelvin.
* **to** (*String*) - `c` - Celsius, `f` - Fahrenheit, `k` - Kelvin.

```javascript
const Feels = require('feels');
const humidex = Feels.humidex(20, 80.9);

Feels.tempConvert(humidex, 'c', 'f');
```

## Speed convert

### Feels.speedConvert(speed, from, to)

#### Params:
* **speed** (*Float*) - Speed.
* **from** (*String*) - `mps` - Metre per second, `mph` - Miles per hour, `kph` - Kilometre per hour.
* **to** (*String*) - `mps` - Metre per second, `mph` - Miles per hour, `kph` - Kilometre per hour.

```javascript
const Feels = require('feels');
const speed = Feels.speedConvert(36, 'kph', 'mps');

Feels.AAT(20, speed, 89);
```

## Heat index

The heat index is an index that combines air temperature and relative humidity in an attempt to determine the human-perceived equivalent temperature. [Wiki](https://en.wikipedia.org/wiki/Heat_index)

**Note:** *The heat index is used for temperatures more than 20 Celsius.*

### Feels.heatIndex(temp, humidity)

#### Params:
* **temp** (*Float*) - Temperature in Celsius.
* **humidity** (*Integer*) - Humidity in percent (0 > humidity <= 100).

### Feels.heatIndex(temp, dewPoint, true)

#### Params:
* **temp** (*Float*) - Temperature in Celsius.
* **dewPoint** (*Float*) - Dew point in Celsius.
* **true** (*True*) - Must be `true` for dew point usage.

## Approximate WBGT

The approximate wet-bulb globe temperature is a composite temperature used to estimate the effect of temperature, humidity, wind speed on humans. Unlike WBGT, AWBGT not take into account radiation effect. [Wiki](https://en.wikipedia.org/wiki/Wet-bulb_globe_temperature)

**Note:** *The AWBGT is used for temperatures more than 15 Celsius.*

### Feels.AWBGT(temp, humidity)

#### Params:
* **temp** (*Float*) - Temperature in Celsius.
* **humidity** (*Integer*) - Humidity in percent (0 > humidity <= 100).

### Feels.AWBGT(temp, dewPoint, true)

#### Params:
* **temp** (*Float*) - Temperature in Celsius.
* **dewPoint** (*Float*) - Dew point in Celsius.
* **true** (*True*) - Must be `true` for dew point usage.

## Humidex

The humidex is an index number used by Canadian meteorologists to describe how hot the weather feels to the average person, by combining the effect of heat and humidity. [Wiki](https://en.wikipedia.org/wiki/Humidex)

**Note:** *The humidex is used for temperatures more than 0 Celsius.*

### Feels.humidex(temp, humidity)

#### Params:
* **temp** (*Float*) - Temperature in Celsius.
* **humidity** (*Integer*) - Humidity in percent (0 > humidity <= 100).

### Feels.humidex(temp, dewPoint, true)

#### Params:
* **temp** (*Float*) - Temperature in Celsius.
* **dewPoint** (*Float*) - Dew point in Celsius.
* **true** (*True*) - Must be `true` for dew point usage.

## Australian Apparent Temperature

The AAT is an index number used by the Australian Bureau of Meteorology to describe heat balance in the human body. [Wiki](https://en.wikipedia.org/wiki/Wind_chill#Australian_Apparent_Temperature)

### Feels.AAT(temp, speed, humidity)

#### Params:
* **temp** (*Float*) - Temperature in Celsius.
* **speed** (*Float*) - Speed in meters per second.
* **humidity** (*Integer*) - Humidity in percent (0 > humidity <= 100).

### Feels.AAT(temp, speed, dewPoint, true)

#### Params:
* **temp** (*Float*) - Temperature in Celsius.
* **speed** (*Float*) - Speed in meters per second.
* **dewPoint** (*Float*) - Dew point in Celsius.
* **true** (*True*) - Must be `true` for dew point usage.

## Wind chill

Wind chill is the perceived decrease in air temperature felt by the body on exposed skin due to the flow of air. [Wiki](https://en.wikipedia.org/wiki/Wind_chill)

**Note:** *The humidex is used for temperatures less than 0 Celsius.*

### Feels.windChill(temp, speed)

#### Params:
* **temp** (*Float*) - Temperature in Celsius.
* **speed** (*Float*) - Speed in meters per second.

## Water vapour pressure

### Feels.getWVP(temp, humidity)

#### Params:
* **temp** (*Float*) - Temperature in Celsius.
* **humidity** (*Integer*) - Humidity in percent (0 > humidity <= 100).

### Feels.getWVPbyDP(dewPoint)

#### Params:
* **dewPoint** (*Float*) - Dew point in Celsius.

## Approximate relative humidity

### Feels.getARH(temp, dewPoint)

#### Params:
* **temp** (*Float*) - Temperature in Celsius.
* **dewPoint** (*Float*) - Dew point in Celsius.

## Relative humidity

### Feels.getRH(temp, WVP)

#### Params:
* **temp** (*Float*) - Temperature in Celsius.
* **WVP** (*Float*) - Water vapour pressure.

### Feels.getRH(temp, dewPoint, true)

#### Params:
* **temp** (*Float*) - Temperature in Celsius.
* **dewPoint** (*Float*) - Dew point in Celsius.
* **true** (*True*) - Must be `true` for dew point usage.

## Approximate dew point

### Feels.getADP(temp, humidity)

#### Params:
* **temp** (*Float*) - Temperature in Celsius.
* **humidity** (*Integer*) - Humidity in percent (0 > humidity <= 100).

## Dew point

### Feels.getDP(temp, humidity)

#### Params:
* **temp** (*Float*) - Temperature in Celsius.
* **humidity** (*Integer*) - Humidity in percent (0 > humidity <= 100).

## Frost point

### Feels.getFP(temp, humidity)

#### Params:
* **temp** (*Float*) - Temperature in Celsius.
* **humidity** (*Integer*) - Humidity in percent (0 > humidity <= 100).

## License

The MIT License (MIT)<br/>
Copyright (c) 2015-2016 Alexey Bystrov
