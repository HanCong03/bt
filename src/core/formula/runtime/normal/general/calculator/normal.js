/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var VALUE_TYPE = require('definition/vtype');
    var ERROR_TYPE = require('definition/error-type');
    var OPERAND_TYPE = require('../../../../definition/operand-type');
    var FrameCalculator = require('./frame-calculator');

    module.exports = {
        exec: function (reader, op, args) {
            return calcute(reader, op, args);
        }
    };

    function calcute(reader, op, operands) {
        var current;
        var result = [];

        // 参数类型验证
        for (var i = 0, len = operands.length; i < len; i++) {
            current = operands[i];

            switch (current.type) {
                case OPERAND_TYPE.RANGE:
                case OPERAND_TYPE.ARRAY:
                case OPERAND_TYPE.UNION:
                    return {
                        type: OPERAND_TYPE.ERROR,
                        value: ERROR_TYPE.VALUE
                    };

                case OPERAND_TYPE.ERROR:
                    return current;

                case OPERAND_TYPE.CELL:
                    result.push(loadOperand(reader, current));
                    break;

                default:
                    result.push(current);
                    break;
            }
        }

        return FrameCalculator.run(op, result);
    }

    function loadOperand(reader, operand) {
        var type = operand.type;
        var result;

        if (type === OPERAND_TYPE.CELL) {
            result = reader.getValue(operand.value.row, operand.value.col);

            if (result) {
                return result;
            }

            return {
                type: OPERAND_TYPE.NUMBER,
                value: '0'
            };
        }

        return operand;
    }
});