/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var LIMIT = require('definition/limit');
    var MAX_ROW_INDEX = LIMIT.MAX_ROW - 1;

    var GRIDLINE_CONFIG = require('definition/gridline');
    var OFFSET = GRIDLINE_CONFIG.offset;

    module.exports = {
        __updateColumnSelction: function (startCol, endCol) {
            this.bgScreen.save();
            this.lineScreen.save();

            this.__updateSelection({
                row: 0,
                col: startCol
            }, {
                row: MAX_ROW_INDEX,
                col: endCol
            });

            this.__drawHorizontalStart(startCol);

            this.bgScreen.restore();
            this.lineScreen.restore();

            this.bgScreen.toggle();
            this.lineScreen.toggle();
        },

        __drawHorizontalStart: function (col) {
            var visualData = this.rs('get.visual.data');
            var bgScreen = this.bgScreen;
            var c = visualData.cMap[col];

            var x = visualData.headWidth + visualData.colPoints[c] + OFFSET;
            var y = 0;
            var width = visualData.colWidths[c];
            var height = visualData.headHeight;

            // #d3f0e0
            bgScreen.fillColor('#9fd5b7');
            bgScreen.fillRect(x, y, width, height);
        }
    };
});