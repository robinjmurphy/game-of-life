(function () {    
    var gameOfLife = require('./src/game_of_life.js'),
        game = gameOfLife.init(5);

    /**
     *   Set up the grid:
     *   ___________
     *   |-|-|-|-|-|
     *   |-|-|-|-|-|
     *   |-|X|X|X|-|
     *   |-|-|-|-|-|
     *   |-|-|-|-|-|
     *   -----------
     */
    game.set(1, 2)
        .set(2, 2)
        .set(3, 2);

    /**
     * Start things off!
     */
    game.start();
})();