# lite-event-emitter

A very simple and light event emitter. 

![flask](https://cloud.githubusercontent.com/assets/3584509/24398231/b01a59d0-13a0-11e7-8ed6-c033f97df9a9.png)

[![NPM version][npm-image]][npm-url]
[![NPM downloads][npm-downloads]][npm-url]
[![Travis Status][travis-image]][travis-url]
[![codecov](https://codecov.io/gh/MeirionHughes/lite-event-emitter/branch/master/graph/badge.svg)](https://codecov.io/gh/MeirionHughes/lite-event-emitter)
[![Stability][stability-image]][stability-url]

## install

* `npm install lite-event-emitter` 

## Usage

**on**
```ts
import {LiteEventEmitter} from 'lite-event-emitter'

let events = new LiteEventEmitter();

//add a handler
let dispose = events.on("foo", ()=>{});

//fire off an event
events.emit("foo", "bar");

//remove the handler
dispose();
```

**once**
```ts
import {LiteEventEmitter} from 'lite-event-emitter'

let events = new LiteEventEmitter();

events.once("foo", ()=>{});
events.emit("foo", "bar"); // subscription auto-disposed
```


## Credits
"Flask" Icon courtesy of [The Noun Project](https://thenounproject.com/), by [Julien Deveaux](https://thenounproject.com/Julihan/), under [CC 3.0](http://creativecommons.org/licenses/by/3.0/us/)

[npm-url]: https://npmjs.org/package/lite-event-emitter
[npm-image]: http://img.shields.io/npm/v/lite-event-emitter.svg
[npm-downloads]: http://img.shields.io/npm/dm/lite-event-emitter.svg
[travis-url]: https://travis-ci.org/MeirionHughes/lite-event-emitter
[travis-image]: https://img.shields.io/travis/MeirionHughes/lite-event-emitter/master.svg
