/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = {
        __input: function () {
            var content = this.inputNode.innerHTML;
            var rect = this.__calculateContentRect(content);

            this.__relocation(rect);
        },

        __write: function (isCSEMode) {
            var cell = this.__cellStart;
            var content = this.__getUserContent();
            var result = false;

            // 写入
            if (!isCSEMode) {
                result = this.execCommand('content', content, cell.row, cell.col);
            } else {
                var range = this.queryCommandValue('range');
                range = $$.clone(range);

                result = this.execCommand('rangecontent', content, cell.row, cell.col, range);
            }

            if (result) {
                return true;
            }

            this.error('array.formula');

            return false;
        }
    };
});