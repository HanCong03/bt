/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var GRIDLINE_CONFIG = require('definition/gridline');
    var OFFSET = GRIDLINE_CONFIG.offset;
    var LINE_WIDTH = GRIDLINE_CONFIG.width;

    var LIMIT = require('definition/limit');
    var MAX_ROW_INDEX = LIMIT.MAX_ROW - 1;
    var MAX_COLUMN_INDEX = LIMIT.MAX_COLUMN - 1;

    module.exports = {
        scroll: function (rowCount, colCount) {
            if (rowCount === 0 && colCount === 0) {
                return;
            }

            this.__scroll(rowCount, colCount);
        },

        __scroll: function (rowCount, colCount) {
            var heap = this.getActiveHeap();
            var oldStartRow = heap.row;
            var oldStartCol = heap.col;

            heap.pane = this.queryCommandValue('pane');

            this.__scrollRow(rowCount);
            this.__scrollColumn(colCount);

            // 比较新的起始行列是否有变化
            if (heap.row === oldStartRow && heap.col === oldStartCol) {
                return;
            }

            this.emit('viewchange');
        },

        /**
         * 从尾部计算行布局
         * 注意：必须先计算行，才能计算列
         * @private
         */
        __scrollRow: function (rowCount) {
            var heap = this.getActiveHeap();
            var containerSize = this.getContainerSize();

            heap.headHeight = this.queryCommandValue('standardheight');
            var spaceHeight = containerSize.height - heap.headHeight;

            if (rowCount < 0) {
                heap.row = this.__getUpViewRow(heap.row, rowCount);
            } else if (rowCount > 0) {
                heap.endRow = this.__getDownViewRow(heap.endRow, rowCount);
                // 通过尾部行索引计算起始行索引
                heap.row = this.__calculateStartRow(spaceHeight);
            }

            this.__refreshRow(spaceHeight);
        },

        /**
         * 从尾部计算列布局
         * 注意：必须先计算行，才能计算列
         * @private
         */
        __scrollColumn: function (colCount) {
            var heap = this.getActiveHeap();
            var containerSize = this.getContainerSize();

            // 头部宽度
            heap.headWidth = this.__calculateHeadWidth(heap.rows);
            var spaceWidth = containerSize.width - heap.headWidth;

            if (colCount < 0) {
                heap.col = this.__getLeftViewColumn(heap.col, colCount);
            } else if (colCount > 0) {
                heap.endCol = this.__getRightViewColumn(heap.endCol, colCount);
                // 通过尾部列索引计算起始列索引
                heap.col = this.__calculateStartColumn(spaceWidth);
            }

            this.__refreshColumn(spaceWidth);
        },

        /**
         * 从尾部计算其实行索引
         * @param spaceHeight
         * @returns {*}
         * @private
         */
        __calculateStartRow: function (spaceHeight) {
            if (this.queryCommandValue('hiddenallrow')) {
                return null;
            }

            var heap = this.getActiveHeap();
            var currentHeight;
            var offset = LINE_WIDTH;
            var row = heap.endRow;

            do {
                // 被隐藏的列
                if (this.queryCommandValue('hiddenrow', row)) {
                    row--;
                    continue;
                }

                currentHeight = this.queryCommandValue('rowheight', row);
                offset += currentHeight + LINE_WIDTH;

                row--;
            } while (spaceHeight > offset);

            row += 1;

            // 计算开始行索引
            if (spaceHeight === offset) {
                return row;
            }

            return row + 1;
        },

        /**
         * 从尾部计算起始列索引
         * @private
         */
        __calculateStartColumn: function (spaceWidth) {
            if (this.queryCommandValue('hiddenallcolumn')) {
                return null;
            }

            var heap = this.getActiveHeap();
            var currentWidth;
            var offset = LINE_WIDTH;
            var col = heap.endCol;

            do {
                // 被隐藏的列
                if (this.queryCommandValue('hiddencolumn', col)) {
                    col--;
                    continue;
                }

                currentWidth = this.queryCommandValue('columnwidth', col);
                offset += currentWidth + LINE_WIDTH;

                col--;
            } while (spaceWidth > offset);

            col += 1;

            if (spaceWidth === offset) {
                return col;
            }

            return col + 1;
        },

        /* --- 计算新的行列索引 start --- */
        __getUpViewRow: function (row, count) {
            var min = this.__getMinStart();
            count = -count;

            while (count-- > 0 && row > min.row) {
                row--;

                if (this.queryCommandValue('hiddenrow', row)) {
                    count++;
                    continue;
                }
            }

            return row;
        },

        __getDownViewRow: function (row, count) {

            while (count-- > 0 && row < MAX_ROW_INDEX) {
                row++;

                if (this.queryCommandValue('hiddenrow', row)) {
                    count++;
                    continue;
                }
            }

            return row;
        },

        __getLeftViewColumn: function (col, count) {
            var min = this.__getMinStart();
            count = -count;

            while (count-- > 0 && col > min.col) {
                col--;

                if (this.queryCommandValue('hiddencolumn', col)) {
                    count++;
                    continue;
                }
            }

            return col;
        },

        __getRightViewColumn: function (col, count) {
            while (count-- > 0 && col < MAX_COLUMN_INDEX) {
                col++;

                if (this.queryCommandValue('hiddencolumn', col)) {
                    count++;
                    continue;
                }
            }

            return col;
        }
        /* --- 计算新的行列索引 end --- */
    };
});