(function () {    
    var gameOfLife = require('../main/game_of_life.js'),
        view = require('../main/views/commandline.js'),
        game = gameOfLife.init(30, view);

    // Set up a random grid
    game.randomise();

    // Start things off!
    game.start();
})();