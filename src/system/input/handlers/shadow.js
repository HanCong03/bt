/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var GRIDLINE_CONFIG = require('definition/gridline');
    var OFFSET = GRIDLINE_CONFIG.offset;
    var LINE_WIDTH = GRIDLINE_CONFIG.width;

    module.exports = {
        shadow: null,

        __initShadowBox: function () {
            this.shadow = document.createElement('div');
            this.shadow.className = 'btb-input-shadow';

            this.getShadowContainer().appendChild(this.shadow);
        },

        __setShadowWidth: function (width) {
            this.shadow.style.width = width + 'px';
        },

        __calculateContentRect: function (content) {
            this.shadow.innerHTML = content || '';
            var width = this.shadow.offsetWidth;
            var height = this.shadow.offsetHeight;

            // 通用计算，如果内容未超出最小范围，则直接返回。
            var minSize = this.__minSize;
            var baseLocation = this.__baseLocation;

            if (width <= minSize.width && height <= minSize.height) {
                return {
                    overflow: false,
                    x: baseLocation.x,
                    y: baseLocation.y,
                    width: minSize.width,
                    height: minSize.height
                };
            }

            // 获取受限rect对象
            if (this.__wraptext || this.__activeCellType === 'mergecell') {
                return this.__calculateRestrictedSize(width, height);
            }

            /* --- 非受限环境下，则要根据水平对齐属性作适当的扩展 --- */
            switch (this.__textAling) {
                case 'left':
                    return this.__getLeftAlignRect(width, height);

                case 'center':
                    return this.__getCenterAlignRect(width, height);

                case 'right':
                    return this.__getRightAlignRect(width, height);
            }
        },

        /**
         * 计算受限单元格的大小
         * @private
         */
        __calculateRestrictedSize: function (width, height) {
            var minSize = this.__minSize;
            var baseLocation = this.__baseLocation;
            var heightInfo = this.__getHeightInfo(height);

            return {
                overflow: heightInfo.overflow,
                x: baseLocation.x,
                y: baseLocation.y,
                width: minSize.width,
                height: Math.max(heightInfo.height, minSize.height)
            };
        },

        /**
         * 计算高度信息
         * 注：该方法可为所有类型的单元格公用
         * @param height
         * @private
         */
        __getHeightInfo: function (height) {
            var visulaData = this.visualData;
            var rowPoints = visulaData.rowPoints;
            var r = visulaData.rMap[this.__cellStart.row];
            var maxHeight = visulaData.boundaryHeight - LINE_WIDTH;

            // 起始坐标
            var startY = rowPoints[r] + OFFSET;
            var currentY;
            var overflow = false;
            // 最终高度
            var boxHeight;

            // 由于绘制点比行列数多1，所以比较时使用 “<=”
            for (var i = r + 1, len = visulaData.rowCount; i <= len; i++) {
                currentY = rowPoints[i] - OFFSET;

                // 当前位置已经超出内容区域，则跳出。
                if (currentY > maxHeight) {
                    overflow = true;
                    boxHeight = maxHeight - startY;
                    break;
                }

                boxHeight = currentY - startY;

                if (boxHeight >= height) {
                    break;
                }
            }

            return {
                overflow: overflow,
                height: boxHeight
            };
        }
    };
});