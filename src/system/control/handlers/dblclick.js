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
        __ondblclick: function (evt) {
            switch (this.mode) {
                case MODE.SELECTION:
                    return this.__dblclickForSelection(evt);
            }
        },

        __dblclickForSelection: function (evt) {
            var index = this.__getIndex(evt);

            // 当前点击位置无意义，不切换模式
            if (index.row < 0 || index.col < 0) {
                return true;
            }

            var controlers = this.controllers;

            // 通知selection控制器当前选区发生变化。
            controlers[MODE.SELECTION].change(index.row, index.col);
            // 通知selection控制器退出。
            controlers[MODE.SELECTION].exit();
            // 切换模式
            this.mode = MODE.WRITE;
            // 通知write控制器激活方式：通过鼠标激活
            controlers[MODE.WRITE].mouseActive(index.row, index.col);

            // 阻止后续事件处理
            return false;
        }
    };
});