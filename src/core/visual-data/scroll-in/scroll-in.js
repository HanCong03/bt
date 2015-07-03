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

    module.exports = $.extend({
        /**
         * 把给定的区域滚动到可视区域内，如果给定给定区域超过了可视区域的大小，则将给定区域的起始点放在可视区域的左上角。
         * @param start
         * @param end
         */
        scrollIn: function (start, end) {
            this.__scrollRowInView(start.row, end.row);
            this.__scrollColumnInView(start.col, end.col);

            // 调用刷新
            this.__refresh();
        },

        __scrollRowInView: function (startRow, endRow) {
            var heap = this.getActiveHeap();

            if (heap.rowPaneCount > 0) {
                this.__scrollRowInPaneView(startRow, endRow);
            } else {
                this.__scrollRowInNormalView(startRow, endRow);
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

            if (heap.rowPaneCount > 0) {
                this.__scrollColumnInPaneView(startCol, endCol);
            } else {
                this.__scrollColumnInNormalView(startCol, endCol);
            }
        }
    }, require('./pane'), require('./normal'));
});