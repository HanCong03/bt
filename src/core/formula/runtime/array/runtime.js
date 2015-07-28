/**
 * @file 公式运行时系统
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var GeneralRuntime = require('./general/general');
    var VALUE_TYPE = require('definition/vtype');
    var ERROR_TYPE = require('definition/error-type');
    var OPERAND_TYPE = require('../../definition/operand-type');

    module.exports = {
        exec: function (reader, codes, range) {
            var code;
            var result = [];

            for (var i = 0, len = codes.length; i < len; i++) {
                code = codes[i];
                result[i] = calculate(reader, code);
            }

            result = result[i - 1];
            result = filter(reader, result);
            result = assembly(result, range);

            return JSON.parse(JSON.stringify(result));
        }
    };

    /**
     * 根据运算结果以及给定的计算区域，返回对应给定区域的每一个单元格的值
     * @param result
     * @param range
     */
    function assembly(res, range) {
        if (res.type === OPERAND_TYPE.ARRAY) {
            return assemblyArray(res, range);
        }

        var result = [];
        var rowResult;
        var start = range.start;
        var end = range.end;

        res = translateType(res);

        for (var i = start.row, limit = end.row; i <= limit; i++) {
            rowResult = [];
            result.push(rowResult);

            for (var j = start.col, jlimit = end.col; j <= jlimit; j++) {
                rowResult.push(res);
            }
        }

        return result;
    }

    function assemblyArray(res, range) {
        if (res.rowCount === 1) {
            return assemblyRow(res, range);
        } else if (res.colCount === 1) {
            return assemblyColumn(res, range);
        }

        return result;
    }

    function assemblyRow(res, range) {
        var result = [];
        var tmp = [];
        var other = translateType(res.other);
        var NAError = {
            type: VALUE_TYPE.ERROR,
            value: ERROR_TYPE.NA
        };
        var value = res.value;
        var start = range.start;
        var end = range.end;

        for (var col = start.col, limit = end.col; col <= limit; col++) {
            tmp.push(NAError);
        }

        for (var i = 0, len = res.colCount; i < len; i++) {
            if (!tmp[i]) {
                break;
            }

            tmp[i] = value[0 + ',' + i] || other;
        }

        for (var i = start.row, limit = end.row; i <= limit; i++) {
            result.push(tmp);
        }

        return tmp;
    }

    function assemblyColumn(res, range) {
        var result = [];
        var tmp = [];
        var currentValue;
        var other = translateType(res.other);
        var NAError = {
            type: VALUE_TYPE.ERROR,
            value: ERROR_TYPE.NA
        };
        var value = res.value;
        var rangeRowCount = range.end.row - range.start.row + 1;
        var rangeColumnCount = range.end.col - range.start.col + 1;

        for (var i = 0, len = Math.min(rangeRowCount, res.rowCount); i < len; i++) {
            tmp = [];
            currentValue = value[i + ',0'] || other;

            for (var j = 0; j < rangeColumnCount; j++) {
                tmp.push(currentValue);
            }

            result.push(tmp);
        }

        for (var i = len; i < rangeRowCount; i++) {
            tmp = [];

            for (var j = 0; j < rangeColumnCount; j++) {
                tmp.push(NAError);
            }

            result.push(tmp);
        }

        return result;
    }

    function calculate(reader, code) {
        if (code.op === 'func') {

        } else {
            return GeneralRuntime.exec(reader, code.op, code.args);
        }
    }

    function filter(reader, operand) {
        var result;

        switch (operand.type) {
            case OPERAND_TYPE.RANGE:
                return {
                    type: OPERAND_TYPE.ARRAY,
                    rowCount: operand.end.row - operand.start.row + 1,
                    colCount: operand.end.col - operand.start.col + 1,
                    // 0
                    other: {
                        type: OPERAND_TYPE.NUMBER,
                        value: 0
                    },
                    value: reader.getValues(operand.start, operand.end)
                };
            case OPERAND_TYPE.CELL:
                result = reader.getValue(operand.row, operand.col);

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
                    value: VALUE_TYPE.NAME
                };
        }
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