/**
 * @file hover处理器
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    module.exports = {
        __hoverin: function (toIndex, fromIndex) {
            this.postMessage('control.hover.in', toIndex, fromIndex);
        },

        __hoverout: function (index) {
            this.postMessage('control.hover.out', index);
        },

        __hoverstop: function () {
            this.postMessage('control.hover.stop');
        }
    };
});