/**
 * @file 列宽计算
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var NUMERIC_TYPE = require('definition/numeric-type');
    var CELL_PADDING = require('definition/cell-padding');
    var DOUBLE_H_PADDING = 2 * CELL_PADDING.h;

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
                'contentchange': this.__clean
            })
        },

        getColumnWidth: function (col) {
            var heap = this.getActiveHeap();

            if ($$.isNdef(heap.widths[col])) {
                heap.widths[col] = this.__calculateColumnWidth(col);
            }

            return heap.widths[col];
        },

        setColumnWidth: function (width, startCol, endCol) {
            width = +(width / this.rs('get.char.unit')).toFixed(2);

            if (width < 0) {
                width = 0;
            }

            this.rs('set.column.width', width, startCol, endCol);
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
            var widths = heap.widths;
            var cache = heap.cache;

            var currentCache;

            for (var i = start.col, limit = end.col; i <= limit; i++) {
                if (widths[i] !== undefined) {
                    delete widths[i];
                }

                currentCache = cache[i];

                if (!currentCache) {
                    continue;
                }

                for (var j = start.row, jlimit = end.row; j <= jlimit; j++) {
                    if (currentCache[j] !== undefined) {
                        delete currentCache[j];
                    }
                }
            }
        },

        __calculateColumnWidth: function (col) {
            // 查看用户设置的宽度
            var userColumnWidth = this.rs('get.column.width', col);

            if ($$.isDefined(userColumnWidth)) {
                return Math.round(this.rs('get.char.unit') * userColumnWidth);
            }

            return this.__autoWidth(col);
        },

        __autoWidth: function (col) {
            var dimension = this.queryCommandValue('dimension');
            var standard = this.queryCommandValue('standard');

            if (dimension.max.col < col || dimension.min.col > col) {
                return standard.width;
            }

            var width = this.__calculateWidth(col, dimension.min.row, dimension.max.row);

            // 返回自动计算的宽度和标准宽度中比较大的值
            return Math.max(standard.width, width);
        },

        __calculateWidth: function (col, startRow, endRow) {
            var cache = this.getActiveHeap().cache;

            cache[col] = cache[col] || [];

            var columnCache = cache[col];
            var width = 0;

            for (var i = startRow; i <= endRow; i++) {
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
            var content = this.rs('get.display.content', row, col);

            if (!contentType || !NUMERIC_TYPE[contentType]) {
                return 0;
            }

            var font = this.queryCommandValue('userfont', row, col);
            var fontsize = this.queryCommandValue('userfontsize', row, col);

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

            return shadowBox.firstChild.offsetHeight + DOUBLE_H_PADDING;
        }
    });
});