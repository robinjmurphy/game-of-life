(function () {
    var Matrix = function Matrix(size) {
        this._grid = new Array(size);

        for (var i = 0; i < this._grid.length; i++) {
            this._grid[i] = new Array(size);
        }
    };

    Matrix.prototype.get = function (i, j) {
        if (this._grid[i] && this._grid[i][j]) {
            return this._grid[i][j];
        }
        else {
            return undefined;
        }
    };

    Matrix.prototype.set = function (i, j, value) {
        this._grid[i][j] = value;

        return this;
    };

    Matrix.prototype.each = function (callback) {
        for (var i = 0; i < this._grid.length; i++) {
            for (var j = 0; j < this._grid.length; j++) {
                callback(i, j);
            }
        }
    };

    Matrix.prototype.setAll = function (value) {
        var that = this;
        this.each(function (i, j) {
            that.set(i, j, value);
        });
    };

    Matrix.prototype.to_array = function () {
        return this._grid;
    };

    Matrix.prototype.length = function () {
        return this._grid.length;
    };

    Matrix.prototype.print = function () {
        var prettyGrid = [];

        for (var i = 0; i < this._grid.length; i++) {
            prettyGrid[i] = this._grid[i].join('|');
        }

        function horizontalDivider(that) {
            var divider = '_';

            for (var i = 0; i < that._grid.length - 1; i++) {
                divider += '__';
            }

            return divider;
        }

        return prettyGrid.join('\n');
    };

    module.exports = Matrix;
})();