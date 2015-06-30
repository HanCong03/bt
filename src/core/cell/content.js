/**
 * @file 单元格内容模块
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = $$.createClass('CellContent', {
        base: require('module'),

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

                this.rs('set.content.and.type', analyzeResult.value, analyzeResult.type, row, col);
            }

            this.emit('contentchange', {
                row: row,
                col: col
            }, {
                row: row,
                col: col
            });
        }
    });
});