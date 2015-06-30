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
        __oninput: function () {
            switch (this.mode) {
                case MODE.SELECTION:
                    return this.__inputForSelection();
            }

            // 其他情况
            return true;
        },

        __inputForSelection: function () {
            var range = this.queryCommandValue('range');
            var entry = range.entry;
            var controlers = this.controllers;

            // 通知selection控制器当前选区发生变化。
            controlers[MODE.SELECTION].change(entry.row, entry.col);
            // 通知selection控制器退出。
            controlers[MODE.SELECTION].exit();
            // 切换模式
            this.mode = MODE.WRITE;
            // 通知write控制器激活方式：通过输入激活
            controlers[MODE.WRITE].inputActive(entry.row, entry.col);

            // 阻止后续事件处理
            return false;
        }
    };
});