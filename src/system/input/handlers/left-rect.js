/**
 * @file 计算左对齐单元格的rect对象
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var GRIDLINE_CONFIG = require('definition/gridline');
    var OFFSET = GRIDLINE_CONFIG.offset;
    var LINE_WIDTH = GRIDLINE_CONFIG.width;

    module.exports = {
        __getLeftAlignRect: function (width, height) {
            var widthInfo = this.__getLeftAlignWidthInfo(width);

            // 宽度溢出，重计算新的宽度和高度
            if (widthInfo.overflow) {
                this.shadow.style.width = widthInfo.width + 'px';
                height = this.shadow.offsetHeight;
                this.shadow.style.width = '';
            }

            var baseLocation = this.__baseLocation;
            var heightInfo = this.__getHeightInfo(height);

            // 最终是否溢出，由高度信息决定
            return {
                overflow: heightInfo.overflow,
                x: baseLocation.x,
                y: baseLocation.y,
                width: widthInfo.width,
                height: heightInfo.height
            };
        },

        /**
         * 计算宽度信息
         * @param width
         * @returns {{overflow: boolean, width: *}}
         * @private
         */
        __getLeftAlignWidthInfo: function (width) {
            var visulaData = this.visualData;
            var colPoints = visulaData.colPoints;
            var boundary = visulaData.boundaryWidth - LINE_WIDTH;

            // 首先计算出宽度，如果宽度有溢出，则需要在新的宽度下，重新计算高度。
            var c = visulaData.cMap[this.__cellStart.col];
            var startX = colPoints[c] + OFFSET;
            var currentX;
            var boxWidth;
            var overflow = false;

            // 由于绘制点比行列数多1，所以比较时使用 “<=”
            for (var i = c + 1, len = visulaData.colCount; i <= len; i++) {
                currentX = colPoints[i] - OFFSET;

                // 当前位置已经超出内容区域，则跳出。
                if (currentX > boundary) {
                    overflow = true;
                    boxWidth = boundary - startX;
                    break;
                }

                boxWidth = currentX - startX;

                if (boxWidth >= width) {
                    break;
                }
            }

            return {
                overflow: overflow,
                width: boxWidth
            };
        }
    };
});