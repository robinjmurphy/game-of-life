(function () {    
    var assert = require('assert'),
        commandline = require('../../main/views/commandline.js');

    describe('The command line view', function () {
        it('is a module that can be required', function () {
            assert.ok(commandline);
            assert.equal(typeof commandline, 'object');
        });
        it('sets a timeout for the model to update', function () {
            assert.ok(commandline.timeout);
        });
        it('has an update method', function () {
            assert.ok(commandline.update);
        });
        it('outputs the correct string for a given grid', function () {
            var Matrix = require('../../main/lib/matrix.js'),
                game = require('../../main/game_of_life.js'),
                colours = require('../../main/lib/colours.js'),
                testMatrix,
                mockConsole,
                expectedOutput;

            testMatrix = new Matrix(2);
            testMatrix.setAll(game.DEAD);
            testMatrix.set(0, 0, game.ALIVE);

            mockConsole = {
                _output: '',
                log: function (string) {
                    this._output += string + '\n';
                }
            };

            commandline.update({
                time: 123,
                grid: testMatrix.clone()
            }, mockConsole);

            expectedOutput =  'Time: 123' + '\n';
            expectedOutput += '___' + '\n';
            expectedOutput += colours.green('X') + '|-' + '\n';
            expectedOutput += '-|-' + '\n';
            expectedOutput += '---' + '\n';

            assert.equal(mockConsole._output, expectedOutput);
        });
    });
})();