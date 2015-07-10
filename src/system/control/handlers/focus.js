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
        __onfocus: function () {
            this.postMessage('control.focus');
        },

        __onblur: function () {
            this.postMessage('control.blur');
        }
    };
});