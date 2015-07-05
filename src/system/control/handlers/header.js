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
    var ControlUtils = require('system/control/utils');

    module.exports = {
        __onheaderover: function (evt) {
            var index = this.__getIndex(evt);

            if (index.row === -1) {
                this.postMessage('control.header.h.hover', index.c);
            } else {
                this.postMessage('control.header.v.hover', index.r);
            }
        },

        __onheaderout: function (evt) {
            this.postMessage('control.header.out');
        },

        __onhheaderbtn: function (evt) {
            console.log(3)
        },

        __onvheaderbtn: function (evt) {
            console.log(4)
        }
    };
});