/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var GRIDLINE_CONFIG = require('definition/gridline');

    module.exports = {
        __drawGridLine: function () {
            var visualData = this.visualData;
            var screen = this.gridlineScreen;

            if ($$.isNdef(visualData.gridline)) {
                return;
            }

            screen.save();

            screen.translate(visualData.headWidth, visualData.headHeight);

            this.__drawGridlineRow();
            this.__drawGridlineColumn();

            screen.strokeColor(GRIDLINE_CONFIG.color);
            screen.stroke();

            screen.restore();
        },

        __drawGridlineRow: function () {
            var visualData = this.visualData;
            var screen = this.gridlineScreen;

            if ($$.isNdef(visualData.rows)) {
                return;
            }

            var spaceWidth = visualData.spaceWidth;

            $$.forEach(visualData.rowPoints, function (point) {
                screen.hline(0, point, spaceWidth);
            });
        },

        __drawGridlineColumn: function () {
            var visualData = this.visualData;
            var screen = this.gridlineScreen;

            if ($$.isNdef(visualData.cols)) {
                return;
            }

            var spaceHeight = visualData.spaceHeight;

            $$.forEach(visualData.colPoints, function (point) {
                screen.vline(point, 0, spaceHeight);
            });
        }
    };
});