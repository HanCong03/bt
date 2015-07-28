/**
 * @file 单元格内容模块
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var FORMAT_TYPE = require('definition/format-type');
    var FORMAT_VALUE_TYPE_MAP = require('definition/format-value-map');

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

        setContent: function (content, row, col) {
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
                numfmt = this.queryCommandValue('numfmt');
                analyzeResult = this.rs('numfmt.analyze', content, numfmt);

                if (analyzeResult.type === FORMAT_TYPE.FORMULA) {
                    var start = {
                        row: row,
                        col: col
                    };
                    var end = {
                        row: row + 3,
                        col: col + 3
                    };
                    //return this.__setFormula(analyzeResult.value, row, col);
                    return this.__setArrayFormula(analyzeResult.value, start, end);
                }

                this.rs('set.content.and.type', analyzeResult.value, FORMAT_VALUE_TYPE_MAP[analyzeResult.type], row, col);
            }
        },

        __setFormula: function (source, row, col) {
            if (this.rs('check.formula', source)) {
                this.rs('set.content.and.type', source, VALUE_TYPE.FORMULA, row, col);
            }

            return false;
        },

        __setArrayFormula: function (source, start, end) {
            var formulaBin = this.rs('check.formula', source);

            if (!formulaBin) {
                return false;
            }

            var result = this.rs('exec.array.formula', formulaBin, {
                start: start,
                end: end
            });

            this.rs('set.range.content', result, {
                start: start,
                end: end
            });
        }
    });
});