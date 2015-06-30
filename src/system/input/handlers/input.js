/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var GRIDLINE_CONFIG = require('definition/gridline');
    var OFFSET = GRIDLINE_CONFIG.offset;
    var LINE_WIDTH = GRIDLINE_CONFIG.width;

    module.exports = {
        __input: function () {
            var content = this.inputNode.innerHTML;
            var rect = this.__calculateContentRect(content);

            this.__relocation(rect);
        }
    };
});