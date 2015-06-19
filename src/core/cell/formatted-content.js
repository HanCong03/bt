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
            this.__initService();
        },

        __initHeap: function () {
            var heap = this.getActiveHeap();

            if ($$.isNdef(heap.contents)) {
                heap.contents = [];
            }
        },

        __initService: function () {
            this.registerService({
               'get.formatted.content': this.getFormattedContent
            });
        },

        getFormattedContent: function (row, col) {
            var heap = this.getActiveHeap();
            var contents = heap.contents;

            // 需要区别null
            // undefined 代表未初始化
            // null 代表空
            if (contents[row] === undefined) {
                contents[row] = [];
            }

            if (contents[row][col] === undefined) {
                contents[row][col] = this.__loadCell(row, col);
            }

            return heap.contents[row][col];
        },

        __loadCell: function (row, col) {
            var content = this.execCommand('read', row, col);

            debugger;
            if ($$.isNdef(content)) {
                return null;
            }

            debugger;
            var fmt = this.rs('get.style', 'numfmt', row, col);

            console.log(fmt)
        }
    });
});