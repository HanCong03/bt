/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var GRIDLINE_CONFIG = require('definition/gridline');
    var WIDTH = GRIDLINE_CONFIG.width;
    var OFFSET = GRIDLINE_CONFIG.offset;

    module.exports = {
        __drawContent: function () {
            var visualData = this.visualData;
            var layoutData = this.layoutData;
            var screen = this.contentScreen;

            screen.save();
            screen.translate(visualData.headWidth, visualData.headHeight);

            $$.forEach(layoutData, function (currentRow) {
                $$.forEach(currentRow, function (currentCell) {
                    if (!currentCell.content) {
                        return;
                    }

                    this.__drawCellContent(currentCell);
                }, this);
            }, this);

            screen.restore();
        },

        __drawCellContent: function (cellInfo) {
            if (cellInfo.mergecell) {
                this.__drawMergeCellContent(cellInfo);
            } else {
                this.__drawNormalContent(cellInfo);
            }
        },

        __drawMergeCellContent: function (cellInfo) {
            var mergeCellRect = this.__getMergeCellRect(cellInfo);
            var visibleRect = this.__getVisibleMergeCellRect(cellInfo);

            if (!mergeCellRect) {
                return;
            }

            debugger


        },

        __drawNormalContent: function (cellInfo) {

        },

        __getVisibleMergeCellRect: function (cellInfo) {
            var visualData = this.visualData;
            var rows = visualData.rows;
            var cols = visualData.cols;
            var startRow = rows[cellInfo.r];
            var startCol = cols[cellInfo.c];
            var endRow = rows[cellInfo.mergecell.er];
            var endCol = rows[cellInfo.mergecell.ec];

            var rect = this.__getRangeRect({
                row: startRow,
                col: startCol
            }, {
                row: endRow,
                col: endCol
            });

            return {
                x: visualData.colPoints[cellInfo.c] + OFFSET,
                y: visualData.rowPoints[cellInfo.r] + OFFSET,
                width: rect.width,
                height: rect.height
            };
        },

        __getMergeCellRect: function (cellInfo) {
            var mergeInfo = cellInfo.mergecell;
            var rect = this.__getRangeRect(mergeInfo.start, mergeInfo.end);

            if (rect.width === 0 || rect.height === 0) {
                return null;
            }

            return {
                x: this.__calculateMergeCellX(cellInfo),
                y: this.__calculateMergeCellY(cellInfo),
                width: rect.width,
                height: rect.height
            };
        },

        __calculateMergeCellX: function (cellInfo) {
            var visualData = this.visualData;
            var col = visualData.cols[cellInfo.c];

            var mergeInfo = cellInfo.mergecell;
            var x = visualData.colPoints[cellInfo.c] + OFFSET;

            for (var i = col, min = mergeInfo.start.col; i >= min; i--) {
                if (this.queryCommandValue('hiddencolumn', i)) {
                    continue;
                }

                x -= this.queryCommandValue('columnwidth', i) + WIDTH;
            }

            return x;
        },

        __calculateMergeCellY: function (cellInfo) {
            var visualData = this.visualData;
            var row = visualData.rows[cellInfo.r];

            var mergeInfo = cellInfo.mergecell;
            var y = visualData.rowPoints[cellInfo.r] + OFFSET;

            for (var i = row, min = mergeInfo.start.row; i >= min; i--) {
                if (this.queryCommandValue('hiddenrow', i)) {
                    continue;
                }

                y -= this.queryCommandValue('rowheight', i) + WIDTH;
            }

            return y;
        },

        __getRangeRect: function (start, end) {
            var width = -1;
            var height = -1;

            // height
            for (var i = start.row, limit = end.row; i <= limit; i++) {
                // 被隐藏，则跳过
                if (this.queryCommandValue('hiddenrow', i)) {
                    continue;
                }

                height += this.queryCommandValue('rowheight', i) + WIDTH;
            }

            // width
            for (var i = start.col, limit = end.col; i <= limit; i++) {
                if (this.queryCommandValue('hiddencolumn', i)) {
                    continue;
                }

                width += this.queryCommandValue('columnwidth', i) + WIDTH;
            }

            return {
                width: width === -1 ? 0 : width,
                height: height === -1 ? 0 : height
            };
        }
    };
});