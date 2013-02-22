(function () {
    var game = require('../game_of_life.js'),
        colours = require('../lib/colours.js'),
        aliveCharacter = colours.green('X'),
        deadCharacter = '-',
        view = {};

    /**
     * Print out the grid for display on the command line
     */
    function prettyPrint(grid) {
        var prettyGrid = [];

        for (var i = 0, len = grid.length; i < len; i++) {
            prettyGrid[i] = grid[i].join('|')
                            .replace(new RegExp(game.DEAD, 'g'), deadCharacter)
                            .replace(new RegExp(game.ALIVE, 'g'), aliveCharacter);
        }

        function horizontalDivider(char) {
            var _char = char || '-',
                divider = _char;

            for (var i = 0, len = grid.length; i < len - 1; i++) {
                divider += '' + _char + _char;
            }

            return divider;
        }

        return horizontalDivider('_') + '\n' + prettyGrid.join('\n') + '\n' + horizontalDivider();
    }

    view.timeout = 1000;

    view.update = function (data) {
        console.log('Time: ' + data.time);
        console.log(prettyPrint(data.grid));
    };

    module.exports = view;
})();