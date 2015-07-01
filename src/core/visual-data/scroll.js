/**
 * @file 普通滚动，以头部作为参考，仅改变起始行列值。
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var LIMIT = require('definition/limit');
    var MAX_ROW_INDEX = LIMIT.MAX_ROW - 1;
    var MAX_COLUMN_INDEX = LIMIT.MAX_COLUMN - 1;

    module.exports = {
        scroll: function (rowCount, colCount) {
            if (rowCount === 0 && colCount === 0) {
                return;
            }

            var heap = this.getActiveHeap();

            // 更新起始行列
            heap.row = this.__getStartRow(rowCount);
            heap.col = this.__getStartColumn(colCount);

            // 刷新
            this.__refresh();
            this.emit('viewchange');
        },

        __getStartRow: function (rowCount) {
            if (rowCount < 0) {
                return this.__getLessStartRow(-rowCount);
            } else {
                return this.__getMoreStartRow(rowCount);
            }
        },

        __getStartColumn: function (colCount) {
            if (colCount < 0) {
                return this.__getLessStartColumn(-colCount);
            } else {
                return this.__getMoreStartColumn(colCount);
            }
        },

        /**
         * 获取减少指定条数的行后的新的起始行
         * @param count
         * @private
         */
        __getLessStartRow: function (count) {
            var heap = this.getActiveHeap();
            var row = heap.row;

            while (count-- > 0) {
                row--;

                if (this.queryCommandValue('hiddenrow', row)) {
                    count++;
                    continue;
                }
            }

            return row;
        },

        __getMoreStartRow: function (count) {
            var heap = this.getActiveHeap();
            var row = heap.row;

            while (count-- > 0 && row < MAX_ROW_INDEX) {
                row++;

                if (this.queryCommandValue('hiddenrow', row)) {
                    count++;
                    continue;
                }
            }

            return row;
        },

        __getLessStartColumn: function (count) {
            var heap = this.getActiveHeap();
            var col = heap.col;

            while (count-- > 0) {
                col--;

                if (this.queryCommandValue('hiddencolumn', col)) {
                    count++;
                    continue;
                }
            }

            return col;
        },

        __getMoreStartColumn: function (count) {
            var heap = this.getActiveHeap();
            var col = heap.col;

            while (count-- > 0 && col < MAX_COLUMN_INDEX) {
                col++;

                if (this.queryCommandValue('hiddencolumn', col)) {
                    count++;
                    continue;
                }
            }

            return col;
        }
    };
});