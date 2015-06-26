/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var GRIDLINE_CONFIG = require('definition/gridline');
    var WIDTH = GRIDLINE_CONFIG.width;
    var OFFSET = GRIDLINE_CONFIG.offset;

    module.exports = {
        drawTop: function (screen, rect, color) {
            screen.save();
            screen.setLineWidth(2 * WIDTH);

            screen.strokeColor(color);
            screen.beginPath();
            screen.hline(rect.x, rect.y, rect.width);
            screen.stroke();

            screen.restore();
        },

        drawLeft: function (screen, rect, color) {
            screen.save();

            screen.setLineWidth(2 * WIDTH);

            screen.strokeColor(color);
            screen.beginPath();
            screen.vline(rect.x, rect.y, rect.height);
            screen.stroke();

            screen.restore();
        },

        drawRight: function (screen, rect, color) {
            screen.save();

            screen.setLineWidth(2 * WIDTH);

            screen.strokeColor(color);
            screen.beginPath();
            screen.vline(rect.x + rect.width - WIDTH, rect.y, rect.height);
            screen.stroke();

            screen.restore();
        },

        drawBottom: function (screen, rect, color) {
            screen.save();

            screen.setLineWidth(2 * WIDTH);

            screen.strokeColor(color);
            screen.beginPath();
            screen.hline(rect.x, rect.y + rect.height - WIDTH, rect.width);
            screen.stroke();

            screen.restore();
        }
    };
});