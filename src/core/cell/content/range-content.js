/**
 * @file 单元格内容模块
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var VALUE_TYPE = require('definition/vtype');

    module.exports = {

        /**
         * 根据区域写入内容
         * @param content
         * @param row
         * @param col
         * @param ranges 区域集合
         */
        setRangeContent: function (content, mainRow, mainCol, range) {
            var numfmt;
            var analyzeResult;

            if (!content) {
                return this.clearContent(range.start, range.end);
            }

            if (!this.queryCommandValue('writable', range.start, range.end)) {
                return false;
            }

            // 分析内容，获取主类型
            numfmt = this.queryCommandValue('numfmt', mainRow, mainCol);
            analyzeResult = this.rs('numfmt.analyze', content, numfmt);

            if (analyzeResult.type === VALUE_TYPE.FORMULA) {
                return this.__setArrayFormula(content, mainRow, mainCol, range);
            }

            $$.iterator(range.start, range.end, function (row, col) {
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

                this.rs('set.content.and.type', analyzeResult.value, analyzeResult.type, row, col);
            }, this);

            return true;
        },

        __setArrayFormula: function (formula, row, col, range) {
            var formulaBin = this.rs('check.formula', formula);

            if (!formulaBin) {
                return false;
            }

            var result = this.rs('exec.array.formula', formulaBin, range);

            // 先设置值，再设置数组公式
            this.rs('set.range.content', result, range);
            this.rs('set.array.formula', formula, row, col, range.start, range.end);

            return true;
        }
    };
});