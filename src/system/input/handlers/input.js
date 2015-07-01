/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    module.exports = {
        __input: function () {
            var content = this.inputNode.innerHTML;
            var rect = this.__calculateContentRect(content);

            this.__relocation(rect);
        },

        __write: function () {
            var cell = this.__cellStart;
            var content = this.__getUserContent();

            // 写入
            this.execCommand('content', content, cell.row, cell.col);
        }
    };
});