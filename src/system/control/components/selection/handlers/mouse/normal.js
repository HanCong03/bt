/**
 * @file 计算在不带窗格的视图中滚动的滚动数。
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    module.exports = {
        __getNewRowInNormalView: function (index) {
            var visualData;
            var row = index.row;

            // 位置在上部之外
            if (row === -1 || row === -2) {
                this.execCommand('scrollrow', -1);
                visualData = this.rs('get.visual.data');

                return {
                    scroll: true,
                    row: visualData.row
                };
            // -3, -4，位置在底部之外
            } else if (row < 0) {
                this.execCommand('scrollrow', 1);
                visualData = this.rs('get.visual.data');

                return {
                    scroll: true,
                    row: visualData.lastFullRow
                };
            } else {
                visualData = this.rs('get.visual.data');

                return {
                    scroll: false,
                    row: visualData.rows[index.r]
                };
            }
        },

        __getNewColumnInNormalView: function (index) {
            var visualData;
            var col = index.col;

            // 位置在左侧之外
            if (col === -1 || col === -2) {
                this.execCommand('scrollcolumn', -1);
                visualData = this.rs('get.visual.data');

                return {
                    scroll: true,
                    col: visualData.col
                };
                // -3, -4，位置在右侧之外
            } else if (col < 0) {
                this.execCommand('scrollcolumn', 1);
                visualData = this.rs('get.visual.data');

                return {
                    scroll: true,
                    col: visualData.lastFullCol
                };

            // 内部
            } else {
                visualData = this.rs('get.visual.data');

                return {
                    scroll: false,
                    col: visualData.cols[index.c]
                };
            }
        }
    };
});