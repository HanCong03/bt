/**
 * @file 单元格内容模块
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var VALUE_TYPE = require('definition/vtype');

    module.exports = $$.createClass('CellContent', {
        base: require('module'),

        mixin: [
            require('./range-content')
        ],

        init: function () {
            this.__initService();
        },

        __initService: function () {
            this.registerService({
                //'set.content': this.setContent,
                //'set.range.content': this.setRangeContent
            });
        },

        setContent: function (content, row, col) {
            var numfmt;
            var analyzeResult;

            // 分析内容，获取其类型
            numfmt = this.queryCommandValue('numfmt', row, col);
            analyzeResult = this.rs('numfmt.analyze', content, numfmt);

            // 新的numfmt code
            if (analyzeResult.numfmt) {
                this.execCommand('numfmt', analyzeResult.numfmt, {
                    row: row,
                    col: col
                }, {
                    row: row,
                    col: col
                });
            }

            if (analyzeResult.type === VALUE_TYPE.FORMULA) {
                return this.__setFormula(content, row, col);
            }

            this.rs('set.content.and.type', analyzeResult.value, analyzeResult.type, row, col);
        },

        __setFormula: function (formula, row, col) {
            this.__setNormalFormula(formula, row, col);
        }
    });
});