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

            if ($$.isNdef(content)) {
                return null;
            }

            var fmt = this.queryCommandValue('usernumfmt', row, col);

            /* --- 如果未指定格式化代码，则根据内容类型获取默认格式化代码 --- */
            if ($$.isNdef(fmt)) {
                fmt = this.rs('numfmt.defaultcode', this.queryCommandValue('contenttype', row, col));
            }

            // 默认格式代码都不存在的情况下，则直接返回
            if ($$.isNdef(fmt)) {
                return content;
            }

            return this.rs('numfmt.format', content, fmt);
        }
    });
});