/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var ArgumentProcessor = require('./argument-processor/processor');
    var NormalCalculator = require('./calculator/normal');

    module.exports = {
        exec: function (reader, op, args, range) {
            var operands = [];

            for (var i = 0, len = args.length; i < len; i++) {
                operands.push(ArgumentProcessor.format(reader, args[i]));
            }

            return calculate(reader, op, operands, range);
        }
    };

    function calculate(reader, op, operands) {
        switch (op) {
            case '+':
            case '-':
            case '*':
            case '/':
            case '^':
            case '%':
                return NormalCalculator.exec(reader, op, operands);
                break;
        }
    }
});