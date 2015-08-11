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

        setContent: function (content, row, col) {
            var numfmt;
            var analyzeResult;
            var start = {
                row: row,
                col: col
            };
            var end = start;

            if (!content) {
                return this.clearContent(start, end);
            }

            if (!this.queryCommandValue('writable', start, end)) {
                return false;
            }

            // 分析内容，获取其类型
            numfmt = this.queryCommandValue('numfmt', row, col);
            analyzeResult = this.rs('numfmt.analyze', content, numfmt);

            // 新的numfmt code
            if (analyzeResult.numfmt) {
                this.execCommand('numfmt', analyzeResult.numfmt,start, end);
            }

            if (analyzeResult.type === VALUE_TYPE.FORMULA) {
                return this.__setFormula(content, row, col);
            }

            this.rs('set.content.and.type', analyzeResult.value, analyzeResult.type, row, col);

            return true;
        },

        clearContent: function (start, end) {
            if (!this.queryCommandValue('writable', start, end)) {
                return false;
            }

            this.rs('clear.content', start, end);

            return true;
        },

        __setFormula: function (formula, row, col) {
            var formulaBin = this.rs('check.formula', formula);

            if (!formulaBin) {
                return false;
            }

            var result = this.rs('exec.formula', formulaBin, row, col);

            // 先设置值，再设置数组公式
            this.rs('set.content.and.type', result.value, result.type, row, col);
            this.rs('set.formula', formula, row, col);

            return true;
        }
    });
});