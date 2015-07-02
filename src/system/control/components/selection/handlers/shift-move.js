/**
 * @file shift+方向键处理
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    module.exports = {
        __shiftLeft: function (evt) {
            this.execCommand('expandrange', 0, -1);
        },

        __shiftTop: function (evt) {
            this.execCommand('expandrange', -1, 0);
        },

        __shiftRight: function (evt) {
            this.execCommand('expandrange', 0, 1);
        },

        __shiftDown: function (evt) {
            this.execCommand('expandrange', 1, 0);
        }
    };
});