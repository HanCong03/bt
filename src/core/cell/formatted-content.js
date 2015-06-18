/**
 * @file 格式化内容管理模块
 * 提供对单元格内容的格式化管理
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = $$.createClass('FormattedContent', {
        base: require('module'),

        init: function () {
            this.__initHeap();
            console.log(this.getFormattedContent(0, 0))
        },

        __initHeap: function () {
            var heap = this.getActiveHeap();

            if ($$.isNdef(heap.contents)) {
                heap.contents = [];
            }
        },

        getFormattedContent: function (row, col) {
            var heap = this.getActiveHeap();
            var contents = heap.contents;

            // 需要区别null
            if (contents[row] === undefined) {
                contents[row] = [];
            }

            debugger
            if (contents[row][col] === undefined) {
                contents[row] = this.__loadCell(row, col);
            }

            return heap.contents[row][col];
        },

        __loadCell: function (row, col) {
            var content = this.queryCommandValue('content', row, col);

            if ($$.isNdef(content)) {
                return null;
            }

            var fmt = this.rs('get.style', 'numfmt', row, col);

            console.log(fmt)
        }
    });
});