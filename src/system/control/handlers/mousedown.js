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
        __onmousedown: function (evt) {
            if (this.mode === MODE.WRITE) {
                return this.__mousedownForWrite(evt);
            }

            // 其他模式下，交由当前控制器处理
            return true;
        },

        __mousedownForWrite: function (evt) {
            var controlers = this.controllers;

            // 通知selection控制器退出。
            if (!controlers[MODE.WRITE].exit()) {
                // wirte控制器未能正常退出
                return false;
            }

            // 切换模式
            this.mode = MODE.SELECTION;

            // 后续处理控制器继续处理该事件
            return true;
        }
    };
});