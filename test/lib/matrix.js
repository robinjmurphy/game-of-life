(function () {    
    var assert = require('assert'),
        Matrix = require('../../main/lib/matrix.js'); 

    describe('Matrix', function () {
        it('is a module that can be required', function () {
            assert.ok(Matrix);
            assert.equal(typeof Matrix, 'function');
        });
        it('can be initialized with a size', function () {
            var testMatrix = new Matrix(7);

            assert.equal(typeof testMatrix, 'object');
            assert.equal(testMatrix.length, 7);
        });
        it('can set and get the value of a cell', function () {
            var testMatrix = new Matrix(20);

            testMatrix.set(4, 5, 'foo');
            assert.equal(testMatrix.get(4, 5), 'foo');
        });
        it('returns undefined for an element outside of its dimensions', function () {
            var testMatrix = new Matrix(10);

            assert.equal(testMatrix.get(0, 11), undefined);
        });
        it('can get retrieve falsey values from a cell', function () {
            var testMatrix = new Matrix(2);

            testMatrix.set(0, 0, 0);
            testMatrix.set(0, 1, false);
            
            assert.equal(testMatrix.get(0, 0), 0);
            assert.equal(testMatrix.get(0, 1), false);
        });
        it('can set the values of a cell using cartesian co-ordinates', function () {
            var testMatrix = new Matrix(2);

            testMatrix.set(1, 0, 'foo');

            assert.equal(testMatrix.get(1, 0), 'foo');
            assert.equal(testMatrix._grid[0][1], 'foo');
        });
        it('can be return its underlying multi-dimensional array', function () {
            var testMatrix = new Matrix(2);

            testMatrix.set(0, 0, 'bart');
            testMatrix.set(1, 0, 'homer');
            testMatrix.set(0, 1, 'marge');
            testMatrix.set(1, 1, 'lisa');

            assert.equal(typeof testMatrix.toArray(), 'object');
            assert.equal(testMatrix.toArray()[0][1], 'homer');
        });
        it('can return a clone of itself', function () {
            var testMatrix = new Matrix(3),
                clonedMatrix;

            testMatrix.set(1, 2, 'foo');
            clonedMatrix = testMatrix.clone();
            assert.equal(clonedMatrix.get(1, 2), 'foo');
            testMatrix.set(1, 2, 'bar');

            // The cloned matrix shouldn't be a reference to the original,
            // so it should retain the original value.
            assert.equal(clonedMatrix.get(1, 2), 'foo');
        });
        it('can fire a callback for every cell in the matrix', function () {
            var testMatrix = new Matrix(3),
                values = [];

            testMatrix.set(0, 1, 'foo');

            testMatrix.each(function (x, y) {
                values.push({
                    "x": x,
                    "y": y,
                    "value": testMatrix.get(x, y)
                });
            });

            assert.equal(values.length, 9);
            assert.equal(values[3]['x'], '0');
            assert.equal(values[3]['y'], '1');
            assert.equal(values[3]['value'], 'foo');
        });
        it('can set all cells in an array to one value', function () {
            var testMatrix = new Matrix(2);

            testMatrix.setAll('foo');

            assert.equal(testMatrix.get(0, 0), 'foo');
            assert.equal(testMatrix.get(1, 0), 'foo');
            assert.equal(testMatrix.get(0, 1), 'foo');
            assert.equal(testMatrix.get(1, 1), 'foo');
        });
    });
})();