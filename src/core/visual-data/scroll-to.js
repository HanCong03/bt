/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var GRIDLINE_CONFIG = require('definition/gridline');
    var LINE_WIDTH = GRIDLINE_CONFIG.width;

    module.exports = {
        __scrollRowToStart: function (row) {
            var heap = this.getActiveHeap();

            heap.row = row;
            this.__refreshRow(heap.spaceHeight);
        },

        __scrollRowToEnd: function (row) {
            var heap = this.getActiveHeap();
            // 通过指定结束行来计算新的起始行
            row = this.__calculateStartRowByEndRow(row);

            if ($$.isNdef(row)) {
                return;
            }

            heap.row = row;
            this.__refreshRow(heap.spaceHeight);
        },

        __scrollColumnToStart: function (col) {
            var heap = this.getActiveHeap();

            heap.col = col;
            this.__refreshColumn(heap.spaceWidth);
        },

        __scrollColumnToEnd: function (col) {
            var heap = this.getActiveHeap();
            col = this.__calculateStartColumnByEndColumn(col);

            if ($$.isNdef(col)) {
                return;
            }

            heap.col = col;
            this.__refreshColumn(heap.spaceWidth);
        },

        /**
         * 以给定行作为最末一条完全可见的行，计算出满足该情况下的可视化数据对象的起始行。
         * @private
         */
        __calculateStartRowByEndRow: function (row) {
            var heap = this.getActiveHeap();
            // 去除窗格区域后剩余的可用空间
            var spaceHeight = heap.spaceHeight - heap.paneHeight;

            // 可视区域全被窗格占据，则直接返回
            if (spaceHeight <= 0) {
                return;
            }

            spaceHeight -= LINE_WIDTH + this.queryCommandValue('rowheight', row);

            var offset = 0;

            while (row > 0) {
                offset += LINE_WIDTH + this.queryCommandValue('rowheight', row - 1);

                if (spaceHeight < offset) {
                    break;
                }

                row--;
            }

            return row - heap.rowPaneCount;
        },

        __calculateStartColumnByEndColumn: function (col) {
            var heap = this.getActiveHeap();

            // 去除窗格区域后剩余的可用空间
            var spaceWidth = heap.spaceWidth - heap.paneWidth;

            // 可视区域全被窗格占据，则直接返回。
            if (spaceWidth <= 0) {
                return;
            }

            spaceWidth -= LINE_WIDTH + this.queryCommandValue('columnwidth', col);

            var offset = 0;

            while (col > 0) {
                offset += LINE_WIDTH + this.queryCommandValue('columnwidth', col - 1);

                if (spaceWidth < offset) {
                    break;
                }

                col--;
            }

            return col - heap.colPaneCount;
        }
    };
});