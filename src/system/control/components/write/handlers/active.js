/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var STATUS = require('../definition/status');

    module.exports = {
        /**
         * 鼠标（双击）激活
         * @param row
         * @param col
         */
        mouseActive: function (row, col) {
            if (this.status !== STATUS.NORMAL) {
                return;
            }

            this.status = STATUS.INPUT;
            this.postMessage('control.input.mouse.active', row, col);
        }
    };
});