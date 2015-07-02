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
        /**
         * 把给定的区域滚动到可视区域内，如果给定给定区域超过了可视区域的大小，则将给定区域的起始点放在可视区域的左上角。
         * @param start
         * @param end
         */
        scrollIn: function (start, end) {
            //this.__scrollRowInView(start.row, end.row);
            //this.__scrollColumnInView(start.col, end.col);
            //
            //this.emit('viewchange');
        },

        __scrollRowInView: function (startRow, endRow) {
            var heap = this.getActiveHeap();

            // 区域的起始行在可视区域起始行之上，则直接把区域定位到起始位置即可
            if (startRow < heap.row) {
                this.__scrollRowToStart(startRow);

                // 如果区域的起始行在可视区域的结束行之下，则先把区域的结束行定位到可视区域底部，然后检查区域的起始行是否在可视区域内，
                // 如果在，则成功。 否则，需要把区域的起始行定位到可视区域的开头处。
            } else if (startRow >= heap.endRow) {
                this.__scrollRowToEnd(endRow);

                // 检查新的位置
                if (startRow >= heap.row) {
                    // 新的位置有效
                    return;

                    // 新位置无效，把区域的起始行放到可视区域的开始位置。
                } else {
                    this.__scrollRowToStart(startRow);
                }
            }
        },

        /**
         * 策略同 __scrollRowInView()
         * @param startRow
         * @param endRow
         * @private
         */
        __scrollColumnInView: function (startCol, endCol) {
            var heap = this.getActiveHeap();

            if (startCol < heap.col) {
                this.__scrollColumnToStart(startCol);
            } else if (startCol >= heap.endCol) {
                this.__scrollColumnToEnd(endCol);

                if (startCol >= heap.col) {
                    return;
                } else {
                    this.__scrollColumnToStart(startCol);
                }
            }
        }
    };
});