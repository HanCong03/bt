/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var DEFAULT_COLOR = require('definition/face-theme').fill;
    var GRIDLINE_CONFIG = require('definition/gridline');
    var OFFSET = GRIDLINE_CONFIG.offset;
    var LINE_WIDTH = GRIDLINE_CONFIG.width;
    var DOUBLE_LINE_WIDTH = 2 * LINE_WIDTH;

    module.exports = {
        drawHorizontal: function (screen, visualData, layout, borderOption) {
            var r;
            var c;
            var rowPoints = visualData.rowPoints;
            var colPoints = visualData.colPoints;
            var colWidths = visualData.colWidths;

            screen.save();

            screen.setLineWidth(DOUBLE_LINE_WIDTH);
            screen.strokeColor(DEFAULT_COLOR);
            screen.beginPath();

            for (var i = 0, len = layout.length; i < len; i++) {
                c = layout[i];
                r = c.r;
                c = c.c;

                screen.hline(colPoints[c] - OFFSET, rowPoints[r] - OFFSET, colWidths[c] + DOUBLE_LINE_WIDTH);
            }

            screen.stroke();

            screen.setLineDash([5, 2]);

            screen.strokeColor(borderOption.color.value);
            screen.beginPath();

            for (var i = 0, len = layout.length; i < len; i++) {
                c = layout[i];
                r = c.r;
                c = c.c;

                screen.hline(colPoints[c] - OFFSET, rowPoints[r] - OFFSET, colWidths[c] + DOUBLE_LINE_WIDTH);
            }

            screen.stroke();

            screen.restore();
        },

        drawVertical: function (screen, visualData, layout, borderOption) {
            var r;
            var c;
            var rowPoints = visualData.rowPoints;
            var colPoints = visualData.colPoints;
            var rowHeights = visualData.rowHeights;

            screen.save();

            OFFSET
            screen.strokeColor(DEFAULT_COLOR);
            screen.beginPath();

            for (var i = 0, len = layout.length; i < len; i++) {
                c = layout[i];
                r = c.r;
                c = c.c;

                screen.vline(colPoints[c] - OFFSET, rowPoints[r] - OFFSET, rowHeights[r] + DOUBLE_LINE_WIDTH);
            }

            screen.stroke();

            screen.setLineDash([5, 2]);
            screen.strokeColor(borderOption.color.value);
            screen.beginPath();

            for (var i = 0, len = layout.length; i < len; i++) {
                c = layout[i];
                r = c.r;
                c = c.c;

                screen.vline(colPoints[c] - OFFSET, rowPoints[r] - OFFSET, rowHeights[r] + DOUBLE_LINE_WIDTH);
            }

            screen.stroke();

            screen.restore();
        }
    };
});