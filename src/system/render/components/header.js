/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var GRIDLINE_CONFIG = require('definition/gridline');
    var FACE_THEME = require('definition/face-theme');

    module.exports = {
        __drawHeader: function () {
            var screen = this.gridlineScreen;

            screen.save();

            screen.fillColor(FACE_THEME.fontColor);

            screen.textBaseline('middle');
            screen.textAlign('center');

            this.__drawHeaderRow();
            this.__drawHeaderColumn();

            screen.strokeColor(GRIDLINE_CONFIG.color);
            screen.stroke();

            screen.restore();
        },

        __drawHeaderRow: function () {
            var visualData = this.visualData;
            var screen = this.gridlineScreen;

            if ($$.isNdef(visualData.rows)) {
                return;
            }

            $$.forEach(visualData.rows, function (rowIndex, index) {
                var x = visualData.headWidth / 2;
                var y = visualData.headHeight + visualData.rowPoints[index] + visualData.rowHeights[index] / 2 + GRIDLINE_CONFIG.offset;

                screen.fillText(rowIndex + 1, x, y + 1);
                screen.hline(0, visualData.headHeight + visualData.rowPoints[index], visualData.headWidth);
            });
        },

        __drawHeaderColumn: function () {
            var visualData = this.visualData;
            var screen = this.gridlineScreen;

            if ($$.isNdef(visualData.cols)) {
                return;
            }

            $$.forEach(visualData.cols, function (colIndex, index) {
                var title = $$.indexToTitle(colIndex);

                var x = visualData.headWidth + visualData.colPoints[index] + visualData.colWidths[index] / 2 + GRIDLINE_CONFIG.offset;
                var y = visualData.headHeight / 2;

                screen.fillText(title, x, y + 1);
                screen.vline(visualData.headWidth + visualData.colPoints[index], 0, visualData.headHeight);
            });
        }
    };
});