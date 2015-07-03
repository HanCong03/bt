define(function (require, exports, module) {
    var $$ = require('utils');
    var GRIDLINE_CONFIG = require('definition/gridline');
    var OFFSET = GRIDLINE_CONFIG.offset;
    var LINE_WIDTH = GRIDLINE_CONFIG.width;

    module.exports = $$.createClass('Rect', {
        base: require('module'),

        visualData: null,

        init: function () {
            this.__initEvent();
            this.__initService();
        },

        __initEvent: function () {
            this.on({
                'refresh': this.__refresh
            });
        },

        __initService: function () {
            this.registerService({
                'get.visialbe.rect': this.getVisibleRect
            });
        },

        __refresh: function () {
            this.visualData = this.rs('get.visual.data');
        },

        /**
         * 根据当前的可视化对象，计算可见的rect对象。
         * 注意：获取到的rect对象仅适用于当前的可视区域，不是完整的rect对象。
         * @param visualData
         * @param start
         * @param end
         */
        getVisibleRect: function (start, end) {
            var visualData = this.visualData;

            var startRow = start.row;
            var startCol = start.col;
            var endRow = end.row;
            var endCol = end.col;

            var width = -LINE_WIDTH;
            var height = -LINE_WIDTH;

            // 非隐藏行列索引
            var rows = visualData.rows;
            var cols = visualData.cols;
            var rMap = visualData.rMap;
            var cMap = visualData.cMap;
            var colWidths = visualData.colWidths;
            var rowHeights = visualData.rowHeights;

            var r;
            var c;

            // 有效范围
            var validStartRow = Math.max(startRow, visualData.startRow);
            var validStartCol = Math.max(startCol, visualData.startCol);
            var validEndRow = Math.min(endRow, visualData.endRow);
            var validEndCol = Math.min(endCol, visualData.endCol);

            /* ---- 计算宽高 start ---- */
            var currentRow;
            var currentCol;

            var x;
            var y;

            for (var i = 0, len = visualData.rowCount; i <= len; i++) {
                currentRow = rows[i];

                if (currentRow < validStartRow) {
                    continue;
                }

                // 后续索引持续增大
                if (currentRow > validEndRow) {
                    break;
                }

                r = rMap[currentRow];

                if (r !== undefined) {
                    height += rowHeights[r] + LINE_WIDTH;
                    if (y === undefined) {
                        y = visualData.rowPoints[r] + OFFSET;
                    }
                }
            }

            if (height < 0) {
                return null;
            }

            for (var i = 0, len = visualData.colCount; i <= len; i++) {
                currentCol = cols[i];

                if (currentCol < validStartCol) {
                    continue;
                }

                // 后续索引持续增大
                if (currentCol > validEndCol) {
                    break;
                }

                c = cMap[currentCol];

                if (c !== undefined) {
                    width += colWidths[c] + LINE_WIDTH;

                    if (x === undefined) {
                        x = visualData.colPoints[c] + OFFSET;
                    }
                }
            }

            if (width < 0) {
                return null;
            }
            /* ---- 计算宽高 end ---- */

            /* ---- 溢出检测 start ---- */
            var ot = false;
            var or = false;
            var ob = false;
            var ol = false;

            // overflow top
            for (var i = startRow; i <= endRow; i++) {
                if (this.queryCommandValue('hiddenrow', i)) {
                    continue;
                }

                if (rMap[i] === undefined) {
                    ot = true;
                }

                break;
            }

            // overflow right
            for (var i = endCol; i >= startCol; i--) {
                if (this.queryCommandValue('hiddencolumn', i)) {
                    continue;
                }

                if (cMap[i] === undefined) {
                    or = true;
                }

                break;
            }

            // overflow bottom
            for (var i = endRow; i >= startRow; i--) {
                if (this.queryCommandValue('hiddenrow', i)) {
                    continue;
                }

                if (rMap[i] === undefined) {
                    ob = true;
                }

                break;
            }

            // overflow left
            for (var i = startCol; i <= endCol; i++) {
                if (this.queryCommandValue('hiddencolumn', i)) {
                    continue;
                }

                if (cMap[i] === undefined) {
                    ol = true;
                }

                break;
            }
            /* ---- 溢出检测 end ---- */

            return {
                x: x,
                y: y,
                width: width,
                height: height,
                ot: ot,
                ob: ob,
                ol: ol,
                or: or
            };
        }
    });
});