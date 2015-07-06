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
            var c = +evt.target.getAttribute('data-index');
            var controlers = this.controllers;

            // 通知selection控制器退出。
            controlers[this.mode].exit();
            // 切换模式
            this.mode = MODE.ROW_COLUMN;
            // 激活行列控制器
            controlers[MODE.ROW_COLUMN].activeHorizontal(c);

            // 阻止后续事件处理
            return false;
        },

        __onvheaderbtn: function (evt) {
            var r = +evt.target.getAttribute('data-index');
            var controlers = this.controllers;

            // 通知selection控制器退出。
            controlers[this.mode].exit();
            // 切换模式
            this.mode = MODE.ROW_COLUMN;
            // 激活行列控制器
            controlers[MODE.ROW_COLUMN].activeVertical(r);

            // 阻止后续事件处理
            return false;
        }
    };
});