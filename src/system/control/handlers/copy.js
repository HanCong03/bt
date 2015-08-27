/**
 * @file
 * @author hancong03@baiud.com
 */
/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var MODE = require('../definition/mode');

    module.exports = {
        __oncopy: function (evt) {
            this.postMessage('control.copy', evt.originalEvent);
        },

        __oncut: function (evt) {
            this.postMessage('control.cut', evt.originalEvent);
        },

        __onpaste: function (evt) {
            this.postMessage('control.paste', evt.originalEvent);
        }
    };
});