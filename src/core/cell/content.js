/**
 * @file 单元格内容模块
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var FORMAT_TYPE = require('definition/format-type');

    module.exports = $$.createClass('CellContent', {
        base: require('module'),

        init: function () {
            this.__initService();
        },

        __initService: function () {
            this.registerService({
                'set.content': this.setContent
            });
        },

        setContent: function (content, row, col, isCESMode) {
            var numfmt;
            var analyzeResult;

            if (!content) {
                this.rs('clear.content', {
                    row: row,
                    col: col
                }, {
                    row: row,
                    col: col
                });
            } else {
                // 分析内容，获取其类型
                numfmt = this.queryCommandValue('numfmt', row, col);
                analyzeResult = this.rs('numfmt.analyze', content, numfmt);

                if (analyzeResult.type === FORMAT_TYPE.FORMULA) {
                    return this.__setFormula(content, row, col, isCESMode);
                }

                this.rs('set.content.and.type', analyzeResult.value, analyzeResult.type, row, col);
            }
        },

        __setFormula: function (formula, row, col, isCESMode) {
            isCESMode = true;
            if (isCESMode) {
                this.__setArrayFormula(formula, row, col);

                // 普通公式
            } else {
                this.__setNormalFormula(formula, row, col);
            }
        },

        __setArrayFormula: function (formula, row, col) {
            var formulaBin = this.rs('check.formula', formula);

            if (!formulaBin) {
                return false;
            }

            var range = this.rs('get.range');

            range = $$.clone({
                start: range.start,
                end: range.end
            });

            var result = this.rs('exec.array.formula', formulaBin, range);

            this.rs('set.array.formula', formula, range, row, col);
            this.rs('set.range.content', result, range);
        }
    });
});