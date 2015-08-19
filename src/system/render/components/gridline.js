/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var GRIDLINE_CONFIG = require('definition/gridline');

    module.exports = {
        __drawGridLine: function () {
            var screen = this.gridlineScreen;

            if (!this.queryCommandValue('gridline')) {
                return;
            }

            screen.save();

            screen.strokeColor(GRIDLINE_CONFIG.color);

            this.__drawGridlineRow();
            this.__drawGridlineColumn();

            screen.stroke();

            screen.restore();
        },

        __drawGridlineRow: function () {
            var visualData = this.visualData;
            var screen = this.gridlineScreen;

            if ($$.isNdef(visualData.rows)) {
                return;
            }

            var headWidth = visualData.headWidth;
            var headHeight = visualData.headHeight;
            var width = visualData.spaceWidth;

            $$.forEach(visualData.rowPoints, function (point) {
                screen.hline(headWidth, headHeight + point, width);
            });
        },

        __drawGridlineColumn: function () {
            var visualData = this.visualData;
            var screen = this.gridlineScreen;

            if ($$.isNdef(visualData.cols)) {
                return;
            }

            var headWidth = visualData.headWidth;
            var headHeight = visualData.headHeight;
            var height = visualData.spaceHeight;

            $$.forEach(visualData.colPoints, function (point) {
                screen.vline(headWidth + point, headHeight, height);
            });
        }
    };
});