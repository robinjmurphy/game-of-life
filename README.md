# Game of Life

[![Build Status](https://travis-ci.org/robinjmurphy/game-of-life.png)](https://travis-ci.org/robinjmurphy/game-of-life)

A Javascript implementation of [Conway's Game of Life](http://en.wikipedia.org/wiki/Conway's_Game_of_Life).

There is currently only a command line view, which is run using [Node](http://nodejs.org). A simple example with a single oscillator can be run with:

```
$ node examples/game.js
```

Tests are written using the [Mocha framework](http://visionmedia.github.com/mocha/). To run the tests, install Mocha using [npm](https://npmjs.org/package/mocha) and run the `make test` command.

```
$ npm install mocha
$ make test
```
