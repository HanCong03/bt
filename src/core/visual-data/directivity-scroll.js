/**
 * @file 带方向的滚动。如果给定的滚动参数小于0，则进行头部滚动，此时，起始行和列将**减少**指定的数量。
 *       如果给定的滚动参数大于0，则进行尾部滚动，此时，结束行和列将**增加**指定的数量，
 *       并且，该操作保证滚动之后的结束行列能够完全显示在可视区域内。
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var LIMIT = require('definition/limit');
    var MAX_ROW_INDEX = LIMIT.MAX_ROW - 1;
    var MAX_COLUMN_INDEX = LIMIT.MAX_COLUMN - 1;

    module.exports = {
        //directivityScroll: function (rowCount, colCount) {
        //    if (rowCount === 0 && colCount === 0) {
        //        return;
        //    }
        //
        //    var heap = this.getActiveHeap();
        //    heap.pane = this.queryCommandValue('pane');
        //
        //    this.__scrollRow(rowCount);
        //    this.__scrollColumn(colCount);
        //
        //    this.emit('viewchange');
        //},
        //
        ///**
        // * 从尾部计算行布局
        // * 注意：必须先计算行，才能计算列
        // * @private
        // */
        //__scrollRow: function (rowCount) {
        //    var heap = this.getActiveHeap();
        //    var row;
        //
        //    if (rowCount < 0) {
        //        row = this.__getUpViewRow(heap.row, rowCount);
        //        this.__scrollRowToStart(row);
        //    } else if (rowCount > 0) {
        //        row = this.__getDownViewRow(heap.endRow, rowCount);
        //        // 滚动指定行到尾部。
        //        this.__scrollRowToEnd(row);
        //    }
        //},
        //
        ///**
        // * 从尾部计算列布局
        // * 注意：必须先计算行，才能计算列
        // * @private
        // */
        //__scrollColumn: function (colCount) {
        //    var heap = this.getActiveHeap();
        //    var col;
        //
        //    if (colCount < 0) {
        //        col = this.__getLeftViewColumn(heap.col, colCount);
        //        this.__scrollColumnToStart(col);
        //    } else if (colCount > 0) {
        //        col = this.__getRightViewColumn(heap.endCol, colCount);
        //        this.__scrollColumnToEnd(col);
        //    }
        //},
        //
        ///* --- 计算新的行列索引 start --- */
        //__getUpViewRow: function (row, count) {
        //    var min = this.__getMinStart();
        //    count = -count;
        //
        //    while (count-- > 0 && row > min.row) {
        //        row--;
        //
        //        if (this.queryCommandValue('hiddenrow', row)) {
        //            count++;
        //            continue;
        //        }
        //    }
        //
        //    return row;
        //},
        //
        //__getDownViewRow: function (row, count) {
        //    while (count-- > 0 && row < MAX_ROW_INDEX) {
        //        row++;
        //
        //        if (this.queryCommandValue('hiddenrow', row)) {
        //            count++;
        //            continue;
        //        }
        //    }
        //
        //    return row;
        //},
        //
        //__getLeftViewColumn: function (col, count) {
        //    var min = this.__getMinStart();
        //    count = -count;
        //
        //    while (count-- > 0 && col > min.col) {
        //        col--;
        //
        //        if (this.queryCommandValue('hiddencolumn', col)) {
        //            count++;
        //            continue;
        //        }
        //    }
        //
        //    return col;
        //},
        //
        //__getRightViewColumn: function (col, count) {
        //    while (count-- > 0 && col < MAX_COLUMN_INDEX) {
        //        col++;
        //
        //        if (this.queryCommandValue('hiddencolumn', col)) {
        //            count++;
        //            continue;
        //        }
        //    }
        //
        //    return col;
        //}
        /* --- 计算新的行列索引 end --- */
    };
});