/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var LIMIT = require('definition/limit');
    var MAX_ROW_INDEX = LIMIT.MAX_ROW - 1;
    var MAX_COLUMN_INDEX = LIMIT.MAX_COLUMN - 1;

    var GRIDLINE_CONFIG = require('definition/gridline');
    var OFFSET = GRIDLINE_CONFIG.offset;

    module.exports = {
        __updateAllSelction: function () {
            this.bgScreen.save();
            this.lineScreen.save();

            this.__updateSelection({
                row: 0,
                col: 0
            }, {
                row: MAX_ROW_INDEX,
                col: MAX_COLUMN_INDEX
            });

            this.bgScreen.restore();
            this.lineScreen.restore();

            this.bgScreen.toggle();
            this.lineScreen.toggle();
        }
    };
});