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
        },

        __initEvent: function () {
            this.on({
                datachange: this.refresh
            });
        },

        refresh: function () {
            var vdata = this.getActiveHeap();

            this.__refreshStart();

            var headHeight = this.queryCommandValue('standardheight');
            var containerSize = this.getContainerSize();

            var rowInfo = this.__collectRowInfo(containerSize.height - headHeight);

            // 头部高度
            vdata.headHeight = headHeight;

            // 行索引
            vdata.rows = rowInfo.indexes;
            // 行高列表
            vdata.rowHeights = rowInfo.heights;
            // 行网格线列表
            vdata.rowPoints = rowInfo.points;
            // 可用空间高度
            vdata.spaceHeight = rowInfo.space;

            // 头部宽度
            vdata.headWidth = this.__calculateHeadWidth(vdata.rows);

            var colInfo = this.__collectColumnInfo(containerSize.width - vdata.headWidth);

            // 列索引
            vdata.cols = colInfo.indexes;
            // 列宽列表
            vdata.colWidths = colInfo.widths;
            // 列网格线绘制点
            vdata.colPoints = colInfo.points;
            // 可用空间宽度
            vdata.spaceWidth = colInfo.space;
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
                    indexes: null
                };
            }

            var OFFSET = GRIDLINE.width;
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
                offset += currentHeight;
                currentPoint += currentHeight;

                heights.push(currentHeight);
                points.push(currentPoint);
                indexes.push(row);

                row++;
            } while (spaceHeight > offset);

            return {
                space: spaceHeight,
                heights: heights,
                points: points,
                indexes: indexes
            };
        },

        __collectColumnInfo: function (spaceWidth) {
            // 如果所有列都被隐藏，则直接返回
            if (this.queryCommandValue('hiddenallcolumn')) {
                return {
                    space: spaceWidth,
                    widths: null,
                    points: null,
                    indexes: null
                };
            }

            var OFFSET = GRIDLINE.width;
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
                offset += currentWidth;
                currentPoint += currentWidth;

                widths.push(currentWidth);
                points.push(currentPoint);
                indexes.push(col);

                col++;
            } while (spaceWidth > offset);

            return {
                space: spaceWidth,
                widths: widths,
                points: points,
                indexes: indexes
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

            return Math.round(this.rs('get.char.unit') * count);
        }
    });
});