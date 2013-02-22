(function () {
    var Matrix = require('./lib/matrix.js'),
        game = {},
        states = {
            alive: '1',
            dead: '0'
        },
        grid,
        view;

    // Keep track of useful public properties of the application
    game.properties = {
        "size": undefined,
        "time": 0,
        "defaultTimeout": 1000
    };

    // Make the state values available for testing
    game.DEAD = states.dead;
    game.ALIVE = states.alive;

    /**
     * Initialize the application
     * @param Number size - The size of the game of life grid
     * @return this
     */
    game.init = function (size, _view) {
        grid = new Matrix(size);
        view = _view;
        grid.setAll(states.dead);
        this.properties['size'] = size;
        this.properties['time'] = 0;

        return this;
    };

    /**
     * Set the inital condition of a cell
     * @param String state - 'alive' or 'dead'
     * @param Matrix matrix - the matrix to use if not the game grid
     * @return this
     */
    game.set = function (x, y, state, matrix) {
        matrix = matrix || grid;
        state = state || states.alive;
        matrix.set(x, y, state);

        return this;
    };

    /**
     * Utility methods for setting alive/dead cells
     */
    game.alive = function (x, y) {
        return this.set(x, y, states.alive);
    };

    game.dead = function (x, y) {
        return this.set(x, y, states.dead);
    };

    /**
     * Get the value of a cell
     * @param Number x
     * @param Number y
     */
    game.get = function (x, y) {
        return grid.get(x, y);
    };

    /**
     * Advance the game by one step
     * @return this
     */
    game.tick = function () {
        update();
        game.properties['time'] += 1;

        return this;
    };

    /**
     * Apply the basic rules of the game
     * @param Number neighbours
     * @param String state
     * @return String - either the alive or dead state
     */
    game.judge = function (state, neighbours) {
        var newState = state;

        if (state === states.dead) {
            if (neighbours === 3) {
                newState = states.alive;
            }
        }
        else if (state === states.alive) {
            if (neighbours >= 4 || neighbours < 2) {
                newState = states.dead;
            }
        }

        return newState;
    };

    /**
     * Updates the grid based on the rules of the game
     */

    function update() {
        var newGrid = new Matrix(grid.length);

        grid.each(function (x, y) {
            var self = game.get(x, y),
                neighbours = game.neighbours(x, y),
                state = game.judge(self, neighbours);

            game.set(x, y, state, newGrid);
        });

        grid = newGrid;
    }

    /**
     * Count the number of living neighbours immediately around a cell
     * @param Number x
     * @param Number y
     * @return Number neighbours
     */
    game.neighbours = function (x, y) {
        var aliveNeighbours = 0,
            self = grid.get(x, y),
            neighbours = {
                west     : grid.get(x - 1, y),
                northWest: grid.get(x - 1, y + 1),
                noth     : grid.get(x, y + 1),
                northEast: grid.get(x + 1, y + 1),
                east     : grid.get(x + 1, y),
                southEast: grid.get(x + 1, y - 1),
                south    : grid.get(x, y - 1),
                southWest: grid.get(x - 1, y - 1)
            };

        for (var neighbour in neighbours) {
            if (neighbours.hasOwnProperty(neighbour)) {
                if (neighbours[neighbour] === states.alive) {
                    aliveNeighbours ++;
                }
            }
        }

        return aliveNeighbours;
    };

    /**
     * Start off a loop, ticking at each step and updating the view
     */
    game.start = function start() {
        view.update({
            time: game.properties["time"],
            grid: grid.clone()    // Pass a copy of the current grid to the view
        });
        game.tick();
        setTimeout(function () {
            start();
        }, view.timeout || game.properties["defaultTimeout"]);
    };

    module.exports = game;
})();