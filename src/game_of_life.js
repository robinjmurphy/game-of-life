(function () {
    var app = {},
        Matrix = require('./matrix.js'),
        colours = require('./colours.js'),
        states = {
            'alive': colours.green('X'),
            'dead': colours.red('-')
        },
        grid;   // Private variable containing the matrix

    // Keep track of useful public properties of the application
    app.properties = {
        "size": undefined,
        "time": 0
    };

    // Provide a public interface to the states
    app.DEAD = states['dead'];
    app.ALIVE = states['alive'];

    /**
     * Initialize the application
     * @param Number size - The size of the game of life grid
     * @return this
     */
    app.init = function (size) {
        grid = new Matrix(size);
        grid.setAll(states['dead']);
        this.properties['size'] = size;
        this.properties['time'] = 0;

        return this;
    };

    /**
     * Print out the current state of play
     */
    app.print = function () {
        var prettyGrid = grid.print();

        console.log('\n' + 'Grid size: ' + this.properties['size'] + ', time: ' + this.properties['time'] + '\n' + prettyGrid);
    };

    /**
     * Set the inital condition of a cell
     * @param String state - 'alive' or 'dead'
     * @return this
     */
    app.set = function (x, y, state, matrix) {
        matrix = matrix || grid;
        state = state || states['alive'];
        matrix.set(y, x, state);

        return this;
    };

    /**
     * Get the value of a cell
     * @param Number x
     * @param Number y
     */
    app.get = function (x, y) {
        return grid.get(y, x);
    };

    /**
     * Advance the game by one step
     * @return this
     */
    app.tick = function () {
        update();
        app.properties['time'] += 1;

        return this;
    };

    /**
     * Apply the basic rules of the game
     * @param Number neighbours
     * @param String state
     * @return String - either the alive or dead state
     */
    app.judge = function (state, neighbours) {
        var newState = state;

        if (state === states['dead']) {
            if (neighbours === 3) {
                newState = states['alive'];
            }
        }
        else if (state === states['alive']) {
            if (neighbours >= 4 || neighbours < 2) {
                newState = states['dead'];
            }
        }

        return newState;
    };

    /**
     * Updates the grid based on the rules of the game
     */

    function update() {
        var newGrid = new Matrix(grid.length());

        grid.each(function (y, x) {
            var self = app.get(x, y),
                neighbours = app.neighbours(x, y),
                state = app.judge(self, neighbours);

            app.set(x, y, state, newGrid);
        });

        grid = newGrid;
    }

    /**
     * Count the number of living neighbours immediately around a cell
     * @param Number x
     * @param Number y
     * @return Number neighbours
     */
    app.neighbours = function (x, y) {
        var aliveNeighbours = 0,
            self = grid.get(y, x),
            neighbours = {
                north    : grid.get(y - 1, x),
                northEast: grid.get(y - 1, x + 1),
                east     : grid.get(y, x + 1),
                southEast: grid.get(y + 1, x + 1),
                south    : grid.get(y + 1, x),
                southWest: grid.get(y + 1, x - 1),
                west     : grid.get(y, x - 1),
                northWest: grid.get(y - 1, x - 1)
            };

        for (var neighbour in neighbours) {
            if (neighbours.hasOwnProperty(neighbour)) {
                if (neighbours[neighbour] === states['alive']) {
                    aliveNeighbours ++;
                }
            }
        }

        return aliveNeighbours;
    };

    /*
     * Start off a loop, printing and ticking at each step
     */
    app.start = function start() {
        app.print();
        app.tick();
        setTimeout(function () {
            start();
        }, 1000);
    };

    // Return the exports object
    module.exports = app;
})();