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
    });
})();