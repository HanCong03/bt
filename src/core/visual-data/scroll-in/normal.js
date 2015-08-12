/**
 * @file scroll-in实现，负责完成不带窗格的视图的滚动。
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var GRIDLINE_CONFIG = require('definition/gridline');
    var LINE_WIDTH = GRIDLINE_CONFIG.width;

    module.exports = $.extend({
        __scrollRowInNormalView: function (startRow, endRow) {
            var heap = this.getActiveHeap();

            // 超出视图顶部，则直接设置该行为起始行
            if (startRow < heap.startRow) {
                heap.row = startRow;
                return;
            }

            // 区域可见，不滚动
            if (endRow <= heap.lastFullRow) {
                return;
            }

            // 其他情况下，定位结束行到底部，并检查起始行是否可见。
            heap.row = this.__checkRowToEndInNormalView(startRow, endRow);
        },

        __scrollColumnInNormalView: function (startCol, endCol) {
            var heap = this.getActiveHeap();

            // 左溢出，则直接设置该列为起始列
            if (startCol < heap.startCol) {
                heap.col = startCol;
                return;
            }

            // 区域可见，不滚动
            if (endCol <= heap.lastFullCol) {
                return;
            }

            // 其他情况下，定位结束列到右侧，并检查起始列是否可见。
            heap.col = this.__checkColumnToEndInNormalView(startCol, endCol);
        },

        /**
         * 计算当把给定的endRow设置到视图的结尾时，是否可以完整显示给定的区域，如果能，则返回此时的行游标，
         * 否则，则把startRow设置到视图的起始位置上，并返回此时的行游标。
         * @param startRow
         * @param endRow
         * @private
         */
        __checkRowToEndInNormalView: function (startRow, endRow) {
            var heap = this.getActiveHeap();
            var spaceHeight = heap.spaceHeight;
            var offset = LINE_WIDTH;
            var row = endRow;

            while (row >= 0) {
                if (this.queryCommandValue('hiderow', row)) {
                    row--;
                    continue;
                }

                offset += this.queryCommandValue('rowheight', row) + LINE_WIDTH;

                if (spaceHeight < offset) {
                    row += 1;
                    break;
                }

                row--;
            }

            // 给定的起始行可见
            if (startRow >= row) {
                return row;
            }

            return startRow;
        },

        __checkColumnToEndInNormalView: function (startCol, endCol) {
            var heap = this.getActiveHeap();
            var spaceWidth = heap.spaceWidth;
            var offset = LINE_WIDTH;
            var col = endCol;

            while (col >= 0) {
                if (this.queryCommandValue('hidecolumn', col)) {
                    col--;
                    continue;
                }

                offset += this.queryCommandValue('columnwidth', col) + LINE_WIDTH;

                if (spaceWidth < offset) {
                    col += 1;
                    break;
                }

                col--;
            }

            // 给定的起始列可见
            if (startCol >= col) {
                return col;
            }

            return startCol;
        }
    });
});