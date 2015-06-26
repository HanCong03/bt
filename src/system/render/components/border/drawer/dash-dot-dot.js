/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var DEFAULT_FILL_COLOR = require('definition/face-theme').fill;
    var GRIDLINE_CONFIG = require('definition/gridline');
    var WIDTH = GRIDLINE_CONFIG.width;
    var OFFSET = GRIDLINE_CONFIG.offset;

    module.exports = {
        drawTop: function (screen, rect, color) {
            screen.save();

            screen.strokeColor(DEFAULT_FILL_COLOR);
            screen.beginPath();
            screen.hline(rect.x, rect.y + OFFSET, rect.width);
            screen.stroke();

            screen.strokeColor(color);
            screen.beginPath();
            screen.setLineDashOffset(16);
            screen.setLineDash([3, 3, 3, 3, 9, 3]);
            screen.hline(rect.x, rect.y + OFFSET, rect.width);
            screen.stroke();

            screen.restore();
        },

        drawLeft: function (screen, rect, color) {
            screen.save();

            screen.strokeColor(DEFAULT_FILL_COLOR);
            screen.beginPath();
            screen.vline(rect.x + OFFSET, rect.y, rect.height);
            screen.stroke();

            screen.strokeColor(color);
            screen.beginPath();
            screen.setLineDash([3, 3, 3, 3, 9, 3]);
            screen.vline(rect.x + OFFSET, rect.y, rect.height);
            screen.stroke();

            screen.restore();
        },

        drawRight: function (screen, rect, color) {
            screen.save();

            screen.strokeColor(DEFAULT_FILL_COLOR);
            screen.beginPath();
            screen.vline(rect.x + rect.width - OFFSET, rect.y, rect.height);
            screen.stroke();

            screen.strokeColor(color);
            screen.beginPath();
            screen.setLineDash([3, 3, 3, 3, 9, 3]);
            screen.vline(rect.x + rect.width - OFFSET, rect.y, rect.height);
            screen.stroke();

            screen.restore();
        },

        drawBottom: function (screen, rect, color) {
            screen.save();

            screen.strokeColor(DEFAULT_FILL_COLOR);
            screen.beginPath();
            screen.hline(rect.x, rect.y + rect.height - OFFSET, rect.width);
            screen.stroke();

            screen.strokeColor(color);
            screen.beginPath();
            screen.setLineDashOffset(-16);
            screen.setLineDash([3, 3, 3, 3, 9, 3]);
            screen.hline(rect.x, rect.y + rect.height - OFFSET, rect.width);
            screen.stroke();

            screen.restore();
        }
    };
});