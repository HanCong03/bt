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
    var SELECTION_COLOR = FACE_THEME.focus.color;

    module.exports = {
        __drawMultiSelection: function (ranges) {
            var visualData = this.rs('get.visual.data');
            var screen = this.screen;

            screen.save();
            screen.translate(visualData.headWidth, visualData.headHeight);

            var range;

            for (var i = 0, len = ranges.length; i < len; i++) {
                var range = ranges[i];
                this.__fillMultiSelection(range.start, range.end);
            }

            range = ranges[ranges.length - 1];

            this.__drawMultiFocus(range.entry.row, range.entry.col);

            screen.restore();
        },

        __drawTempSelection: function (ranges) {
            var visualData = this.rs('get.visual.data');
            var screen = this.screen;

            screen.save();
            screen.translate(visualData.headWidth, visualData.headHeight);

            for (var i = 0, len = ranges.length; i < len; i++) {
                this.__fillMultiSelection(ranges[i].start, ranges[i].end);
            }

            screen.restore();
        },

        __appendSelection: function (entry, start, end) {
            var visualData = this.rs('get.visual.data');
            var screen = this.screen;

            screen.save();
            screen.translate(visualData.headWidth, visualData.headHeight);

            this.__fillMultiSelection(start, end);
            this.__drawMultiFocus(entry.row, entry.col);

            screen.restore();
        },

        __fillMultiSelection: function (start, end) {
            var rect = this.rs('get.visible.rect', start, end);

            if (!rect) {
                return;
            }

            var screen = this.screen;

            drawCover(screen, rect);
            drawOuter(screen, rect);
        },

        __drawMultiFocus: function (row, col) {
            var mergeInfo = this.queryCommandValue('mergecell', row, col);
            var rect;

            if ($$.isNdef(mergeInfo)) {
                rect = this.rs('get.visible.rect', {
                    row: row,
                    col: col
                }, {
                    row: row,
                    col: col
                });
            } else {
                rect = this.rs('get.visible.rect', mergeInfo.start, mergeInfo.end);
            }

            if (!rect) {
                return;
            }

            var screen = this.screen;

            var x = rect.x + OFFSET;
            var y = rect.y + OFFSET;
            var width = rect.width - LINE_WIDTH;
            var height = rect.height - LINE_WIDTH;

            screen.clearRect(x, y, width, height);

            screen.strokeColor(FOCUS_SPACE_COLOR);
            screen.strokeRect(x, y, width, height);

            screen.strokeColor(FACE_THEME.color);
            screen.strokeRect(x + LINE_WIDTH, y + LINE_WIDTH, width - DOUBLE_LINE_WIDTH, height - DOUBLE_LINE_WIDTH);
        }
    };

    function drawCover(screen, rect) {
        screen.fillColor(FOCUS_COVER_COLOR);
        screen.fillRect(rect.x, rect.y, rect.width, rect.height);
    }

    function drawOuter(screen, rect) {
        var x = rect.x;
        var y = rect.y;
        var width = rect.width;
        var height = rect.height;

        var dx = 0;
        var dy = 0;
        var dw = 0;
        var dh = 0;

        var ot = !rect.ot;
        var ob = !rect.ob;
        var ol = !rect.ol;
        var or = !rect.or;

        if (ot) {
            dy = 1;
            dh += 1;
        }

        if (ol) {
            dx = 1;
            dw += 1;
        }

        if (or) {
            dw += 1;
        }

        if (ob) {
            dh += 1;
        }

        /* ---- border ---- */
        screen.strokeColor(SELECTION_COLOR);
        screen.beginPath();

        if (ot) {
            screen.hline(x - dx, y - OFFSET, width + dw);
        }

        if (ob) {
            screen.hline(x - dx, y + height + OFFSET, width + dw);
        }

        if (ol) {
            screen.vline(x - OFFSET, y - dy, height + dh);
        }

        if (or) {
            screen.vline(x + width + OFFSET, y - dy, height + dh);
        }

        screen.stroke();

        /* ---- space ---- */
        screen.strokeColor(FOCUS_SPACE_COLOR);
        screen.beginPath();

        if (ot) {
            screen.hline(x, y + OFFSET, width - DOUBLE_LINE_WIDTH + dw);
        }

        if (ob) {
            screen.hline(x, y + height - OFFSET, width - DOUBLE_LINE_WIDTH + dw);
        }

        if (ol) {
            screen.vline(x + OFFSET, y, height - DOUBLE_LINE_WIDTH + dh);
        }

        if (or) {
            screen.vline(x + width - OFFSET, y, height - DOUBLE_LINE_WIDTH + dh);
        }

        screen.stroke();
    }
});