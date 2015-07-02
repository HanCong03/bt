/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var GRIDLINE_CONFIG = require('definition/gridline');
    var PANE_COLOR = GRIDLINE_CONFIG.pane;

    module.exports = {
        __drawPaneLine: function () {
            var screen = this.borderScreen;
            var visualData = this.visualData;

            var pane = this.queryCommandValue('pane');

            if (!pane) {
                return;
            }

            var paneStart = pane.start;
            var paneEnd = pane.end;
            var rowPoints = visualData.rowPoints;
            var colPoints = visualData.colPoints;
            var headWidth = visualData.headWidth;
            var headHeight = visualData.headHeight;

            var r;
            var c;

            screen.save();

            screen.beginPath();
            screen.strokeColor(PANE_COLOR);

            // row pane
            if (paneStart.row !== -1) {
                r = visualData.rMap[paneEnd.row];
                screen.hline(0, rowPoints[r + 1] + headHeight, visualData.spaceWidth + headWidth);
            }

            // col pane
            if (paneStart.col !== -1) {
                c = visualData.cMap[paneEnd.col];
                screen.vline(colPoints[c + 1] + headWidth, 0, visualData.spaceHeight + headHeight);
            }

            screen.stroke();

            screen.restore();
        }
    };
});