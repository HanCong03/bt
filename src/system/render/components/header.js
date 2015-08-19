/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var GRIDLINE_CONFIG = require('definition/gridline');
    var OFFSET = GRIDLINE_CONFIG.offset;
    var FACE_THEME = require('definition/face-theme');

    module.exports = {
        __drawHeader: function () {
            var visualData = this.visualData;

            if (visualData.headHeight === 0) {
                return;
            }

            this.__drawTitle();
            this.__drawLine();
        },

        __drawTitle: function () {
            var screen = this.gridlineScreen;

            screen.save();

            screen.beginPath();
            screen.fillColor(FACE_THEME.fontColor);

            screen.textBaseline('middle');
            screen.textAlign('center');

            this.__drawHeaderRow();
            this.__drawHeaderColumn();

            screen.restore();
        },

        __drawHeaderRow: function () {
            var visualData = this.visualData;
            var screen = this.gridlineScreen;

            var rowHeights = visualData.rowHeights;
            var rowPoints = visualData.rowPoints;

            var headWidth = visualData.headWidth;
            var headHeight = visualData.headHeight;

            $$.forEach(visualData.rows, function (rowIndex, index) {
                var x = headWidth / 2;
                var y = headHeight + rowPoints[index] + rowHeights[index] / 2 + OFFSET;

                screen.save();

                screen.beginPath();
                screen.rect(0, headHeight + rowPoints[index] + OFFSET, headWidth, rowHeights[index]);
                screen.clip();

                screen.fillText(rowIndex + 1, x, y + 1);

                screen.restore();
            });
        },

        __drawHeaderColumn: function () {
            var visualData = this.visualData;
            var screen = this.gridlineScreen;

            var colWidths = visualData.colWidths;
            var colPoints = visualData.colPoints;

            var headWidth = visualData.headWidth;
            var headHeight = visualData.headHeight;

            $$.forEach(visualData.cols, function (colIndex, index) {
                var title = $$.indexToTitle(colIndex);

                var x = headWidth + colPoints[index] + colWidths[index] / 2 + OFFSET;
                var y = headHeight / 2;

                screen.save();

                screen.beginPath();
                screen.rect(headWidth + colPoints[index] + OFFSET, 0, colWidths[index], headHeight);
                screen.clip();

                screen.fillText(title, x, y + 1);

                screen.restore();
            });
        },

        __drawLine: function () {
            var screen = this.gridlineScreen;

            screen.save();

            screen.beginPath();
            screen.strokeColor(GRIDLINE_CONFIG.color);

            this.__drawRowLine();
            this.__drawColumnLine();

            screen.stroke();

            screen.restore();
        },

        __drawRowLine: function () {
            var visualData = this.visualData;
            var screen = this.gridlineScreen;

            if ($$.isNdef(visualData.rows)) {
                return;
            }

            var headWidth = visualData.headWidth;
            var headHeight = visualData.headHeight;

            $$.forEach(visualData.rowPoints, function (point) {
                screen.hline(0, headHeight + point, headWidth);
            });
        },

        __drawColumnLine: function () {
            var visualData = this.visualData;
            var screen = this.gridlineScreen;

            if ($$.isNdef(visualData.cols)) {
                return;
            }

            var headWidth = visualData.headWidth;
            var headHeight = visualData.headHeight;

            $$.forEach(visualData.colPoints, function (point) {
                screen.vline(headWidth + point, 0, headHeight);
            });
        }
    };
});