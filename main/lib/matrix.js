(function () {
    /**
     * Matrix constructor
     * @param Number size - The dimension of the matrix (must be a square matrix)
     */
    var Matrix = function Matrix(size) {
        this._grid = new Array(size);
        this.length = this._grid.length;

        for (var y = 0, len = this.length; y < len; y++) {
            this._grid[y] = new Array(size);
        }
    };

    /**
     * Get the value of a matrix cell
     * @param Number x
     * @param Number y
     */
    Matrix.prototype.get = function (x, y) {
        if ((this._grid[y]) && (this._grid[y][x] !== undefined)) {
            return this._grid[y][x];
        }
        else {
            return undefined;
        }
    };

    /**
     * Set the value of a matrix cell
     * @param Number x
     * @param Number y
     * @param value
     * @return this
     */
    Matrix.prototype.set = function (x, y, value) {
        this._grid[y][x] = value;

        return this;
    };

    /**
     * Fire a callback for every cell with its co-ordinates as a parameter
     * @param Function callback - receives x, y i.e. callback(x, y)
     */
    Matrix.prototype.each = function (callback) {
        for (var y = 0, len = this.length; y < len; y++) {
            for (var x = 0; x < len; x++) {
                callback(x, y);
            }
        }
    };

    /**
     * Set all cells in a matrix to the same value
     * @param value
     */
    Matrix.prototype.setAll = function (value) {
        var that = this;
        this.each(function (x, y) {
            that.set(x, y, value);
        });
    };

    /**
     * Return the underlying multi-dimensional array
     */
    Matrix.prototype.toArray = function () {
        return this._grid;
    };

    /**
     * Return a copy of the Matrix
     */
    Matrix.prototype.clone = function () {
        var original = this,
            clone = new Matrix(original.length);

        original.each(function (x, y) {
            var value = original.get(x, y);
            clone.set(x, y, value);
        });

        return clone;
    };

    module.exports = Matrix;
})();