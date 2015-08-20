/**
 * @file 框架计算器
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var ERROR_TYPE = require('definition/error-type');
    var OPERAND_TYPE = require('../../../../definition/operand-type');

    module.exports = {
        run: function (op, operands) {
            switch (op) {
                case '~':
                case '+':
                case '-':
                case '*':
                case '/':
                case '^':
                    operands = toNumber(operands);
                    if (operands.type === OPERAND_TYPE.ERROR) {
                        return operands;
                    }

                    return runBasic(op, operands);

                default:
                    throw new Error('unknow operator');
            }
        }
    };

    function runBasic(op, operands) {
        switch (op) {
            case '~':
                return {
                    type: OPERAND_TYPE.NUMBER,
                    value: operands[0]
                };

            case '+':
                return {
                    type: OPERAND_TYPE.NUMBER,
                    value: operands[0] + operands[1]
                };

            case '-':
                return {
                    type: OPERAND_TYPE.NUMBER,
                    value: operands[0] - operands[1]
                };

            case '*':
                return {
                    type: OPERAND_TYPE.NUMBER,
                    value: operands[0] * operands[1]
                };

            case '/':
                if (operands[1] === 0) {
                    return {
                        type: OPERAND_TYPE.ERROR,
                        value: ERROR_TYPE.DIV0
                    };
                }

                return {
                    type: OPERAND_TYPE.NUMBER,
                    value: operands[0] / operands[1]
                };

            case '^':

                return {
                    type: OPERAND_TYPE.NUMBER,
                    value: Math.pow(operands[0], operands[1])
                };

            default:
                throw new Error('unknow operator');
        }
    }

    function toNumber(operands) {
        var result = [];
        var current;

        for (var i = 0, len = operands.length; i < len; i++) {
            current = operands[i];

            switch (current.type) {
                case OPERAND_TYPE.NUMBER:
                case OPERAND_TYPE.LOGICAL:
                    result.push(+current.value);
                    break;

                case OPERAND_TYPE.ERROR:
                    return current;

                case OPERAND_TYPE.TEXT:
                    return {
                        type: OPERAND_TYPE.ERROR,
                        value: ERROR_TYPE.VALUE
                    };

                default:
                    throw new Error('unknow type');
            }
        }

        return result;
    }
});