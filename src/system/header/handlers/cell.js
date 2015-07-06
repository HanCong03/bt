/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    module.exports = {
        __updateCellSelction: function (start, end) {
            var range = this.rs('get.full.range', start, end);

            this.bgScreen.save();
            this.lineScreen.save();

            this.__updateSelection(range.start, range.end);

            this.bgScreen.restore();
            this.lineScreen.restore();

            this.bgScreen.toggle();
            this.lineScreen.toggle();
        }
    };
});