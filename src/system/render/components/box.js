/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var GRIDLINE_CONFIG = require('definition/gridline');
    var OFFSET = GRIDLINE_CONFIG.offset;

    var FACE_THEME = require('definition/face-theme');

    module.exports = {
        __drawBox: function () {
            var screen = this.borderScreen;
            var visualData = this.visualData;

            screen.save();

            screen.translate(visualData.headWidth, visualData.headHeight);

            screen.beginPath();
            screen.strokeColor(FACE_THEME.border.lineColor);

            // left
            screen.vline(OFFSET, 0, visualData.boundaryHeight);
            // top
            screen.hline(0, OFFSET, visualData.boundaryWidth);
            // right
            screen.vline(visualData.spaceWidth - OFFSET, 0, visualData.spaceHeight);
            // bottom
            screen.hline(-visualData.headWidth, visualData.spaceHeight - OFFSET, visualData.spaceWidth + visualData.headWidth);

            screen.stroke();

            screen.restore();
        }
    };
});