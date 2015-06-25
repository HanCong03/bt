/**
 * @file 显示内容管理模块
 * 提供对单元格的可视化内容的维护服务
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var CELL_PADDING = require('definition/cell-padding');

    module.exports = $$.createClass('DisplayContent', {
        base: require('module'),

        shadowBox: null,

        init: function () {
            this.__initHeap();
            this.__initService();
            this.__initShadowBox();
            this.__initEvent();
        },

        __initService: function () {
            this.registerService({
               'get.display.content': this.getDisplayContent
            });
        },

        __initHeap: function () {
            var heap = this.getActiveHeap();

            if ($$.isNdef(heap.contents)) {
                heap.contents = [];
            }
        },

        __initShadowBox: function () {
            this.shadowBox = document.createElement('div');
            this.shadowBox.style.cssText = 'word-wrap: break-word; word-break: break-all; line-height: 1;';
            this.getShadowContainer().appendChild(this.shadowBox);
        },

        __initEvent: function () {
            this.on({
                'contentchange': this.onContentChange
            });
        },

        onContentChange: function (start, end) {
            var contents = this.getActiveHeap().contents;

            $$.iterator(start, end, function (row, col) {
                if ($$.isNdef(contents[row])) {
                    return;
                }

                delete contents[row][col];
            });
        },

        getDisplayContent: function (row, col) {
            var heap = this.getActiveHeap();
            var contents = heap.contents;

            // 需要区别null
            // undefined 代表未初始化
            // null 代表空
            if (contents[row] === undefined) {
                contents[row] = [];
            }

            if (contents[row][col] === undefined) {
                contents[row][col] = this.__calculateWraptext(row, col);
            }

            return heap.contents[row][col];
        },

        __calculateWraptext: function (row, col) {
            var formattedContent = this.rs('get.formatted.content', row, col);

            if ($$.isNdef(formattedContent)) {
                return null;
            }

            // 查询当前单元格是否设置了自动换行
            if (!this.queryCommandValue('wraptext', row, col)) {
                return formattedContent.split('\n');
            }

            return this.__autoWrap(formattedContent, col);
        },

        /**
         * 计算自动换行
         * @private
         */
        __autoWrap: function (content, col) {
            var contents = [];

            $$.forEach(content.split('\n'), function (rowContent) {
                rowContent = rowContent.split('');
                rowContent = '<span>' + rowContent.join('</span><span>') + '</span>';

                contents.push(rowContent);
            });

            var width = this.queryCommandValue('columnwidth', col) - 2 * CELL_PADDING.h;

            this.shadowBox.style.width = width + 'px';
            this.shadowBox.innerHTML = contents.join('<br>');

            var chars = this.shadowBox.getElementsByTagName('span');
            var prev;

            contents = content.replace(/\n/g, '').split('');

            var rows = [
                []
            ];
            var currentRow = rows[0];

            for (var i = 0, len = chars.length; i < len; i++) {
                var bottom = chars[i].getBoundingClientRect().bottom;

                if (prev === undefined) {
                    prev = bottom;
                    currentRow.push(contents[i]);
                } else if (prev === bottom) {
                    currentRow.push(contents[i]);
                } else {
                    prev = bottom;
                    currentRow = [contents[i]];
                    rows.push(currentRow);
                }
            }

            for (var i = 0, len = rows.length; i < len; i++) {
                rows[i] = rows[i].join('');
            }

            return rows;
        }
    });
});