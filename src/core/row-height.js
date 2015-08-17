/**
 * @file 行高计算
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var CELL_PADDING = require('definition/cell-padding');
    var DOUBLE_V_PADDIGN = 2 * CELL_PADDING.v;

    var LIMIT = require('definition/limit');
    var MAX_ROW_INDEX = LIMIT.MAX_ROW - 1;

    module.exports = $$.createClass('RowHeight', {
        base: require('module'),

        shadowBox: null,

        init: function () {
            this.__initShadowBox();
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
                'stylechange': this.__clean,
                'rowheightchange': this.__cleanRow,
                'sheetswitch': this.__onSheetSwitch,
                'dataready': this.__onDataReady
            });
        },

        __onDataReady: function () {
            var standard = this.queryCommandValue('standard');

            $(this.shadowBox).css({
                fontFamily: standard.font,
                lineHeight: 1,
                fontSize: standard.fontsize + 'pt'
            });

            this.__initHeap();
        },

        __onSheetSwitch: function () {
            this.__initHeap();
        },

        getRowHeight: function (row) {
            var dimension = this.queryCommandValue('dimension');

            if (row < dimension.min.row || row > dimension.max.row) {
                return this.queryCommandValue('standardheight');
            }

            var heights = this.getActiveHeap().heights;

            if ($$.isNdef(heights[row])) {
                heights[row] = this.__calculate(row);
            }

            return heights[row];
        },

        setRowHeight: function (height, startRow, endRow) {
            height = +(height * 3 / 4).toFixed(2);

            if (height < 0) {
                height = 0;
            }

            this.rs('set.row.height', height, startRow, endRow);
        },

        setBestFitRowHeight: function (height, row) {
            height = this.convertDisplayHeightToRealHeight(height);

            if (height <= 0) {
                return;
            }

            this.rs('set.bestfit.row.height', height, row);
        },

        /**
         * 真实高度到显示高度的转换
         * unit -> px
         */
        convertRealHeightToDisplayHeight: function (height) {
            return Math.round(height * 4 / 3);
        },

        /**
         * 显示高度到真实高度的转换
         * px -> unit
         */
        convertDisplayHeightToRealHeight: function (height) {
            return +(height * 3 / 4).toFixed(2);
        },

        __clean: function (start, end) {
            var heap = this.getActiveHeap();
            var dimension = this.queryCommandValue('dimension');
            var cache = heap.cache;
            var heights = heap.heights;
            var currentCache;

            var keys;
            var startCol = start.col;
            var endCol = end.col;

            for (var i = start.row, limit = end.row; i <= limit; i++) {
                if (heights[i] !== undefined) {
                    delete heights[i];
                }

                currentCache = cache[i];

                if (!currentCache) {
                    continue;
                }

                keys = Object.keys(cache);

                if (keys.length === 0) {
                    continue;
                }

                // 清除整行
                if (startCol <= keys[0] && endCol >= keys[keys.length - 1]) {
                    delete cache[i];
                    continue;
                }

                for (var j = startCol, jlimit = endCol; j <= jlimit; j++) {
                    if (currentCache[j] !== undefined) {
                        delete currentCache[j];
                    }
                }
            }
        },

        __cleanRow: function (startIndex, endIndex) {
            var heap = this.getActiveHeap();
            var heights = heap.heights;
            var cache = heap.cache;

            if (startIndex === 0 && endIndex === MAX_ROW_INDEX) {
                heap.cache = [];
                heap.heights = [];

                return;
            }

            for (var i = startIndex; i <= endIndex; i++) {
                if (heights[i] !== undefined) {
                    delete heights[i];
                }

                if (cache[i]) {
                    delete cache[i];
                }
            }
        },

        /**
         * 计算工作
         */
        __calculate: function (row) {
            var userRowHeight = this.rs('get.row.height', row);
            var standardHeight = this.queryCommandValue('standardheight');
            var newHeight;

            // 用户未设置高度。
            if ($$.isNdef(userRowHeight)) {
                newHeight = this.__calculateRowHeight(row);

                // 新计算的高度如果大于标准高度，则更新当前列的高度，并设置该高度为最佳高度。
                if (newHeight > standardHeight) {
                    this.setBestFitRowHeight(newHeight, row);
                    return newHeight;

                    // 否则，返回最佳高度。
                } else {
                    return standardHeight;
                }
            }

            var isBestFit = this.queryCommandValue('bestfitrowheight', row);

            userRowHeight = this.convertRealHeightToDisplayHeight(userRowHeight);

            // 用户设置了最佳适应高度。
            if (isBestFit) {
                newHeight = this.__calculateRowHeight(row);

                // 新计算的高度如果大于标准高度，则更新最佳高度，并返回新的高度。
                if (newHeight > standardHeight) {
                    this.setBestFitRowHeight(newHeight, row);
                    return newHeight;

                // 否则，删除最佳高度的设置，并返回标准高度。
                } else {
                    this.execCommand('removerowheight', row);
                    return standardHeight;
                }
            }

            // 返回用户设置的自定义高度。
            return userRowHeight;
        },

        /**
         * 计算指定行的高度
         * @param row
         * @private
         */
        __calculateRowHeight: function (row) {
            var dimension = this.queryCommandValue('dimension');

            if (dimension.max.row < row || dimension.min.row > row) {
                return 0;
            }

            return this.__calculateHeight(row, dimension.min.col, dimension.max.col);
        },

        __calculateHeight: function (row, startCol, endCol) {
            var cache = this.getActiveHeap().cache;

            cache[row] = cache[row] || [];

            var rowCache = cache[row];
            var height = 0;

            for (var i = startCol; i <= endCol; i++) {
                // 合并单元格不参与计算
                if (this.queryCommandValue('mergecell', row, i)) {
                    continue;
                }

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
            var fontsize = this.queryCommandValue('userfontsize', row, col);
            var content = this.rs('get.display.content', row, col);

            if (!fontsize && !content) {
                return 0;
            }

            var lineCount = (content || [1]).length;

            if (!fontsize) {
                fontsize = this.queryCommandValue('standard').fontsize;
            }

            fontsize = Math.round(fontsize * 4 / 3);

            return lineCount * fontsize + DOUBLE_V_PADDIGN;
        }
    });
});