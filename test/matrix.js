(function () {    
    var assert = require('assert'),
        Matrix = require('../src/matrix.js'); 

    describe('Matrix', function () {
        it('is a module that can be required', function () {
            assert.ok(Matrix);
            assert.equal(typeof Matrix, 'function');
        });
        it('can set and get the value of a matrix cell', function () {
            var testMatrix = new Matrix(20);

            testMatrix.set(4, 5, 'foo');
            assert.equal(testMatrix.get(4, 5), 'foo');
            assert.equal(testMatrix.get(100, 100), undefined);
        });
    });
})();