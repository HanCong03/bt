/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    /* --- 检查焦点是否可见，如果不可见，则滚动视图使之可见 start --- */
    module.exports = {
        /**
         * 检查move后的普通单元格选区是否在可视区域内，如果不在可视区域内，则滚动视图，使其尽可能显示在可视区域内。
         * @param row
         * @param col
         * @private
         */
        __moveToNormalCell: function (row, col) {
            this.__setRange({
                row: row,
                col: col
            }, {
                row: row,
                col: col
            });

            this.rs('scrollin', {
                row: row,
                col: col
            }, {
                row: row,
                col: col
            });
        },

        /**
         * 同__moveToNormalCell()，不同之处是该方法处理的是合并单元格。
         * @param mergeInfo
         * @private
         */
        __moveToMergeCell: function (mergeInfo, row, col) {
            this.__setRange(mergeInfo.start, mergeInfo.end, {
                row: row,
                col: col
            });

            this.rs('scrollin', mergeInfo.start, mergeInfo.end);
        }
    };
});