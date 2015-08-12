define(function (require, exports, module) {
    var GRIDLINE_CONFIG = require('definition/gridline');
    var OFFSET = GRIDLINE_CONFIG.offset;
    var LINE_WIDTH = GRIDLINE_CONFIG.width;

    module.exports = {
        /**
         * 根据给定参考点，以及区域的起点和终点，获取区域的真实大小及位置信息
         * 注意：获取到的rect对象是完整的rect对象。
         * @param
         * @param visualData
         * @param start
         * @param end
         */
        getRealRect: function (row, col, start, end) {
            var visualData = this.visualData;
            var r = visualData.rMap[row];
            var c = visualData.cMap[col];

            var startRow = start.row;
            var startCol = start.col;
            var endRow = end.row;
            var endCol = end.col;

            var width = -LINE_WIDTH;
            var height = -LINE_WIDTH;

            /* --- 计算 height --- */
            // height
            for (var i = startRow; i <= endRow; i++) {
                // 被隐藏，则跳过
                if (this.queryCommandValue('hiderow', i)) {
                    continue;
                }

                height += this.queryCommandValue('rowheight', i) + LINE_WIDTH;
            }

            if (height <= 0) {
                return null;
            }

            /* --- 计算 width --- */
            // width
            for (var i = startCol; i <= endCol; i++) {
                if (this.queryCommandValue('hidecolumn', i)) {
                    continue;
                }

                width += this.queryCommandValue('columnwidth', i) + LINE_WIDTH;
            }

            if (width <= 0) {
                return null;
            }

            /* --- 计算 x --- */
            var col = visualData.cols[c];
            var x = visualData.colPoints[c] + OFFSET;

            for (var i = col - 1, min = startCol; i >= min; i--) {
                if (this.queryCommandValue('hidecolumn', i)) {
                    continue;
                }

                x -= this.queryCommandValue('columnwidth', i) + LINE_WIDTH;
            }

            /* --- 计算 y --- */
            var row = visualData.rows[r];
            var y = visualData.rowPoints[r] + OFFSET;

            for (var i = row - 1, min = startRow; i >= min; i--) {
                if (this.queryCommandValue('hiderow', i)) {
                    continue;
                }

                y -= this.queryCommandValue('rowheight', i) + LINE_WIDTH;
            }

            return {
                x: x,
                y: y,
                width: width,
                height: height
            };
        }
    };
});