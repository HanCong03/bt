define(function (require, exports, module) {
    var GRIDLINE_CONFIG = require('definition/gridline');
    var OFFSET = GRIDLINE_CONFIG.offset;
    var WIDTH = GRIDLINE_CONFIG.width;

    module.exports = {
        /**
         * 根据当前的可视化对象，计算可见的rect对象。
         * 注意：获取到的rect对象仅适用于当前的可视区域，不是完整的rect对象。
         * @param visualData
         * @param start
         * @param end
         */
        getVisibleRect: function (visualData, start, end) {
            var rows = visualData.rows;
            var cols = visualData.cols;

            var startRow = start.row;
            var startCol = start.col;
            var endRow = end.row;
            var endCol = end.col;

            // 不在可视范围内
            if (rows[0] > endRow
                || rows[rows.length - 1] < startRow
                || cols[0] > endCol
                || cols[cols.length - 1] < startCol) {
                return null;
            }

            var overflowTop = rows.indexOf(startRow) === -1;
            var overflowBottom = rows.indexOf(endRow) === -1;
            var overflowLeft = cols.indexOf(startCol) === -1;
            var overflowRight = cols.indexOf(endCol) === -1;

            if (overflowTop) {
                startRow = rows[0];
            }

            if (overflowBottom) {
                endRow = rows[rows.length - 1];
            }

            if (overflowLeft) {
                startCol = cols[0];
            }

            if (overflowRight) {
                endCol = cols[cols.length - 1];
            }

            var sc = visualData.cols.indexOf(startCol);
            var ec = visualData.cols.indexOf(endCol);
            var sr = visualData.rows.indexOf(startRow);
            var er = visualData.rows.indexOf(endRow);

            return {
                x: visualData.colPoints[sc] + OFFSET,
                y: visualData.rowPoints[sr] + OFFSET,
                width: getWidths(sc, ec),
                height: getHeights(sr, er),
                ot: overflowTop,
                ob: overflowBottom,
                ol: overflowLeft,
                or: overflowRight
            };

            function getWidths(sc, ec) {
                var colWidths = visualData.colWidths;
                var width = -WIDTH;

                for (var i = sc; i <= ec; i++) {
                    width += colWidths[i] + WIDTH;
                }

                return width;
            }

            function getHeights(sr, er) {
                var rowHeights = visualData.rowHeights;
                var height = -WIDTH;

                for (var i = sr; i <= er; i++) {
                    height += rowHeights[i] + WIDTH;
                }

                return height;
            }
        }
    };
});