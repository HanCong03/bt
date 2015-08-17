/**
 * @file 显示内容管理模块
 * 提供对单元格的可视化内容的维护服务
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var CELL_PADDING = require('definition/cell-padding');
    var CacheCleaner = require('common/cache-cleaner');
    var VALUE_TYPE = require('definition/vtype');

    var LIMIT = require('definition/limit');
    var MAX_ROW_INDEX = LIMIT.MAX_ROW - 1;

    module.exports = $$.createClass('DisplayContent', {
        base: require('module'),

        shadowBox: null,
        repeatBox: null,

        init: function () {
            this.__initService();
            this.__initShadowBox();
            this.__initEvent();
        },

        __initService: function () {
            this.registerService({
                'get.display.content': this.getDisplayContent,
                'get.display.info': this.getDisplayInfo
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
            this.repeatBox = document.createElement('div');

            this.getShadowContainer().appendChild(this.shadowBox);
            this.getShadowContainer().appendChild(this.repeatBox);
        },

        __initEvent: function () {
            this.on({
                'contentchange': this.onContentChange,
                'stylechange': this.onStyleChange,
                'columnwidthchange': this.onColumnWidthChange,
                'sheetswitch': this.__onSheetSwitch,
                'dataready': this.__onDataReady
            });
        },

        __onDataReady: function () {
            this.__initHeap();

            var standard = this.queryCommandValue('standard');

            $(this.repeatBox).css({
                fontFamily: standard.font,
                lineHeight: 1,
                fontSize: standard.fontsize + 'pt'
            });
        },

        __onSheetSwitch: function () {
            this.__initHeap();
        },

        onContentChange: function (start, end) {
            var heap = this.getActiveHeap();
            heap.contents = CacheCleaner.clean(heap.contents, start, end);
        },

        onStyleChange: function (start, end) {
            this.onContentChange(start, end);
            var heap = this.getActiveHeap();
        },

        onColumnWidthChange: function (col) {
            var heap = this.getActiveHeap();

            heap.contents = CacheCleaner.clean(heap.contents, {
                row: 0,
                col: col
            }, {
                row: MAX_ROW_INDEX,
                col: col
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
                contents[row][col] = this.__calculateContent(row, col);
            }

            return heap.contents[row][col];
        },

        getDisplayInfo: function (row, col) {
            var formattedInfo = this.rs('get.formatted.info', row, col);

            if (!formattedInfo) {
                return null;
            }

            return {
                type: formattedInfo.type,
                color: formattedInfo.color,
                horizontal: formattedInfo.horizontal,
                content: this.getDisplayContent(row, col)
            };
        },

        __calculateContent: function (row, col) {
            var formattedInfo = this.rs('get.formatted.info', row, col);

            if ($$.isNdef(formattedInfo)) {
                return null;
            }

            if (formattedInfo.type === VALUE_TYPE.TEXT) {
                return this.__calculateText(formattedInfo, row, col);
            } else {
                return this.__calculateOther(formattedInfo, row, col);
            }
        },

        // 计算文本类型的显示内容
        __calculateText: function (info, row, col) {
            var content = info.text;
            var result = [];
            var current;
            var currentType;

            var lastRepeat = null;
            var lastIndex = -1;

            for (var i = 0, len = content.length; i < len; i++) {
                current = content[i];
                currentType = current.type;

                if (currentType === 'repeat') {
                    lastIndex = result.length;
                    lastRepeat = current.value;
                } else if (currentType === 'placeholder') {
                    result.push(' ');
                } else {
                    result.push(current);
                }
            }

            if (lastRepeat) {
                result = this.__getRepeatContent(lastRepeat, lastIndex, result, row, col);
            }

            result = result.join('');

            // 查询当前单元格是否设置了自动换行
            if (!this.queryCommandValue('wraptext', row, col)) {
                return result.split('\n');
            }

            return this.__autoWrap(result, col);
        },

        __calculateOther: function (info, row, col) {
            var content = info.text;
            var result = [];
            var current;
            var currentType;

            var lastRepeat = null;
            var lastIndex = -1;

            for (var i = 0, len = content.length; i < len; i++) {
                current = content[i];
                currentType = current.type;

                if (currentType === 'repeat') {
                    lastIndex = result.length;
                    lastRepeat = current.value;
                } else if (currentType === 'placeholder') {
                    result.push(' ');
                } else {
                    result.push(current);
                }
            }

            if (lastRepeat) {
                result = this.__getRepeatContent(lastRepeat, lastIndex, result, row, col);
            }

            result = result.join('');
            /* --- 非文本类型，不受换行影响 --- */

            return this.__checkSpace(result, row, col);
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
        },

        /**
         * 检查给定内容是否超出当前的单元格空间，如果超出，则根据空间大小，返回最终的内容
         * @param content
         * @param row
         * @param col
         * @private
         */
        __checkSpace: function (content, row, col) {
            var width = this.queryCommandValue('columnwidth', col) - 2 * CELL_PADDING.h;
            var font = this.queryCommandValue('font', row, col);
            var fontsize = this.queryCommandValue('fontsize', row, col);
            var diff = width - this.__getTextWidth(content, font, fontsize);

            // 空间足够，返回原始值
            if (diff >= 0) {
                return [content];
            }

            // 否则，返回####
            var result = this.__getRepeatContent('#', 0, [], row, col);

            return [result.join('')];
        },

        /**
         * 获取给定单元格应用重复字符后的值
         * @param repeatChar
         * @param content
         * @private
         */
        __getRepeatContent: function (repeatChar, charIndex, contentArr, row, col) {
            var width = this.queryCommandValue('columnwidth', col) - 2 * CELL_PADDING.h;
            var font = this.queryCommandValue('font', row, col);
            var fontsize = this.queryCommandValue('fontsize', row, col);

            var count = this.__getRepeatCharCount(repeatChar, contentArr.join(''), width, font, fontsize);

            if (count === 0) {
                return contentArr;
            }

            var front = contentArr.slice(0, charIndex);
            var back = contentArr.slice(charIndex);

            return this.__validateRepeat(count, repeatChar, width, front, back, font, fontsize);
        },

        __validateRepeat: function (count, repeatChar, maxWidth, front, back, font, fontsize) {
            var charStr = [];

            if (count === 0) {
                return [front.concat(back).join('')];
            }

            for (var i = 0; i < count; i++) {
                charStr[i] = repeatChar;
            }

            var content = front.concat(charStr, back).join('');
            var width = this.__getTextWidth(content, font, fontsize);

            if (width <= maxWidth) {
                return [content];
            } else {
                return this.__validateRepeat(count - 1, repeatChar, maxWidth, front, back, font, fontsize);
            }
        },

        __getRepeatCharCount: function (repeatChar, content, width, font, fontsize) {
            var diff = width - this.__getTextWidth(content, font, fontsize);

            if (diff <= 0) {
                return 0;
            }

            var charWidth = this.__getTextWidth(repeatChar, font, fontsize);
            return Math.floor(diff / charWidth);
        },

        __getTextWidth: function (content, font, fontsize) {
            var repeatBox = this.repeatBox;

            var htmls = [
                '<span style="font-size: ' + fontsize + 'pt; font-family: ' + font + ';">',
                content.replace(/\n/g, '').replace(/ /g, '&nbsp;'),
                '</span>'
            ];

            repeatBox.innerHTML = htmls.join('');

            return repeatBox.firstChild.getBoundingClientRect().width;
        }
    });
});