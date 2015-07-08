/**
 * @file 列宽，行高计算
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var CELL_PADDING = require('definition/cell-padding');
    var DOUBLE_V_PADDIGN = 2 * CELL_PADDING.v;

    var LIMIT = require('definition/limit');
    var MAX_COLUMN_INDEX = LIMIT.MAX_COLUMN - 1;

    module.exports = $$.createClass('RowHeight', {
        base: require('module'),

        shadowBox: null,

        init: function () {
            this.__initShadowBox();
            this.__initHeap();
            this.__initBoxSetting();
            this.__initEvent();
        },

        __initShadowBox: function () {
            this.shadowBox = document.createElement('span');
            this.getShadowContainer().appendChild(this.shadowBox);
        },

        __initHeap: function () {
            var heap = this.getActiveHeap();

            if ($$.isDefined(heap.heights)) {
                return;
            }

            heap.heights = [];
            heap.cache = [];
        },

        __initEvent: function () {
            this.on({
                'contentchange': this.__clean,
                'stylechange': this.__clean
            });
        },

        /**
         * 在底层theme发生改变之后，需要重新初始化shadow-box的style
         * @private
         */
        __initBoxSetting: function () {
            var standard = this.queryCommandValue('standard');
            $(this.shadowBox).css({
                fontFamily: standard.font,
                lineHeight: 1,
                fontSize: standard.fontsize + 'pt'
            });
        },

        getRowHeight: function (row) {
            var heap = this.getActiveHeap();

            if ($$.isNdef(heap.heights[row])) {
                heap.heights[row] = this.__calculateRowHeight(row);
            }

            return heap.heights[row];
        },

        setRowHeight: function (height, startRow, endRow) {
            height = +(height * 3 / 4).toFixed(2);

            if (height < 0) {
                height = 0;
            }

            this.rs('set.row.height', height, startRow, endRow);
        },

        __clean: function (start, end) {
            var heap = this.getActiveHeap();
            var cache = heap.cache;
            var heights = heap.heights;

            var currentCache;

            for (var i = start.row, limit = end.row; i <= limit; i++) {
                if (heights[i] !== undefined) {
                    delete heights[i];
                }

                currentCache = cache[i];

                if (!currentCache) {
                    continue;
                }

                for (var j = start.col, jlimit = end.col; j <= jlimit; j++) {
                    if (currentCache[j] !== undefined) {
                        delete currentCache[j];
                    }
                }
            }
        },

        /**
         * 计算指定行的高度
         * @param row
         * @private
         */
        __calculateRowHeight: function (row) {
            // 检查是否有显式设定的行高
            var rowHeight = this.rs('get.row.height', row);

            if ($$.isDefined(rowHeight)) {
                return Math.round(rowHeight * 4 / 3);
            }

            return this.__autoHeight(row);
        },

        /**
         * 计算指定行的自动高度
         * @param row
         * @returns {*}
         * @private
         */
        __autoHeight: function (row) {
            var dimension = this.queryCommandValue('dimension');
            var standard = this.queryCommandValue('standard');

            if (dimension.max.row < row || dimension.min.row > row) {
                return standard.height;
            }

            var height = this.__calculateHeight(row, dimension.min.col, dimension.max.col);

            return Math.max(standard.height, height);
        },

        __calculateHeight: function (row, startCol, endCol) {
            var cache = this.getActiveHeap().cache;

            cache[row] = cache[row] || [];

            var rowCache = cache[row];
            var height = 0;

            for (var i = startCol; i <= endCol; i++) {
                if (rowCache[i] === undefined) {
                    rowCache[i] = this.__collectCellHeight(row, i);
                }

                if (rowCache[i] > height) {
                    height = rowCache[i];
                }
            }

            return Math.round(height);
        },

        __collectCellHeight: function (row, col) {
            var font = this.queryCommandValue('userfont', row, col);
            var fontsize = this.queryCommandValue('userfontsize', row, col);
            var content = this.rs('get.display.content', row, col);

            if (!font && !fontsize && !content) {
                return 0;
            }

            if (!content) {
                content = '0';
            } else {
                content = content.join('<br>')
            }

            var shadowBox = this.shadowBox;

            shadowBox.innerHTML = '<span style="font-size: ' + fontsize + 'pt; font-family: ' + font + ';">' + content + '</span>';
            return shadowBox.firstChild.offsetHeight;
        }
    });
});