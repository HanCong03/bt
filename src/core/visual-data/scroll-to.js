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
        __scrollRowToStart: function (row) {
            var heap = this.getActiveHeap();
            var containerSize = this.getContentContainerSize();

            heap.headHeight = this.queryCommandValue('standardheight');
            var spaceHeight = containerSize.height - heap.headHeight;

            heap.row = row;
            this.__refreshRow(spaceHeight);
        },

        __scrollRowToEnd: function (row) {
            var heap = this.getActiveHeap();
            var containerSize = this.getContentContainerSize();

            heap.headHeight = this.queryCommandValue('standardheight');
            heap.endRow = row;

            var spaceHeight = containerSize.height - heap.headHeight;

            heap.row = this.__calculateStartRow(spaceHeight);
            this.__refreshRow(spaceHeight);
        },

        __scrollColumnToStart: function (col) {
            var heap = this.getActiveHeap();
            var containerSize = this.getContentContainerSize();

            // 头部宽度
            heap.headWidth = this.__calculateHeadWidth(heap.rows);
            var spaceWidth = containerSize.width - heap.headWidth;

            heap.col = col;
            this.__refreshColumn(spaceWidth);
        },

        __scrollColumnToEnd: function (col) {
            var heap = this.getActiveHeap();
            var containerSize = this.getContentContainerSize();

            // 头部宽度
            heap.headWidth = this.__calculateHeadWidth(heap.rows);
            var spaceWidth = containerSize.width - heap.headWidth;

            heap.endCol = col;
            heap.col = this.__calculateStartColumn(spaceWidth);
            this.__refreshColumn(spaceWidth);
        }
    };
});