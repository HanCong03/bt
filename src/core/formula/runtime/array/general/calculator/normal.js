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
            var operands = [];

            for (var i = 0, len = args.length; i < len; i++) {
                operands.push(loadOperand(reader, args[i]));
            }

            var result = calcute(op, operands);
            return calcute(op, operands);
        }
    };

    function calcute(op, operands) {
        var result = FrameCalculator.run(function (opd1, opd2) {
            var result;

            switch (op) {
                case '+':
                    result = opd1 + opd2;
                    break;

                case '-':
                    result = opd1 - opd2;
                    break;

                case '*':
                    result = opd1 * opd2;
                    break;

                case '/':
                    if (opd2 === 0) {
                        return {
                            type: OPERAND_TYPE.ERROR,
                            value: ERROR_TYPE.DIV0
                        };
                    }

                    result = opd1 / opd2;
                    break;

                case '^':
                    result = Math.pow(opd1, opd2);
                    break;

                //case '%':
                //    result = opd1 / 100;
                //    break;
            }

            return {
                type: OPERAND_TYPE.NUMBER,
                value: result
            };
        }, operands[0], operands[1]);

        return result;
    }

    function loadOperand(reader, operand) {
        var type = operand.type;
        var result;

        if (type === OPERAND_TYPE.RANGE) {
            return {
                type: OPERAND_TYPE.ARRAY,
                rowCount: operand.end.row - operand.start.row + 1,
                colCount: operand.end.col - operand.start.col + 1,
                other: null,
                value: reader.getValues(operand.start, operand.end)
            };
        } else if (type === OPERAND_TYPE.CELL) {
            result = reader.getValue(operand.row, operand.col);

            if (result) {
                return translateType(result);
            }

            // null -> 0
            return {
                type: OPERAND_TYPE.NUMBER,
                value: 0
            };
        }

        return operand;
    }


    // 把值类型翻译成操作数类型
    function translateType(target) {
        switch (target.type) {
            case VALUE_TYPE.NUMBER:
                return {
                    type: OPERAND_TYPE.NUMBER,
                    value: +target.value
                };

            case VALUE_TYPE.TEXT:
                return {
                    type: OPERAND_TYPE.TEXT,
                    value: target.value
                };

            case VALUE_TYPE.LOGICAL:
                return {
                    type: OPERAND_TYPE.LOGICAL,
                    value: +target.value
                };

            case VALUE_TYPE.ERROR:
                return {
                    type: OPERAND_TYPE.ERROR,
                    value: target.value
                };
        }
    }
});