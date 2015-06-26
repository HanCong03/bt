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
        drawTop: function (screen, rect, color) {
            screen.strokeColor(color);
            screen.hline(rect.x, rect.y + OFFSET, rect.width);
            screen.stroke();
        },

        drawLeft: function (screen, rect, color) {
            screen.strokeColor(color);
            screen.vline(rect.x + OFFSET, rect.y, rect.height);
            screen.stroke();
        },

        drawRight: function (screen, rect, color) {
            screen.strokeColor(color);
            screen.vline(rect.x + rect.width + OFFSET, rect.y, rect.height);
            screen.stroke();
        },

        drawBottom: function (screen, rect, color) {
            screen.strokeColor(color);
            screen.hline(rect.x, rect.y + rect.height + OFFSET, rect.width);
            screen.stroke();
        }
    };
});