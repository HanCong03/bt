/**
 * @file 列数据收集器
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var GRIDLINE_CONFIG = require('definition/gridline');
    var OFFSET = GRIDLINE_CONFIG.offset;
    var LINE_WIDTH = GRIDLINE_CONFIG.width;

    var LIMIT = require('definition/limit');
    var MAX_COLUMN_INDEX = LIMIT.MAX_COLUMN - 1;

    module.exports = {
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
                    boundary: 0,
                    paneWidth: 0,
                    paneCount: 0
                };
            }

            var info = this.__collectPaneColumn(spaceWidth);

            // 计算剩余可用空间大小
            var availableSpaceWidth = info.space - info.boundary;

            // 窗格部分已经用完所有空间
            if (availableSpaceWidth <= 0) {
                return info;
            }

            var heap = this.getActiveHeap();
            var widths = info.widths;
            var points = info.points;

            var currentWidth;
            var currentPoint = points[points.length - 1];
            var indexes = info.indexes;
            var offset = indexes.length ? 0 : LINE_WIDTH;
            var cMap = info.cMap;
            var paneCount = info.paneCount;

            // 非窗格部分的可视起始行。
            var col = heap.col + paneCount;

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
            } while (availableSpaceWidth > offset && col <= MAX_COLUMN_INDEX);

            info.boundary += Math.min(availableSpaceWidth, offset)
            info.count = indexes.length;

            return info;
        },

        __collectPaneColumn: function (spaceWidth) {
            var heap = this.getActiveHeap();
            var widths = [];
            var points = [OFFSET];

            var currentWidth;
            var currentPoint = points[0];
            var offset = LINE_WIDTH;
            var indexes = [];
            var cMap = {};

            var pane = heap.pane;

            if (!pane || pane.start.col === -1) {
                return {
                    space: spaceWidth,
                    widths: widths,
                    points: points,
                    indexes: indexes,
                    cMap: cMap,
                    count: 0,
                    boundary: 0,
                    paneWidth: 0,
                    paneCount: 0
                };
            }

            var col = pane.start.col;
            var paneEndCol = pane.end.col;

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
            } while (spaceWidth > offset && col <= paneEndCol);

            return {
                space: spaceWidth,
                widths: widths,
                points: points,
                indexes: indexes,
                cMap: cMap,
                count: indexes.length,
                boundary: Math.min(spaceWidth, offset),
                paneWidth: Math.min(spaceWidth, offset),
                paneCount: pane.end.col - pane.start.col + 1
            };
        }
    };
});