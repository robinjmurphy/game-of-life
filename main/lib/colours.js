(function () {
    var colours = {},
        codes = {
            'reset': '\033[0m',
            'bold': '\033[1m',
            'italic': '\033[3m',
            'underline': '\033[4m',
            'blink': '\033[5m',
            'black': '\033[30m',
            'red': '\033[31m',
            'green': '\033[32m',
            'yellow': '\033[33m',
            'blue': '\033[34m',
            'magenta': '\033[35m',
            'cyan': '\033[36m',
            'white': '\033[37m'
        };

    function colourize(string, colour) {
        return codes[colour] + string + codes['reset'];
    }

    colours.red = function (string) {
        return colourize(string, 'red');
    };

    colours.green = function (string) {
        return colourize(string, 'green');
    };

    module.exports = colours;
})();