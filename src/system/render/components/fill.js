/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var NONE = require('definition/none');

    var GRIDLINE_CONFIG = require('definition/gridline');
    var OFFSET = GRIDLINE_CONFIG.offset;
    var WIDTH = GRIDLINE_CONFIG.width;

    var DEFAULT_FILL = require('definition/face-theme').fill;

    module.exports = {
        __fill: function () {
            var visualData = this.visualData;
            var screen = this.contentScreen;

            if (visualData.rowCount === 0 || visualData.colCount === 0) {
                return;
            }

            screen.save();
            screen.translate(visualData.headWidth, visualData.headHeight);

            this.__doFill();

            screen.restore();
        },

        __doFill: function () {
            var layoutData = this.layoutData;
            var fixRows = {};

            $$.forEach(layoutData, function (currentRow, r) {
                $$.forEach(currentRow, function (currentCell) {
                    if (!currentCell) {
                        return;
                    }

                    var fill = this.queryCommandValue('userfill', currentCell.row, currentCell.col);
                    var result;
                    var er;

                    if (!fill) {
                        return;
                    }

                    if ($$.isDefined(currentCell.mergecell)) {
                        result = this.__fillMergeCell(currentCell, fill)

                        if (!result) {
                            return;
                        }

                        er = currentCell.mergecell.er;

                        if (!fixRows[currentCell.mergecell.er]) {
                            fixRows[er] = [];
                        }

                        fixRows[er].push(result);
                    } else {
                        this.__fillNormalCell(currentCell, fill);
                    }
                }, this);

                // 如果存在需要修复的合并单元格，则进行修复
                if (fixRows[r]) {
                    this.__fixMergeCells(fixRows[r]);
                }
            }, this);
        },

        __fillNormalCell: function (cellInfo, fill) {
            if (fill === NONE) {
                return;
            }

            var screen = this.contentScreen;
            var visualData = this.visualData;

            var r = cellInfo.r;
            var c = cellInfo.c;

            var x = visualData.colPoints[c] - OFFSET;
            var y = visualData.rowPoints[r] - OFFSET;
            var width = visualData.colWidths[c] + 2 * WIDTH;
            var height = visualData.rowHeights[r] + 2 * WIDTH;

            screen.fillColor(fill);
            screen.fillRect(x, y, width, height);
        },

        __fillMergeCell: function (cellInfo, fill) {
            var visualData = this.visualData;
            var screen = this.contentScreen;

            var x;
            var y;
            var width;
            var height;

            if (fill === NONE) {
                x = visualData.colPoints[cellInfo.c] + OFFSET;
                y = visualData.rowPoints[cellInfo.r] + OFFSET;
                width = this.getWidths(cellInfo.c, cellInfo.mergecell.ec);
                height = this.getHeights(cellInfo.r, cellInfo.mergecell.er);

                screen.fillColor(DEFAULT_FILL);
                screen.fillRect(x, y, width, height);

                return null;
            }

            x = visualData.colPoints[cellInfo.c] - OFFSET;
            y = visualData.rowPoints[cellInfo.r] - OFFSET;
            width = this.getWidths(cellInfo.c, cellInfo.mergecell.ec) + 2 * WIDTH;
            height = this.getHeights(cellInfo.r, cellInfo.mergecell.er) + 2 * WIDTH;

            screen.fillColor(fill);
            screen.fillRect(x, y, width, height);

            return {
                fill: fill,
                x: x,
                y: y,
                width: WIDTH,
                height: height
            };
        },

        __fixMergeCells: function (fixInfos) {
            var screen = this.contentScreen;

            $$.forEach(fixInfos, function (info) {
                screen.fillColor(info.fill);
                screen.fillRect(info.x, info.y, info.width, info.height);
            });
        },

        getWidths: function (sc, ec) {
            var visualData = this.visualData;
            return visualData.colPoints[ec + 1] - visualData.colPoints[sc] - WIDTH;
        },

        getHeights: function (sr, er) {
            var visualData = this.visualData;
            return visualData.rowPoints[er + 1] - visualData.rowPoints[sr] - WIDTH;
        }
    };
});