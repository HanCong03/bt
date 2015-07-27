/**
 * @file 单元格内容模块
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var VALUE_TYPE = require('definition/vtype');

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

                if (analyzeResult.type === VALUE_TYPE.FORMULA) {
                    return this.__setFormula(analyzeResult.value, row, col);
                }

                this.rs('set.content.and.type', analyzeResult.value, analyzeResult.type, row, col);
            }
        },

        __setFormula: function (source, row, col) {
            if (this.rs('check.formula', source)) {
                this.rs('set.content.and.type', source, VALUE_TYPE.FORMULA, row, col);
            }

            return false;
        }
    });
});