/**
 * @file 公式运行时系统
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var GeneralRuntime = require('./general/general');
    var VALUE_TYPE = require('definition/vtype');
    var ERROR_TYPE = require('definition/error-type');
    var OPERAND_TYPE = require('../../definition/operand-type');

    module.exports = {
        exec: function (reader, codes, row, col) {
            // 首先查询是否存在error类型的值，如果有，则直接返回该错误
            var firstError = findError(codes);
            var result;

            if (firstError) {
                result = $$.clone(firstError);
            } else {
                result = run(reader, codes);
            }

            result = filter(reader, result);
            result = checkResult(result);

            if (result) {
                return result;
            }

            return null;
        }
    };

    function run(reader, codes) {
        var currentCode;
        var result = [];

        for (var i = 0, len = codes.length; i < len; i++) {
            currentCode = codes[i];

            if (!currentCode) {
                continue;
            }

            if ($$.isNdef(currentCode.op)) {
                result[i] = currentCode;
            } else {
                result[i] = calculate(reader, currentCode, result);
            }
        }

        return result[result.length - 1];
    }

    function findError(codes) {
        var code;

        for (var i = 0, len = codes.length; i < len; i++) {
            code = codes[i];

            if (!code) {
                continue;
            }

            if (code.type === OPERAND_TYPE.ERROR) {
                return code;
            }
        }

        return null;
    }

    function checkResult(result) {
        if (result.type === 'array') {
            return {
                type: VALUE_TYPE.ERROR,
                value: ERROR_TYPE.VALUE
            };
        }

        return translateType(result);
    }

    function translateType(target) {
        switch (target.type) {
            case OPERAND_TYPE.NUMBER:
                return {
                    type: VALUE_TYPE.NUMBER,
                    value: target.value + ''
                };

            case OPERAND_TYPE.TEXT:
                return {
                    type: VALUE_TYPE.TEXT,
                    value: target.value
                };

            case OPERAND_TYPE.LOGICAL:
                return {
                    type: VALUE_TYPE.LOGICAL,
                    value: target.value + ''
                };

            case OPERAND_TYPE.ERROR:
                return {
                    type: VALUE_TYPE.ERROR,
                    value: target.value
                };
        }
    }

    function calculate(reader, code, stack) {
        if (code.op === 'func') {

        } else {
            return GeneralRuntime.exec(reader, code.op, code.args, stack);
        }
    }

    function filter(reader, operand) {
        var result;

        switch (operand.type) {
            case OPERAND_TYPE.RANGE:
                return {
                    type: OPERAND_TYPE.ARRAY,
                    rowCount: operand.value.end.row - operand.value.start.row + 1,
                    colCount: operand.value.end.col - operand.value.start.col + 1,
                    // 0
                    other: {
                        type: OPERAND_TYPE.NUMBER,
                        value: 0
                    },
                    value: reader.getValues(operand.value.start, operand.value.end)
                };
            case OPERAND_TYPE.CELL:
                result = reader.getValue(operand.value.row, operand.value.col);

                if (result) {
                    return valueTypeToOperandType(result);
                }

                return {
                    type: OPERAND_TYPE.NUMBER,
                    value: 0
                };

            case OPERAND_TYPE.NUMBER:
            case OPERAND_TYPE.ERROR:
            case OPERAND_TYPE.LOGICAL:
            case OPERAND_TYPE.TEXT:
            case OPERAND_TYPE.ARRAY:
                return operand;

            default:
                return {
                    type: OPERAND_TYPE.ERROR,
                    value: ERROR_TYPE.NAME
                };
        }
    }

    function valueTypeToOperandType(target) {
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