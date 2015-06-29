/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    module.exports = {
        __outerReselection: function (start, end) {
            // 滚动值
            var step = {
                row: 0,
                col: 0
            };

            // left
            if (end.col === -1) {
                step.col = -1;

            // right
            } else if (end.col === -2) {
                step.col = 1;
            }

            // up
            if (end.row === -1) {
                step.row = -1;

            // down
            } else if (end.row === -2) {
                step.row = 1;
            }

            this.execCommand('scroll', step.row, step.col);

            /* --- 重定位选区 --- */
            // 获取新的end位置
            var visualData = this.rs('get.visual.data');
            var row = end.row;
            var col = end.col;

            if (step.col === -1) {
                col = visualData.cols[0];
            } else if (step.col === 1) {
                col = visualData.cols[visualData.colCount - 2] || visualData.rows[0];
            }

            if (step.row === -1) {
                row = visualData.rows[0];
            } else if (step.row === 1) {
                row = visualData.rows[visualData.rowCount - 2] || visualData.rows[0];
            }

            this.__reselection(start, {
                row: row,
                col: col
            });
        }
    };
});