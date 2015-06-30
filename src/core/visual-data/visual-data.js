/**
 * @file 可视化数据对象 --- 包含布局数据，供上层渲染使用
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var GRIDLINE_CONFIG = require('definition/gridline');
    var OFFSET = GRIDLINE_CONFIG.offset;
    var LINE_WIDTH = GRIDLINE_CONFIG.width;

    var LIMIT = require('definition/limit');
    var MAX_ROW_INDEX = LIMIT.MAX_ROW - 1;
    var MAX_COLUMN_INDEX = LIMIT.MAX_COLUMN - 1;

    module.exports = $$.createClass('VisualData', {
        base: require('module'),

        mixin: [
            require('./scroll'),
            require('./scroll-in'),
            require('./scroll-to')
        ],

        init: function () {
            this.__initEvent();
            this.__initService();
        },

        __initEvent: function () {
            this.on({
                ready: this.__initHeap,
                datachange: this.refresh
            });
        },

        __initService: function () {
            this.registerService({
                'get.visual.data': this.getVisualData,
                'scrollin': this.scrollIn
            });
        },

        __initHeap: function () {
            var heap = this.getActiveHeap();

            heap.row = 0;
            heap.col = 0;

            this.__refresh();
        },

        getVisualData: function () {
            return this.getActiveHeap();
        },

        refresh: function () {
            this.__refresh();

            this.emit('refresh');
        },

        __refresh: function () {
            var heap = this.getActiveHeap();
            var containerSize = this.getContainerSize();

            heap.pane = this.queryCommandValue('pane');

            // 头部高度
            heap.headHeight = this.queryCommandValue('standardheight');
            this.__refreshRow(containerSize.height - heap.headHeight);

            // 头部宽度
            heap.headWidth = this.__calculateHeadWidth(heap.rows);
            this.__refreshColumn(containerSize.width - heap.headWidth);
        },

        /**
         * 必须先计算行，才能计算列
         * @private
         */
        __refreshRow: function (spaceHeight) {
            var heap = this.getActiveHeap();
            var start = this.__getMinStart();

            if (heap.row < start.row) {
                heap.row = start.row;
            }

            var rowInfo = this.__collectRowInfo(spaceHeight);

            // 行索引
            heap.rows = rowInfo.indexes;
            // 行高列表
            heap.rowHeights = rowInfo.heights;
            // 行网格线列表
            heap.rowPoints = rowInfo.points;
            // 可用空间高度
            heap.spaceHeight = rowInfo.space;
            // 行数
            heap.rowCount = rowInfo.count;
            // 行结束索引
            heap.endRow = heap.row + heap.rowCount - 1;
            // 可见内容区域高度
            heap.boundaryHeight = rowInfo.boundary;
            // 行映射
            heap.rMap = rowInfo.rMap;
        },

        /**
         * 必须先计算行，才能计算列
         * @private
         */
        __refreshColumn: function (spaceWidth) {
            var heap = this.getActiveHeap();
            var start = this.__getMinStart();

            if (heap.col < start.col) {
                heap.col = start.col;
            }

            var colInfo = this.__collectColumnInfo(spaceWidth);

            // 列索引
            heap.cols = colInfo.indexes;
            // 列宽列表
            heap.colWidths = colInfo.widths;
            // 列网格线绘制点
            heap.colPoints = colInfo.points;
            // 可用空间宽度
            heap.spaceWidth = colInfo.space;
            // 列数
            heap.colCount = colInfo.count;
            // 列结束索引
            heap.endCol = heap.col + heap.colCount - 1;
            // 可见内容区域宽度
            heap.boundaryWidth = colInfo.boundary;
            // 列映射
            heap.cMap = colInfo.cMap;
        },

        __getMinStart: function () {
            var pane = this.queryCommandValue('pane');

            if ($$.isNdef(pane)) {
                return {
                    row: 0,
                    col: 0
                };
            } else {
                return {
                    row: pane.start.row,
                    col: pane.start.col
                };
            }
        },

        __collectRowInfo: function (spaceHeight) {
            if (this.queryCommandValue('hiddenallrow')) {
                return {
                    space: spaceHeight,
                    heights: null,
                    points: null,
                    indexes: null,
                    rMap: null,
                    count: 0,
                    boundary: 0
                };
            }

            var heap = this.getActiveHeap();
            var heights = [];
            var points = [OFFSET];

            var currentHeight;
            var currentPoint = points[0];
            var offset = LINE_WIDTH;
            var indexes = [];
            var rMap = {};

            var row = heap.row;

            do {
                // 被隐藏的列
                if (this.queryCommandValue('hiddenrow', row)) {
                    row++;
                    continue;
                }

                currentHeight = this.queryCommandValue('rowheight', row);
                offset += currentHeight + LINE_WIDTH;
                currentPoint += currentHeight + LINE_WIDTH;

                rMap[row] = indexes.length;
                heights.push(currentHeight);
                points.push(currentPoint);
                indexes.push(row);

                row++;
            } while (spaceHeight > offset && row <= MAX_ROW_INDEX);

            return {
                space: spaceHeight,
                heights: heights,
                points: points,
                indexes: indexes,
                rMap: rMap,
                count: indexes.length,
                boundary: Math.min(spaceHeight, offset)
            };
        },

        __collectColumnInfo: function (spaceWidth) {
            // 如果所有列都被隐藏，则直接返回
            if (this.queryCommandValue('hiddenallcolumn')) {
                return {
                    space: spaceWidth,
                    widths: null,
                    points: null,
                    indexes: null,
                    cMap: null,
                    count: 0,
                    boundary: 0
                };
            }

            var heap = this.getActiveHeap();
            var widths = [];
            var points = [OFFSET];

            var currentWidth;
            var currentPoint = points[0];
            var offset = LINE_WIDTH;
            var indexes = [];
            var cMap = {};

            var col = heap.col;

            do {
                // 被隐藏的列
                if (this.queryCommandValue('hiddencolumn', col)) {
                    col++;
                    continue;
                }

                currentWidth = this.queryCommandValue('columnwidth', col);
                offset += currentWidth + LINE_WIDTH;
                currentPoint += currentWidth + LINE_WIDTH;

                cMap[col] = indexes.length;
                widths.push(currentWidth);
                points.push(currentPoint);
                indexes.push(col);

                col++;
            } while (spaceWidth > offset && col <= MAX_COLUMN_INDEX);

            return {
                space: spaceWidth,
                widths: widths,
                points: points,
                indexes: indexes,
                cMap: cMap,
                count: indexes.length,
                boundary: Math.min(spaceWidth, offset)
            };
        },

        __calculateHeadWidth: function (rowIndex) {
            // 所有行被隐藏，则默认按3个字符计算
            var count;

            if ($$.isNdef(rowIndex)) {
                count = 3;
            } else {
                count = (rowIndex[rowIndex.length - 1] + '').length;
            }

            // 左右各增加一个字符，以放置padding空间
            count += 2;

            return Math.round(this.rs('get.char.unit') * count);
        }
    });
});