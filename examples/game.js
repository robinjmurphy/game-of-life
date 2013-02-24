(function () {    
    var gameOfLife = require('../main/game_of_life.js'),
        view = require('../main/views/commandline.js'),
        game = gameOfLife.init(5, view);

    /**
     *   Set up the grid:
     *   ___________
     *   |.|.|.|.|.|
     *   |.|.|.|.|.|
     *   |.|X|X|X|.|
     *   |.|.|.|.|.|
     *   |.|.|.|.|.|
     *   -----------
     */
    game.alive(1, 2)
        .alive(2, 2)
        .alive(3, 2);

    /**
     * Start things off!
     */
    game.start();
})();