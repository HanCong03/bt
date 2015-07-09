/**
 * @file 行高计算
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var CELL_PADDING = require('definition/cell-padding');
    var DOUBLE_V_PADDIGN = 2 * CELL_PADDING.v;

    module.exports = $$.createClass('RowHeight', {
        base: require('module'),

        shadowBox: null,

        init: function () {
            this.__initShadowBox();
            this.__initHeap();
            this.__initEvent();
        },

        __initShadowBox: function () {
            var standard = this.queryCommandValue('standard');
            this.shadowBox = document.createElement('span');

            $(this.shadowBox).css({
                fontFamily: standard.font,
                lineHeight: 1,
                fontSize: standard.fontsize + 'pt'
            });

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

        getRowHeight: function (row) {
            var heap = this.getActiveHeap();

            if ($$.isNdef(heap.heights[row])) {
                heap.heights[row] = this.__calculate(row);
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
                    cache[i] = [];
                    continue;
                }

                for (var j = startCol, jlimit = endCol; j <= jlimit; j++) {
                    if (currentCache[j] !== undefined) {
                        delete currentCache[j];
                    }
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

                // 新计算的高度如果大于标准高度，则更新最佳高度。
                if (newHeight > userRowHeight) {
                    this.setBestFitRowHeight(newHeight, row);
                    return newHeight;

                    // 否则，返回最佳高度。

                // 否则，删除高度设置，并返回标准高度。
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

            return shadowBox.firstChild.offsetHeight + DOUBLE_V_PADDIGN;
        }
    });
});