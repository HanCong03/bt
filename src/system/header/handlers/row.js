/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var LIMIT = require('definition/limit');
    var MAX_COLUMN_INDEX = LIMIT.MAX_COLUMN - 1;

    var GRIDLINE_CONFIG = require('definition/gridline');
    var OFFSET = GRIDLINE_CONFIG.offset;

    module.exports = {
        __updateRowSelction: function (startRow, endRow) {
            this.bgScreen.save();
            this.lineScreen.save();

            this.__updateSelection({
                row: startRow,
                col: 0
            }, {
                row: endRow,
                col: MAX_COLUMN_INDEX
            });

            this.__drawVerticalStart(startRow);

            this.bgScreen.restore();
            this.lineScreen.restore();

            this.bgScreen.toggle();
            this.lineScreen.toggle();
        },

        __drawVerticalStart: function (row) {
            var visualData = this.rs('get.visual.data');
            var r = visualData.rMap[row];
            var bgScreen = this.bgScreen;

            var x = 0;
            var y = visualData.headHeight + visualData.rowPoints[r] + OFFSET;
            var width = visualData.headWidth;
            var height = visualData.rowHeights[r];

            bgScreen.fillColor('#9fd5b7');
            bgScreen.fillRect(x, y, width, height);
        }
    };
});