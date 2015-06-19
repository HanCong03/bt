/**
 * @file 内容格式化
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var NumfmtCode = require('./numfmt-code/src/numfmt');
    var TMAP = require('./definition/tmap');

    module.exports = $$.createClass('Numfmt', {
        base: require('module'),

        init: function () {
            this.registerService({
                'numfmt.format': this.format,
                'numfmt.analyze': this.analyze
            });
        },

        format: function (value, code) {
            return NumfmtCode.format(value, code);
        },

        analyze: function (value, code) {
            var result = NumfmtCode.analyze(value, code);

            return {
                type: TMAP[result.type],
                value: result.value
            };
        }
    });
});