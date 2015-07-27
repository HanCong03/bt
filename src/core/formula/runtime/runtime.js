/**
 * @file 公式运行时系统
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var CODE_TYPE = require('definition/code-type');

    var GeneralRuntime = require('./general/general');

    module.exports = {
        exec: function (reader, codes) {
            var code;
            var result = [];

            for (var i = 0, len = codes.length; i < len; i++) {
                code = codes[i];
                result[i] = calculate(reader, code);
            }

            console.log(codes)
        }
    };

    function calculate(reader, code) {
        switch (code.op) {
            case '+':
            case '-':
            case '*':
            case '/':
            case '<=':
            case '>=':
            case '<':
            case '>':
            case '<>':
            case '&':
            case '%':
            case '^':
                return GeneralRuntime.exec(reader, code.op, code.args);
                break;

        }

        console.log(code)
    }
});