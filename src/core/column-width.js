/**
 * @file 列宽计算
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var NUMERIC_TYPE = require('definition/numeric-type');
    var CELL_PADDING = require('definition/cell-padding');
    var DOUBLE_H_PADDING = 2 * CELL_PADDING.h;

    var LIMIT = require('definition/limit');
    var MAX_COLUMN_INDEX = LIMIT.MAX_COLUMN - 1;

    module.exports = $$.createClass('ColumnWidth', {
        base: require('module'),

        shadowBox: null,

        init: function () {
            this.__initShadowBox();
            this.__initHeap();
            this.__initEvent();
        },

        __initHeap: function () {
            var heap = this.getActiveHeap();

            if ($$.isDefined(heap.widths)) {
                return;
            }

            heap.widths = [];
            heap.cache = [];
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

        __initEvent: function () {
            this.on({
                'stylechange': this.__clean,
                'contentchange': this.__clean,
                'columnwidthchange': this.__cleanColumn
            })
        },

        getColumnWidth: function (col) {
            var widths = this.getActiveHeap().widths;

            if (widths[col] === undefined) {
                widths[col] = this.__calculate(col);
            }

            return widths[col];
        },

        setColumnWidth: function (width, startCol, endCol) {
            width = this.converDisplayWidthToRealWidth(width);

            if (width < 0) {
                width = 0;
            }

            this.rs('set.column.width', width, startCol, endCol);
        },

        /**
         * 把显示宽度转换成真实宽度
         * px => unit
         */
        converDisplayWidthToRealWidth: function (width) {
            return +(width / this.rs('get.char.unit')).toFixed(2);
        },

        /**
         * 把真实宽度转换成显示宽度
         * unit => px
         */
        convertRealWidthToDisplayWidth: function (width) {
            return Math.round(width * this.rs('get.char.unit'));
        },

        setBestFitColumnWidth: function (width, col) {
            width = +(width / this.rs('get.char.unit')).toFixed(2);

            if (width <= 0) {
                return;
            }

            this.rs('set.bestfit.column.width', width, col);
        },

        __clean: function (start, end) {
            var heap = this.getActiveHeap();
            var dimension = this.queryCommandValue('dimension');
            var widths = heap.widths;
            var cache = heap.cache;
            var currentCache;

            var keys;
            var startRow = start.row;
            var endRow = end.row;

            for (var i = start.col, limit = end.col; i <= limit; i++) {
                if (widths[i] !== undefined) {
                    delete widths[i];
                }

                currentCache = cache[i];

                if (!currentCache) {
                    continue;
                }

                keys = Object.keys(cache);

                if (keys.length === 0) {
                    continue;
                }

                // 清除整列
                if (startRow <= keys[0] && endRow >= keys[keys.length - 1]) {
                    cache[i] = [];
                    continue;
                }

                for (var j = startRow, jlimit = endRow; j <= jlimit; j++) {
                    if (currentCache[j] !== undefined) {
                        delete currentCache[j];
                    }
                }
            }
        },

        __cleanColumn: function (startIndex, endIndex) {
            var heap = this.getActiveHeap();
            var widths = heap.widths;
            var cache = heap.cache;

            if (startIndex === 0 && endIndex === MAX_COLUMN_INDEX) {
                heap.widths = [];
                heap.cache = [];
                return;
            }

            for (var i = startIndex; i <= endIndex; i++) {
                if (widths[i] !== undefined) {
                    delete widths[i];
                }

                if (cache[i]) {
                    delete cache[i];
                }
            }
        },

        /**
         * 计算
         * @param col
         * @returns {*}
         * @private
         */
        __calculate: function (col) {
            var userColumnWidth = this.rs('get.column.width', col);
            var standardWidth;
            var newWidth;

            // 用户未设置宽度。
            if ($$.isNdef(userColumnWidth)) {
                newWidth = this.__calculateColumnWidth(col);
                standardWidth = this.queryCommandValue('standardwidth');

                // 新计算的宽度如果大于标准宽度，则更新当前列的宽度，并设置该宽度为最佳宽度。
                if (newWidth > standardWidth) {
                    this.setBestFitColumnWidth(newWidth, col);
                    return newWidth;

                    // 否则，返回最佳宽度。
                } else {
                    return standardWidth;
                }
            }

            var isBestFit = this.queryCommandValue('bestfitcolumnwidth', col);

            userColumnWidth = this.convertRealWidthToDisplayWidth(userColumnWidth);

            // 用户设置了最佳适应宽度。
            if (isBestFit) {
                newWidth = this.__calculateColumnWidth(col);
                // 新的高度超过了当前最佳高度，则更新最佳高度。
                if (newWidth > userColumnWidth) {
                    this.setBestFitColumnWidth(newWidth, col);
                    return newWidth;

                    // 否则，返回最佳宽度。
                } else {
                    return userColumnWidth;
                }
            }

            // 返回用户设置的自定义宽度。
            return userColumnWidth;
        },

        __calculateColumnWidth: function (col) {
            var dimension = this.queryCommandValue('dimension');

            if (dimension.max.col < col || dimension.min.col > col) {
                return 0;
            }

            return this.__calculateWidth(col, dimension.min.row, dimension.max.row);
        },

        __calculateWidth: function (col, startRow, endRow) {
            var cache = this.getActiveHeap().cache;

            cache[col] = cache[col] || [];

            var columnCache = cache[col];
            var width = 0;

            for (var i = startRow; i <= endRow; i++) {
                // 合并单元格不参与计算
                if (this.queryCommandValue('mergecell', i, col)) {
                    continue;
                }

                if (columnCache[i] === undefined) {
                    columnCache[i] = this.__collectCellWidth(i, col);
                }

                if (columnCache[i] > width) {
                    width = columnCache[i];
                }
            }

            return Math.round(width);
        },

        __collectCellWidth: function (row, col) {
            var contentType = this.queryCommandValue('contenttype', row, col);

            if (!contentType || !NUMERIC_TYPE[contentType]) {
                return 0;
            }

            var font = this.queryCommandValue('userfont', row, col);
            var fontsize = this.queryCommandValue('userfontsize', row, col);
            var content = this.rs('get.display.content', row, col);

            content = content.join('<br>')
            var shadowBox = this.shadowBox;
            shadowBox.innerHTML = '<span style="font-size: ' + fontsize + 'pt; font-family: ' + font + ';">' + content + '</span>';

            return shadowBox.firstChild.offsetWidth + DOUBLE_H_PADDING;
        }
    });
});