/**
 * @file 公式运行时系统
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var GeneralRuntime = require('./general/general');
    var VALUE_TYPE = require('definition/vtype');
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

            return assembly(result, range);
        }
    };

    /**
     * 根据运算结果以及给定的计算区域，返回对应给定区域的每一个单元格的值
     * @param result
     * @param range
     */
    function assembly(value, range) {
        var result = [];
        var rowResult;
        var start = range.start;
        var end = range.end;

        if (value.type === OPERAND_TYPE.ARRAY) {

        } else {
            value = translateType(value);
            for (var i = start.row, limit = end.row; i <= limit; i++) {
                rowResult = [];
                result.push(rowResult);

                for (var j = start.col, jlimit = end.col; j <= jlimit; j++) {
                    rowResult.push(value);
                }
            }
        }

        return JSON.parse(JSON.stringify(result));
    }

    function calculate(reader, code) {
        if (code.op === 'func') {

        } else {
            return GeneralRuntime.exec(reader, code.op, code.args);
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
});