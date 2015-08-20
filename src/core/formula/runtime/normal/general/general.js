/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var NormalCalculator = require('./calculator/normal');
    var CODE_TYPE = require('definition/code-type');

    module.exports = {
        exec: function (reader, op, args, stack) {
            var operands = [];

            for (var i = 0, len = args.length; i < len; i++) {
                if (args[i].type === CODE_TYPE.ADDRESS) {
                    operands[i] = stack[args[i].value];
                } else {
                    operands[i] = args[i];
                }
            }

            return NormalCalculator.exec(reader, op, operands);
        }
    };
});