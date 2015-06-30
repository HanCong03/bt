/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var STATUS = require('../definition/status');

    module.exports = {
        __oninput: function () {
            if (this.status === STATUS.NORMAL) {
                return;
            }

            this.postMessage('controle.input');
        }
    };
});