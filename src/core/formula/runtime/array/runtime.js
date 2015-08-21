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
        exec: function (reader, codes, range) {
            var result = run(reader, codes);

            result = formatResult(result, range);

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

    function formatResult(result, range) {
        if (result.type === 'array') {
            return this.fillArray(result, range);
        } else {
            return this.fillSingle(result, range);
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
});