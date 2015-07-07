/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var FACE_THEME = require('definition/face-theme');
    var GRIDLINE_CONFIG = require('definition/gridline');
    var PANE_COLOR = GRIDLINE_CONFIG.pane;
    var LINE_WIDTH = GRIDLINE_CONFIG.width;
    var OFFSET = GRIDLINE_CONFIG.offset;

    module.exports = {
        __drawPaneLine: function () {
            var screen = this.paneScreen;
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

            if (paneStart.row === -1 && paneStart.col === -1) {
                return;
            }

            screen.save();
            screen.fillColor(PANE_COLOR);

            screen.beginPath();

            // row pane
            if (paneStart.row !== -1) {
                r = visualData.rMap[paneEnd.row];
                screen.fillRect(0, rowPoints[r + 1] + headHeight - LINE_WIDTH - OFFSET, visualData.spaceWidth + headWidth, 3);
            }

            // col pane
            if (paneStart.col !== -1) {
                c = visualData.cMap[paneEnd.col];
                screen.fillRect(colPoints[c + 1] + headWidth - LINE_WIDTH - OFFSET, 0, 3, visualData.spaceHeight + headHeight);
            }

            screen.stroke();

            screen.restore();
        }
    };
});