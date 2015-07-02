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
            var rows = [];
            var cols = [];
            var rMap = visualData.rMap;
            var cMap = visualData.cMap;
            var colWidths = visualData.colWidths;
            var rowHeight = visualData.rowHeights;

            var r;
            var c;

            // 可见行列序号
            var rList = [];
            var cList = [];

            for (var i = startRow; i <= endRow; i++) {
                if (this.queryCommandValue('hiddenrow', i)) {
                    continue;
                }

                rows.push(i);
            }

            for (var i = startCol; i <= endCol; i++) {
                if (this.queryCommandValue('hiddencolumn', i)) {
                    continue;
                }

                cols.push(i);
            }

            // 高度计算
            for (var i = 0, len = rows.length; i < len; i++) {
                r = rMap[rows[i]];

                if (r === undefined) {
                    continue;
                }

                height += rowHeight[r] + LINE_WIDTH;
                rList.push(r);
            }

            // 不可见
            if (height < 0) {
                return null;
            }

            // 宽度计算
            for (var i = 0, len = cols.length; i < len; i++) {
                c = cMap[cols[i]];

                if (c === undefined) {
                    continue;
                }

                width += colWidths[c] + LINE_WIDTH;
                cList.push(c);
            }

            // 不可见
            if (width < 0) {
                return null;
            }

            return {
                x: visualData.colPoints[cList[0]] + OFFSET,
                y: visualData.rowPoints[rList[0]] + OFFSET,
                width: width,
                height: height,
                ot: rMap[rows[0]] === undefined,
                ob: rMap[rows[rows.length - 1]] === undefined,
                ol: cMap[cols[0]] === undefined,
                or: cMap[cols[cols.length - 1]] === undefined
            };
        }
    });
});