/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var SCROLLBAR_CONFIG = require('definition/scrollbar');
    var SCROLLBAR_SIZE = SCROLLBAR_CONFIG.size;
    var SCROLLBAR_MARGIN = SCROLLBAR_CONFIG.margin;
    var REAL_SIZE = SCROLLBAR_SIZE - 2 * SCROLLBAR_MARGIN;

    module.exports = {
        __collectInfo: function () {
            var boundary = this.__getScrollBoundary();
            var visualData = this.visualData;

            var boundaryStart = boundary.start;
            var boundaryEnd = boundary.end;

            return {
                // 行游标
                rowCursor: visualData.row - boundaryStart.row,
                // 列游标
                colCursor: visualData.col - boundaryStart.col,
                // 可见行数
                viewRowCount: visualData.rowCount,
                // 可见列数
                viewColCount: visualData.colCount,
                // 可滚动总行数
                totalRowCount: boundaryEnd.row - boundaryStart.row + 1,
                // 可滚动总列数
                totalColCount: boundaryEnd.col - boundaryStart.col + 1
            };
        },

        /**
         * 获取滚动边界
         * @private
         */
        __getScrollBoundary: function () {
            var visualData = this.visualData;
            var dimension = this.queryCommandValue('dimension');
            var pane = this.queryCommandValue('pane');

            // 边界开始结束位置
            var start;
            var end;

            if ($$.isNdef(pane)) {
                start = {
                    row: 0,
                    col: 0
                };
            } else {
                start = pane.start;
            }

            var endRow = dimension.max.row;
            var endCol = dimension.max.col;

            end = {
                row: Math.max(visualData.endRow + 2, endRow),
                col: Math.max(visualData.endCol + 2, endCol)
            };

            return {
                start: start,
                end: end
            };
        }
    };
});