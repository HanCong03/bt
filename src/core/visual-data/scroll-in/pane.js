/**
 * @file scroll-in实现，负责完成带窗格的视图的滚动。
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var GRIDLINE_CONFIG = require('definition/gridline');
    var LINE_WIDTH = GRIDLINE_CONFIG.width;

    module.exports = $.extend({
        __scrollRowInPaneView: function (startRow, endRow) {
            var heap = this.getActiveHeap();
            var paneRows = heap.paneRows;

            // 超出窗格顶部，则直接设置该行为起始行
            if (startRow < heap.startRow) {
                heap.row = startRow;
                return;
            }

            var isStartRowInPane = paneRows.indexOf(startRow) !== -1;
            var isEndRowInPane = paneRows.indexOf(endRow) !== -1;

            // 区域处于窗格内部，则不滚动
            if (isStartRowInPane && isEndRowInPane) {
                return;
            }

            // 都不属于窗格
            var row;

            if (!isStartRowInPane && !isEndRowInPane) {
                // 窗格区域占满整个窗格，则不滚动。
                if (heap.normalRows.length === 0) {
                    return;
                }

                // 区域上溢出，则设置该行显示在正常视图的起始行上。
                if (startRow < heap.normalRows[0]) {
                    heap.row = this.__getUpRow(startRow, heap.rowPaneCount);
                    return;
                }

                // 区域可见，不滚动
                if (endRow <= heap.lastFullRow) {
                    return;
                }

                // 其他情况下，定位结束行到底部，并检查起始行是否可见。
                row = this.__checkRowToEndInPaneView(startRow, endRow);
                heap.row = this.__getUpRow(row, heap.rowPaneCount);

                return;
            }

            // 其他情况暂时不处理
            console.log('error: unknow');
        },

        __scrollColumnInPaneView: function (startCol, endCol) {
            var heap = this.getActiveHeap();
            var paneCols = heap.paneCols;

            // 超出窗格左侧，则直接设置该列为起始列
            if (startCol < heap.startCol) {
                heap.col = startCol;
                return;
            }

            var isStartColInPane = paneCols.indexOf(startCol) !== -1;
            var isEndColInPane = paneCols.indexOf(endCol) !== -1;

            // 区域处于窗格内部，则不滚动
            if (isStartColInPane && isEndColInPane) {
                return;
            }

            // 都不属于窗格
            var col;

            if (!isStartColInPane && !isEndColInPane) {
                // 窗格区域占满整个窗格，则不滚动。
                if (heap.normalCols.length === 0) {
                    return;
                }

                // 区域左溢出，则设置该列显示在正常视图的起始列上。
                if (startCol < heap.normalCols[0]) {
                    heap.col = this.__getLeftColumn(startCol, heap.colPaneCount);
                    return;
                }

                // 区域可见，不滚动
                if (endCol <= heap.lastFullCol) {
                    return;
                }

                // 其他情况下，定位结束列到右侧，并检查起始列是否可见。
                col = this.__checkColumnToEndInPaneView(startCol, endCol);
                heap.col = this.__getLeftColumn(col, heap.colPaneCount);

                return;
            }

            // 其他情况暂时不处理
            console.log('error: unknow');
        },

        // 计算指定行向上滚动count后的位置。
        __getUpRow: function (row, count) {
            while (count > 0) {
                if (this.queryCommandValue('hiddenrow', row - 1)) {
                    continue;
                }

                row--;
                count--;
            }

            return row;
        },

        __getLeftColumn: function (col, count) {
            while (count > 0) {
                if (this.queryCommandValue('hiddencolumn', col - 1)) {
                    continue;
                }

                col--;
                count--;
            }

            return col;
        },

        /**
         * 计算当把给定的endRow设置到视图的结尾时，是否可以完整显示给定的区域，如果能，则返回此时的行游标，
         * 否则，则把startRow设置到视图的起始位置上，并返回此时的行游标。
         * @param startRow
         * @param endRow
         * @private
         */
        __checkRowToEndInPaneView: function (startRow, endRow) {
            var heap = this.getActiveHeap();
            var spaceHeight = heap.spaceHeight - heap.paneHeight;
            // pane视图下，计算普通行列时offset从0开始
            var offset = 0;
            var row = endRow;

            while (row >= 0) {
                if (this.queryCommandValue('hiddenrow', row)) {
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

        __checkColumnToEndInPaneView: function (startCol, endCol) {
            var heap = this.getActiveHeap();
            var spaceWidth = heap.spaceWidth - heap.paneWidth;
            // pane视图下，计算普通行列时offset从0开始
            var offset = 0;
            var col = endCol;

            while (col >= 0) {
                if (this.queryCommandValue('hiddencolumn', col)) {
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