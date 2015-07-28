/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var ERROR_TYPE = require('definition/error-type');
    var OPERAND_TYPE = require('../../../definition/operand-type');
    var ArgumentProcessor = require('./argument-processor/processor');
    var NormalCalculator = require('./calculator/normal');
    var RangeCalculator = require('./calculator/range');

    module.exports = {
        exec: function (reader, op, args) {
            var operands = [];

            for (var i = 0, len = args.length; i < len; i++) {
                operands.push(ArgumentProcessor.format(reader, args[i]));
            }

            return calculate(reader, op, operands);
        }
    };

    function calculate(reader, op, operands) {
        switch (op) {
            case '~':
                return operands[0];

            case '+':
            case '-':
            case '*':
            case '/':
            case '^':
                return NormalCalculator.exec(reader, op, operands);

            case ':':
            case ' ':
                return RangeCalculator.exec(reader, op, operands);
                break;

            case ',':
                return {
                    type: OPERAND_TYPE.ERROR,
                    value: ERROR_TYPE.VALUE
                };
        }
    }
});