/**
 * @file 可视化数据对象 --- 包含布局数据，供上层渲染使用
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var GRIDLINE = require('definition/gridline');

    module.exports = $$.createClass('VisualData', {
        base: require('module'),

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
                'get.visual.data': this.getVisualData
            });
        },

        __initHeap: function () {
            var heap = this.getActiveHeap();

            if (this.queryCommandValue('gridline')) {
                heap.gridline = GRIDLINE;
            } else {
                heap.gridline = null;
            }

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

            this.__refreshStart();

            var headHeight = this.queryCommandValue('standardheight');
            var containerSize = this.getContainerSize();

            var rowInfo = this.__collectRowInfo(containerSize.height - headHeight);

            // 头部高度
            heap.headHeight = headHeight;

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

            // 头部宽度
            heap.headWidth = this.__calculateHeadWidth(heap.rows);

            var colInfo = this.__collectColumnInfo(containerSize.width - heap.headWidth);

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
        },

        __refreshStart: function () {
            var heap = this.getActiveHeap();
            var pane = this.queryCommandValue('pane');

            if ($$.isNdef(pane)) {
                heap.row = 0;
                heap.col = 0;
            } else {
                heap.row = pane.start.row;
                heap.col = pane.start.col;
            }

            heap.pane = pane;
        },

        __collectRowInfo: function (spaceHeight) {
            if (this.queryCommandValue('hiddenallrow')) {
                return {
                    space: spaceHeight,
                    heights: null,
                    points: null,
                    indexes: null,
                    count: 0
                };
            }

            var OFFSET = GRIDLINE.offset;
            var LINE_WIDTH = GRIDLINE.width;

            var heap = this.getActiveHeap();
            var heights = [];
            var points = [OFFSET];

            var currentHeight;
            var currentPoint = points[0];
            var offset = LINE_WIDTH;
            var indexes = [];

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

                heights.push(currentHeight);
                points.push(currentPoint);
                indexes.push(row);

                row++;
            } while (spaceHeight > offset);

            return {
                space: spaceHeight,
                heights: heights,
                points: points,
                indexes: indexes,
                count: indexes.length
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
                    count: 0
                };
            }

            var OFFSET = GRIDLINE.offset;
            var LINE_WIDTH = GRIDLINE.width;

            var heap = this.getActiveHeap();
            var widths = [];
            var points = [OFFSET];

            var currentWidth;
            var currentPoint = points[0];
            var offset = LINE_WIDTH;
            var indexes = [];

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

                widths.push(currentWidth);
                points.push(currentPoint);
                indexes.push(col);

                col++;
            } while (spaceWidth > offset);

            return {
                space: spaceWidth,
                widths: widths,
                points: points,
                indexes: indexes,
                count: indexes.length
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