/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var GRIDLINE_CONFIG = require('definition/gridline');
    var OFFSET = GRIDLINE_CONFIG.offset;
    var LINE_WIDTH = GRIDLINE_CONFIG.width;
    var DOUBLE_LINE_WIDTH = 2 * LINE_WIDTH;

    var FACE_THEME = require('definition/face-theme');
    var FOCUS_COVER_COLOR = FACE_THEME.focus.cover;
    var FOCUS_SPACE_COLOR = FACE_THEME.focus.space;

    var THEME_COLOR = FACE_THEME.color;

    var SystemUtils = require('system/utils/utils');

    module.exports = {
        __draw: function (originalStart, originalEnd, start, end, rect) {
            if (!rect) {
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

            screen.fillColor(FOCUS_COVER_COLOR);
            screen.fillRect(rect.x, rect.y, rect.width, rect.height);

            this.__clearCellFocus(originalStart.row, originalStart.col);

            this.__drawBorder(rect);
            this.__drawSpace(rect);

            screen.restore();
        },

        __drawMergeCellCover: function (mergecells, originalStart, originalEnd, start, end, rect) {
            var screen = this.coverScreen;
            var visualData = this.rs('get.visual.data');

            screen.save();
            screen.translate(visualData.headWidth, visualData.headHeight);

            screen.fillColor(FOCUS_COVER_COLOR);
            screen.fillRect(rect.x, rect.y, rect.width, rect.height);

            this.__clearMergeCellFocus(mergecells, originalStart, originalEnd);

            this.__drawBorder(rect);
            this.__drawSpace(rect);

            screen.restore();
        },

        __drawSpace: function (rect) {
            var screen = this.coverScreen;

            var x = rect.x;
            var y = rect.y;
            var width = rect.width;
            var height = rect.height;

            screen.setLineWidth(1);
            screen.strokeColor(FOCUS_SPACE_COLOR);

            screen.beginPath();

            if (!rect.ot) {
                screen.hline(x, y + OFFSET, width);
            }

            if (!rect.ol) {
                screen.vline(x + OFFSET, y, height);
            }

            if (!rect.or) {
                screen.vline(x + width - OFFSET, y, height);
            }

            if (!rect.ob) {
                screen.hline(x, y + height - OFFSET, width);
            }

            screen.stroke();
        },

        __drawBorder: function (rect) {
            var screen = this.coverScreen;

            screen.beginPath();

            screen.setLineWidth(2);
            screen.strokeColor(THEME_COLOR);

            var x = rect.x;
            var y = rect.y;
            var width = rect.width;
            var height = rect.height;

            var dx;
            var dy;
            var dw;
            var dh;

            if (!rect.ot) {
                if (rect.ol) {
                    dx = 0;
                    dw = 0;
                } else {
                    dx = -DOUBLE_LINE_WIDTH;
                    dw = DOUBLE_LINE_WIDTH;
                }

                if (!rect.or) {
                    dw += DOUBLE_LINE_WIDTH;
                }

                screen.hline(x + dx, y - LINE_WIDTH, width + dw);
            }

            if (!rect.ol) {
                if (rect.ot) {
                    dy = 0;
                    dh = 0;
                } else {
                    dy = -DOUBLE_LINE_WIDTH;
                    dh = DOUBLE_LINE_WIDTH;
                }

                if (!rect.ob) {
                    dh += DOUBLE_LINE_WIDTH;
                }

                screen.vline(x - LINE_WIDTH, y + dy, height + dh);
            }

            if (!rect.or) {
                if (rect.ot) {
                    dy = 0;
                    dh = 0;
                } else {
                    dy = -DOUBLE_LINE_WIDTH;
                    dh = DOUBLE_LINE_WIDTH;
                }

                if (!rect.ob) {
                    dh += DOUBLE_LINE_WIDTH;
                }

                screen.vline(x + width + LINE_WIDTH, y + dy, height + dh);
            }

            if (!rect.ob) {
                if (rect.ol) {
                    dx = 0;
                    dw = 0;
                } else {
                    dx = -DOUBLE_LINE_WIDTH;
                    dw = DOUBLE_LINE_WIDTH;
                }

                if (!rect.or) {
                    dw += DOUBLE_LINE_WIDTH;
                }

                screen.hline(x + dx, y + height + LINE_WIDTH, width + dw);
            }

            screen.stroke();
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