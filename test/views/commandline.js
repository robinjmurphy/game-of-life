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
                colours = require('../../main/lib/colours.js'),
                states = {
                    alive: 'alive',
                    dead: 'dead'
                },
                testMatrix,
                mockConsole,
                expectedOutput;

            testMatrix = new Matrix(2);
            testMatrix.setAll(states.dead);
            testMatrix.set(0, 0, states.alive);

            mockConsole = {
                _output: '',
                log: function (string) {
                    this._output += string + '\n';
                }
            };

            commandline.update({
                time: 123,
                grid: testMatrix.clone(),
                states: states
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