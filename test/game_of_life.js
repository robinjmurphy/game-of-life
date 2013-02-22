(function () {    
    var assert = require('assert'),
        gameOfLife = require('../main/game_of_life.js');

    describe('The Game of Life', function () {
        it('is a module that can be required', function () {
            assert.ok(gameOfLife);
            assert.equal(typeof gameOfLife, 'object');
        });
        it('can be initialized with a grid of a given size', function () {
            var gol = gameOfLife.init(20);

            assert.equal(gol.properties['size'], 20);
        });
        it('has initial conditions that can be set', function () {
            var gol = gameOfLife.init(10);
            
            gol.alive(0, 0).alive(1, 0).alive(2, 4).dead(0, 0);

            assert.equal(gol.get(0, 0), gol.DEAD);
            assert.equal(gol.get(1, 0), gol.ALIVE);
            assert.equal(gol.get(2, 4), gol.ALIVE);
        });
        it('can tick forward one step', function () {
            var gol = gameOfLife.init(20);

            gol.alive(10, 10);

            assert.equal(gol.properties['time'], 0);
            gol.tick();
            assert.equal(gol.properties['time'], 1);
        });
        it('can perform multiple ticks', function () {
            var gol = gameOfLife.init(20);

            gol.tick().tick().tick();

            assert.equal(gol.properties['time'], 3);
        });
        it('can count the number of living neighbours around a cell', function () {
            var gol = gameOfLife.init(4).alive(0, 0).alive(1, 1);

            assert.equal(gol.neighbours(0, 0), 1);
            assert.equal(gol.neighbours(1, 0), 2);
            assert.equal(gol.neighbours(2, 0), 1);
            assert.equal(gol.neighbours(3, 0), 0);
        });
        it('applies the rules of the game to cells with known state and neighbours', function () {
            assert.equal(gameOfLife.judge(gameOfLife.ALIVE, 1), gameOfLife.DEAD);
            assert.equal(gameOfLife.judge(gameOfLife.DEAD, 1), gameOfLife.DEAD);
            assert.equal(gameOfLife.judge(gameOfLife.ALIVE, 2), gameOfLife.ALIVE);
            assert.equal(gameOfLife.judge(gameOfLife.DEAD, 2), gameOfLife.DEAD);
            assert.equal(gameOfLife.judge(gameOfLife.ALIVE, 3), gameOfLife.ALIVE);
            assert.equal(gameOfLife.judge(gameOfLife.DEAD, 3), gameOfLife.ALIVE);
            assert.equal(gameOfLife.judge(gameOfLife.ALIVE, 4), gameOfLife.DEAD);
            assert.equal(gameOfLife.judge(gameOfLife.DEAD, 4), gameOfLife.DEAD);
        });
    });
})();