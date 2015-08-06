/**
 * @file 格式化内容管理模块
 * 提供对单元格内容的格式化管理
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var CacheCleaner = require('common/cache-cleaner');

    module.exports = $$.createClass('FormattedContent', {
        base: require('module'),

        init: function () {
            this.__initHeap();
            this.__initService();
            this.__initEvent();
        },

        __initHeap: function () {
            var heap = this.getActiveHeap();

            if ($$.isNdef(heap.contents)) {
                heap.contents = [];
            }
        },

        __initService: function () {
            this.registerService({
                'get.formatted.content': this.getFormattedContent,
                'get.formatted.type': this.getFormattedType,
                'get.formatted.color': this.getFormattedColor,
                'get.formatted.info': this.getFormattedInfo,
                'get.standard.formatted.content': this.getStandardFormattedContent
            });
        },

        __initEvent: function () {
            this.on({
                'contentchange': this.onContentChange
            });
        },

        onContentChange: function (start, end) {
            var heap = this.getActiveHeap();
            heap.contents = CacheCleaner.clean(heap.contents, start, end);
        },

        getFormattedContent: function (row, col) {
            var data = this.__getData(row, col);

            if (!data) {
                return null;
            }

            return data.text;
        },

        /**
         * 获取到的内容不包含repeat格式串
         * @param row
         * @param col
         * @returns {null}
         */
        getStandardFormattedContent: function (row, col) {
            var data = this.__getData(row, col);

            if (!data) {
                return null;
            }

            var content = data.text;
            var result = [];
            var current;
            var type;

            for (var i = 0, len = content.length; i < len; i++) {
                current = content[i];
                type = current.type;

                if (type === 'repeat') {
                    continue;
                } else if (type === 'placeholder') {
                    result.push(current.value);
                } else {
                    result.push(current);
                }
            }

            return result.join('').split('\n');
        },

        getFormattedColor: function (row, col) {
            var data = this.__getData(row, col);

            if (!data) {
                return null;
            }

            return data.color;
        },

        getFormattedType: function (row, col) {
            var data = this.__getData(row, col);

            if (!data) {
                return null;
            }

            return data.type;
        },

        getFormattedInfo: function (row, col) {
            return this.__getData(row, col);
        },

        __getData: function (row, col) {
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

            return contents[row][col];
        },

        __loadCell: function (row, col) {
            var contentInfo = this.queryCommandValue('contentinfo', row, col);

            if ($$.isNdef(contentInfo)) {
                return null;
            }

            var numfmt = this.queryCommandValue('numfmt', row, col);
            return this.rs('numfmt.format', contentInfo.type, contentInfo.value, numfmt);
        }
    });
});