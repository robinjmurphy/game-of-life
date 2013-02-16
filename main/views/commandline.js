(function () {
    var game = require('../game_of_life.js'),
        colours = require('../lib/colours.js'),
        view = {};

    view.timeout = 1000;

    function prettyPrint(grid) {
        var prettyGrid = [];

        for (var i = 0; i < grid.length; i++) {
            prettyGrid[i] = grid[i].join('|')
                            .replace(new RegExp(game.DEAD, 'g'), '-')
                            .replace(new RegExp(game.ALIVE, 'g'), colours.green('X'));
        }

        function horizontalDivider(_char) {
            var char = _char || '-',
                divider = char;

            for (var i = 0; i < grid.length - 1; i++) {
                divider += '' + char + char;
            }

            return divider;
        }

        return horizontalDivider('_') + '\n' + prettyGrid.join('\n') + '\n' + horizontalDivider();
    }

    view.update = function (data) {
        console.log('Time: ' + data.time);
        console.log(prettyPrint(data.grid));
    };

    module.exports = view;
})();