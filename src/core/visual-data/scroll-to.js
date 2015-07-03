/**
 * @file 普通滚动，以头部作为参考，仅改变起始行列值。
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var LIMIT = require('definition/limit');
    var MAX_ROW_INDEX = LIMIT.MAX_ROW - 1;
    var MAX_COLUMN_INDEX = LIMIT.MAX_COLUMN - 1;

    module.exports = {
        scrollTo: function (row, col) {
            var heap = this.getActiveHeap();

            if (row < 0) {
                row = 0;
            } else if (row > MAX_ROW_INDEX) {
                row = MAX_ROW_INDEX;
            }

            if (col < 0) {
                col = 0;
            } else if (col > MAX_COLUMN_INDEX) {
                col = MAX_COLUMN_INDEX;
            }

            // 更新起始行列
            heap.row = row;
            heap.col = col;

            // 刷新
            this.__refresh();
            this.emit('viewchange');
        },

        scrollRowTo: function (row) {
            var heap = this.getActiveHeap();
            return this.scrollTo(row, heap.col);
        },

        scrollColumnTo: function (col) {
            var heap = this.getActiveHeap();
            return this.scrollTo(heap.row, col);
        }
    };
});