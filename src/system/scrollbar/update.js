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
        // 当前剩余的水平滑道长度
        __hSlideLength: 0,
        // 当前剩余的竖直滑道长度
        __vSlideLength: 0,

        /**
         * 更新滚动条方法
         * @param info 更新所需的信息
         * @private
         */
        __update: function (info) {
             /*
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
             */
            this.__updateHorizontal(info);
        },

        __updateHorizontal: function (info) {
            var width = Math.floor((info.viewColCount / info.totalColCount) * this.__hWidth);

            // 保证滑块不会小于指定的大小
            if (width < REAL_SIZE) {
                width = REAL_SIZE;
            }

            // 更新剩余滑道长度
            this.__hSlideLength = this.__hWidth - width;

            // 滑块定位偏移
            var offset = Math.round(this.__hSlideLength * info.colCursor / (info.totalColCount - 1));

            var slider = this.__hSlider;

            slider.style.width = width + 'px';
            slider.style.left = offset + 'px';
        }
    };
});