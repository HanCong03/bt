/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var GRIDLINE_CONFIG = require('definition/gridline');
    var OFFSET = GRIDLINE_CONFIG.offset;

    var SystemUtils = require('system/utils/utils');

    module.exports = {
        __drawCover: function (originalStart, originalEnd, start, end, rect) {
            if (start.row === end.row && start.col === end.col) {
                return;
            }

            var mergecells = this.queryCommandValue('mergecell', start, end);

            if ($$.isNdef(mergecells)) {
                this.__drawNormalCover(originalStart, originalEnd, start, end, rect);
            } else {
                this.__drawMergeCellCover(mergecells, originalStart, originalEnd, start, end, rect);
            }
        },

        __drawNormalCover: function (originalStart, originalEnd, start, end, rect) {
            var screen = this.coverScreen;
            var visualData = this.rs('get.visual.data');

            screen.save();
            screen.translate(visualData.headWidth, visualData.headHeight);

            screen.fillColor('rgba(0, 0, 0, 0.2)');
            screen.fillRect(rect.x, rect.y, rect.width, rect.height);

            this.__clearCellFocus(originalStart.row, originalStart.col);

            screen.restore();
        },

        __drawMergeCellCover: function (mergecells, originalStart, originalEnd, start, end, rect) {
            var screen = this.coverScreen;
            var visualData = this.rs('get.visual.data');

            screen.save();
            screen.translate(visualData.headWidth, visualData.headHeight);

            screen.fillColor('rgba(0, 0, 0, 0.2)');
            screen.fillRect(rect.x, rect.y, rect.width, rect.height);

            this.__clearMergeCellFocus(mergecells, originalStart, originalEnd);

            screen.restore();
        },

        __clearCellFocus: function (row, col) {
            var screen = this.coverScreen;
            var visualData = this.rs('get.visual.data');

            var r = visualData.rows.indexOf(row);
            var c = visualData.cols.indexOf(col);

            if (r === -1 || c === -1) {
                return;
            }

            var x = visualData.colPoints[c] + OFFSET;
            var y = visualData.rowPoints[r] + OFFSET;
            var width = visualData.colWidths[c];
            var height = visualData.rowHeights[r];

            screen.clearRect(x, y, width, height);
        },

        __clearMergeCellFocus: function (mergecells, start, end) {
            var mergeInfo = SystemUtils.findMergeCell(mergecells, start.row, start.col);

            // 当前起始单元格不是合并单元格
            if ($$.isNdef(mergeInfo)) {
                this.__clearCellFocus(start.row, start.col);
                return;
            }

            var rect = SystemUtils.getVisibleRect(this.rs('get.visual.data'), mergeInfo.start, mergeInfo.end);

            if ($$.isNdef(rect)) {
                return;
            }

            var screen = this.coverScreen;
            screen.clearRect(rect.x, rect.y, rect.width, rect.height);
        }
    };
});