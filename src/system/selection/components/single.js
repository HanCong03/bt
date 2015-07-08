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

    module.exports = {
        __drawSingleSelection: function (entry, start, end) {
            var rect = this.rs('get.visible.rect', start, end);

            if (!rect) {
                return;
            }

            var visualData = this.rs('get.visual.data');
            var mergeInfo = this.queryCommandValue('mergecell', entry.row, entry.col);

            var focusRect;
            var screen = this.screen;

            screen.save();
            screen.translate(visualData.headWidth, visualData.headHeight);

            drawCover(screen, rect);

            if ($$.isNdef(mergeInfo)) {
                focusRect = this.rs('get.visible.rect', entry, entry);
            } else {
                focusRect = this.rs('get.visible.rect', mergeInfo.start, mergeInfo.end);
            }

            if (focusRect) {
                screen.clearRect(focusRect.x, focusRect.y, focusRect.width, focusRect.height);
            }

            drawOuter(screen, rect);

            screen.restore();
        }
    };

    function drawCover(screen, rect) {
        screen.fillColor(FOCUS_COVER_COLOR);
        screen.fillRect(rect.x, rect.y, rect.width, rect.height);
    }

    function drawOuter(screen, rect) {
        drawBorder(screen, rect);
        drawSpace(screen, rect);
    }

    function drawBorder(screen, rect) {
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
    }

    function drawSpace(screen, rect) {
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
    }
});