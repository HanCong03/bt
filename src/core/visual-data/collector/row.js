/**
 * @file 行数据收集器
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var GRIDLINE_CONFIG = require('definition/gridline');
    var OFFSET = GRIDLINE_CONFIG.offset;
    var LINE_WIDTH = GRIDLINE_CONFIG.width;

    var LIMIT = require('definition/limit');
    var MAX_ROW_INDEX = LIMIT.MAX_ROW - 1;

    module.exports = {
        __collectRowInfo: function (spaceHeight) {
            if (this.queryCommandValue('hiddenallrow')) {
                return {
                    space: spaceHeight,
                    heights: null,
                    points: null,
                    indexes: null,
                    rMap: null,
                    count: 0,
                    boundary: 0,
                    paneCount: 0,
                    paneHeight: 0
                };
            }

            var info = this.__collectPaneRow(spaceHeight);

            // 计算剩余可用空间大小
            var availableSpaceHeight = info.space - info.boundary;

            // 窗格部分已经用完所有空间
            if (availableSpaceHeight <= 0) {
                return info;
            }

            var heap = this.getActiveHeap();
            var heights = info.heights;
            var points = info.points;

            var currentHeight;
            var currentPoint = points[points.length - 1];
            var indexes = info.indexes;
            var offset = indexes.length ? 0 : LINE_WIDTH;
            var rMap = info.rMap;
            var paneCount = info.paneCount;

            // 非窗格部分的可视起始行。
            var row = heap.row + paneCount;

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
            } while (availableSpaceHeight > offset && row <= MAX_ROW_INDEX);

            info.boundary += Math.min(availableSpaceHeight, offset)
            info.count = indexes.length;

            return info;
        },

        /**
         * 收集窗格行信息
         * @private
         */
        __collectPaneRow: function (spaceHeight) {
            var heap = this.getActiveHeap();
            var heights = [];
            var points = [OFFSET];

            var currentHeight;
            var currentPoint = points[0];
            var offset = LINE_WIDTH;
            var indexes = [];
            var rMap = {};

            var pane = heap.pane;

            if (!pane || pane.start.row === -1) {
                return {
                    space: spaceHeight,
                    heights: heights,
                    points: points,
                    indexes: indexes,
                    rMap: rMap,
                    count: 0,
                    boundary: 0,
                    paneCount: 0,
                    paneHeight: 0
                };
            }

            var row = pane.start.row;
            var paneEndRow = pane.end.row;

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
            } while (spaceHeight > offset && row <= paneEndRow);

            return {
                space: spaceHeight,
                heights: heights,
                points: points,
                indexes: indexes,
                rMap: rMap,
                count: indexes.length,
                boundary: Math.min(spaceHeight, offset),
                paneCount: pane.end.row - pane.start.row + 1,
                paneHeight: Math.min(spaceHeight, offset)
            };
        }
    };
});